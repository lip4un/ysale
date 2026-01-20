import { useState } from 'react';
import classes from './SeoToolkit.module.css';
import { ShieldCheck, Activity, ServerCog, GaugeCircle, FileText } from 'lucide-react';

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
    const content = TAB_CONTENT[activeTab];

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

            <section className={classes.panel}>
                <div className={classes.panelHeader}>
                    <h2>{content.title}</h2>
                    <p>{content.description}</p>
                </div>
                <ul className={classes.bulletList}>
                    {content.bullets.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <div className={classes.callout}>
                    <p>
                        Próximos passos: implementar OAuth, cache seguro de tokens e endpoints `/api/search-console/*`, crawler interno e
                        integração PageSpeed. Esta tela servirá como hub para cada submódulo.
                    </p>
                </div>
            </section>
        </div>
    );
}
