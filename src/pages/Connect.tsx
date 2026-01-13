import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './Connect.module.css';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'sonner';

export function Connect() {
    const { connectedAccounts, tokens, toggleAccountConnection, setToken } = useAppContext();
    const location = useLocation();

    // Meta Settings
    const META_APP_ID = import.meta.env.VITE_META_APP_ID;
    const REDIRECT_URI = window.location.origin + '/dashboard/connect';

    // Handle OAuth callback (hash fragment)
    useEffect(() => {
        if (location.hash) {
            const params = new URLSearchParams(location.hash.replace('#', '?'));
            const accessToken = params.get('access_token');
            const error = params.get('error');

            if (accessToken) {
                setToken('meta', accessToken);
                toast.success('Meta Ads connected successfully!');
                // Clean up the URL
                window.history.replaceState(null, '', window.location.pathname);
            } else if (error) {
                toast.error(`Auth Error: ${params.get('error_description') || error}`);
            }
        }
    }, [location, setToken]);

    const handleMetaConnect = () => {
        if (connectedAccounts.meta) {
            toggleAccountConnection('meta');
            toast.info('Meta Ads disconnected');
        } else {
            if (!META_APP_ID) {
                toast.error('Meta App ID not configured in .env');
                return;
            }
            // Real Meta OAuth Redirect
            const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=ads_read,ads_management,business_management,public_profile&response_type=token`;
            window.location.href = authUrl;
        }
    };

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <h1>Connect Platforms</h1>
                <p>Integrate your ad accounts to start analyzing real data.</p>
            </header>

            {!META_APP_ID && (
                <div className={classes.warning}>
                    <AlertCircle size={20} />
                    <span>VITE_META_APP_ID is missing. Check your .env file.</span>
                </div>
            )}

            <div className={classes.grid}>
                {/* GOOGLE ADS */}
                <div className={classes.card}>
                    <div className={classes.platformHeader}>
                        <div className={classes.googleIcon}>G</div>
                        <div className={classes.platformInfo}>
                            <h3>Google Ads</h3>
                            <p>Search, Display, Youtube</p>
                        </div>
                        {connectedAccounts.google ? (
                            <span className={classes.connectedStatus}><CheckCircle2 size={16} /> Connected</span>
                        ) : (
                            <span className={classes.disconnectedStatus}>Not Connected</span>
                        )}
                    </div>
                    <div className={classes.actions}>
                        <button
                            className={connectedAccounts.google ? classes.disconnectBtn : classes.connectBtn}
                            onClick={() => toggleAccountConnection('google')}
                        >
                            {connectedAccounts.google ? 'Disconnect' : 'Connect Account'}
                        </button>
                    </div>
                </div>

                {/* META ADS */}
                <div className={classes.card}>
                    <div className={classes.platformHeader}>
                        <div className={classes.metaIcon}>∞</div>
                        <div className={classes.platformInfo}>
                            <h3>Meta Ads</h3>
                            <p>Facebook, Instagram, Messenger</p>
                        </div>
                        {connectedAccounts.meta ? (
                            <span className={classes.connectedStatus}><CheckCircle2 size={16} /> Connected</span>
                        ) : (
                            <span className={classes.disconnectedStatus}>Not Connected</span>
                        )}
                    </div>
                    {tokens.meta && (
                        <div className={classes.tokenInfo}>
                            Token Active: {tokens.meta.substring(0, 8)}...
                        </div>
                    )}
                    <div className={classes.actions}>
                        <button
                            className={connectedAccounts.meta ? classes.disconnectBtn : classes.connectBtn}
                            onClick={handleMetaConnect}
                        >
                            {connectedAccounts.meta ? 'Disconnect' : 'Connect Account'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
