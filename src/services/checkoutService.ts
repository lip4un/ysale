export interface CheckoutPayload {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
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
    clearIntent();
};

export const getCheckoutIntentKey = (): string => CHECKOUT_INTENT_KEY;
