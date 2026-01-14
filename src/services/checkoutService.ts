export interface CheckoutPayload {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}

const CHECKOUT_INTENT_KEY = 'ysale_checkout_intent';

export const storeCheckoutIntent = (payload: CheckoutPayload): void => {
    if (typeof window === 'undefined') {
        return;
    }
    window.sessionStorage.setItem(CHECKOUT_INTENT_KEY, JSON.stringify(payload));
};

export const consumeCheckoutIntent = (): CheckoutPayload | null => {
    if (typeof window === 'undefined') {
        return null;
    }
    const raw = window.sessionStorage.getItem(CHECKOUT_INTENT_KEY);
    if (!raw) {
        return null;
    }
    window.sessionStorage.removeItem(CHECKOUT_INTENT_KEY);
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
    return window.sessionStorage.getItem(CHECKOUT_INTENT_KEY) !== null;
};

interface CheckoutResponse {
    url?: string;
    error?: string;
}

export const createCheckoutSession = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            return { error: `HTTP error! status: ${response.status}` };
        }

        const data = await response.json();
        if (typeof data !== 'object' || data === null) {
            return { error: 'Invalid response from checkout service' };
        }

        return data as CheckoutResponse;
    } catch (error) {
        console.error('Checkout request failed', error);
        return { error: 'Network error. Please try again.' };
    }
};

export const clearCheckoutIntent = (): void => {
    if (typeof window === 'undefined') {
        return;
    }
    window.sessionStorage.removeItem(CHECKOUT_INTENT_KEY);
};

export const getCheckoutIntentKey = (): string => CHECKOUT_INTENT_KEY;
