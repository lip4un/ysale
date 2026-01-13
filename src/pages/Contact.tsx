import { ContentPage } from '../layouts/ContentPage';

export function Contact() {
    return (
        <ContentPage
            title="Contact Us"
            subtitle="Get in touch with our team"
        >
            <h2>Support</h2>
            <p>For technical support and product questions:<br />
                📧 <a href="mailto:support@ysale.com">support@ysale.com</a></p>

            <h2>Sales</h2>
            <p>Interested in ySale for your agency?<br />
                📧 <a href="mailto:sales@ysale.com">sales@ysale.com</a></p>

            <h2>Press & Media</h2>
            <p>Media inquiries and press requests:<br />
                📧 <a href="mailto:press@ysale.com">press@ysale.com</a></p>

            <h2>General Inquiries</h2>
            <p>Everything else:<br />
                📧 <a href="mailto:hello@ysale.com">hello@ysale.com</a></p>

            <h2>Office Hours</h2>
            <p>Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                We typically respond within 24 hours.</p>
        </ContentPage>
    );
}
