export async function onRequestGet({ request, env }) {
    const token = env.META_AD_LIBRARY_TOKEN;

    if (!token) {
        return new Response(JSON.stringify({ error: 'Meta Ad Library token não configurado.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const url = new URL(request.url);
        const searchTerm = url.searchParams.get('q') || '';
        const limitParam = parseInt(url.searchParams.get('limit') || '12', 10);
        const limit = Number.isNaN(limitParam) ? 12 : Math.min(Math.max(limitParam, 1), 50);
        const countries = url.searchParams.get('countries') || 'BR';
        const after = url.searchParams.get('after');

        const countryList = countries
            .split(',')
            .map(code => code.trim().toUpperCase())
            .filter(Boolean);

        const graphParams = new URLSearchParams({
            access_token: token,
            ad_active_status: 'ALL',
            ad_type: 'ALL',
            ad_reached_countries: JSON.stringify(countryList.length ? countryList : ['BR']),
            limit: String(limit),
            publisher_platforms: JSON.stringify(['facebook', 'instagram']),
            fields: [
                'id',
                'page_name',
                'ad_creative_body',
                'ad_creative_link_caption',
                'ad_creative_link_description',
                'ad_creative_link_title',
                'ad_snapshot_url',
                'publisher_platforms',
                'impressions{lower_bound,upper_bound}',
                'spend{lower_bound,upper_bound}',
                'ad_delivery_start_time',
                'ad_delivery_stop_time'
            ].join(',')
        });

        if (searchTerm) {
            graphParams.set('search_terms', searchTerm);
        }

        if (after) {
            graphParams.set('after', after);
        }

        const graphUrl = `https://graph.facebook.com/v18.0/ads_archive?${graphParams.toString()}`;
        const response = await fetch(graphUrl);
        const payload = await response.json();

        if (!response.ok) {
            const errorMessage = payload?.error?.message || 'Falha ao consultar a Meta Ad Library';
            return new Response(JSON.stringify({ error: errorMessage }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({
            ads: payload?.data ?? [],
            paging: payload?.paging ?? null
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
        });
    } catch (error) {
        console.error('spy-meta error:', error);
        const message = error instanceof Error ? error.message : 'Erro desconhecido ao consultar a Meta Ad Library.';
        return new Response(JSON.stringify({ error: `Meta proxy failure: ${message}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
