import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

export function Signup() {
    const navigate = useNavigate();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock signup logic
        toast.success('Account created successfully!');
        navigate('/dashboard');
    };

    const handleGoogleSignup = () => {
        // Mock google auth
        toast.success('Signed up with Google!');
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

                <button className={classes.googleBtn} onClick={handleGoogleSignup}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />
                    <span>Sign up with Google</span>
                </button>

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
