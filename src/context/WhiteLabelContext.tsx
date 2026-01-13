import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface WhiteLabelConfig {
    appName: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
}

interface WhiteLabelContextType {
    config: WhiteLabelConfig;
    updateConfig: (newConfig: Partial<WhiteLabelConfig>) => void;
    resetToDefault: () => void;
}

const defaultConfig: WhiteLabelConfig = {
    appName: 'ySale',
    logoUrl: '',
    primaryColor: '#2563EB',
    secondaryColor: '#10B981'
};

const WhiteLabelContext = createContext<WhiteLabelContextType | undefined>(undefined);

export function WhiteLabelProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<WhiteLabelConfig>(() => {
        const saved = localStorage.getItem('ysale-whitelabel');
        return saved ? JSON.parse(saved) : defaultConfig;
    });

    useEffect(() => {
        localStorage.setItem('ysale-whitelabel', JSON.stringify(config));

        // Update CSS variables for colors
        document.documentElement.style.setProperty('--color-primary', config.primaryColor);
        document.documentElement.style.setProperty('--color-secondary', config.secondaryColor);
    }, [config]);

    const updateConfig = (newConfig: Partial<WhiteLabelConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    };

    const resetToDefault = () => {
        setConfig(defaultConfig);
    };

    return (
        <WhiteLabelContext.Provider value={{ config, updateConfig, resetToDefault }}>
            {children}
        </WhiteLabelContext.Provider>
    );
}

export function useWhiteLabel() {
    const context = useContext(WhiteLabelContext);
    if (!context) {
        throw new Error('useWhiteLabel must be used within WhiteLabelProvider');
    }
    return context;
}
