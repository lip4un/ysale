import { Bell, X } from 'lucide-react';
import { useState } from 'react';
import classes from './NotificationCenter.module.css';

export function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Campaign "Summer Sale" approved', time: '2m ago', read: false },
        { id: 2, text: 'Budget limit reached for Meta Ads', time: '1h ago', read: false },
        { id: 3, text: 'Weekly report is ready', time: '5h ago', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <div className={classes.wrapper}>
            <button className={classes.trigger} onClick={() => setIsOpen(!isOpen)}>
                <Bell size={20} />
                {unreadCount > 0 && <span className={classes.badge}>{unreadCount}</span>}
            </button>

            {isOpen && (
                <>
                    <div className={classes.overlay} onClick={() => setIsOpen(false)} />
                    <div className={classes.panel}>
                        <div className={classes.header}>
                            <h3>Notifications</h3>
                            <button onClick={() => setIsOpen(false)}><X size={16} /></button>
                        </div>

                        <div className={classes.list}>
                            {notifications.map(n => (
                                <div
                                    key={n.id}
                                    className={`${classes.item} ${!n.read ? classes.unread : ''}`}
                                    onClick={() => markAsRead(n.id)}
                                >
                                    <p>{n.text}</p>
                                    <span>{n.time}</span>
                                </div>
                            ))}
                            {notifications.length === 0 && (
                                <div className={classes.empty}>No new notifications</div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
