import classes from './Skeleton.module.css';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

export function Skeleton({ width, height, borderRadius, className, style }: SkeletonProps) {
    const styles: React.CSSProperties = {
        width,
        height,
        borderRadius,
        ...style,
    };

    return (
        <div
            className={`${classes.skeleton} ${className || ''}`}
            style={styles}
        />
    );
}
