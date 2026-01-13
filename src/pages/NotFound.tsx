import { useNavigate } from 'react-router-dom';
import classes from './NotFound.module.css';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.errorCode}>404</h1>
            <h2 className={classes.title}>Page Not Found</h2>
            <p className={classes.description}>
                Oops! The page you are looking for has vanished into the digital void.
            </p>
            <button onClick={() => navigate('/dashboard')} className={classes.backBtn}>
                Back to Dashboard
            </button>
        </div>
    );
}
