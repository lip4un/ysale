import { ContentPage } from '../layouts/ContentPage';

export function Documentation() {
    return (
        <ContentPage
            title="Documentation"
            subtitle="Learn how to use ySale"
        >
            <h2>Getting Started</h2>
            <p>New to ySale? Start here:</p>
            <ul>
                <li>Create your account</li>
                <li>Connect your ad platforms (Meta & Google)</li>
                <li>Import your campaigns</li>
                <li>Start optimizing!</li>
            </ul>

            <h2>Connecting Ad Platforms</h2>
            <h3>Meta Ads (Facebook & Instagram)</h3>
            <p>Go to Settings → Connect Accounts → Meta Ads. Click "Connect" and authorize ySale to access your ad accounts.</p>

            <h3>Google Ads</h3>
            <p>Go to Settings → Connect Accounts → Google Ads. Sign in with your Google account and select the ad accounts you want to manage.</p>

            <h2>Using Smart Rules</h2>
            <p>Smart Rules allow you to automate campaign optimizations:</p>
            <ol>
                <li>Go to Smart Rules in the sidebar</li>
                <li>Click "Create New Rule"</li>
                <li>Set your condition (IF metric operator value)</li>
                <li>Choose your action (THEN pause/adjust/notify)</li>
                <li>Save and activate your rule</li>
            </ol>

            <h2>Understanding AI Suggestions</h2>
            <p>Our AI analyzes your campaign performance and suggests optimizations. Review suggestions in the AI Analysis page and apply them with one click.</p>

            <h2>Need Help?</h2>
            <p>Contact our support team at support@ysale.com</p>
        </ContentPage>
    );
}
