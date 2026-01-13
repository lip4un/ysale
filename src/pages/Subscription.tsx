import classes from './Subscription.module.css';
import { CheckCircle2, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getPriceForRegion, formatPrice } from '../services/pricingService';

export function Subscription() {
    const { i18n } = useTranslation();
    const price = getPriceForRegion(i18n.language);

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
                    <p className={classes.nextBilling}>Next billing date: <strong>February 12, 2026</strong></p>

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
                            <span>Priority Support</span>
                        </div>
                    </div>

                    <button className={classes.manageBtn}>Manage Subscription</button>
                </div>

                <div className={classes.billingCard}>
                    <h3>Payment Method</h3>
                    <div className={classes.cardRow}>
                        <div className={classes.cardIcon}>
                            <CreditCard size={24} />
                        </div>
                        <div className={classes.cardInfo}>
                            <strong>Visa ending in 4242</strong>
                            <span>Expires 12/28</span>
                        </div>
                        <button className={classes.textBtn}>Update</button>
                    </div>

                    <h3>Billing History</h3>
                    <table className={classes.historyTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Jan 12, 2026</td>
                                <td>{formatPrice(price)}</td>
                                <td><span className={classes.paid}>Paid</span></td>
                                <td><a href="#">Download</a></td>
                            </tr>
                            <tr>
                                <td>Dec 12, 2025</td>
                                <td>{formatPrice(price)}</td>
                                <td><span className={classes.paid}>Paid</span></td>
                                <td><a href="#">Download</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
