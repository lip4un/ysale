import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Eye, MousePointer2, ShoppingCart, TrendingUp, Download, Share2, Monitor, Minimize2 } from 'lucide-react';
import classes from './DashboardHome.module.css';
import { DateRangePicker } from '../components/DateRangePicker';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Skeleton } from '../components/Skeleton';
import { toast } from 'sonner';
import { useAppContext } from '../context/AppContext';

export function DashboardHome() {
    const { t } = useTranslation();
    const { getFilteredCampaigns, loading } = useAppContext();
    const campaigns = getFilteredCampaigns();
    const [isTvMode, setIsTvMode] = useState(false);

    // Aggregated stats based on active campaigns
    const kpis = useMemo(() => {
        const totals = campaigns.reduce((acc, c) => ({
            impressions: acc.impressions + c.impressions,
            clicks: acc.clicks + c.clicks,
            conversions: acc.conversions + c.conversions,
            spend: acc.spend + (c.status === 'active' ? c.spend : 0),
        }), { impressions: 0, clicks: 0, conversions: 0, spend: 0 });

        const roasValue = totals.spend > 0 ? (totals.conversions * 50 / totals.spend) : 0;

        return [
            {
                label: t('dashboard.kpi.impressions'),
                value: totals.impressions,
                formatted: (totals.impressions / 1000).toFixed(1) + 'K',
                trend: '+12%',
                icon: <Eye size={20} color={isTvMode ? '#93C5FD' : "#3B82F6"} />,
                bg: isTvMode ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF'
            },
            {
                label: t('dashboard.kpi.clicks'),
                value: totals.clicks,
                formatted: (totals.clicks / 1000).toFixed(1) + 'K',
                trend: '+8%',
                icon: <MousePointer2 size={20} color={isTvMode ? '#6EE7B7' : "#10B981"} />,
                bg: isTvMode ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5'
            },
            {
                label: t('dashboard.kpi.conversions'),
                value: totals.conversions,
                formatted: totals.conversions.toLocaleString(),
                trend: '+24%',
                icon: <ShoppingCart size={20} color={isTvMode ? '#FCD34D' : "#F59E0B"} />,
                bg: isTvMode ? 'rgba(245, 158, 11, 0.2)' : '#FFFBEB'
            },
            {
                label: t('dashboard.kpi.roas'),
                value: roasValue,
                isFloat: true,
                trend: '+18%',
                icon: <TrendingUp size={20} color={isTvMode ? '#C4B5FD' : "#8B5CF6"} />,
                bg: isTvMode ? 'rgba(139, 92, 246, 0.2)' : '#F5F3FF'
            }
        ];
    }, [campaigns, isTvMode, t]);

    const chartData = useMemo(() => {
        const hasGoogle = campaigns.some(c => c.platform === 'google' && c.status === 'active');
        const hasMeta = campaigns.some(c => c.platform === 'meta' && c.status === 'active');

        return [
            { name: 'Mon', google: hasGoogle ? 4000 : 0, meta: hasMeta ? 2400 : 0 },
            { name: 'Tue', google: hasGoogle ? 3000 : 0, meta: hasMeta ? 1398 : 0 },
            { name: 'Wed', google: hasGoogle ? 2000 : 0, meta: hasMeta ? 9800 : 0 },
            { name: 'Thu', google: hasGoogle ? 2780 : 0, meta: hasMeta ? 3908 : 0 },
            { name: 'Fri', google: hasGoogle ? 1890 : 0, meta: hasMeta ? 4800 : 0 },
            { name: 'Sat', google: hasGoogle ? 2390 : 0, meta: hasMeta ? 3800 : 0 },
            { name: 'Sun', google: hasGoogle ? 3490 : 0, meta: hasMeta ? 4300 : 0 },
        ];
    }, [campaigns]);

    const toggleTvMode = () => {
        setIsTvMode(!isTvMode);
    };

    const handleExport = () => {
        toast.success("Export started", { description: "Your CSV report will be ready in a moment." });
    };

    const handleShare = () => {
        toast.info("Link copied", { description: "Dashboard link copied to clipboard." });
    };

    if (loading) {
        return (
            <div className={classes.wrapper}>
                <header className={classes.header}>
                    <div>
                        <Skeleton width={200} height={32} style={{ marginBottom: 8 }} />
                        <Skeleton width={300} height={20} />
                    </div>
                </header>
                <div className={classes.kpiGrid}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={classes.kpiCard}>
                            <Skeleton width={40} height={40} borderRadius={8} />
                            <div style={{ flex: 1, marginLeft: 16 }}>
                                <Skeleton width={100} height={16} style={{ marginBottom: 8 }} />
                                <Skeleton width={80} height={32} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`${classes.wrapper} ${isTvMode ? classes.tvMode : ''}`}>
            <header className={classes.header}>
                <div>
                    <h1>
                        {t('dashboard.welcome')}
                        {isTvMode && <span className={classes.liveBadge}>● LIVE</span>}
                    </h1>
                    <p>{t('dashboard.subtitle')}</p>
                </div>

                <div className={classes.headerControls}>
                    {!isTvMode && (
                        <>
                            <DateRangePicker />
                            <button className={classes.iconBtn} title="Export CSV" onClick={handleExport}>
                                <Download size={18} />
                            </button>
                            <button className={classes.iconBtn} title="Share Report" onClick={handleShare}>
                                <Share2 size={18} />
                            </button>
                        </>
                    )}
                    <button
                        className={`${classes.iconBtn} ${isTvMode ? classes.tvBtn : ''}`}
                        onClick={toggleTvMode}
                        title={isTvMode ? "Exit TV Mode" : "TV Mode"}
                    >
                        {isTvMode ? <Minimize2 size={18} /> : <Monitor size={18} />}
                    </button>
                </div>
            </header>

            <div className={classes.kpiGrid}>
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={i}
                        className={classes.kpiCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className={classes.kpiIcon} style={{ backgroundColor: kpi.bg }}>
                            {kpi.icon}
                        </div>
                        <div className={classes.kpiContent}>
                            <span className={classes.kpiLabel}>{kpi.label}</span>
                            <div className={classes.kpiValueRow}>
                                <strong>
                                    <CountUp
                                        end={kpi.value}
                                        decimals={kpi.isFloat ? 2 : 0}
                                        separator=","
                                        duration={2.5}
                                        suffix={kpi.isFloat ? 'x' : ''}
                                    />
                                </strong>
                                <span className={classes.trend}>{kpi.trend}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className={classes.chartsSection}>
                <motion.div
                    className={classes.chartCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3>Weekly Performance</h3>
                    <div className={classes.chartContainer}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isTvMode ? "#334155" : "#e5e7eb"} />
                                <XAxis dataKey="name" stroke={isTvMode ? "#94A3B8" : "#666"} />
                                <YAxis stroke={isTvMode ? "#94A3B8" : "#666"} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isTvMode ? '#1E293B' : '#fff',
                                        borderColor: isTvMode ? '#334155' : '#ccc',
                                        color: isTvMode ? '#fff' : '#000'
                                    }}
                                />
                                <Bar dataKey="google" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="meta" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
