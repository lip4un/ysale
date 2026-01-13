export async function onRequestPost({ request, env }) {
    try {
        const { email } = await request.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const SENDGRID_API_KEY = env.SENDGRID_API_KEY;

        if (!SENDGRID_API_KEY) {
            return new Response(JSON.stringify({ error: 'SendGrid API Key not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personalizations: [{
                    to: [{ email: email }]
                }],
                from: { email: 'noreply@ysale.xyz', name: 'ySale Support' },
                subject: 'Reset your ySale password',
                content: [{
                    type: 'text/html',
                    value: `
                        <div style="font-family: sans-serif; padding: 20px; color: #333;">
                            <h2>Reset your Password</h2>
                            <p>You requested a password reset for your ySale account.</p>
                            <p>Click the button below to reset your password. This link is valid for 1 hour.</p>
                            <a href="https://ysale.xyz/reset-password?token=mock_token" style="background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Reset Password</a>
                            <p>If you didn't request this, you can safely ignore this email.</p>
                            <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;" />
                            <p style="font-size: 12px; color: #666;">ySale - Advanced Ads Management</p>
                        </div>
                    `
                }]
            })
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('SendGrid Error:', error);
            return new Response(JSON.stringify({ error: 'Failed to send email' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
