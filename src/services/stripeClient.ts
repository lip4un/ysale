import { loadStripe, type Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

const getPublishableKey = (): string | null => {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
        console.warn('Missing VITE_STRIPE_PUBLISHABLE_KEY');
        return null;
    }
    return key;
};

export const getStripeClient = (): Promise<Stripe | null> => {
    if (!stripePromise) {
        const publishableKey = getPublishableKey();
        if (!publishableKey) {
            return Promise.resolve(null);
        }
        stripePromise = loadStripe(publishableKey);
    }
    return stripePromise;
};
