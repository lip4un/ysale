import { ContentPage } from '../layouts/ContentPage';

export function PrivacyPolicy() {
    return (
        <ContentPage
            title="Privacy Policy"
            subtitle="How we protect and use your data"
        >
            <p><em>Last updated: January 2024</em></p>

            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us when you create an account, connect your ad platforms, and use our services. This includes:</p>
            <ul>
                <li>Account information (name, email, password)</li>
                <li>Campaign data from Meta and Google Ads</li>
                <li>Usage analytics to improve our product</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
                <li>Provide and improve our services</li>
                <li>Generate AI-powered recommendations</li>
                <li>Send you important updates (with your permission)</li>
                <li>Ensure platform security</li>
            </ul>

            <h2>Data Security</h2>
            <p>We use industry-standard encryption (SSL/TLS) to protect your data in transit and at rest. We only access your ad platform data through official APIs and never store your passwords.</p>

            <h2>Third-Party Services</h2>
            <p>We integrate with Meta Ads and Google Ads using their official APIs. We do not sell your data to third parties.</p>

            <h2 id="deletion">Data Deletion Instructions</h2>
            <p>To delete your data from ySale, you can:</p>
            <ul>
                <li>Disconnect your accounts in the "Connect" section of the Dashboard.</li>
                <li>Request account deletion by emailing us at <strong>privacy@ysale.com</strong>.</li>
            </ul>
            <p>Once requested, your data will be permanently removed from our servers within 30 days.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, contact us at <strong>privacy@ysale.com</strong></p>
        </ContentPage>
    );
}
