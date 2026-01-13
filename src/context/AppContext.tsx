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
    rules: Rule[];
    loading: boolean;
    toggleCampaignStatus: (id: string) => void;
    toggleAccountConnection: (platform: 'google' | 'meta') => void;
    addRule: (rule: Omit<Rule, 'id' | 'isActive'>) => void;
    toggleRuleStatus: (id: string) => void;
    deleteRule: (id: string) => void;
    getFilteredCampaigns: () => Campaign[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [connectedAccounts, setConnectedAccounts] = useState({ google: false, meta: true });
    const [rules, setRules] = useState<Rule[]>([]);
    const [loading, setLoading] = useState(true);

    // Initial Load & Persistence
    useEffect(() => {
        const savedAccounts = localStorage.getItem('connectedAccounts');
        const savedRules = localStorage.getItem('rules');
        const savedCampaigns = localStorage.getItem('campaigns');

        if (savedAccounts) setConnectedAccounts(JSON.parse(savedAccounts));
        if (savedRules) setRules(JSON.parse(savedRules));

        if (savedCampaigns) {
            setCampaigns(JSON.parse(savedCampaigns));
            setLoading(false);
        } else {
            getCampaigns().then(data => {
                setCampaigns(data);
                setLoading(false);
            });
        }
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        localStorage.setItem('connectedAccounts', JSON.stringify(connectedAccounts));
    }, [connectedAccounts]);

    useEffect(() => {
        localStorage.setItem('rules', JSON.stringify(rules));
    }, [rules]);

    useEffect(() => {
        if (campaigns.length > 0) {
            localStorage.setItem('campaigns', JSON.stringify(campaigns));
        }
    }, [campaigns]);

    const toggleCampaignStatus = (id: string) => {
        setCampaigns(prev => prev.map(c =>
            c.id === id
                ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
                : c
        ));
    };

    const toggleAccountConnection = (platform: 'google' | 'meta') => {
        setConnectedAccounts(prev => ({ ...prev, [platform]: !prev[platform] }));
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

    return (
        <AppContext.Provider value={{
            campaigns,
            connectedAccounts,
            rules,
            loading,
            toggleCampaignStatus,
            toggleAccountConnection,
            addRule,
            toggleRuleStatus,
            deleteRule,
            getFilteredCampaigns
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
