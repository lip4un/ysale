import { useState } from 'react';
import { Plus, Trash2, Zap, Play, Pause, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import classes from './SmartRules.module.css';
import { useAppContext } from '../context/AppContext';

export function SmartRules() {
    const { rules, addRule, toggleRuleStatus, deleteRule } = useAppContext();
    const [isCreating, setIsCreating] = useState(false);
    const [newRule, setNewRule] = useState({
        name: '',
        conditionMetric: 'CPC',
        conditionOperator: '>',
        conditionValue: '',
        action: 'Pause Campaign'
    });

    const handleToggle = (id: string) => {
        toggleRuleStatus(id);
        toast.success("Rule status updated");
    };

    const handleDelete = (id: string) => {
        deleteRule(id);
        toast.error("Rule deleted");
    };

    const handleSave = () => {
        if (!newRule.name || !newRule.conditionValue) {
            toast.error("Please fill in all fields");
            return;
        }

        addRule(newRule);
        setIsCreating(false);
        setNewRule({
            name: '',
            conditionMetric: 'CPC',
            conditionOperator: '>',
            conditionValue: '',
            action: 'Pause Campaign'
        });
        toast.success("New automation rule created!");
    };

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <div>
                    <h1>Smart Rules</h1>
                    <p>Automate your optimization strategy 24/7.</p>
                </div>
                <button className={classes.createBtn} onClick={() => setIsCreating(true)}>
                    <Plus size={18} />
                    Create Rule
                </button>
            </header>

            {isCreating && (
                <div className={classes.builderCard}>
                    <div className={classes.builderHeader}>
                        <h3>New Automation Rule</h3>
                        <span className={classes.betaTag}>BETA</span>
                    </div>

                    <div className={classes.formGroup}>
                        <label>Rule Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Pause High CPA"
                            value={newRule.name || ''}
                            onChange={e => setNewRule({ ...newRule, name: e.target.value })}
                        />
                    </div>

                    <div className={classes.logicRow}>
                        <div className={classes.logicBlock}>
                            <span className={classes.logicLabel}>IF</span>
                            <select
                                value={newRule.conditionMetric}
                                onChange={e => setNewRule({ ...newRule, conditionMetric: e.target.value })}
                            >
                                <option value="CPC">CPC (Cost Per Click)</option>
                                <option value="CPA">CPA (Cost Per Acquisition)</option>
                                <option value="ROAS">ROAS</option>
                                <option value="CTR">CTR</option>
                            </select>
                            <select
                                value={newRule.conditionOperator}
                                onChange={e => setNewRule({ ...newRule, conditionOperator: e.target.value })}
                            >
                                <option value=">">is greater than</option>
                                <option value="<">is less than</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Value"
                                value={newRule.conditionValue || ''}
                                onChange={e => setNewRule({ ...newRule, conditionValue: e.target.value })}
                            />
                        </div>

                        <div className={classes.logicArrow}>➜</div>

                        <div className={classes.logicBlock}>
                            <span className={classes.logicLabel}>THEN</span>
                            <select
                                value={newRule.action}
                                onChange={e => setNewRule({ ...newRule, action: e.target.value })}
                            >
                                <option value="Pause Campaign">Pause Campaign</option>
                                <option value="Pause Ad">Pause Ad</option>
                                <option value="Increase Budget 20%">Increase Budget 20%</option>
                                <option value="Decrease Budget 20%">Decrease Budget 20%</option>
                                <option value="Send Notification">Send Notification Only</option>
                            </select>
                        </div>
                    </div>

                    <div className={classes.builderActions}>
                        <button className={classes.cancelBtn} onClick={() => setIsCreating(false)}>Cancel</button>
                        <button className={classes.saveBtn} onClick={handleSave}>Save Rule</button>
                    </div>
                </div>
            )}

            <div className={classes.rulesGrid}>
                {rules.map(rule => (
                    <div key={rule.id} className={`${classes.ruleCard} ${!rule.isActive ? classes.inactive : ''}`}>
                        <div className={classes.cardHeader}>
                            <div className={classes.iconBox}>
                                <Zap size={20} />
                            </div>
                            <div className={classes.ruleInfo}>
                                <h3>{rule.name}</h3>
                                <div className={classes.logicSummary}>
                                    If <strong>{rule.conditionMetric} {rule.conditionOperator} {rule.conditionValue}</strong> then <strong>{rule.action}</strong>
                                </div>
                            </div>
                            <div className={classes.statusToggle}>
                                <button
                                    className={rule.isActive ? classes.activeBtn : classes.inactiveBtn}
                                    onClick={() => handleToggle(rule.id)}
                                    title={rule.isActive ? "Pause Rule" : "Activate Rule"}
                                >
                                    {rule.isActive ? <Pause size={16} /> : <Play size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className={classes.cardFooter}>
                            <span className={classes.frequency}>Runs every 15 mins</span>
                            <button className={classes.deleteBtn} onClick={() => handleDelete(rule.id)}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {rules.length === 0 && !isCreating && (
                <div className={classes.emptyState}>
                    <AlertTriangle size={48} className={classes.emptyIcon} />
                    <h3>No rules active</h3>
                    <p>Creating rules helps you sleep better at night.</p>
                </div>
            )}
        </div>
    );
}
