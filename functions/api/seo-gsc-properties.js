import { fetchSearchConsole } from '../lib/gscClient.js';
import { saveSelectedProperty } from '../lib/gscStore.js';

const SITES_ENDPOINT = 'https://www.googleapis.com/webmasters/v3/sites/list';

export async function onRequestGet({ env }) {
    try {
        const response = await fetchSearchConsole(env, SITES_ENDPOINT);
        const data = await response.json();
        return new Response(JSON.stringify({ properties: data.siteEntry ?? [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
        });
    } catch (error) {
        console.error('properties gsc erro', error);
        return new Response(JSON.stringify({ error: error.message || 'Não foi possível buscar propriedades.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestPost({ request, env }) {
    try {
        const body = await request.json();
        if (!body?.siteUrl) {
            return new Response(JSON.stringify({ error: 'siteUrl é obrigatório.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        await saveSelectedProperty(env, body.siteUrl);
        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Salvar propriedade falhou', error);
        return new Response(JSON.stringify({ error: 'Não foi possível salvar a propriedade.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
