import classes from './Connect.module.css';
import { CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function Connect() {
    const { connectedAccounts, toggleAccountConnection } = useAppContext();

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <h1>Connect Platforms</h1>
                <p>Integrate your ad accounts to start analyzing data.</p>
            </header>

            <div className={classes.grid}>
                {/* GOOGLE ADS */}
                <div className={classes.card}>
                    <div className={classes.platformHeader}>
                        <div className={classes.googleIcon}>G</div> {/* Simple CSS icon approximation */}
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
                    <div className={classes.actions}>
                        <button
                            className={connectedAccounts.meta ? classes.disconnectBtn : classes.connectBtn}
                            onClick={() => toggleAccountConnection('meta')}
                        >
                            {connectedAccounts.meta ? 'Disconnect' : 'Connect Account'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
