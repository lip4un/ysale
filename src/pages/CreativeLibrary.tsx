import classes from './CreativeLibrary.module.css';
import { Filter, Download, ExternalLink, Image as ImageIcon, PlayCircle } from 'lucide-react';

export function CreativeLibrary() {
    const creatives = [
        { id: 1, name: 'Summer Sale - V1', type: 'image', ctr: '2.4%', cpc: '$0.45', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=400&q=80' },
        { id: 2, name: 'Product Demo - Reel', type: 'video', ctr: '3.1%', cpc: '$0.32', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80' },
        { id: 3, name: 'Retargeting Poster', type: 'image', ctr: '1.8%', cpc: '$0.80', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80' },
        { id: 4, name: 'Black Friday Teaser', type: 'video', ctr: '4.5%', cpc: '$0.28', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
        { id: 5, name: 'User Testimonial', type: 'video', ctr: '2.9%', cpc: '$0.50', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=400&q=80' },
        { id: 6, name: 'Lifestyle Shot', type: 'image', ctr: '2.1%', cpc: '$0.65', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
    ];

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <div>
                    <h1>Creative Library</h1>
                    <p>Analyze visual performance of your active ads.</p>
                </div>
                <div className={classes.controls}>
                    <button className={classes.filterBtn}><Filter size={16} /> Filter</button>
                    <button className={classes.primaryBtn}>Upload New</button>
                </div>
            </header>

            <div className={classes.grid}>
                {creatives.map(item => (
                    <div key={item.id} className={classes.card}>
                        <div className={classes.imageWrapper}>
                            <img src={item.image} alt={item.name} />
                            <div className={classes.typeBadge}>
                                {item.type === 'video' ? <PlayCircle size={14} /> : <ImageIcon size={14} />}
                                {item.type === 'video' ? 'Video' : 'Image'}
                            </div>
                        </div>
                        <div className={classes.content}>
                            <h4>{item.name}</h4>

                            <div className={classes.stats}>
                                <div className={classes.stat}>
                                    <span>CTR</span>
                                    <strong>{item.ctr}</strong>
                                </div>
                                <div className={classes.stat}>
                                    <span>CPC</span>
                                    <strong>{item.cpc}</strong>
                                </div>
                            </div>

                            <div className={classes.actions}>
                                <button className={classes.actionBtn}><Download size={16} /></button>
                                <button className={classes.actionBtn}><ExternalLink size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
