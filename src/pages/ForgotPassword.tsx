import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Login.module.css';
import { BarChart3, Mail } from 'lucide-react';
import { toast } from 'sonner';

export function ForgotPassword() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/send-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setSubmitted(true);
                toast.success('Reset link sent to your email!');
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to send email');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
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
                        <button type="submit" className={classes.submitBtn} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Link'}
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
