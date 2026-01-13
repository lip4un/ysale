import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import classes from './DateRangePicker.module.css';

export function DateRangePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState('Last 30 Days');

    const ranges = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month'];

    return (
        <div className={classes.wrapper}>
            <button className={classes.trigger} onClick={() => setIsOpen(!isOpen)}>
                <CalendarIcon size={16} />
                <span>{selectedRange}</span>
                <ChevronDown size={14} />
            </button>

            {isOpen && (
                <>
                    <div className={classes.overlay} onClick={() => setIsOpen(false)} />
                    <div className={classes.dropdown}>
                        {ranges.map(range => (
                            <button
                                key={range}
                                className={classes.option}
                                onClick={() => {
                                    setSelectedRange(range);
                                    setIsOpen(false);
                                }}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
