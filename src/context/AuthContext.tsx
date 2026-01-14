import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { clearUserAuthentication, getAuthStorageKey, isUserAuthenticated, markUserAuthenticated } from '../services/authService';

interface AuthContextValue {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (typeof window === 'undefined') {
            return false;
        }
        return isUserAuthenticated();
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleStorage = (event: StorageEvent) => {
            if (event.key === getAuthStorageKey()) {
                setIsAuthenticated(isUserAuthenticated());
            }
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const login = () => {
        markUserAuthenticated();
        setIsAuthenticated(true);
    };

    const logout = () => {
        clearUserAuthentication();
        setIsAuthenticated(false);
    };

    const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
