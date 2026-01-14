import { Link, useNavigate } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import classes from './Login.module.css';
import { useAuth } from '../context/AuthContext';
import { consumeCheckoutIntent, createCheckoutSession } from '../services/checkoutService';

export function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const resumeCheckoutIfPending = async (): Promise<boolean> => {
        const pendingPayload = consumeCheckoutIntent();
        if (!pendingPayload) {
            return false;
        }

        toast.success('Login successful! Redirecting you to checkout...');
        const result = await createCheckoutSession(pendingPayload);
        if (result.url) {
            window.location.href = result.url;
            return true;
        }

        if (result.handledClientRedirect) {
            return true;
        }

        toast.error(result.error ?? 'Failed to start checkout. Please try again.');
        navigate('/pricing');
        return true;
    };

    const handleLogin = async (credentials?: any) => {
        if (credentials) {
            console.log('Google Auth Success:', credentials);
            toast.success('Signed in with Google!');
        }

        login();
        const redirected = await resumeCheckoutIfPending();
        if (redirected) {
            return;
        }

        navigate('/dashboard');
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.card}>
                <div className={classes.header}>
                    <div className={classes.logo}>
                        <BarChart3 color="white" size={24} />
                    </div>
                    <h1>{t('nav.login')} ySale</h1>
                    <p>Welcome back! Please sign in to continue.</p>
                </div>

                <div className={classes.googleWrapper}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            void handleLogin(credentialResponse);
                        }}
                        onError={() => {
                            toast.error('Google Sign In failed');
                        }}
                        useOneTap
                        shape="pill"
                        text="signin_with"
                        width="100%"
                    />
                </div>

                <div className={classes.divider}>
                    <span>or</span>
                </div>

                <form className={classes.form} onSubmit={async (e) => { e.preventDefault(); await handleLogin(); }}>
                    <div className={classes.inputGroup}>
                        <label>Email</label>
                        <input type="email" placeholder="you@company.com" required />
                    </div>
                    <div className={classes.inputGroup}>
                        <div className={classes.labelRow}>
                            <label>Password</label>
                            <Link to="/forgot-password" className={classes.forgotLink}>Forgot password?</Link>
                        </div>
                        <input type="password" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className={classes.submitBtn}>
                        Sign In
                    </button>
                </form>

                <p className={classes.footerText}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>

                <Link to="/" className={classes.backLink}>&larr; Back to Home</Link>
            </div>
        </div>
    );
}
