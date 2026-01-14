import { getStripeClient } from './stripeClient';

export interface CheckoutPayload {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}

interface CheckoutResponse {
    url?: string;
    error?: string;
    handledClientRedirect?: boolean;
}

const CHECKOUT_INTENT_KEY = 'ysale_checkout_intent';

const getAvailableStorages = (): Storage[] => {
    const storages: Storage[] = [];
    if (typeof window === 'undefined') {
        return storages;
    }

    try {
        storages.push(window.sessionStorage);
    } catch (error) {
        console.warn('SessionStorage unavailable for checkout intent', error);
    }

    try {
        storages.push(window.localStorage);
    } catch (error) {
        console.warn('LocalStorage unavailable for checkout intent', error);
    }

    return storages;
};

const persistIntent = (value: string): void => {
    for (const storage of getAvailableStorages()) {
        try {
            storage.setItem(CHECKOUT_INTENT_KEY, value);
        } catch (error) {
            console.warn('Failed to persist checkout intent', error);
        }
    }
};

const readIntent = (): string | null => {
    for (const storage of getAvailableStorages()) {
        try {
            const value = storage.getItem(CHECKOUT_INTENT_KEY);
            if (value) {
                return value;
            }
        } catch (error) {
            console.warn('Failed to read checkout intent', error);
        }
    }
    return null;
};

const clearIntent = (): void => {
    for (const storage of getAvailableStorages()) {
        try {
            storage.removeItem(CHECKOUT_INTENT_KEY);
        } catch (error) {
            console.warn('Failed to clear checkout intent', error);
        }
    }
};

export const storeCheckoutIntent = (payload: CheckoutPayload): void => {
    if (typeof window === 'undefined') {
        return;
    }
    persistIntent(JSON.stringify(payload));
};

export const consumeCheckoutIntent = (): CheckoutPayload | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    const raw = readIntent();
    if (!raw) {
        return null;
    }

    clearIntent();
    try {
        return JSON.parse(raw) as CheckoutPayload;
    } catch (error) {
        console.error('Failed to parse checkout intent', error);
        return null;
    }
};

export const hasCheckoutIntent = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }
    return readIntent() !== null;
};

const resolveCheckoutEndpoints = (): string[] => {
    const endpoints: string[] = [];
    const primary = import.meta.env.VITE_CHECKOUT_ENDPOINT;
    const fallback = import.meta.env.VITE_CHECKOUT_FALLBACK_ENDPOINT;

    if (primary) endpoints.push(primary);
    if (fallback) endpoints.push(fallback);

    // Relative path always last to keep default behavior when API lives with the app
    endpoints.push('/api/checkout');

    return Array.from(new Set(endpoints.filter(Boolean)));
};

const postCheckout = async (endpoint: string, payload: CheckoutPayload): Promise<CheckoutResponse> => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const message = (data as CheckoutResponse | null)?.error || `HTTP error! status: ${response.status}`;
            return { error: message };
        }

        if (typeof data !== 'object' || data === null) {
            return { error: 'Invalid response from checkout service' };
        }

        return data as CheckoutResponse;
    } catch (error) {
        console.error(`Checkout request failed for ${endpoint}`, error);
        return { error: error instanceof Error ? error.message : 'Network error. Please try again.' };
    }
};

const redirectWithStripeClient = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
    const stripe = await getStripeClient();
    if (!stripe) {
        return { error: 'Stripe publishable key not configured' };
    }

    const redirectToCheckout = (stripe as unknown as { redirectToCheckout?: (options: Record<string, unknown>) => Promise<{ error?: { message?: string } }> }).redirectToCheckout;

    if (typeof redirectToCheckout !== 'function') {
        return { error: 'Stripe client missing redirect helper' };
    }

    const { error } = await redirectToCheckout.call(stripe, {
        lineItems: [{ price: payload.priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: payload.successUrl,
        cancelUrl: payload.cancelUrl
    });

    if (error) {
        return { error: error.message || 'Stripe redirect failed' };
    }

    return { handledClientRedirect: true };
};

export const createCheckoutSession = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
    let lastError: string | undefined;

    for (const endpoint of resolveCheckoutEndpoints()) {
        const result = await postCheckout(endpoint, payload);
        if (result.url || result.handledClientRedirect) {
            return result;
        }

        if (result.error) {
            lastError = result.error;
        }
    }

    const fallbackResult = await redirectWithStripeClient(payload);
    if (fallbackResult.handledClientRedirect) {
        return fallbackResult;
    }

    return { error: fallbackResult.error ?? lastError ?? 'Failed to start checkout session' };
};

export const clearCheckoutIntent = (): void => {
    if (typeof window === 'undefined') {
        return;
    }
    clearIntent();
};

export const getCheckoutIntentKey = (): string => CHECKOUT_INTENT_KEY;

export type { CheckoutResponse };
