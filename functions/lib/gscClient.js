import { getToken, saveToken, clearToken } from './gscStore.js';

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

function ensureGoogleCreds(env) {
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
        throw new Error('Credenciais do Google não configuradas.');
    }
}

export async function getValidAccessToken(env) {
    const token = await getToken(env);
    if (!token) {
        return null;
    }
    const now = Date.now();
    if (token.expiryDate && token.expiryDate - 60_000 > now) {
        return token;
    }
    if (!token.refreshToken) {
        await clearToken(env);
        return null;
    }
    const refreshed = await refreshAccessToken(env, token.refreshToken);
    if (!refreshed) {
        return null;
    }
    await saveToken(env, refreshed);
    return refreshed;
}

async function refreshAccessToken(env, refreshToken) {
    ensureGoogleCreds(env);
    const body = new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
    });
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    });
    const data = await response.json();
    if (!response.ok) {
        console.error('Falha ao renovar token GSC', data);
        return null;
    }
    return {
        accessToken: data.access_token,
        refreshToken: refreshToken,
        scope: data.scope,
        tokenType: data.token_type,
        expiryDate: Date.now() + (data.expires_in ? data.expires_in * 1000 : 0)
    };
}

export async function exchangeCodeForToken(env, code, redirectUri) {
    ensureGoogleCreds(env);
    const body = new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
    });
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    });
    const data = await response.json();
    if (!response.ok) {
        console.error('Falha na troca de código GSC', data);
        throw new Error(data.error_description || 'Não foi possível trocar o código por token.');
    }
    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        scope: data.scope,
        tokenType: data.token_type,
        expiryDate: Date.now() + (data.expires_in ? data.expires_in * 1000 : 0)
    };
}

export async function fetchSearchConsole(env, endpoint, options = {}) {
    const token = await getValidAccessToken(env);
    if (!token) {
        throw new Error('Conta GSC não conectada.');
    }
    const response = await fetch(endpoint, {
        ...options,
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    });
    if (response.status === 401) {
        await clearToken(env);
        throw new Error('Token expirado. Conecte novamente.');
    }
    return response;
}
