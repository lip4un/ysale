import { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './SeoToolkit.module.css';
import { ShieldCheck, Activity, ServerCog, GaugeCircle, FileText, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const TABS = [
    { id: 'connect', label: 'Conectar GSC', icon: <ShieldCheck size={16} /> },
    { id: 'overview', label: 'Visão Geral', icon: <Activity size={16} /> },
    { id: 'audit', label: 'Auditoria Técnica', icon: <ServerCog size={16} /> },
    { id: 'performance', label: 'Performance', icon: <GaugeCircle size={16} /> },
    { id: 'reports', label: 'Relatórios', icon: <FileText size={16} /> }
];

const TAB_CONTENT = {
    connect: {
        title: 'Integre com o Google Search Console',
        description: 'Use OAuth seguro para conectar propriedades, armazenar tokens com criptografia e manter status de conexão sempre atualizado.',
        bullets: [
            'Fluxo OAuth2 com escopos somente leitura',
            'Seleção de propriedades verificadas pelo usuário',
            'Monitoramento de expiração + botão reconectar'
        ]
    },
    overview: {
        title: 'Overview em tempo real',
        description: 'Cards e gráficos usando dados oficiais do Search Console: impressões, cliques, CTR e posição média com seleção de período.',
        bullets: [
            'Cards de KPIs com comparação vs período anterior',
            'Gráfico com granularidade semanal/mensal',
            'Tabelas de Top Queries e Top Pages com filtros'
        ]
    },
    audit: {
        title: 'Auditoria do próprio site',
        description: 'Crawler interno respeitando robots.txt e sitemap, cobrindo até 500 URLs por varredura no MVP.',
        bullets: [
            'Validação de status codes e links quebrados',
            'Meta tags (title, description, H1, canonical)',
            'Conteúdo thin, profundidade e imagens sem alt'
        ]
    },
    performance: {
        title: 'Performance & Core Web Vitals',
        description: 'Integração com PageSpeed Insights para home e páginas prioritárias, com cache e alerta de quota.',
        bullets: [
            'Scores de Performance, Accessibility, Best Practices, SEO',
            'Core Web Vitals: LCP, CLS, INP',
            'Tabela de páginas com ranking e recomendações'
        ]
    },
    reports: {
        title: 'Relatórios compartilháveis',
        description: 'Exportação em HTML/PDF com snapshot da auditoria, métricas do GSC e PageSpeed.',
        bullets: [
            'Templates responsivos para enviar a clientes',
            'Histórico de varreduras por data',
            'Links temporários protegidos por token'
        ]
    }
} as const;

type TabId = keyof typeof TAB_CONTENT;

export function SeoToolkit() {
    const [activeTab, setActiveTab] = useState<TabId>('connect');
    const [status, setStatus] = useState({ connected: false, property: null as string | null, expiresAt: null as number | null, needsReconnect: false });
    const [statusLoading, setStatusLoading] = useState(true);
    const [properties, setProperties] = useState<Array<{ siteUrl: string; permissionLevel?: string }>>([]);
    const [propertiesLoading, setPropertiesLoading] = useState(false);
    const [savingProperty, setSavingProperty] = useState<string | null>(null);
    const [connectInFlight, setConnectInFlight] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);

    const infoContent = useMemo(() => TAB_CONTENT[activeTab], [activeTab]);

    const fetchJson = useCallback(async (input: RequestInfo | URL, init?: RequestInit) => {
        const res = await fetch(input, init);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(data.error || 'Falha ao comunicar com o servidor.');
        }
        return data;
    }, []);

    const loadStatus = useCallback(async () => {
        setStatusLoading(true);
        try {
            const data = await fetchJson('/api/seo-gsc-status');
            setStatus({
                connected: data.connected,
                property: data.property ?? null,
                expiresAt: data.expiresAt ?? null,
                needsReconnect: data.needsReconnect ?? false
            });
            return data.connected;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Não foi possível carregar o status.');
            return false;
        } finally {
            setStatusLoading(false);
        }
    }, [fetchJson]);

    const loadProperties = useCallback(async () => {
        if (!status.connected) {
            setProperties([]);
            return;
        }
        setPropertiesLoading(true);
        try {
            const data = await fetchJson('/api/seo-gsc-properties');
            setProperties(data.properties || []);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Não foi possível carregar as propriedades.');
        } finally {
            setPropertiesLoading(false);
        }
    }, [fetchJson, status.connected]);

    useEffect(() => {
        void (async () => {
            const connected = await loadStatus();
            if (connected) {
                await loadProperties();
            }
        })();
    }, [loadStatus, loadProperties]);

    useEffect(() => {
        const listener = (event: MessageEvent) => {
            if (!event.data) {
                return;
            }
            if (event.data.type === 'gsc-connected') {
                toast.success('Google Search Console conectado.');
                void loadStatus().then((connected) => {
                    if (connected) {
                        void loadProperties();
                    }
                });
            }
            if (event.data.type === 'gsc-error') {
                toast.error(event.data.message || 'Falha na autenticação GSC');
            }
        };
        window.addEventListener('message', listener);
        return () => window.removeEventListener('message', listener);
    }, [loadStatus, loadProperties]);

    const handleConnect = async () => {
        setConnectInFlight(true);
        try {
            const redirectUri = `${window.location.origin}/api/seo-gsc-callback`;
            const data = await fetchJson(`/api/seo-gsc-start?redirect_uri=${encodeURIComponent(redirectUri)}`);
            window.open(data.url, 'gsc-oauth', 'width=580,height=640');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Não foi possível iniciar o OAuth.');
        } finally {
            setConnectInFlight(false);
        }
    };

    const handleDisconnect = async () => {
        setDisconnecting(true);
        try {
            await fetchJson('/api/seo-gsc-disconnect', { method: 'POST' });
            toast.success('Conexão com o GSC removida.');
            setProperties([]);
            await loadStatus();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Não foi possível desconectar.');
        } finally {
            setDisconnecting(false);
        }
    };

    const handleSelectProperty = async (siteUrl: string) => {
        setSavingProperty(siteUrl);
        try {
            await fetchJson('/api/seo-gsc-properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ siteUrl })
            });
            toast.success('Propriedade principal atualizada.');
            setStatus((prev) => ({ ...prev, property: siteUrl }));
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Não foi possível salvar a propriedade.');
        } finally {
            setSavingProperty(null);
        }
    };

    const statusLabel = useMemo(() => {
        if (statusLoading) {
            return 'Verificando...';
        }
        if (status.connected && !status.needsReconnect) {
            return 'Conectado';
        }
        if (status.connected && status.needsReconnect) {
            return 'Token expirado';
        }
        return 'Desconectado';
    }, [status.connected, status.needsReconnect, statusLoading]);

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <div>
                    <p className={classes.superTitle}>SEO Toolkit</p>
                    <h1>Insights oficiais, sem scraping</h1>
                    <p>
                        Centralize dados do Google Search Console, auditorias internas e PageSpeed em um único módulo.
                        Este é o primeiro passo para liberar o MVP completo descrito pelo time de produto.
                    </p>
                </div>
            </header>

            <div className={classes.tabs}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        className={`${classes.tab} ${activeTab === tab.id ? classes.activeTab : ''}`}
                        onClick={() => setActiveTab(tab.id as TabId)}
                        type="button"
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'connect' ? (
                <section className={classes.panel}>
                    <div className={classes.connectionCard}>
                        <div>
                            <h2>Status da conexão</h2>
                            <p>Tokens armazenados com criptografia e renovados automaticamente.</p>
                        </div>
                        <span className={`${classes.statusBadge} ${status.connected && !status.needsReconnect ? classes.statusConnected : classes.statusDisconnected}`}>
                            {statusLabel}
                        </span>
                    </div>

                    <div className={classes.actionsRow}>
                        <button type="button" className={classes.primaryButton} onClick={handleConnect} disabled={connectInFlight}>
                            <ShieldCheck size={16} /> {connectInFlight ? 'Abrindo...' : status.connected ? 'Reconectar' : 'Conectar GSC'}
                        </button>
                        {status.connected && (
                            <button type="button" className={classes.secondaryButton} onClick={handleDisconnect} disabled={disconnecting}>
                                <RefreshCw size={16} /> {disconnecting ? 'Limpando...' : 'Desconectar'}
                            </button>
                        )}
                        <div className={classes.statusDetails}>
                            <small>
                                {status.expiresAt ? `Expira em ${new Date(status.expiresAt).toLocaleString()}` : 'Sem expiração definida'}
                            </small>
                        </div>
                    </div>

                    {status.connected && (
                        <div className={classes.propertiesSection}>
                            <div className={classes.propertiesHeader}>
                                <div>
                                    <h3>Propriedades disponíveis</h3>
                                    <p>Selecione o domínio padrão para relatórios e auditorias.</p>
                                </div>
                                <button className={classes.refreshBtn} type="button" onClick={loadProperties} disabled={propertiesLoading}>
                                    <RefreshCw size={16} /> Atualizar lista
                                </button>
                            </div>
                            {propertiesLoading ? (
                                <p className={classes.loadingText}>Carregando propriedades...</p>
                            ) : properties.length === 0 ? (
                                <p className={classes.loadingText}>Nenhuma propriedade foi retornada pela API do Search Console.</p>
                            ) : (
                                <div className={classes.propertiesGrid}>
                                    {properties.map((property) => {
                                        const isActive = status.property === property.siteUrl;
                                        return (
                                            <button
                                                key={property.siteUrl}
                                                type="button"
                                                className={`${classes.propertyCard} ${isActive ? classes.propertyActive : ''}`}
                                                onClick={() => handleSelectProperty(property.siteUrl)}
                                                disabled={savingProperty === property.siteUrl}
                                            >
                                                <div className={classes.propertyHeader}>
                                                    <strong>{property.siteUrl}</strong>
                                                    {isActive ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                                                </div>
                                                <p>Permissão: {property.permissionLevel || 'desconhecida'}</p>
                                                <span className={classes.propertyFooter}>
                                                    {isActive ? 'Selecionado' : savingProperty === property.siteUrl ? 'Salvando...' : 'Definir como principal'}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </section>
            ) : (
                <section className={classes.panel}>
                    <div className={classes.panelHeader}>
                        <h2>{infoContent.title}</h2>
                        <p>{infoContent.description}</p>
                    </div>
                    <ul className={classes.bulletList}>
                        {infoContent.bullets.map(item => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>

                    <div className={classes.callout}>
                        <p>
                            Esta seção será preenchida conforme os conectores forem concluídos. Os endpoints `/api/seo-*` já estão
                            preparados para receber os dados oficiais.
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
}
