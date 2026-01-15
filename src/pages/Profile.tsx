import classes from './Profile.module.css';
import { User, Mail, Building, Globe, Save, LogOut } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

interface ProfileForm {
    fullName: string;
    email: string;
    companyName: string;
    website: string;
}

const PROFILE_STORAGE_KEY = 'ysale_profile_settings';

const defaultProfile: ProfileForm = {
    fullName: 'Felipe Domingues',
    email: 'defelipedomingues@gmail.com',
    companyName: 'ySale Inc.',
    website: 'https://ysale.xyz'
};

export function Profile() {
    const { logout } = useAuth();
    const initialProfile = useMemo(() => {
        if (typeof window === 'undefined') {
            return defaultProfile;
        }

        const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY);
        if (!saved) {
            return defaultProfile;
        }

        try {
            const parsed = JSON.parse(saved) as Partial<ProfileForm>;
            return { ...defaultProfile, ...parsed };
        } catch (error) {
            console.warn('Failed to parse stored profile settings', error);
            return defaultProfile;
        }
    }, []);

    const [profile, setProfile] = useState<ProfileForm>(initialProfile);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field: keyof ProfileForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            try {
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
                }
                toast.success('Profile saved successfully');
            } catch (error) {
                console.error('Failed to persist profile data', error);
                toast.error('Unable to save profile locally');
            }
        }, 800);
    };

    const handleLogout = () => {
        logout();
        toast.success('Sessão encerrada com sucesso');
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
                                    <input
                                        type="text"
                                        value={profile.fullName}
                                        onChange={handleInputChange('fullName')}
                                    />
                                </div>
                            </div>

                            <div className={classes.inputGroup}>
                                <label>Email Address</label>
                                <div className={classes.inputWrapper}>
                                    <Mail size={18} />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={handleInputChange('email')}
                                    />
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
                                    <input
                                        type="text"
                                        value={profile.companyName}
                                        onChange={handleInputChange('companyName')}
                                    />
                                </div>
                            </div>

                            <div className={classes.inputGroup}>
                                <label>Website</label>
                                <div className={classes.inputWrapper}>
                                    <Globe size={18} />
                                    <input
                                        type="url"
                                        value={profile.website}
                                        onChange={handleInputChange('website')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.actions}>
                        <button type="button" className={classes.logoutBtn} onClick={handleLogout}>
                            <LogOut size={18} />
                            Logout
                        </button>
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
