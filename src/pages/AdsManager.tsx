import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ChevronRight,
    ChevronLeft,
    Target,
    Image as ImageIcon,
    Globe,
    CheckCircle2,
    Facebook,
    Chrome,
    Eye
} from 'lucide-react';
import { toast } from 'sonner';
import classes from './AdsManager.module.css';

type Step = 'objective' | 'creative' | 'audience' | 'preview';

export function AdsManager() {
    const { t } = useTranslation();
    const [step, setStep] = useState<Step>('objective');
    const [formData, setFormData] = useState({
        platform: 'meta',
        objective: 'conversions',
        title: '',
        description: '',
        imageUrl: '',
        budget: '50',
        location: 'Brasil'
    });

    const steps: Step[] = ['objective', 'creative', 'audience', 'preview'];
    const currentStepIndex = steps.indexOf(step);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setStep(steps[currentStepIndex + 1]);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setStep(steps[currentStepIndex - 1]);
        }
    };

    const handleSubmit = () => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
            loading: 'Creating campaign...',
            success: 'Campaign created successfully! (Simulated)',
            error: 'Failed to create campaign'
        });
    };

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <h1>{t('nav.ads_manager')}</h1>
                <p>Create high-performing campaigns with our intelligent wizard.</p>
            </header>

            <div className={classes.stepper}>
                {steps.map((s, i) => (
                    <div
                        key={s}
                        className={`${classes.stepItem} ${s === step ? classes.active : ''} ${i < currentStepIndex ? classes.completed : ''}`}
                    >
                        <div className={classes.stepNumber}>
                            {i < currentStepIndex ? <CheckCircle2 size={16} /> : i + 1}
                        </div>
                        <span className={classes.stepLabel}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                        {i < steps.length - 1 && <div className={classes.connector} />}
                    </div>
                ))}
            </div>

            <div className={classes.content}>
                <div className={classes.formArea}>
                    {step === 'objective' && (
                        <div className={classes.stepContent}>
                            <h2>Select your Objective</h2>
                            <div className={classes.grid}>
                                <button
                                    className={`${classes.optionCard} ${formData.objective === 'conversions' ? classes.selected : ''}`}
                                    onClick={() => setFormData({ ...formData, objective: 'conversions' })}
                                >
                                    <Target className={classes.optionIcon} />
                                    <div className={classes.optionInfo}>
                                        <h3>Conversions</h3>
                                        <p>Drive sales and leads for your business.</p>
                                    </div>
                                </button>
                                <button
                                    className={`${classes.optionCard} ${formData.objective === 'traffic' ? classes.selected : ''}`}
                                    onClick={() => setFormData({ ...formData, objective: 'traffic' })}
                                >
                                    <Globe className={classes.optionIcon} />
                                    <div className={classes.optionInfo}>
                                        <h3>Traffic</h3>
                                        <p>Send more people to your website.</p>
                                    </div>
                                </button>
                            </div>

                            <h2 style={{ marginTop: '32px' }}>Select Platform</h2>
                            <div className={classes.grid}>
                                <button
                                    className={`${classes.optionCard} ${formData.platform === 'meta' ? classes.selected : ''}`}
                                    onClick={() => setFormData({ ...formData, platform: 'meta' })}
                                >
                                    <Facebook className={classes.optionIcon} />
                                    <div className={classes.optionInfo}>
                                        <h3>Meta Ads</h3>
                                        <p>Facebook & Instagram feeds.</p>
                                    </div>
                                </button>
                                <button
                                    className={`${classes.optionCard} ${formData.platform === 'google' ? classes.selected : ''}`}
                                    onClick={() => setFormData({ ...formData, platform: 'google' })}
                                >
                                    <Chrome className={classes.optionIcon} />
                                    <div className={classes.optionInfo}>
                                        <h3>Google Search</h3>
                                        <p>Reach customers on search results.</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'creative' && (
                        <div className={classes.stepContent}>
                            <h2>Design your Creative</h2>
                            <div className={classes.inputGroup}>
                                <label>Ad Headline</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter ad title..."
                                />
                            </div>
                            <div className={classes.inputGroup}>
                                <label>Primary Text / Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Tell your story..."
                                />
                            </div>
                            <div className={classes.inputGroup}>
                                <label>Image URL (Optional for now)</label>
                                <div className={classes.imageInputWrapper}>
                                    <ImageIcon size={20} />
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'audience' && (
                        <div className={classes.stepContent}>
                            <h2>Set Audience & Budget</h2>
                            <div className={classes.inputGroup}>
                                <label>Daily Budget (USD)</label>
                                <input
                                    type="range"
                                    min="5"
                                    max="500"
                                    value={formData.budget}
                                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                />
                                <div className={classes.budgetLabel}>${formData.budget} / day</div>
                            </div>
                            <div className={classes.inputGroup}>
                                <label>Location</label>
                                <select
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                >
                                    <option value="Brasil">Brasil</option>
                                    <option value="USA">USA</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Worldwide">Worldwide</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {step === 'preview' && (
                        <div className={classes.stepContent}>
                            <h2>Review & Launch</h2>
                            <div className={classes.summaryCard}>
                                <div className={classes.summaryRow}>
                                    <span>Objective:</span> <strong>{formData.objective}</strong>
                                </div>
                                <div className={classes.summaryRow}>
                                    <span>Platform:</span> <strong>{formData.platform}</strong>
                                </div>
                                <div className={classes.summaryRow}>
                                    <span>Budget:</span> <strong>${formData.budget}/day</strong>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={classes.footer}>
                        <button
                            className={classes.backBtn}
                            onClick={handleBack}
                            disabled={currentStepIndex === 0}
                        >
                            <ChevronLeft size={20} />
                            Back
                        </button>
                        <button className={classes.nextBtn} onClick={handleNext}>
                            {currentStepIndex === steps.length - 1 ? 'Launch Campaign' : 'Next Step'}
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className={classes.previewArea}>
                    <div className={classes.previewSticky}>
                        <div className={classes.previewHeader}>
                            <Eye size={18} />
                            Live Ad Preview
                        </div>
                        {formData.platform === 'meta' ? (
                            <div className={classes.metaPreview}>
                                <div className={classes.metaHeader}>
                                    <div className={classes.metaAvatar} />
                                    <div className={classes.metaInfo}>
                                        <div className={classes.metaPageName}>ySale AI</div>
                                        <div className={classes.metaSponsored}>Sponsored</div>
                                    </div>
                                </div>
                                <div className={classes.metaDescription}>
                                    {formData.description || 'Your ad description will appear here...'}
                                </div>
                                <div className={classes.metaImagePlaceholder}>
                                    {formData.imageUrl ? (
                                        <img src={formData.imageUrl} alt="Ad Preview" />
                                    ) : (
                                        <ImageIcon size={48} opacity={0.2} />
                                    )}
                                </div>
                                <div className={classes.metaFooter}>
                                    <div className={classes.metaFooterText}>
                                        <div className={classes.metaFooterHeadline}>
                                            {formData.title || 'Your Headline'}
                                        </div>
                                        <div className={classes.metaFooterSubtext}>YSALE.XYZ</div>
                                    </div>
                                    <button className={classes.metaCta}>Learn More</button>
                                </div>
                            </div>
                        ) : (
                            <div className={classes.googlePreview}>
                                <div className={classes.googleUrl}>
                                    https://ysale.xyz › ads
                                </div>
                                <div className={classes.googleTitle}>
                                    {formData.title || 'Your Ad Title Will Be Here'}
                                </div>
                                <div className={classes.googleDesc}>
                                    {formData.description || 'This is where your search description will be shown to users looking for your keywords.'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
