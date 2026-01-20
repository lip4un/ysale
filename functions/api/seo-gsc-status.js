import { getToken, getSelectedProperty } from '../lib/gscStore.js';

export async function onRequestGet({ env }) {
    try {
        const token = await getToken(env);
        const property = await getSelectedProperty(env);
        const now = Date.now();
        const expiresAt = token?.expiryDate ?? null;
        const needsReconnect = expiresAt ? expiresAt < now : false;
        return new Response(JSON.stringify({
            connected: Boolean(token),
            expiresAt,
            needsReconnect,
            property
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
        });
    } catch (error) {
        console.error('status gsc erro', error);
        return new Response(JSON.stringify({ error: 'Não foi possível carregar o status.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
