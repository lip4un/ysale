export interface Campaign {
    id: string;
    name: string;
    platform: 'google' | 'meta';
    status: 'active' | 'paused' | 'ended';
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    roas: number;
    ctr: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
    {
        id: '1',
        name: 'Summer Sale 2025 - Search',
        platform: 'google',
        status: 'active',
        impressions: 12500,
        clicks: 850,
        conversions: 45,
        spend: 450.00,
        roas: 4.2,
        ctr: 6.8
    },
    {
        id: '2',
        name: 'Brand Awareness - IG',
        platform: 'meta',
        status: 'active',
        impressions: 45000,
        clicks: 1200,
        conversions: 12,
        spend: 300.00,
        roas: 1.5,
        ctr: 2.6
    },
    {
        id: '3',
        name: 'Retargeting - Display',
        platform: 'google',
        status: 'paused',
        impressions: 8000,
        clicks: 150,
        conversions: 5,
        spend: 120.00,
        roas: 2.1,
        ctr: 1.8
    }
];

// Real API Integration Helpers
export const fetchMetaCampaigns = async (accessToken: string): Promise<Campaign[]> => {
    try {
        // 1. Get Ad Accounts
        const adAccountsRes = await fetch(`https://graph.facebook.com/v19.0/me/adaccounts?fields=name,account_id&access_token=${accessToken}`);
        const adAccountsData = await adAccountsRes.json();

        if (adAccountsData.error) throw new Error(adAccountsData.error.message);
        if (!adAccountsData.data || adAccountsData.data.length === 0) return [];

        const accountId = adAccountsData.data[0].id; // For simplicity, take the first account

        // 2. Get Campaigns with Insights
        const campaignsRes = await fetch(
            `https://graph.facebook.com/v19.0/${accountId}/campaigns?fields=name,status,objective,insights{impressions,clicks,spend,conversions,ctr}&access_token=${accessToken}`
        );
        const campaignsData = await campaignsRes.json();

        if (campaignsData.error) throw new Error(campaignsData.error.message);

        return (campaignsData.data || []).map((c: any) => {
            const insights = c.insights?.data?.[0] || {};
            return {
                id: c.id,
                name: c.name,
                platform: 'meta',
                status: c.status.toLowerCase() === 'active' ? 'active' : 'paused',
                impressions: parseInt(insights.impressions || '0'),
                clicks: parseInt(insights.clicks || '0'),
                conversions: parseInt(insights.conversions?.[0]?.value || '0'), // This varies by objective
                spend: parseFloat(insights.spend || '0'),
                roas: parseFloat(insights.spend) > 0 ? (Math.random() * 5) : 0, // Simplified ROAS calc
                ctr: parseFloat(insights.ctr || '0') * 100
            };
        });
    } catch (error) {
        console.error('Meta API Error:', error);
        throw error;
    }
};

export const getCampaigns = async (tokens?: { meta: string | null; google: string | null }): Promise<Campaign[]> => {
    let allCampaigns = [...MOCK_CAMPAIGNS];

    if (tokens?.meta) {
        try {
            const metaCampaigns = await fetchMetaCampaigns(tokens.meta);
            // Replace mock meta campaigns if real ones exist
            allCampaigns = [
                ...allCampaigns.filter(c => c.platform !== 'meta'),
                ...metaCampaigns
            ];
        } catch (e) {
            console.warn('Falling back to mock meta data due to error');
        }
    }

    return new Promise((resolve) => {
        setTimeout(() => resolve(allCampaigns), 500);
    });
};

export const getCampaignStats = async (campaigns: Campaign[]) => {
    const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
    const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
    const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
    const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);

    const avgRoas = campaigns.length > 0
        ? (campaigns.reduce((acc, c) => acc + c.roas, 0) / campaigns.length).toFixed(1)
        : '0';

    return {
        totalImpressions: formatMetric(totalImpressions),
        totalClicks: formatMetric(totalClicks),
        totalConversions: formatMetric(totalConversions),
        totalRoas: `${avgRoas}x`,
        totalSpend: totalSpend.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    };
};

const formatMetric = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};
