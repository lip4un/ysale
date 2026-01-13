import { BarChart3, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

export function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={`container ${classes.container}`}>
                <div className={classes.grid}>
                    {/* Brand Column */}
                    <div className={classes.brandColumn}>
                        <div className={classes.logo}>
                            <BarChart3 size={28} />
                            <span>ySale</span>
                        </div>
                        <p className={classes.tagline}>
                            Optimize your Meta and Google Ads campaigns with intelligent automation and insights.
                        </p>
                        <div className={classes.socials}>
                            <a href="#" className={classes.socialIcon}><Twitter size={20} /></a>
                            <a href="#" className={classes.socialIcon}><Linkedin size={20} /></a>
                            <a href="#" className={classes.socialIcon}><Github size={20} /></a>
                            <a href="#" className={classes.socialIcon}><Mail size={20} /></a>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className={classes.linkColumn}>
                        <h4>Product</h4>
                        <ul>
                            <li><Link to="/features">Features</Link></li>
                            <li><Link to="/pricing">Pricing</Link></li>
                            <li><Link to="/integrations">Integrations</Link></li>
                            <li><Link to="/changelog">Changelog</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className={classes.linkColumn}>
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className={classes.linkColumn}>
                        <h4>Resources</h4>
                        <ul>
                            <li><Link to="/docs">Documentation</Link></li>
                            <li><Link to="/guides">Guides</Link></li>
                            <li><Link to="/support">Support</Link></li>
                            <li><Link to="/api">API Reference</Link></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className={classes.linkColumn}>
                        <h4>Legal</h4>
                        <ul>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                            <li><Link to="/cookies">Cookie Policy</Link></li>
                            <li><Link to="/gdpr">GDPR</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={classes.bottom}>
                    <p>© 2024 ySale. All rights reserved.</p>
                    <p>Made with ❤️ for marketers worldwide.</p>
                </div>
            </div>
        </footer>
    );
}
