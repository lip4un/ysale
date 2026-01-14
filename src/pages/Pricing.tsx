import { ContentPage } from '../layouts/ContentPage';
import { useTranslation } from 'react-i18next';
import { getPriceForRegion, formatPrice } from '../services/pricingService';
import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Subscription.module.css'; // Reusing some card styles
import { CheckCircle2 } from 'lucide-react';
import { isUserAuthenticated } from '../services/authService';
import { createCheckoutSession, storeCheckoutIntent } from '../services/checkoutService';
import type { CheckoutPayload } from '../services/checkoutService';

export function Pricing() {
    const { i18n, t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const priceConfig = getPriceForRegion(i18n.language);

    const handleSubscribe = async () => {
        const payload: CheckoutPayload = {
            priceId: 'price_1QkVj2LLBW0D1DzAX9NXqRIB', // Pro Plan price ID
            successUrl: `${window.location.origin}/dashboard/subscription?success=true`,
            cancelUrl: `${window.location.origin}/pricing?canceled=true`
        };

        if (!isUserAuthenticated()) {
            storeCheckoutIntent(payload);
            toast.info('Please sign in to continue your subscription.');
            navigate('/login', { state: { from: '/pricing', resumeCheckout: true } });
            return;
        }

        setLoading(true);
        try {
            const result = await createCheckoutSession(payload);
            if (result.url) {
                window.location.href = result.url;
            } else if (result.error) {
                toast.error(result.error);
            } else {
                toast.error('Failed to start checkout');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContentPage
            title={t('pricing.title', 'Simple, One-Plan Pricing')}
            subtitle={t('pricing.subtitle', 'Everything you need for one flat monthly fee')}
        >
            <div style={{ maxWidth: '600px', margin: '40px auto' }}>
                <div className={classes.planCard} style={{ textAlign: 'center' }}>
                    <div className={classes.badge}>Most Popular</div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Pro Plan</h2>
                    <div className={classes.price} style={{ fontSize: '3rem', margin: '20px 0' }}>
                        {formatPrice(priceConfig)}
                        <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>/month</span>
                    </div>

                    <div style={{ textAlign: 'left', margin: '30px 0' }}>
                        {[
                            'Unlimited campaigns',
                            'Meta & Google Ads Integration',
                            'AI-powered suggestions',
                            'Smart Rules automation',
                            'Real-time analytics',
                            'Creative library',
                            'Agency (White label) mode',
                            'Priority support'
                        ].map((feature, i) => (
                            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                                <CheckCircle2 size={20} color="#10B981" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleSubscribe}
                        disabled={loading}
                        className={classes.manageBtn}
                        style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
                    >
                        {loading ? 'Redirecting...' : 'Subscribe Now'}
                    </button>

                    <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        30-day money-back guarantee. Cancel anytime.
                    </p>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <h3>No Hidden Fees</h3>
                <p>No per-account fees, no feature gates, no surprises. You get everything.</p>
            </div>
        </ContentPage>
    );
}
