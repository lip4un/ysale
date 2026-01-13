import { useState } from 'react';
import { useWhiteLabel } from '../context/WhiteLabelContext';
import { Upload, RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner';
import classes from './WhiteLabelSettings.module.css';

export function WhiteLabelSettings() {
    const { config, updateConfig, resetToDefault } = useWhiteLabel();
    const [formData, setFormData] = useState(config);

    const handleSave = () => {
        updateConfig(formData);
        toast.success("White label settings saved!", { description: "Your branding has been updated." });
    };

    const handleReset = () => {
        resetToDefault();
        setFormData({ appName: 'ySale', logoUrl: '', primaryColor: '#2563EB', secondaryColor: '#10B981' });
        toast.info("Reset to default", { description: "Branding restored to ySale defaults." });
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, logoUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <div>
                    <h1>White Label Settings</h1>
                    <p>Customize the platform with your agency's branding.</p>
                </div>
                <div className={classes.actions}>
                    <button className={classes.resetBtn} onClick={handleReset}>
                        <RotateCcw size={18} />
                        Reset to Default
                    </button>
                    <button className={classes.saveBtn} onClick={handleSave}>
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </header>

            <div className={classes.content}>
                <div className={classes.section}>
                    <h2>Brand Identity</h2>

                    <div className={classes.formGroup}>
                        <label>Application Name</label>
                        <input
                            type="text"
                            value={formData.appName}
                            onChange={e => setFormData({ ...formData, appName: e.target.value })}
                            placeholder="Your Agency Name"
                        />
                        <span className={classes.hint}>This will appear in the sidebar and throughout the platform.</span>
                    </div>

                    <div className={classes.formGroup}>
                        <label>Logo Upload</label>
                        <div className={classes.logoUpload}>
                            {formData.logoUrl ? (
                                <div className={classes.logoPreview}>
                                    <img src={formData.logoUrl} alt="Logo Preview" />
                                </div>
                            ) : (
                                <div className={classes.logoPlaceholder}>
                                    <Upload size={32} />
                                    <span>No logo uploaded</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                id="logo-upload"
                                className={classes.fileInput}
                            />
                            <label htmlFor="logo-upload" className={classes.uploadBtn}>
                                <Upload size={16} />
                                Choose File
                            </label>
                        </div>
                        <span className={classes.hint}>Recommended: PNG or SVG, max 200x60px</span>
                    </div>
                </div>

                <div className={classes.section}>
                    <h2>Color Scheme</h2>

                    <div className={classes.colorRow}>
                        <div className={classes.formGroup}>
                            <label>Primary Color</label>
                            <div className={classes.colorInput}>
                                <input
                                    type="color"
                                    value={formData.primaryColor}
                                    onChange={e => setFormData({ ...formData, primaryColor: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={formData.primaryColor}
                                    onChange={e => setFormData({ ...formData, primaryColor: e.target.value })}
                                    placeholder="#2563EB"
                                />
                            </div>
                            <span className={classes.hint}>Used for buttons, links, and highlights</span>
                        </div>

                        <div className={classes.formGroup}>
                            <label>Secondary Color</label>
                            <div className={classes.colorInput}>
                                <input
                                    type="color"
                                    value={formData.secondaryColor}
                                    onChange={e => setFormData({ ...formData, secondaryColor: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={formData.secondaryColor}
                                    onChange={e => setFormData({ ...formData, secondaryColor: e.target.value })}
                                    placeholder="#10B981"
                                />
                            </div>
                            <span className={classes.hint}>Used for accents and success states</span>
                        </div>
                    </div>
                </div>

                <div className={classes.preview}>
                    <h3>Live Preview</h3>
                    <div className={classes.previewCard} style={{
                        borderColor: formData.primaryColor,
                        '--preview-primary': formData.primaryColor,
                        '--preview-secondary': formData.secondaryColor
                    } as React.CSSProperties}>
                        <div className={classes.previewHeader}>
                            {formData.logoUrl ? (
                                <img src={formData.logoUrl} alt="Preview" className={classes.previewLogo} />
                            ) : (
                                <strong>{formData.appName}</strong>
                            )}
                        </div>
                        <button className={classes.previewBtn} style={{ backgroundColor: formData.primaryColor }}>
                            Primary Button
                        </button>
                        <button className={classes.previewBtn} style={{ backgroundColor: formData.secondaryColor }}>
                            Secondary Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
