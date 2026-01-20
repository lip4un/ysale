import { decryptPayload, encryptPayload } from './crypto.js';

const TOKEN_KEY = 'gsc:token';
const PROPERTY_KEY = 'gsc:property';
const STATE_PREFIX = 'gsc:state:';

function ensureSecret(env) {
    if (!env.GSC_TOKEN_SECRET) {
        throw new Error('GSC_TOKEN_SECRET não configurado.');
    }
    if (!env.GSC_TOKENS) {
        throw new Error('Binding KV "GSC_TOKENS" não configurado.');
    }
}

export async function saveToken(env, tokenData) {
    ensureSecret(env);
    const payload = await encryptPayload(env.GSC_TOKEN_SECRET, tokenData);
    await env.GSC_TOKENS.put(TOKEN_KEY, payload);
}

export async function getToken(env) {
    ensureSecret(env);
    const payload = await env.GSC_TOKENS.get(TOKEN_KEY);
    if (!payload) {
        return null;
    }
    const decoded = await decryptPayload(env.GSC_TOKEN_SECRET, payload);
    return JSON.parse(decoded);
}

export async function clearToken(env) {
    if (env.GSC_TOKENS) {
        await env.GSC_TOKENS.delete(TOKEN_KEY);
    }
}

export async function storeState(env, state) {
    if (!env.GSC_TOKENS) {
        return;
    }
    await env.GSC_TOKENS.put(`${STATE_PREFIX}${state}`, '1', { expirationTtl: 600 });
}

export async function validateState(env, state) {
    if (!env.GSC_TOKENS) {
        return false;
    }
    const key = `${STATE_PREFIX}${state}`;
    const value = await env.GSC_TOKENS.get(key);
    if (value) {
        await env.GSC_TOKENS.delete(key);
        return true;
    }
    return false;
}

export async function saveSelectedProperty(env, siteUrl) {
    ensureSecret(env);
    const payload = await encryptPayload(env.GSC_TOKEN_SECRET, JSON.stringify({ siteUrl }));
    await env.GSC_TOKENS.put(PROPERTY_KEY, payload);
}

export async function getSelectedProperty(env) {
    if (!env.GSC_TOKENS) {
        return null;
    }
    const payload = await env.GSC_TOKENS.get(PROPERTY_KEY);
    if (!payload) {
        return null;
    }
    const decoded = await decryptPayload(env.GSC_TOKEN_SECRET, payload);
    const data = JSON.parse(decoded);
    return data.siteUrl || null;
}

export async function clearSelectedProperty(env) {
    if (env.GSC_TOKENS) {
        await env.GSC_TOKENS.delete(PROPERTY_KEY);
    }
}
