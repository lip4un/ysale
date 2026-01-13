export async function onRequestPost({ request, env }) {
    try {
        const { priceId, successUrl, cancelUrl } = await request.json();

        const STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;

        if (!STRIPE_SECRET_KEY) {
            return new Response(JSON.stringify({ error: 'Stripe Secret Key not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const formData = new URLSearchParams();
        formData.append('success_url', successUrl);
        formData.append('cancel_url', cancelUrl);
        formData.append('mode', 'subscription');
        formData.append('line_items[0][price]', priceId);
        formData.append('line_items[0][quantity]', '1');

        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });

        const session = await response.json();

        if (!response.ok) {
            console.error('Stripe Error:', session);
            return new Response(JSON.stringify({ error: session.error?.message || 'Failed to create checkout session' }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ url: session.url }), {
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
