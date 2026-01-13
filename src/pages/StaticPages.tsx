import { ContentPage } from '../layouts/ContentPage';

const simplePlaceholderPages = {
    Integrations: 'Connect ySale with your favorite tools and platforms',
    Changelog: 'Product updates and new features',
    Careers: 'Join our team and help build the future of ad management',
    Guides: 'Step-by-step tutorials and best practices',
    Support: 'Get help from our support team',
    APIReference: 'Developer documentation for our API',
    GDPR: 'How we comply with GDPR regulations'
};

export function Integrations() {
    return (
        <ContentPage title="Integrations" subtitle={simplePlaceholderPages.Integrations}>
            <h2>Current Integrations</h2>
            <ul>
                <li><strong>Meta Ads</strong> - Full integration with Facebook & Instagram ads</li>
                <li><strong>Google Ads</strong> - Complete Google Ads management</li>
            </ul>
            <h2>Coming Soon</h2>
            <ul>
                <li>TikTok Ads</li>
                <li>LinkedIn Ads</li>
                <li>Slack notifications</li>
                <li>Zapier integration</li>
            </ul>
        </ContentPage>
    );
}

export function Changelog() {
    return (
        <ContentPage title="Changelog" subtitle={simplePlaceholderPages.Changelog}>
            <h2>Version 1.0.0 - January 2024</h2>
            <ul>
                <li>🎉 Initial launch</li>
                <li>✅ Meta Ads integration</li>
                <li>✅ Google Ads integration</li>
                <li>✅ Smart Rules automation</li>
                <li>✅ AI-powered suggestions</li>
                <li>✅ Dark mode</li>
                <li>✅ White label mode</li>
            </ul>
        </ContentPage>
    );
}

export function Careers() {
    return (
        <ContentPage title="Careers" subtitle={simplePlaceholderPages.Careers}>
            <h2>Open Positions</h2>
            <p>We're currently a small team, but we're growing! Check back soon for open positions.</p>
            <p>Interested in working with us? Send your resume to careers@ysale.com</p>
        </ContentPage>
    );
}

export function Guides() {
    return (
        <ContentPage title="Guides" subtitle={simplePlaceholderPages.Guides}>
            <h2>Getting Started Guide</h2>
            <p>See our Documentation page for a comprehensive getting started guide.</p>
            <h2>Best Practices</h2>
            <ul>
                <li>Set up Smart Rules to automate repetitive tasks</li>
                <li>Review AI suggestions daily</li>
                <li>Monitor your campaigns in real-time</li>
                <li>Use the Creative Library to organize assets</li>
            </ul>
        </ContentPage>
    );
}

export function Support() {
    return (
        <ContentPage title="Support" subtitle={simplePlaceholderPages.Support}>
            <h2>Need Help?</h2>
            <p>📧 <strong>Email:</strong> support@ysale.com</p>
            <p>⏰ <strong>Response Time:</strong> Usually within 24 hours</p>
            <h2>Resources</h2>
            <ul>
                <li>Check our Documentation</li>
                <li>Read our Guides</li>
                <li>View FAQs on the homepage</li>
            </ul>
        </ContentPage>
    );
}

export function APIReference() {
    return (
        <ContentPage title="API Reference" subtitle={simplePlaceholderPages.APIReference}>
            <h2>Coming Soon</h2>
            <p>We're working on a public API. Interested in early access? Email api@ysale.com</p>
        </ContentPage>
    );
}

export function GDPR() {
    return (
        <ContentPage title="GDPR Compliance" subtitle={simplePlaceholderPages.GDPR}>
            <h2>Data Protection</h2>
            <p>ySale is fully compliant with GDPR regulations. We:</p>
            <ul>
                <li>Only collect data necessary for our service</li>
                <li>Use encryption for all data storage and transmission</li>
                <li>Allow you to export or delete your data at any time</li>
                <li>Never sell your data to third parties</li>
            </ul>
            <h2>Your Rights</h2>
            <ul>
                <li>Right to access your data</li>
                <li>Right to rectification</li>
                <li>Right to erasure (right to be forgotten)</li>
                <li>Right to data portability</li>
            </ul>
            <p>To exercise any of these rights, contact privacy@ysale.com</p>
        </ContentPage>
    );
}
