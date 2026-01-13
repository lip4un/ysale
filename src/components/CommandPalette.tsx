import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import {
    CreditCard,
    User,
    LayoutDashboard,
    Target,
    Image,
    Users,
    Search,
    Sparkles,
    Zap,
    LogOut
} from "lucide-react";
import classes from "./CommandPalette.module.css";

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // Toggle with Ctrl+K or Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    if (!open) return null;

    return (
        <div className={classes.overlay} onClick={() => setOpen(false)}>
            <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
                <Command label="Global Command Menu" className={classes.command}>
                    <div className={classes.inputWrapper}>
                        <Command.Input placeholder="Type a command or search..." className={classes.input} />
                        <kbd className={classes.kbd}>ESC</kbd>
                    </div>

                    <Command.List className={classes.list}>
                        <Command.Empty className={classes.empty}>No results found.</Command.Empty>

                        <Command.Group heading="Navigation">
                            <Command.Item onSelect={() => runCommand(() => navigate('/dashboard'))} className={classes.item}>
                                <LayoutDashboard size={14} />
                                <span>Dashboard</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/dashboard/campaigns'))} className={classes.item}>
                                <Target size={14} />
                                <span>Campaigns</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/dashboard/creatives'))} className={classes.item}>
                                <Image size={14} />
                                <span>Creative Library</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/dashboard/audiences'))} className={classes.item}>
                                <Users size={14} />
                                <span>Audience Segments</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/dashboard/competitors'))} className={classes.item}>
                                <Search size={14} />
                                <span>Ad Spy</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Tools">
                            <Command.Item onSelect={() => runCommand(() => navigate('/dashboard/ai'))} className={classes.item}>
                                <Sparkles size={14} />
                                <span>AI Suggestions</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/dashboard/rules'))} className={classes.item}>
                                <Zap size={14} />
                                <span>Smart Rules</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/dashboard/profile'))} className={classes.item}>
                                <User size={14} />
                                <span>Profile</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => navigate('/dashboard/subscription'))} className={classes.item}>
                                <CreditCard size={14} />
                                <span>Billing</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="General">
                            <Command.Item onSelect={() => runCommand(() => navigate('/login'))} className={classes.item}>
                                <LogOut size={14} />
                                <span>Log out</span>
                            </Command.Item>
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
