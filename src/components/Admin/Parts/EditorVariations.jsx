import React from 'react';
import { Database, Palette, Trash2, X } from 'lucide-react';

const EditorVariations = ({ product, onAddVariation, onUpdateVariation, onRemoveVariation }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center gap-2">
                        <Database className="size-4 text-blue-600" />
                        <h4 className="text-[10px] font-black uppercase text-slate-400">Stocks par Capacité</h4>
                    </div>
                    <button type="button" onClick={() => onAddVariation('storage')} className="text-blue-600 text-[9px] font-black uppercase underline decoration-2 underline-offset-4">+ Ajouter</button>
                </div>
                <div className="space-y-3">
                    {product.variations?.storage?.map((item, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl group/var">
                            <div className="flex-1 space-y-1">
                                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-2">Capacité / Taille</span>
                                <input
                                    value={typeof item === 'object' ? item.name : item}
                                    onChange={e => onUpdateVariation('storage', idx, typeof item === 'object' ? { ...item, name: e.target.value } : e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-transparent focus:border-blue-500/30 rounded-xl px-4 py-2 text-[10px] font-black dark:text-white outline-none"
                                    placeholder="Ex: 256GB"
                                />
                            </div>
                            <div className="w-24 space-y-1">
                                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-2">Stock</span>
                                <input
                                    type="number"
                                    value={typeof item === 'object' ? item.stock : 10}
                                    onChange={e => onUpdateVariation('storage', idx, typeof item === 'object' ? { ...item, stock: Math.max(0, Number(e.target.value)) } : { name: item, stock: Math.max(0, Number(e.target.value)) })}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-transparent focus:border-blue-500 rounded-xl px-3 py-2 text-[10px] font-black text-center dark:text-white outline-none"
                                />
                            </div>
                            <div className="flex items-end pb-1.5">
                                <button type="button" onClick={() => onRemoveVariation('storage', idx)} className="p-2 text-slate-300 hover:text-rose-500 transition-all">
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                    <div className="flex items-center gap-2">
                        <Palette className="size-4 text-emerald-600" />
                        <h4 className="text-[10px] font-black uppercase text-slate-400">Couleurs</h4>
                    </div>
                    <button type="button" onClick={() => onAddVariation('colors')} className="text-emerald-600 text-[9px] font-black uppercase underline decoration-2 underline-offset-4">+ Ajouter</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {product.variations?.colors?.map((color, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl group/color animate-fade-up">
                            <div className="size-8 rounded-xl border-4 border-white dark:border-slate-800 shadow-lg" style={{ backgroundColor: color.toLowerCase() }} />
                            <input
                                value={color}
                                onChange={e => onUpdateVariation('colors', idx, e.target.value)}
                                className="w-24 bg-transparent text-[10px] font-black uppercase dark:text-white outline-none tracking-widest"
                                placeholder="Nom Couleur"
                            />
                            <button type="button" onClick={() => onRemoveVariation('colors', idx)} className="opacity-0 group-hover/color:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all">
                                <X className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EditorVariations;
