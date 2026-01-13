import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

import { GoogleLogin } from '@react-oauth/google';

export function Signup() {
    const navigate = useNavigate();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Account created successfully!');
        navigate('/dashboard');
    };

    const handleGoogleAuth = (credentials?: any) => {
        if (credentials) {
            console.log('Google Auth Success:', credentials);
            toast.success('Signed up with Google!');
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
                            handleGoogleAuth(credentialResponse);
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
