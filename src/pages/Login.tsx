import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogin = () => {
        // Mock login logic
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

                <button className={classes.googleBtn} onClick={handleLogin}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />
                    <span>Sign in with Google</span>
                </button>

                <div className={classes.divider}>
                    <span>or</span>
                </div>

                <form className={classes.form} onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className={classes.inputGroup}>
                        <label>Email</label>
                        <input type="email" placeholder="you@company.com" required />
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Password</label>
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
