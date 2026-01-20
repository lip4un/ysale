import { clearToken, clearSelectedProperty } from '../lib/gscStore.js';

export async function onRequestPost({ env }) {
    try {
        await Promise.all([clearToken(env), clearSelectedProperty(env)]);
        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Falha ao desconectar GSC', error);
        return new Response(JSON.stringify({ error: 'Não foi possível desconectar.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
