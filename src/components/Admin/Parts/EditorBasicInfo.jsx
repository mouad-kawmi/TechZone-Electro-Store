import React from 'react';
import { Info, ChevronDown, ChevronRight } from 'lucide-react';

const EditorBasicInfo = ({
    product, onUpdateField, catQuery, setCatQuery, showCatSuggestions, setShowCatSuggestions,
    existingCats, brandQuery, setBrandQuery, showBrandSuggestions, setShowBrandSuggestions,
    existingBrandsForCat
}) => {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Info className="size-4" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-display">Informations Essentielles</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-12 lg:col-span-4 space-y-3 group">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Titre du Produit</label>
                    <input
                        value={product.title} onChange={e => onUpdateField('title', e.target.value)}
                        className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-xl px-5 text-sm font-black outline-none dark:text-white transition-all focus:bg-white dark:focus:bg-slate-900"
                        placeholder="Ex: iPhone 16 Pro Max..."
                    />
                </div>

                <div className="md:col-span-6 lg:col-span-4 space-y-3 relative">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Catégorie</label>
                    <div className="relative group/field">
                        <input
                            value={catQuery}
                            onChange={e => {
                                setCatQuery(e.target.value);
                                onUpdateField('category', e.target.value);
                                setShowCatSuggestions(true);
                            }}
                            onFocus={() => setShowCatSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowCatSuggestions(false), 200)}
                            className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-xl px-5 text-sm font-black outline-none dark:text-white transition-all focus:bg-white dark:focus:bg-slate-900 pr-10"
                        />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        {showCatSuggestions && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-[600] overflow-hidden max-h-48 overflow-y-auto">
                                {(catQuery === product.category || !catQuery ? existingCats : existingCats.filter(c => c.toLowerCase().includes(catQuery.toLowerCase()))).map(cat => (
                                    <button
                                        key={cat} type="button"
                                        onClick={() => { onUpdateField('category', cat); setCatQuery(cat); setShowCatSuggestions(false); }}
                                        className={`w-full text-left px-5 py-3 text-xs font-black uppercase flex items-center justify-between ${cat === product.category ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                    >
                                        {cat}
                                        <ChevronRight className="size-3" />
                                    </button>
                                ))}
                                {catQuery && !existingCats.some(c => c.toLowerCase() === catQuery.toLowerCase()) && (
                                    <button type="button" onClick={() => { onUpdateField('category', catQuery); setShowCatSuggestions(false); }} className="w-full text-left px-5 py-3 text-[10px] font-black text-blue-600 bg-blue-50/50 italic border-t border-slate-100">
                                        + Ajouter "{catQuery}"
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-6 lg:col-span-4 space-y-3 relative">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Marque</label>
                    <div className="relative group/field">
                        <input
                            value={brandQuery}
                            onChange={e => {
                                setBrandQuery(e.target.value);
                                onUpdateField('brand', e.target.value);
                                setShowBrandSuggestions(true);
                            }}
                            onFocus={() => setShowBrandSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowBrandSuggestions(false), 200)}
                            className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-xl px-5 text-sm font-black outline-none dark:text-white transition-all focus:bg-white dark:focus:bg-slate-900 pr-10"
                        />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        {showBrandSuggestions && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-[600] overflow-hidden max-h-48 overflow-y-auto">
                                {(brandQuery === product.brand || !brandQuery ? existingBrandsForCat : existingBrandsForCat.filter(b => b.toLowerCase().includes(brandQuery.toLowerCase()))).map(brand => (
                                    <button
                                        key={brand} type="button"
                                        onClick={() => { onUpdateField('brand', brand); setBrandQuery(brand); setShowBrandSuggestions(false); }}
                                        className={`w-full text-left px-5 py-3 text-xs font-black uppercase flex items-center justify-between ${brand === product.brand ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                    >
                                        {brand}
                                        <ChevronRight className="size-3" />
                                    </button>
                                ))}
                                {brandQuery && !existingBrandsForCat.some(b => b.toLowerCase() === brandQuery.toLowerCase()) && (
                                    <button type="button" onClick={() => { onUpdateField('brand', brandQuery); setShowBrandSuggestions(false); }} className="w-full text-left px-5 py-3 text-[10px] font-black text-blue-600 bg-blue-50/50 italic border-t border-slate-100">
                                        + Ajouter "{brandQuery}"
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Prix (DH)</label>
                    <input type="number" value={product.price} onChange={e => onUpdateField('price', Math.max(0, Number(e.target.value)))} className="w-full h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 text-xs font-black text-blue-600 dark:text-blue-400 outline-none" />
                </div>
                <div className="space-y-2 group">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">
                        Stock Global {product.variations?.storage?.length > 0 && "(Calculé)"}
                    </label>
                    <input
                        type="number"
                        value={product.stock}
                        onChange={e => onUpdateField('stock', Math.max(0, Number(e.target.value)))}
                        readOnly={product.variations?.storage?.length > 0}
                        className={`w-full h-10 border border-slate-200 dark:border-slate-800 rounded-lg px-4 text-xs font-black outline-none transition-all ${product.variations?.storage?.length > 0 ? 'bg-slate-100 dark:bg-slate-900 text-slate-400 cursor-not-allowed border-dashed' : 'bg-slate-50 dark:bg-slate-950 dark:text-white focus:border-blue-600'}`}
                    />
                </div>
            </div>
        </section>
    );
};

export default EditorBasicInfo;
