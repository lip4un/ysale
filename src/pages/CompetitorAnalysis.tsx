import classes from './CompetitorAnalysis.module.css';
import { Search, Globe, Instagram, Facebook, MonitorSmartphone, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

type Platform = 'meta' | 'google';

interface SpyAd {
    id: string | number;
    brand: string;
    platform: Platform;
    channel: 'facebook' | 'instagram' | 'search';
    image: string;
    activeDays: number;
    copy: string;
    spendEstimate: number;
    snapshotUrl?: string;
}

const PLATFORM_OPTIONS: Array<{ value: Platform; label: string; icon: ReactNode }> = [
    { value: 'meta', label: 'Meta Ads', icon: <Facebook size={16} /> },
    { value: 'google', label: 'Google Ads', icon: <MonitorSmartphone size={16} /> }
];

const GOOGLE_MOCK_ADS: SpyAd[] = [
    { id: 'g-1', brand: 'StrideLab', platform: 'google', channel: 'search', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', activeDays: 30, copy: 'Running shoes laboratory grade comfort.', spendEstimate: 1900 },
    { id: 'g-2', brand: 'Velocity', platform: 'google', channel: 'search', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80', activeDays: 18, copy: 'Velocity Boost - conquiste qualquer maratona.', spendEstimate: 1350 },
    { id: 'g-3', brand: 'TrailFox', platform: 'google', channel: 'search', image: 'https://images.unsplash.com/photo-1513105737059-ff0cf0580e2e?auto=format&fit=crop&w=400&q=80', activeDays: 22, copy: 'TrailFox anti-slip outsole para qualquer terreno.', spendEstimate: 990 }
];

interface MetaAdResponse {
    ads: MetaAdRaw[];
}

interface MetaAdRaw {
    id: string;
    page_name?: string;
    ad_creative_body?: string;
    ad_snapshot_url?: string;
    publisher_platforms?: string[];
    spend?: { lower_bound?: number; upper_bound?: number };
    ad_delivery_start_time?: string;
    ad_delivery_stop_time?: string;
}

export function CompetitorAnalysis() {
    const [query, setQuery] = useState('');
    const [currentSearchTerm, setCurrentSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['meta', 'google']);
    const [metaAds, setMetaAds] = useState<SpyAd[]>([]);
    const [metaLoading, setMetaLoading] = useState(false);
    const [metaError, setMetaError] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSearched(true);
        setCurrentSearchTerm(query.trim());
    };

    const togglePlatform = (value: Platform) => {
        setSelectedPlatforms(prev =>
            prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
        );
    };

    const resetFilters = () => {
        setSelectedPlatforms(['meta', 'google']);
        setQuery('');
        setHasSearched(false);
    };

    const normalizeMetaAds = useCallback((ads: MetaAdRaw[]): SpyAd[] => {
        return ads.map(ad => {
            const start = ad.ad_delivery_start_time ? new Date(ad.ad_delivery_start_time) : null;
            const end = ad.ad_delivery_stop_time ? new Date(ad.ad_delivery_stop_time) : new Date();
            const diff = start ? Math.max(1, Math.round(((end?.getTime() ?? Date.now()) - start.getTime()) / (1000 * 60 * 60 * 24))) : 0;
            const channel = (ad.publisher_platforms && ad.publisher_platforms[0]) || 'facebook';
            const spend = ad.spend?.upper_bound || ad.spend?.lower_bound || 0;

            return {
                id: ad.id,
                brand: ad.page_name || 'Meta Advertiser',
                platform: 'meta',
                channel: channel === 'instagram' ? 'instagram' : 'facebook',
                image: `https://source.unsplash.com/featured/400x400/?advertising&sig=${ad.id}`,
                activeDays: diff,
                copy: ad.ad_creative_body || 'Sem descrição disponível.',
                spendEstimate: spend,
                snapshotUrl: ad.ad_snapshot_url
            } satisfies SpyAd;
        });
    }, []);

    useEffect(() => {
        const shouldFetchMeta = hasSearched && selectedPlatforms.includes('meta');
        if (!shouldFetchMeta) {
            if (!selectedPlatforms.includes('meta')) {
                setMetaAds([]);
            }
            return;
        }

        let aborted = false;
        const fetchAds = async () => {
            setMetaLoading(true);
            setMetaError(null);
            try {
                const params = new URLSearchParams({
                    q: currentSearchTerm,
                    limit: '12',
                    countries: 'BR'
                });
                const response = await fetch(`/api/spy-meta?${params.toString()}`);
                if (!response.ok) {
                    const result = await response.json().catch(() => ({}));
                    throw new Error(result.error || 'Não foi possível carregar os anúncios Meta.');
                }
                const data = await response.json() as MetaAdResponse;
                if (!aborted) {
                    setMetaAds(normalizeMetaAds(data.ads));
                }
            } catch (error) {
                if (!aborted) {
                    setMetaError(error instanceof Error ? error.message : 'Erro inesperado ao buscar Meta Ads.');
                    setMetaAds([]);
                }
            } finally {
                if (!aborted) {
                    setMetaLoading(false);
                }
            }
        };

        void fetchAds();

        return () => {
            aborted = true;
        };
    }, [hasSearched, currentSearchTerm, selectedPlatforms, normalizeMetaAds]);

    const googleAds = useMemo(() => {
        if (!selectedPlatforms.includes('google')) {
            return [];
        }
        const normalizedQuery = currentSearchTerm.trim().toLowerCase();
        return GOOGLE_MOCK_ADS.filter(ad => {
            if (!hasSearched) {
                return true;
            }
            return ad.brand.toLowerCase().includes(normalizedQuery) || ad.copy.toLowerCase().includes(normalizedQuery);
        });
    }, [hasSearched, currentSearchTerm, selectedPlatforms]);

    const filteredAds = useMemo(() => {
        const combined: SpyAd[] = [];
        if (selectedPlatforms.includes('meta')) {
            combined.push(...metaAds);
        }
        combined.push(...googleAds);
        return combined;
    }, [metaAds, googleAds, selectedPlatforms]);

    const stats = useMemo(() => {
        if (filteredAds.length === 0) {
            return { total: 0, avgActive: 0, spend: 0 };
        }
        const total = filteredAds.length;
        const avgActive = filteredAds.reduce((sum, ad) => sum + ad.activeDays, 0) / total;
        const spend = filteredAds.reduce((sum, ad) => sum + ad.spendEstimate, 0);
        return {
            total,
            avgActive: Math.round(avgActive),
            spend
        };
    }, [filteredAds]);

    const platformBreakdown = useMemo(() => {
        return PLATFORM_OPTIONS.map(option => ({
            value: option.value,
            count: filteredAds.filter(ad => ad.platform === option.value).length
        }));
    }, [filteredAds]);

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <h1>Competitor Ad Spy</h1>
                <p>Search keywords or brands to see what ads your competitors are running.</p>
            </header>

            <div className={classes.searchContainer}>
                <form onSubmit={handleSearch} className={classes.searchForm}>
                    <Search className={classes.searchIcon} />
                    <input
                        type="text"
                        placeholder="Enter brand name or keyword (e.g., 'Sneakers')"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={classes.searchInput}
                    />
                    <button type="submit" className={classes.searchBtn}>Spy Ads</button>
                </form>
                <div className={classes.filters}>
                    <div className={classes.filterChips}>
                        {PLATFORM_OPTIONS.map(option => (
                            <button
                                type="button"
                                key={option.value}
                                onClick={() => togglePlatform(option.value)}
                                className={`${classes.chip} ${selectedPlatforms.includes(option.value) ? classes.chipActive : ''}`}
                            >
                                {option.icon}
                                {option.label}
                            </button>
                        ))}
                    </div>
                    <button type="button" className={classes.resetBtn} onClick={resetFilters}>
                        <RefreshCw size={16} />
                        Limpar filtros
                    </button>
                </div>
            </div>

            {hasSearched ? (
                <div className={classes.results}>
                    {metaLoading && (
                        <div className={classes.loadingState}>Buscando anúncios reais no Meta Ads...</div>
                    )}
                    {metaError && (
                        <p className={classes.errorMessage}>{metaError}</p>
                    )}
                    <div className={classes.statsGrid}>
                        <div className={classes.statCard}>
                            <span>Ads ativos</span>
                            <strong>{stats.total}</strong>
                        </div>
                        <div className={classes.statCard}>
                            <span>Média de dias ativos</span>
                            <strong>{stats.avgActive} dias</strong>
                        </div>
                        <div className={classes.statCard}>
                            <span>Investimento estimado</span>
                            <strong>${stats.spend.toLocaleString()}</strong>
                        </div>
                        <div className={classes.statCard}>
                            <span>Canais selecionados</span>
                            <div className={classes.platformSummary}>
                                {platformBreakdown.map(item => (
                                    <span key={item.value}>{item.value}: {item.count}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                        {filteredAds.length ? (
                        <>
                            <h3>Encontramos {filteredAds.length} anúncios ativos para "{currentSearchTerm || query || 'todas as marcas'}"</h3>
                            <div className={classes.grid}>
                                {filteredAds.map(ad => (
                                    <div key={ad.id} className={classes.card}>
                                <div className={classes.cardHeader}>
                                    <div className={classes.brandInfo}>
                                        <div className={classes.brandAvatar}>{ad.brand[0]}</div>
                                        <div>
                                            <strong>{ad.brand}</strong>
                                                    <span>{ad.platform === 'meta' ? 'Meta Ads' : 'Google Ads'} · {ad.channel}</span>
                                        </div>
                                    </div>
                                            {ad.channel === 'instagram' ? <Instagram size={18} /> : ad.platform === 'meta' ? <Facebook size={18} /> : <MonitorSmartphone size={18} />}
                                </div>

                                <div className={classes.media}>
                                    <img src={ad.image} alt={ad.brand} />
                                </div>

                                <div className={classes.cardBody}>
                                    <p>{ad.copy}</p>
                                </div>

                                <div className={classes.cardFooter}>
                                            <span className={classes.activeBadge}>Ativo há {ad.activeDays} dias</span>
                                            <span className={classes.spendBadge}>${ad.spendEstimate.toLocaleString()}</span>
                                            {ad.snapshotUrl ? (
                                                <a
                                                    className={classes.detailsBtn}
                                                    href={ad.snapshotUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Ver no Meta
                                                </a>
                                            ) : (
                                                <button className={classes.detailsBtn}>Ver criativo</button>
                                            )}
                                </div>
                            </div>
                        ))}
                    </div>
                        </>
                    ) : (
                        <div className={classes.emptyState}>
                            <div className={classes.emptyIcon}><Globe size={48} /></div>
                            <h3>Nenhum anúncio com esses filtros</h3>
                            <p>Tente outro termo ou reative algum canal.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className={classes.emptyState}>
                    <div className={classes.emptyIcon}><Globe size={48} /></div>
                    <h3>Discover Winning Strategies</h3>
                    <p>Enter a competitor's name above to see their creative history.</p>
                </div>
            )}
        </div>
    );
}
