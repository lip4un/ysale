import { useState, useEffect } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';
import classes from './OnboardingTour.module.css';

interface Step {
    target: string;
    title: string;
    content: string;
    position: 'bottom' | 'top' | 'right';
}

export function OnboardingTour() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Check if tour has been shown before
        const hasSeenTour = localStorage.getItem('ysale_tour_seen');
        if (!hasSeenTour) {
            setTimeout(() => setIsVisible(true), 1000); // Delay for effect
        }
    }, []);

    const steps: Step[] = [
        {
            target: 'body', // Fallback for center modal
            title: 'Welcome to ySale! 🚀',
            content: 'Let us show you around your new command center for Meta & Google Ads.',
            position: 'bottom'
        },
        {
            target: 'header', // Ideally specific IDs, but using generic positioning for demo
            title: 'Your Dashboard',
            content: 'Here you can see all your key metrics in one place. Use the Date Picker to filter data.',
            position: 'bottom'
        },
        {
            target: 'aside',
            title: 'Navigation',
            content: 'Access your Campaigns, Creative Library, and Competitor Spy tool from this sidebar.',
            position: 'right'
        },
        {
            target: 'button[title="Connect Accounts"]', // Might need specific ID
            title: 'Connect Platforms',
            content: 'Don\'t forget to connect your Google and Meta accounts to start seeing real data.',
            position: 'top'
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('ysale_tour_seen', 'true');
    };

    if (!isVisible) return null;

    const step = steps[currentStep];

    return (
        <div className={classes.overlay}>
            <div className={classes.spotlightLayer} />

            <div className={classes.card} data-position={step.position}>
                <div className={classes.header}>
                    <span className={classes.stepCount}>Step {currentStep + 1} of {steps.length}</span>
                    <button onClick={handleClose} className={classes.closeBtn}><X size={16} /></button>
                </div>

                <h2>{step.title}</h2>
                <p>{step.content}</p>

                <div className={classes.footer}>
                    <button onClick={handleClose} className={classes.skipBtn}>Skip Tour</button>
                    <button onClick={handleNext} className={classes.nextBtn}>
                        {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                        {currentStep === steps.length - 1 ? <Check size={16} /> : <ChevronRight size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
