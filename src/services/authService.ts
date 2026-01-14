const AUTH_STORAGE_KEY = 'ysale_isAuthenticated';

export const isUserAuthenticated = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
};

export const markUserAuthenticated = (): void => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
};

export const clearUserAuthentication = (): void => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getAuthStorageKey = (): string => AUTH_STORAGE_KEY;
