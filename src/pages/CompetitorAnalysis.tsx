import classes from './CompetitorAnalysis.module.css';
import { Search, Globe, Instagram, Facebook, MonitorSmartphone, RefreshCw } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';

type Platform = 'meta' | 'google';

interface SpyAd {
    id: number;
    brand: string;
    platform: Platform;
    channel: 'facebook' | 'instagram' | 'search';
    image: string;
    activeDays: number;
    copy: string;
    spendEstimate: number;
}

const PLATFORM_OPTIONS: Array<{ value: Platform; label: string; icon: ReactNode }> = [
    { value: 'meta', label: 'Meta Ads', icon: <Facebook size={16} /> },
    { value: 'google', label: 'Google Ads', icon: <MonitorSmartphone size={16} /> }
];

const MOCK_ADS: SpyAd[] = [
    { id: 1, brand: 'SneakerHead', platform: 'meta', channel: 'instagram', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80', activeDays: 45, copy: 'Summer sale is ON! Get 50% off on all running shoes.', spendEstimate: 2800 },
    { id: 2, brand: 'RunFast', platform: 'meta', channel: 'facebook', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', activeDays: 12, copy: 'The lightest shoe ever made. Pre-order now.', spendEstimate: 1100 },
    { id: 3, brand: 'UrbanWalk', platform: 'meta', channel: 'instagram', image: 'https://images.unsplash.com/photo-1560769629-975e13b51862?auto=format&fit=crop&w=400&q=80', activeDays: 8, copy: 'Walk in style. New collection dropped.', spendEstimate: 750 },
    { id: 4, brand: 'StrideLab', platform: 'google', channel: 'search', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', activeDays: 30, copy: 'Running shoes laboratory grade comfort.', spendEstimate: 1900 },
    { id: 5, brand: 'Velocity', platform: 'google', channel: 'search', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80', activeDays: 18, copy: 'Velocity Boost - conquiste qualquer maratona.', spendEstimate: 1350 },
    { id: 6, brand: 'PaceX', platform: 'meta', channel: 'facebook', image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=80', activeDays: 65, copy: 'Nova linha PaceX com amortecimento ativo.', spendEstimate: 3200 }
];

export function CompetitorAnalysis() {
    const [query, setQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['meta', 'google']);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSearched(true);
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

    const filteredAds = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return MOCK_ADS.filter(ad => {
            const matchesQuery = normalizedQuery.length === 0
                || ad.brand.toLowerCase().includes(normalizedQuery)
                || ad.copy.toLowerCase().includes(normalizedQuery);
            const matchesPlatform = selectedPlatforms.includes(ad.platform);
            return matchesQuery && matchesPlatform;
        });
    }, [query, selectedPlatforms]);

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
        return selectedPlatforms.map(value => {
            const count = filteredAds.filter(ad => ad.platform === value).length;
            return { value, count };
        });
    }, [filteredAds, selectedPlatforms]);

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
                            <h3>Encontramos {filteredAds.length} anúncios ativos para "{query || 'todas as marcas'}"</h3>
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
                                            <button className={classes.detailsBtn}>Ver criativo</button>
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
