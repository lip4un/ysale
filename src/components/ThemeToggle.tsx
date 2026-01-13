import { useTheme } from '../context/ThemeContext';
import classes from './ThemeToggle.module.css';

export function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className={classes.wrapper}>
            <input
                type="checkbox"
                id="dark-mode-toggle"
                checked={isDark}
                onChange={toggleTheme}
                className={classes.input}
            />
            <label htmlFor="dark-mode-toggle" className={classes.label}>
                <span className={classes.labelText}>{isDark ? 'Dark' : 'Light'}</span>
            </label>
        </div>
    );
}
