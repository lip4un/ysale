import { ContentPage } from '../layouts/ContentPage';

export function CookiePolicy() {
    return (
        <ContentPage
            title="Cookie Policy"
            subtitle="How we use cookies"
        >
            <p><em>Last updated: January 2024</em></p>

            <h2>What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit websites. They help us remember your preferences and improve your experience.</p>

            <h2>Cookies We Use</h2>

            <h3>Essential Cookies</h3>
            <p>Required for the website to function properly:</p>
            <ul>
                <li>Authentication cookies (keep you logged in)</li>
                <li>Security cookies (protect against attacks)</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>Help us understand how you use the site:</p>
            <ul>
                <li>Page views and navigation patterns</li>
                <li>Feature usage statistics</li>
            </ul>

            <h3>Preference Cookies</h3>
            <p>Remember your settings:</p>
            <ul>
                <li>Language preference</li>
                <li>Dark/light mode preference</li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>You can control cookies through your browser settings. Note that disabling essential cookies may affect site functionality.</p>

            <h2>Third-Party Cookies</h2>
            <p>We do not allow third-party cookies on our platform.</p>

            <h2>Contact</h2>
            <p>Questions about cookies? Email privacy@ysale.com</p>
        </ContentPage>
    );
}
