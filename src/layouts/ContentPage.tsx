import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import classes from './ContentPage.module.css';

interface ContentPageProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

export function ContentPage({ title, subtitle, children }: ContentPageProps) {
    return (
        <div className={classes.wrapper}>
            <Navbar />
            <main className={classes.main}>
                <div className={classes.hero}>
                    <div className="container">
                        <h1 className={classes.title}>{title}</h1>
                        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
                    </div>
                </div>
                <div className={classes.content}>
                    <div className="container">
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
