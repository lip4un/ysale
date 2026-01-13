import classes from './AudienceSegments.module.css';
import { Users, UserPlus, Search, MoreHorizontal } from 'lucide-react';

export function AudienceSegments() {
    const audiences = [
        { id: 1, name: 'All Website Visitors', size: '120,000', type: 'Custom', source: 'Website Pixel' },
        { id: 2, name: 'Purchasers (Last 30 Days)', size: '4,500', type: 'Custom', source: 'Stripe' },
        { id: 3, name: 'Lookalike 1% (Purchasers)', size: '2.4M', type: 'Lookalike', source: 'Meta Ads' },
        { id: 4, name: 'Abandoned Cart', size: '12,000', type: 'Custom', source: 'Shopify' },
        { id: 5, name: 'High Value Users (LTV > $500)', size: '850', type: 'Custom', source: 'Database' },
        { id: 6, name: 'Newsletter Subscribers', size: '45,000', type: 'Custom', source: 'Mailchimp' },
    ];

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <div>
                    <h1>Audience Segments</h1>
                    <p>Manage your custom and lookalike audiences across platforms.</p>
                </div>
                <button className={classes.primaryBtn}>
                    <UserPlus size={18} />
                    Create Audience
                </button>
            </header>

            <div className={classes.controls}>
                <div className={classes.searchGroup}>
                    <Search size={18} className={classes.searchIcon} />
                    <input type="text" placeholder="Search audiences..." className={classes.searchInput} />
                </div>
            </div>

            <div className={classes.tableCard}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Source</th>
                            <th>Estimated Size</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {audiences.map(audience => (
                            <tr key={audience.id}>
                                <td className={classes.nameCell}>
                                    <div className={classes.audienceIcon}>
                                        <Users size={16} />
                                    </div>
                                    <strong>{audience.name}</strong>
                                </td>
                                <td><span className={classes.badge}>{audience.type}</span></td>
                                <td>{audience.source}</td>
                                <td>{audience.size}</td>
                                <td>
                                    <button className={classes.actionBtn}><MoreHorizontal size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
