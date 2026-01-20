import { storeState } from '../lib/gscStore.js';

const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

function randomState() {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequestGet({ request, env }) {
    if (!env.GOOGLE_CLIENT_ID) {
        return new Response(JSON.stringify({ error: 'GOOGLE_CLIENT_ID não configurado.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const url = new URL(request.url);
    const redirectOverride = url.searchParams.get('redirect_uri');
    const baseRedirect = env.GSC_REDIRECT_URI || `${url.origin}/api/seo-gsc-callback`;
    const redirectUri = redirectOverride || baseRedirect;

    const state = randomState();
    await storeState(env, state);

    const authUrl = new URL(AUTH_URL);
    authUrl.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', SCOPES.join(' '));
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    authUrl.searchParams.set('state', state);

    return new Response(JSON.stringify({ url: authUrl.toString(), state }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
}
