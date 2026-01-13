import { ContentPage } from '../layouts/ContentPage';
import { useTranslation } from 'react-i18next';
import { getPriceForRegion, formatPrice } from '../services/pricingService';
import { toast } from 'sonner';
import { useState } from 'react';
import classes from './Subscription.module.css'; // Reusing some card styles
import { CheckCircle2 } from 'lucide-react';

export function Pricing() {
    const { i18n, t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const priceConfig = getPriceForRegion(i18n.language);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: 'price_placeholder', // User needs to replace this
                    successUrl: `${window.location.origin}/dashboard/subscription?success=true`,
                    cancelUrl: `${window.location.origin}/pricing?canceled=true`
                })
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error(data.error || 'Failed to start checkout');
            }
        } catch (error) {
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
