import React, { useState } from 'react';
import { ShoppingCart, Heart, Plus, CheckCircle2, Truck, ShieldCheck, Star } from 'lucide-react';

const ProductConfig = ({ product, onAddToCart, onToggleWishlist, wishlistItems }) => {
    const s1 = product.variations?.storage?.[0];
    const [cap, setCap] = useState(typeof s1 === 'object' ? s1.name : s1);
    const [col, setCol] = useState(product.variations?.colors?.[0]);
    const [qty, setQty] = useState(1);
    const [showFullDesc, setShowFullDesc] = useState(false);

    // Reset state on product change
    React.useEffect(() => {
        const resetS1 = product.variations?.storage?.[0];
        setCap(typeof resetS1 === 'object' ? resetS1.name : resetS1);
        setCol(product.variations?.colors?.[0]);
        setQty(1);
        setShowFullDesc(false);
    }, [product.id]);

    let stock = product.stock;
    if (product.variations?.storage) {
        const v = product.variations.storage.find(x =>
            (typeof x === 'object' ? x.name : x) === cap
        );
        stock = typeof v === 'object' ? v.stock : product.stock;
    }

    const onAdd = () => {
        onAddToCart({ ...product, selectedColor: col, selectedStorage: cap, quantity: qty });
    };

    return (
        <div className="lg:col-span-5">
            <div className="space-y-6 sm:space-y-10 bg-white dark:bg-slate-900 p-6 sm:p-10 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] sm:rounded-[4rem] shadow-sm sticky top-8">
                <div className="space-y-4 sm:space-y-8">
                    <div className="flex items-center justify-between">
                        <span className="bg-blue-600 text-white px-3 sm:px-5 py-2 rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">{product.brand}</span>
                        <div className={`flex items-center gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {product.stock > 0 ? `En Stock` : 'Épuisé'}
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-tight font-display">{product.title}</h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-900/30">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`size-3 ${i < Math.floor(product.rating || 5) ? 'text-amber-500 fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
                                ))}
                            </div>
                            <span className="text-[10px] font-black text-amber-600 dark:text-amber-500">{product.rating || '5.0'}</span>
                        </div>
                        <button
                            onClick={() => {
                                const el = document.getElementById('product-tabs');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                                window.dispatchEvent(new CustomEvent('open-reviews-tab'));
                            }}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors border-b border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-600"
                        >
                            Lire les {product.reviews || 0} avis clients
                        </button>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
                        <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">{product.price.toLocaleString()} <span className="text-lg sm:text-xl">DH</span></p>
                        {product.oldPrice && <p className="text-lg sm:text-2xl font-black text-slate-300 line-through">{product.oldPrice.toLocaleString()} DH</p>}
                    </div>
                    <div className="space-y-2">
                        <p className={`text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed ${!showFullDesc && 'line-clamp-3'}`}>
                            {product.description}
                        </p>
                        {product.description?.length > 150 && (
                            <button
                                onClick={() => setShowFullDesc(!showFullDesc)}
                                className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-500"
                            >
                                {showFullDesc ? 'Lire moins' : 'Lire plus'}
                            </button>
                        )}
                    </div>
                </div>

                {product.variations?.colors && (
                    <div className="space-y-3 sm:space-y-4">
                        {col && <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Couleur : {col}</span>}
                        <div className="flex gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                            {product.variations.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setCol(color)}
                                    className={`group relative size-12 rounded-2xl border-2 transition-all flex items-center justify-center shrink-0 ${col === color ? 'border-blue-600 scale-110' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                                        }`}
                                    title={color}
                                >
                                    <div className="size-8 rounded-xl border border-white/20 shadow-inner" style={{ backgroundColor: color.toLowerCase() }} />
                                    {col === color && (
                                        <div className="absolute -top-1 -right-1 size-4 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                                            <CheckCircle2 className="size-2 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {product.variations?.storage && (
                    <div className="space-y-3 sm:space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Capacité</span>
                        <div className="flex flex-wrap gap-3">
                            {product.variations.storage.map((item, idx) => {
                                const name = typeof item === 'object' ? item.name : item;
                                const avail = (typeof item === 'object' ? item.stock : 10) > 0;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => avail && setCap(name)}
                                        className={`group relative px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${cap === name
                                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105'
                                            : avail
                                                ? 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
                                                : 'bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-600 border border-slate-100 dark:border-slate-800 cursor-not-allowed'
                                            }`}
                                    >
                                        <span className={!avail ? 'line-through decoration-slate-400' : ''}>{name}</span>
                                        {!avail && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[7px] px-1.5 py-0.5 rounded-full shadow-lg font-black scale-90">Rupture</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                        <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-2xl p-2 border border-slate-100 dark:border-slate-700">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-10 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"><Plus className="size-4 rotate-45" /></button>
                            <span className="w-12 text-center text-xs font-black dark:text-white">{qty}</span>
                            <button onClick={() => qty < stock && setQty(qty + 1)} className={`size-10 flex items-center justify-center transition-colors ${qty >= stock ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-blue-600'}`}><Plus className="size-4" /></button>
                        </div>
                        <div className="flex-1 flex gap-3">
                            <button
                                disabled={product.stock <= 0}
                                onClick={onAdd}
                                className="flex-1 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 text-white font-black py-4 sm:py-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl transition-all uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-4 group"
                            >
                                <ShoppingCart className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                                Ajouter
                            </button>
                            <button
                                onClick={() => onToggleWishlist(product)}
                                className={`size-14 sm:size-[4.5rem] rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center transition-all border-2 ${wishlistItems.some(item => item.id === product.id)
                                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:border-rose-200'
                                    }`}
                            >
                                <Heart className={`size-6 ${wishlistItems.some(item => item.id === product.id) ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/20">
                            <Truck className="size-5 text-blue-600 flex-shrink-0" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 dark:text-blue-200">Livraison 24/48H</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100/50 dark:border-emerald-900/20">
                            <ShieldCheck className="size-5 text-emerald-600 flex-shrink-0" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 dark:text-emerald-200">Garantie 12 Mois</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductConfig;
