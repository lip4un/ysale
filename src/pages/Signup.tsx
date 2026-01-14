import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

import { GoogleLogin } from '@react-oauth/google';
import { markUserAuthenticated } from '../services/authService';
import { consumeCheckoutIntent, createCheckoutSession } from '../services/checkoutService';

export function Signup() {
    const navigate = useNavigate();

    const resumeCheckoutIfPending = async (): Promise<boolean> => {
        const pendingPayload = consumeCheckoutIntent();
        if (!pendingPayload) {
            return false;
        }

        toast.success('Account ready! Redirecting you to checkout...');
        const result = await createCheckoutSession(pendingPayload);
        if (result.url) {
            window.location.href = result.url;
            return true;
        }

        toast.error(result.error ?? 'Failed to start checkout. Please try again.');
        navigate('/pricing');
        return true;
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Account created successfully!');
        markUserAuthenticated();
        const redirected = await resumeCheckoutIfPending();
        if (redirected) {
            return;
        }
        navigate('/dashboard');
    };

    const handleGoogleAuth = async (credentials?: any) => {
        if (credentials) {
            console.log('Google Auth Success:', credentials);
            toast.success('Signed up with Google!');
        }

        markUserAuthenticated();
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
                    <h1>Create Account</h1>
                    <p>Start your 14-day free trial today.</p>
                </div>

                <div className={classes.googleWrapper}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            void handleGoogleAuth(credentialResponse);
                        }}
                        onError={() => {
                            toast.error('Google Sign Up failed');
                        }}
                        shape="pill"
                        text="signup_with"
                        width="100%"
                    />
                </div>

                <div className={classes.divider}>
                    <span>or</span>
                </div>

                <form className={classes.form} onSubmit={handleSignup}>
                    <div className={classes.inputGroup}>
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" required />
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Email</label>
                        <input type="email" placeholder="you@company.com" required />
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" required minLength={8} />
                    </div>
                    <button type="submit" className={classes.submitBtn}>
                        Create Account
                    </button>
                </form>

                <p className={classes.footerText}>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>

                <Link to="/" className={classes.backLink}>&larr; Back to Home</Link>
            </div>
        </div>
    );
}
