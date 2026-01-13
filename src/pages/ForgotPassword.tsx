import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Login.module.css';
import { BarChart3, Mail } from 'lucide-react';
import { toast } from 'sonner';

export function ForgotPassword() {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock send grid logic later
        console.log('Sending reset email to:', email);
        setSubmitted(true);
        toast.success('Reset link sent to your email!');
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.card}>
                <div className={classes.header}>
                    <div className={classes.logo}>
                        <BarChart3 color="white" size={24} />
                    </div>
                    <h1>Reset Password</h1>
                    <p>Enter your email and we'll send you a link to reset your password.</p>
                </div>

                {!submitted ? (
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <div className={classes.inputGroup}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className={classes.submitBtn}>
                            Send Reset Link
                        </button>
                    </form>
                ) : (
                    <div className={classes.successState}>
                        <div className={classes.successIcon}>
                            <Mail size={32} color="var(--color-primary)" />
                        </div>
                        <p>We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.</p>
                        <button
                            className={classes.googleBtn}
                            onClick={() => setSubmitted(false)}
                            style={{ marginTop: '16px' }}
                        >
                            Try another email
                        </button>
                    </div>
                )}

                <p className={classes.footerText}>
                    Back to <Link to="/login">Sign In</Link>
                </p>

                <Link to="/" className={classes.backLink}>&larr; Back to Home</Link>
            </div>
        </div>
    );
}
