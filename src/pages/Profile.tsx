import classes from './Profile.module.css';
import { User, Mail, Building, Globe, Save } from 'lucide-react';
import { useState } from 'react';

export function Profile() {
    const [loading, setLoading] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <h1>Profile Settings</h1>
                <p>Manage your account information and preferences.</p>
            </header>

            <div className={classes.card}>
                <form onSubmit={handleSave}>
                    <div className={classes.section}>
                        <h2>Personal Information</h2>
                        <div className={classes.grid}>
                            <div className={classes.inputGroup}>
                                <label>Full Name</label>
                                <div className={classes.inputWrapper}>
                                    <User size={18} />
                                    <input type="text" defaultValue="Felipe Domingues" />
                                </div>
                            </div>

                            <div className={classes.inputGroup}>
                                <label>Email Address</label>
                                <div className={classes.inputWrapper}>
                                    <Mail size={18} />
                                    <input type="email" defaultValue="defelipedomingues@gmail.com" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.divider}></div>

                    <div className={classes.section}>
                        <h2>Company Details</h2>
                        <div className={classes.grid}>
                            <div className={classes.inputGroup}>
                                <label>Company Name</label>
                                <div className={classes.inputWrapper}>
                                    <Building size={18} />
                                    <input type="text" defaultValue="ySale Inc." />
                                </div>
                            </div>

                            <div className={classes.inputGroup}>
                                <label>Website</label>
                                <div className={classes.inputWrapper}>
                                    <Globe size={18} />
                                    <input type="url" defaultValue="https://ysale.xyz" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.actions}>
                        <button type="submit" className={classes.saveBtn} disabled={loading}>
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
