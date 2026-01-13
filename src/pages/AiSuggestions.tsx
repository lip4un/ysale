import classes from './AiSuggestions.module.css';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function AiSuggestions() {
    const suggestions = [
        {
            id: 1,
            type: 'opportunity',
            title: 'Increase budget on "Summer Sale"',
            description: 'This campaign has a ROAS of 4.2x (high). Increasing daily budget by 20% could generate 150 more conversions.',
            impact: 'High Impact',
            icon: <TrendingUp size={24} color="#10B981" />
        },
        {
            id: 2,
            type: 'warning',
            title: 'High CPL on "Display Retargeting"',
            description: 'Cost per Lead is 40% higher than average. Consider pausing underperforming ads or refreshing creatives.',
            impact: 'Medium Impact',
            icon: <AlertTriangle size={24} color="#F59E0B" />
        },
        {
            id: 3,
            type: 'success',
            title: 'Audience Optimization Ready',
            description: 'We found a new lookalike audience that matches your best converters perfectly.',
            impact: 'High Impact',
            icon: <CheckCircle2 size={24} color="#3B82F6" />
        }
    ];

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <div className={classes.titleGroup}>
                    <Sparkles size={28} color="#8B5CF6" />
                    <h1>AI Recommendations</h1>
                </div>
                <p>Smart insights powered by artificial intelligence to boost your ROI.</p>
            </header>

            <div className={classes.grid}>
                {suggestions.map(item => (
                    <div key={item.id} className={classes.card}>
                        <div className={classes.iconBox}>
                            {item.icon}
                        </div>
                        <div className={classes.content}>
                            <div className={classes.cardHeader}>
                                <h3>{item.title}</h3>
                                <span className={classes.badge}>{item.impact}</span>
                            </div>
                            <p>{item.description}</p>
                            <button className={classes.actionBtn}>Apply Recommendation</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
