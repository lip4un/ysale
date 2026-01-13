import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BarChart2, MousePointer2, ShoppingCart, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import classes from './CampaignDetails.module.css';

export function CampaignDetails() {
    const { id } = useParams();

    // Mock data for specific campaign
    const data = [
        { name: 'Mon', clicks: 120, conversions: 5, cost: 50 },
        { name: 'Tue', clicks: 132, conversions: 8, cost: 55 },
        { name: 'Wed', clicks: 101, conversions: 4, cost: 40 },
        { name: 'Thu', clicks: 134, conversions: 6, cost: 60 },
        { name: 'Fri', clicks: 190, conversions: 12, cost: 80 },
        { name: 'Sat', clicks: 230, conversions: 15, cost: 100 },
        { name: 'Sun', clicks: 210, conversions: 14, cost: 95 },
    ];

    return (
        <div className={classes.wrapper}>
            <Link to="/dashboard/campaigns" className={classes.backLink}>
                <ArrowLeft size={16} /> Back to Campaigns
            </Link>

            <header className={classes.header}>
                <div className={classes.titleGroup}>
                    <h1>Summer Sale - Search {id}</h1>
                    <span className={classes.badge}>Active</span>
                </div>
                <p>Google Ads • Search Network</p>
            </header>

            <div className={classes.kpiGrid}>
                <div className={classes.kpiCard}>
                    <div className={classes.iconBox} style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                        <BarChart2 size={20} />
                    </div>
                    <div>
                        <span>Impressions</span>
                        <strong>45,000</strong>
                    </div>
                </div>
                <div className={classes.kpiCard}>
                    <div className={classes.iconBox} style={{ background: '#ECFDF5', color: '#10B981' }}>
                        <MousePointer2 size={20} />
                    </div>
                    <div>
                        <span>Clicks</span>
                        <strong>1,200</strong>
                    </div>
                </div>
                <div className={classes.kpiCard}>
                    <div className={classes.iconBox} style={{ background: '#FFFBEB', color: '#F59E0B' }}>
                        <ShoppingCart size={20} />
                    </div>
                    <div>
                        <span>Conversions</span>
                        <strong>85</strong>
                    </div>
                </div>
                <div className={classes.kpiCard}>
                    <div className={classes.iconBox} style={{ background: '#F5F3FF', color: '#8B5CF6' }}>
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <span>Cost / Conv.</span>
                        <strong>$12.50</strong>
                    </div>
                </div>
            </div>

            <div className={classes.chartSection}>
                <h3>Performance Over Time (Clicks vs Conversions)</h3>
                <div className={classes.chartContainer}>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#3B82F6" strokeWidth={2} />
                            <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className={classes.detailsGrid}>
                <div className={classes.detailsCard}>
                    <h3>Targeting</h3>
                    <ul>
                        <li><strong>Locations:</strong> United States, Canada</li>
                        <li><strong>Languages:</strong> English, Spanish</li>
                        <li><strong>Devices:</strong> Mobile, Desktop</li>
                    </ul>
                </div>
                <div className={classes.detailsCard}>
                    <h3>Budget & Bidding</h3>
                    <ul>
                        <li><strong>Daily Budget:</strong> $50.00</li>
                        <li><strong>Strategy:</strong> Maximize Conversions</li>
                        <li><strong>Total Spend:</strong> $1,450.00</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
