import { ContentPage } from '../layouts/ContentPage';

export function Pricing() {
    return (
        <ContentPage
            title="Pricing"
            subtitle="Simple, transparent pricing for everyone"
        >
            <h2>Pro Plan - $49/month</h2>
            <p>Everything you need to manage and optimize your ad campaigns:</p>
            <ul>
                <li>Unlimited campaigns</li>
                <li>Unlimited ad accounts</li>
                <li>AI-powered suggestions</li>
                <li>Smart Rules automation</li>
                <li>Real-time analytics</li>
                <li>Creative library</li>
                <li>Competitor analysis</li>
                <li>Priority support</li>
                <li>White label (Agency mode)</li>
            </ul>

            <h2>No Hidden Fees</h2>
            <p>That's it. No per-account fees, no feature gates, no surprises. You get everything for one simple price.</p>

            <h2>30-Day Money-Back Guarantee</h2>
            <p>Try ySale risk-free. If you're not happy within the first 30 days, we'll give you a full refund.</p>

            <h2>Enterprise</h2>
            <p>Need custom integrations or dedicated support? Contact us at enterprise@ysale.com for custom pricing.</p>
        </ContentPage>
    );
}
