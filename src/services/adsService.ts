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

export const getCampaigns = async (): Promise<Campaign[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_CAMPAIGNS), 800);
    });
};

export const getCampaignStats = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            totalImpressions: '2.4M',
            totalClicks: '89.2K',
            totalConversions: '3.2K',
            totalRoas: '4.2x'
        }), 600);
    });
};
