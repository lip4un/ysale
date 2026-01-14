import classes from './Subscription.module.css';
import { CheckCircle2, CreditCard, ExternalLink, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getPriceForRegion, formatPrice } from '../services/pricingService';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSearchParams, useNavigate } from 'react-router-dom';

export function Subscription() {
    const { i18n } = useTranslation();
    const { subscription } = useAppContext();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const price = getPriceForRegion(i18n.language);

    useEffect(() => {
        if (searchParams.get('success') === 'true') {
            toast.success('Assinatura confirmada! Bem-vindo ao Pro.');
            // En um app real, aqui verificaríamos a API antes de mudar o estado local
        }
    }, [searchParams]);

    if (!subscription.active) {
        return (
            <div className={classes.wrapper}>
                <div className={classes.emptyState}>
                    <div className={classes.emptyIcon}>
                        <Zap size={48} color="var(--color-accent)" />
                    </div>
                    <h1>Upgrade para o Pro</h1>
                    <p>Desbloqueie automação, sugestões de IA e relatórios ilimitados.</p>
                    <button
                        className={classes.manageBtn}
                        onClick={() => navigate('/pricing')}
                        style={{ padding: '12px 24px', fontSize: '1.1rem' }}
                    >
                        Ver Planos
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <h1>Subscription</h1>
                <p>Manage your plan and billing details.</p>
            </header>

            <div className={classes.content}>
                <div className={classes.planCard}>
                    <div className={classes.badge}>Current Plan</div>
                    <h2>Pro Plan</h2>
                    <div className={classes.price}>
                        {formatPrice(price)}
                        <span>/month</span>
                    </div>
                    <p className={classes.nextBilling}>Status: <strong style={{ color: '#10B981' }}>Active</strong></p>

                    <div className={classes.features}>
                        <div className={classes.feature}>
                            <CheckCircle2 size={18} color="#10B981" />
                            <span>Unlimited Campaigns</span>
                        </div>
                        <div className={classes.feature}>
                            <CheckCircle2 size={18} color="#10B981" />
                            <span>AI Recommendations</span>
                        </div>
                        <div className={classes.feature}>
                            <CheckCircle2 size={18} color="#10B981" />
                            <span>Agency Mode Active</span>
                        </div>
                    </div>

                    <button 
                        className={classes.manageBtn}
                        onClick={() => {
                            // Redireciona para o portal de gerenciamento do Stripe
                            window.location.href = 'https://billing.stripe.com/p/login/1QkVj2LLBW0D1DzA00';
                        }}
                    >
                        <ExternalLink size={18} />
                        Gerenciar no Stripe
                    </button>
                </div>

                <div className={classes.billingCard}>
                    <h3>Payment Method</h3>
                    <div className={classes.cardRow}>
                        <div className={classes.cardIcon}>
                            <CreditCard size={24} />
                        </div>
                        <div className={classes.cardInfo}>
                            <strong>Cartão cadastrado</strong>
                            <span>Cobrança mensal automática</span>
                        </div>
                    </div>

                    <h3>Dúvidas sobre cobrança?</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                        Se você precisar de uma nota fiscal ou quiser mudar o método de pagamento, clique em "Gerenciar no Stripe" acima.
                    </p>
                </div>
            </div>
        </div>
    );
}
