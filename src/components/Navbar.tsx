import { useTranslation } from 'react-i18next';
import { BarChart3, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import { ThemeToggle } from './ThemeToggle';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'zh', label: '中文' },
    { code: 'ja', label: '日本語' },
    { code: 'ar', label: 'العربية' },
    { code: 'hi', label: 'हिन्दी' },
];

export function Navbar() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className={classes.navbar}>
            <div className={`container ${classes.container}`}>
                <Link to="/" className={classes.logo}>
                    <div className={classes.logoIcon}>
                        <BarChart3 color="white" size={24} />
                    </div>
                    <span className={classes.logoText}>{t('app.name')}</span>
                </Link>

                <div className={classes.links}>
                    <a href="#resources">{t('nav.resources')}</a>
                    <a href="#how-it-works">{t('nav.howItWorks')}</a>
                    <a href="#platforms">{t('nav.platforms')}</a>
                </div>

                <div className={classes.actions}>
                    <div className={classes.langSelector}>
                        <Globe size={18} />
                        <select
                            value={i18n.language}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className={classes.select}
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.code.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <ThemeToggle />

                    <Link to="/login" className={classes.loginBtn}>
                        {t('nav.getStarted')}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
