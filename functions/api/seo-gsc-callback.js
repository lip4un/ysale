import { exchangeCodeForToken } from '../lib/gscClient.js';
import { saveToken, validateState } from '../lib/gscStore.js';

export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    if (error) {
        return renderCloseWindow(`Erro na autenticação: ${error}`);
    }

    if (!code || !state) {
        return renderCloseWindow('Código ou estado ausentes.');
    }

    const validState = await validateState(env, state);
    if (!validState) {
        return renderCloseWindow('Sessão de OAuth expirada. Tente novamente.');
    }

    try {
        const redirectUri = env.GSC_REDIRECT_URI || `${url.origin}/api/seo-gsc-callback`;
        const tokenData = await exchangeCodeForToken(env, code, redirectUri);
        await saveToken(env, tokenData);
        return renderCloseWindow(null, true);
    } catch (err) {
        console.error('Callback GSC falhou', err);
        return renderCloseWindow(err instanceof Error ? err.message : 'Erro desconhecido');
    }
}

function renderCloseWindow(message, success = false) {
    const payload = success ? '{ type: "gsc-connected" }' : `{ type: "gsc-error", message: "${message ?? 'Erro'}" }`;
    const html = `<!doctype html>
<html>
<body style="font-family: Arial, sans-serif; padding: 24px;">
    <p>${success ? 'Conexão concluída com sucesso. Você pode fechar esta janela.' : message}</p>
    <script>
        if (window.opener) {
            window.opener.postMessage(${payload}, '*');
        }
        setTimeout(() => window.close(), 1500);
    </script>
</body>
</html>`;
    return new Response(html, { status: success ? 200 : 400, headers: { 'Content-Type': 'text/html' } });
}
