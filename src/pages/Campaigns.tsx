import { useState } from 'react';
import type { Campaign } from '../services/adsService';
import classes from './Campaigns.module.css';
import { Filter, Search, MoreHorizontal, PlayCircle, PauseCircle, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export function Campaigns() {
    const navigate = useNavigate();
    const { getFilteredCampaigns, toggleCampaignStatus, loading } = useAppContext();
    const campaigns = getFilteredCampaigns();
    const [sortField, setSortField] = useState<keyof Campaign>('spend');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const handleSort = (field: keyof Campaign) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const sortedCampaigns = [...campaigns].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const SortIcon = ({ field }: { field: keyof Campaign }) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
    };

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <div>
                    <h1>Campanhas</h1>
                    <p>Gerencie e analise suas campanhas de anúncios</p>
                </div>
                <button
                    className={classes.newBtn}
                    onClick={() => navigate('/dashboard/manager')}
                >
                    + Nova Campanha
                </button>
            </header>

            <div className={classes.controls}>
                <div className={classes.searchGroup}>
                    <Search size={18} className={classes.searchIcon} />
                    <input type="text" placeholder="Buscar campanhas..." className={classes.searchInput} />
                </div>

                <div className={classes.actions}>
                    <button className={classes.filterBtn}>
                        <Filter size={18} />
                        Todas
                    </button>
                    <button className={classes.filterBtn}>Todos</button>
                </div>
            </div>

            <div className={classes.tableCard}>
                {loading ? (
                    <div className={classes.loading}>Carregando campanhas...</div>
                ) : (
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('name')} className={classes.sortable}>
                                    Campanha <SortIcon field="name" />
                                </th>
                                <th>Plataforma</th>
                                <th>Status</th>
                                <th onClick={() => handleSort('impressions')} className={classes.sortable}>Impressões <SortIcon field="impressions" /></th>
                                <th onClick={() => handleSort('clicks')} className={classes.sortable}>Cliques <SortIcon field="clicks" /></th>
                                <th onClick={() => handleSort('conversions')} className={classes.sortable}>Conversões <SortIcon field="conversions" /></th>
                                <th onClick={() => handleSort('spend')} className={classes.sortable}>Gasto <SortIcon field="spend" /></th>
                                <th onClick={() => handleSort('ctr')} className={classes.sortable}>CTR <SortIcon field="ctr" /></th>
                                <th onClick={() => handleSort('roas')} className={classes.sortable}>ROAS <SortIcon field="roas" /></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedCampaigns.map(campaign => (
                                <tr
                                    key={campaign.id}
                                    onClick={() => navigate(`/dashboard/campaigns/${campaign.id}`)}
                                    className={classes.row}
                                >
                                    <td className={classes.nameCell}>
                                        <strong>{campaign.name}</strong>
                                    </td>
                                    <td>
                                        <span className={clsx(classes.badge, campaign.platform === 'google' ? classes.google : classes.meta)}>
                                            {campaign.platform === 'google' ? 'Google Ads' : 'Meta Ads'}
                                        </span>
                                    </td>
                                    <td>
                                        <div
                                            className={classes.status}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCampaignStatus(campaign.id);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {campaign.status === 'active' ? <PlayCircle size={16} color="#10B981" /> : <PauseCircle size={16} color="#94A3B8" />}
                                            <span style={{ textTransform: 'capitalize' }}>{campaign.status}</span>
                                        </div>
                                    </td>
                                    <td>{campaign.impressions.toLocaleString()}</td>
                                    <td>{campaign.clicks.toLocaleString()}</td>
                                    <td>{campaign.conversions.toLocaleString()}</td>
                                    <td>{campaign.spend.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{campaign.ctr}%</td>
                                    <td className={clsx(campaign.roas >= 4 ? classes.good : campaign.roas >= 2 ? classes.ok : classes.bad)}>
                                        {campaign.roas}x
                                    </td>
                                    <td>
                                        <button className={classes.actionBtn}>
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {sortedCampaigns.length === 0 && (
                                <tr>
                                    <td colSpan={10} className={classes.empty}>Nenhuma campanha encontrada</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
