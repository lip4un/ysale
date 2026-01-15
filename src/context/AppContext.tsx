import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Campaign, getCampaigns } from '../services/adsService';

export interface Rule {
    id: string;
    name: string;
    conditionMetric: string;
    conditionOperator: string;
    conditionValue: string;
    action: string;
    isActive: boolean;
}

interface AppContextType {
    campaigns: Campaign[];
    connectedAccounts: { google: boolean; meta: boolean };
    tokens: { google: string | null; meta: string | null };
    subscription: { active: boolean; plan: string; expiresAt: string | null };
    rules: Rule[];
    loading: boolean;
    toggleCampaignStatus: (id: string) => void;
    toggleAccountConnection: (platform: 'google' | 'meta') => void;
    setToken: (platform: 'google' | 'meta', token: string | null) => void;
    addRule: (rule: Omit<Rule, 'id' | 'isActive'>) => void;
    toggleRuleStatus: (id: string) => void;
    deleteRule: (id: string) => void;
    getFilteredCampaigns: () => Campaign[];
    activateSubscription: (plan?: string, expiresAt?: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [connectedAccounts, setConnectedAccounts] = useState({ google: false, meta: false });
    const [tokens, setTokens] = useState<{ google: string | null; meta: string | null }>({ google: null, meta: null });
    const [subscription, setSubscription] = useState<{ active: boolean; plan: string; expiresAt: string | null }>({
        active: false,
        plan: 'Free',
        expiresAt: null
    });
    const [rules, setRules] = useState<Rule[]>([]);
    const [loading, setLoading] = useState(true);

    // Initial Load & Persistence
    useEffect(() => {
        const savedAccounts = localStorage.getItem('connectedAccounts');
        const savedTokens = localStorage.getItem('tokens');
        const savedRules = localStorage.getItem('rules');
        const savedSubscription = localStorage.getItem('subscription');
        const savedCampaigns = localStorage.getItem('campaigns');

        if (savedAccounts) setConnectedAccounts(JSON.parse(savedAccounts));
        if (savedTokens) setTokens(JSON.parse(savedTokens));
        if (savedRules) setRules(JSON.parse(savedRules));
        if (savedSubscription) setSubscription(JSON.parse(savedSubscription));

        if (savedCampaigns) {
            setCampaigns(JSON.parse(savedCampaigns));
            setLoading(false);
        } else {
            getCampaigns(tokens).then(data => {
                setCampaigns(data);
                setLoading(false);
            });
        }
    }, []);

    // Re-fetch when tokens change
    useEffect(() => {
        if (tokens.meta || tokens.google) {
            setLoading(true);
            getCampaigns(tokens).then(data => {
                setCampaigns(data);
                setLoading(false);
            });
        }
    }, [tokens]);

    // Save to LocalStorage on change
    useEffect(() => {
        localStorage.setItem('connectedAccounts', JSON.stringify(connectedAccounts));
        localStorage.setItem('tokens', JSON.stringify(tokens));
        localStorage.setItem('subscription', JSON.stringify(subscription));
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
        localStorage.setItem('rules', JSON.stringify(rules));
    }, [connectedAccounts, tokens, subscription, campaigns, rules]);

    const toggleCampaignStatus = (id: string) => {
        setCampaigns(prev => prev.map(c =>
            c.id === id
                ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
                : c
        ));
    };

    const toggleAccountConnection = (platform: 'google' | 'meta') => {
        setConnectedAccounts(prev => ({ ...prev, [platform]: !prev[platform] }));
        if (connectedAccounts[platform]) {
            setTokens(prev => ({ ...prev, [platform]: null }));
        }
    };

    const setToken = (platform: 'google' | 'meta', token: string | null) => {
        setTokens(prev => ({ ...prev, [platform]: token }));
        if (token) {
            setConnectedAccounts(prev => ({ ...prev, [platform]: true }));
        }
    };

    const addRule = (ruleData: Omit<Rule, 'id' | 'isActive'>) => {
        const newRule: Rule = {
            ...ruleData,
            id: Date.now().toString(),
            isActive: true
        };
        setRules(prev => [newRule, ...prev]);
    };

    const toggleRuleStatus = (id: string) => {
        setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
    };

    const deleteRule = (id: string) => {
        setRules(prev => prev.filter(r => r.id !== id));
    };

    const getFilteredCampaigns = () => {
        return campaigns.filter(c => {
            if (c.platform === 'google' && !connectedAccounts.google) return false;
            if (c.platform === 'meta' && !connectedAccounts.meta) return false;
            return true;
        });
    };

    const activateSubscription = (plan = 'Pro Plan', expiresAt: string | null = null) => {
        setSubscription({ active: true, plan, expiresAt });
    };

    return (
        <AppContext.Provider value={{
            campaigns,
            connectedAccounts,
            tokens,
            subscription,
            rules,
            loading,
            toggleCampaignStatus,
            toggleAccountConnection,
            setToken,
            addRule,
            toggleRuleStatus,
            deleteRule,
            getFilteredCampaigns,
            activateSubscription
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
