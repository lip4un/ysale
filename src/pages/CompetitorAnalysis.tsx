import classes from './CompetitorAnalysis.module.css';
import { Search, Globe, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';

export function CompetitorAnalysis() {
    const [query, setQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const mockAds = [
        { id: 1, brand: 'SneakerHead', platform: 'instagram', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80', activeDays: 45, copy: 'Summer sale is ON! Get 50% off on all running shoes.' },
        { id: 2, brand: 'RunFast', platform: 'facebook', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', activeDays: 12, copy: 'The lightest shoe ever made. Pre-order now.' },
        { id: 3, brand: 'UrbanWalk', platform: 'instagram', image: 'https://images.unsplash.com/photo-1560769629-975e13b51862?auto=format&fit=crop&w=400&q=80', activeDays: 8, copy: 'Walk in style. New collection dropped.' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSearched(true);
    };

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
            </div>

            {hasSearched ? (
                <div className={classes.results}>
                    <h3>Found {mockAds.length} active ads for "{query}"</h3>
                    <div className={classes.grid}>
                        {mockAds.map(ad => (
                            <div key={ad.id} className={classes.card}>
                                <div className={classes.cardHeader}>
                                    <div className={classes.brandInfo}>
                                        <div className={classes.brandAvatar}>{ad.brand[0]}</div>
                                        <div>
                                            <strong>{ad.brand}</strong>
                                            <span>Sponsored</span>
                                        </div>
                                    </div>
                                    {ad.platform === 'instagram' ? <Instagram size={18} /> : <Facebook size={18} />}
                                </div>

                                <div className={classes.media}>
                                    <img src={ad.image} alt={ad.brand} />
                                </div>

                                <div className={classes.cardBody}>
                                    <p>{ad.copy}</p>
                                </div>

                                <div className={classes.cardFooter}>
                                    <span className={classes.activeBadge}>Active for {ad.activeDays} days</span>
                                    <button className={classes.detailsBtn}>View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
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
