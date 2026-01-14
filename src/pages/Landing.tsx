import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getPriceForRegion, formatPrice } from '../services/pricingService';
import { ArrowRight, BarChart2, Zap, Brain, CheckCircle2, Sparkles } from 'lucide-react';
import classes from './Landing.module.css';
import sectionClasses from './LandingSections.module.css';
import { Footer } from '../components/Footer';

export function Landing() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // Get price based on current language/locale
    const price = getPriceForRegion(i18n.language);

    const scrollToFeatures = () => {
        const section = document.getElementById('features');
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const features = [
        {
            icon: <BarChart2 size={32} color="#3B82F6" />,
            title: t('home.features.items.analytics.title'),
            desc: t('home.features.items.analytics.desc')
        },
        {
            icon: <Zap size={32} color="#F59E0B" />,
            title: t('home.features.items.reports.title'),
            desc: t('home.features.items.reports.desc')
        },
        {
            icon: <Brain size={32} color="#10B981" />,
            title: t('home.features.items.ai.title'),
            desc: t('home.features.items.ai.desc')
        }
    ];

    return (
        <div className={classes.wrapper}>
            <Navbar />

            <main>
                {/* HERO SECTION */}
                <section className={classes.hero}>
                    <div className="container">
                        <div className={classes.aiBadge}>
                            <Sparkles size={16} />
                            <span>Análise Inteligente com IA</span>
                        </div>
                        <h1 className={classes.heroTitle}>
                            <Trans i18nKey="home.hero.title">
                                Optimize your <span className={classes.highlightMeta}>Meta Ads</span> and <span className={classes.highlightGoogle}>Google Ads</span> campaigns
                            </Trans>
                        </h1>
                        <p className={classes.heroSubtitle}>{t('home.hero.subtitle')}</p>

                        <div className={classes.heroActions}>
                            <button
                                className={classes.primaryBtn}
                                onClick={() => navigate('/signup')}
                            >
                                {t('home.hero.cta')} <ArrowRight size={18} />
                            </button>
                            <button
                                className={classes.secondaryBtn}
                                onClick={scrollToFeatures}
                            >
                                {t('home.hero.features')}
                            </button>
                        </div>

                        <div className={classes.heroVisual}>
                            {/* Abstract representation of the dashboard from the image */}
                            <div className={classes.dashboardPreview}>
                                <div className={classes.statCard}>
                                    <span>Impressions</span>
                                    <strong>2.4M</strong>
                                    <span className={classes.trend}>+12%</span>
                                </div>
                                <div className={classes.statCard}>
                                    <span>Clicks</span>
                                    <strong>89.2K</strong>
                                    <span className={classes.trend}>+8%</span>
                                </div>
                                <div className={classes.statCard}>
                                    <span>Conversions</span>
                                    <strong>3.2K</strong>
                                    <span className={classes.trend}>+24%</span>
                                </div>
                                <div className={classes.statCard}>
                                    <span>ROAS</span>
                                    <strong>4.2x</strong>
                                    <span className={classes.trend}>+18%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section id="features" className={classes.features}>
                    <div className="container">
                        <div className={classes.sectionHeader}>
                            <h2>{t('home.features.title')}</h2>
                            <p>{t('home.features.subtitle')}</p>
                        </div>

                        <div className={classes.featureGrid}>
                            {features.map((f, i) => (
                                <div key={i} className={classes.featureCard}>
                                    <div className={classes.featureIcon}>{f.icon}</div>
                                    <h3>{f.title}</h3>
                                    <p>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRICING SECTION */}
                <section className={classes.pricing}>
                    <div className="container">
                        <div className={classes.sectionHeader}>
                            <h2>{t('home.pricing.title')}</h2>
                            <p>{t('home.pricing.subtitle')}</p>
                        </div>

                        <div className={classes.pricingCard}>
                            <div className={classes.priceHeader}>
                                <h3>Pro Plan</h3>
                                <div className={classes.priceValue}>
                                    {formatPrice(price)}
                                    <span>{t('home.pricing.monthly')}</span>
                                </div>
                            </div>

                            <ul className={classes.priceFeatures}>
                                <li><CheckCircle2 size={16} color="#10B981" /> Unlimited Campaigns</li>
                                <li><CheckCircle2 size={16} color="#10B981" /> Meta & Google Ads Integration</li>
                                <li><CheckCircle2 size={16} color="#10B981" /> AI Recommendations</li>
                                <li><CheckCircle2 size={16} color="#10B981" /> 24/7 Support</li>
                            </ul>

                            <button
                                className={classes.subscribeBtn}
                                onClick={() => navigate('/pricing')}
                            >
                                {t('home.hero.cta')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* TRUSTED BY SECTION */}
                <section className={classes.trustedBy}>
                    <div className="container">
                        <p>Trusted by 500+ agencies and marketers</p>
                        <div className={sectionClasses.logos}>
                            {/* Placeholders for logos */}
                            <div className={sectionClasses.logo}>LOGO 01</div>
                            <div className={sectionClasses.logo}>LOGO 02</div>
                            <div className={sectionClasses.logo}>LOGO 03</div>
                            <div className={sectionClasses.logo}>LOGO 04</div>
                            <div className={sectionClasses.logo}>LOGO 05</div>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className={sectionClasses.howItWorks}>
                    <div className="container">
                        <div className={classes.sectionHeader}>
                            <h2>How It Works</h2>
                            <p>Simple steps to supercharge your ads</p>
                        </div>
                        <div className={sectionClasses.stepsGrid}>
                            <div className={sectionClasses.stepCard}>
                                <div className={sectionClasses.stepNumber}>1</div>
                                <h3>Connect Accounts</h3>
                                <p>Link your Meta and Google Ads managers in seconds.</p>
                            </div>
                            <div className={sectionClasses.stepCard}>
                                <div className={sectionClasses.stepNumber}>2</div>
                                <h3>Analyze Data</h3>
                                <p>Get a unified dashboard with all your key metrics.</p>
                            </div>
                            <div className={sectionClasses.stepCard}>
                                <div className={sectionClasses.stepNumber}>3</div>
                                <h3>Optimize</h3>
                                <p>Use AI suggestions to improve ROI and lower costs.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className={sectionClasses.testimonials}>
                    <div className="container">
                        <div className={classes.sectionHeader}>
                            <h2>What our users say</h2>
                        </div>
                        <div className={sectionClasses.testimonialGrid}>
                            <div className={sectionClasses.testimonialCard}>
                                <p>"ySale transformed how we manage our agency clients. It's a game changer."</p>
                                <div className={sectionClasses.userProfile}>
                                    <div className={sectionClasses.avatar}>JS</div>
                                    <div>
                                        <strong>John Smith</strong>
                                        <span>Marketing Director</span>
                                    </div>
                                </div>
                            </div>
                            <div className={sectionClasses.testimonialCard}>
                                <p>"The AI recommendations actually work. We saved 20% on ad spend in one week."</p>
                                <div className={sectionClasses.userProfile}>
                                    <div className={sectionClasses.avatar}>MJ</div>
                                    <div>
                                        <strong>Maria Jones</strong>
                                        <span>E-commerce Owner</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className={sectionClasses.faq}>
                    <div className="container">
                        <h2 className={classes.sectionTitle}>Frequently Asked Questions</h2>
                        <div className={sectionClasses.faqGrid}>
                            <div className={sectionClasses.faqItem}>
                                <h4>Can I cancel anytime?</h4>
                                <p>Yes, ySale is a pay-as-you-go service. You can cancel your subscription at any time.</p>
                            </div>
                            <div className={sectionClasses.faqItem}>
                                <h4>Do you support other platforms?</h4>
                                <p>Currently we support Meta (Facebook/Instagram) and Google Ads. TikTok is coming soon.</p>
                            </div>
                            <div className={sectionClasses.faqItem}>
                                <h4>Is my data secure?</h4>
                                <p>Absolutely. We use industry-standard encryption and official APIs from Meta and Google.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className={sectionClasses.finalCta}>
                    <div className="container">
                        <h2>Ready to scale your business?</h2>
                        <p>Join thousands of marketers using ySale today.</p>
                        <button className={sectionClasses.primaryBtnLarge}>
                            {t('home.hero.cta')} <ArrowRight size={24} />
                        </button>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}
