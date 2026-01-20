import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWhiteLabel } from '../context/WhiteLabelContext';
import {
    BarChart3,
    LayoutDashboard,
    Target,
    Sparkles,
    LogOut,
    CreditCard,
    Link2,
    Image as ImageIcon,
    Users,
    Search,
    Zap,
    Globe
} from 'lucide-react';
import classes from './DashboardLayout.module.css';
import { NotificationCenter } from '../components/NotificationCenter';
import { OnboardingTour } from '../components/OnboardingTour';
import { CommandPalette } from '../components/CommandPalette';
import { ThemeToggle } from '../components/ThemeToggle';

export function DashboardLayout() {
    const { t } = useTranslation();
    const { config } = useWhiteLabel();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: t('nav.dashboard') },
        { path: '/dashboard/campaigns', icon: <Target size={20} />, label: t('nav.campaigns') },
        { path: '/dashboard/manager', icon: <Zap size={20} />, label: t('nav.ads_manager') },
        { path: '/dashboard/competitors', icon: <Search size={20} />, label: t('nav.competitors') },
        { path: '/dashboard/creatives', icon: <ImageIcon size={20} />, label: t('nav.creatives') },
        { path: '/dashboard/audiences', icon: <Users size={20} />, label: t('nav.audiences') },
        { path: '/dashboard/seo', icon: <Globe size={20} />, label: 'SEO Toolkit' },
        { path: '/dashboard/ai', icon: <Sparkles size={20} />, label: t('nav.ai_analysis') },
        { path: '/dashboard/recommendations', icon: <Sparkles size={20} />, label: t('nav.recommendations') },
        { path: '/dashboard/rules', icon: <Zap size={20} />, label: t('nav.smart_rules') },
        { path: '/dashboard/whitelabel', icon: <CreditCard size={20} />, label: 'White Label' },
        { path: '/dashboard/connect', icon: <Link2 size={20} />, label: t('nav.connect') },
        { path: '/dashboard/subscription', icon: <CreditCard size={20} />, label: t('nav.billing') },
    ];

    return (
        <div className={classes.layout}>
            <aside className={classes.sidebar}>
                <div className={classes.logo}>
                    <BarChart3 color="white" size={24} className={classes.logoIcon} />
                    <span>{config.appName}</span>
                </div>

                <nav className={classes.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${classes.navItem} ${isActive(item.path) ? classes.active : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className={classes.footer}>
                    <Link to="/dashboard/profile" className={classes.user} title={t('nav.profile')}>
                        <div className={classes.avatar}>F</div>
                        <div className={classes.userInfo}>
                            <span className={classes.userName}>Felipe Domingues</span>
                            <span className={classes.userEmail}>defelipedomingues@gmail.com</span>
                        </div>
                    </Link>

                    <div className={classes.footerActions}>
                        <ThemeToggle />
                        <NotificationCenter />
                        <button className={classes.logoutBtn} title={t('nav.logout')}>
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            <main className={classes.main}>
                <Outlet />
            </main>

            <OnboardingTour />
            <CommandPalette />
        </div>
    );
}
