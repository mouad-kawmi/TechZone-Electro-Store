
import React from 'react';
import { X, Sparkles, Zap, Settings, Trash2, Save, Image as ImageIcon, Box, ListTodo, Info } from 'lucide-react';

const AdminProductEditor = ({ isOpen, product, onClose, onSave, onUpdateField, onAddSpec, onRemoveSpec }) => {
    const fileInputRef = React.useRef(null);

    if (!isOpen || !product) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdateField('image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 lg:p-6 transition-all duration-500">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl animate-fade-in" onClick={onClose} />
            <div className="relative w-full max-w-5xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] lg:h-[80vh] animate-fade-up selection:bg-blue-600/20 selection:text-blue-600">

                {/* Elite Modal Header */}
                <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30 group">
                            <Sparkles className="size-5 group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display leading-none">
                                {product.id ? 'Modifier Elite' : 'Nouveau Elite'}
                            </h3>
                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">Product Configuration Module</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="group size-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm">
                        <X className="size-4 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 custom-scrollbar">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Information Columns */}
                        <div className="lg:col-span-12 xl:col-span-7 space-y-8">

                            {/* General Section */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                                    <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <Info className="size-4" />
                                    </div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-display">Informations l-Baqi (Essentials)</h4>
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Elite Product Title</label>
                                    <input
                                        value={product.title} onChange={e => onUpdateField('title', e.target.value)}
                                        className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-xl px-5 text-sm font-black outline-none dark:text-white transition-all focus:bg-white dark:focus:bg-slate-900"
                                        placeholder="Ex: iPhone 16 Pro Max Ultra..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 group">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Prix de Vente (DH)</label>
                                        <input
                                            type="number"
                                            value={product.price}
                                            onChange={e => onUpdateField('price', Number(e.target.value))}
                                            className="w-full h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-4 text-xs font-black outline-none text-blue-600 dark:text-blue-400 focus:bg-white dark:focus:bg-slate-900"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Stock Actuel</label>
                                        <input
                                            type="number"
                                            value={product.stock}
                                            onChange={e => onUpdateField('stock', Number(e.target.value))}
                                            className="w-full h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-4 text-xs font-black outline-none dark:text-white focus:bg-white dark:focus:bg-slate-900"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Marketing & Discount */}
                            <section className="bg-slate-50/50 dark:bg-slate-950/20 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                        <Zap className="size-4" />
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-widest dark:text-white font-display">Promotion & Visibilité</h4>
                                </div>

                                <div className="flex items-center gap-8 px-1">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={product.isNew}
                                                onChange={e => onUpdateField('isNew', e.target.checked)}
                                                className="peer sr-only"
                                            />
                                            <div className="w-10 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:bg-blue-600 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                                        </div>
                                        <span className="text-[9px] font-black uppercase text-slate-600 dark:text-slate-400 tracking-wider">Badge Elite New</span>
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2 group">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Ancien Prix (DH)</label>
                                        <input
                                            type="number"
                                            value={product.oldPrice || 0}
                                            onChange={e => onUpdateField('oldPrice', Number(e.target.value))}
                                            className="w-full h-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-500 rounded-lg px-4 text-xs font-black outline-none dark:text-white transition-all"
                                            placeholder="Ex: 9999"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Fin de Promotion (Date)</label>
                                        <input
                                            type="datetime-local"
                                            value={product.promoExpiresAt || ''}
                                            onChange={e => onUpdateField('promoExpiresAt', e.target.value)}
                                            className="w-full h-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-4 text-[9px] font-black outline-none dark:text-white transition-all"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Media & Specs */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-8">

                            {/* Graphic Module */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-3 font-display">Aperçu Elite Image</label>
                                <div className="bg-slate-50 dark:bg-slate-950/20 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 flex items-center justify-center aspect-video sm:aspect-square md:aspect-video xl:aspect-square relative group overflow-hidden shadow-inner">
                                    {product.image ? (
                                        <img src={product.image} className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-1000" alt="Preview" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-4 text-slate-300 dark:text-slate-700">
                                            <ImageIcon className="size-10 stroke-1" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Pas d'Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3 px-1">
                                            <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Source l-Image</label>
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="text-[8px] font-black uppercase text-blue-600 hover:text-blue-500 transition-colors"
                                            >
                                                Upload Local File
                                            </button>
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                        <input
                                            value={product.image}
                                            onChange={e => onUpdateField('image', e.target.value)}
                                            className="w-full h-10 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg px-4 text-[9px] font-bold outline-none dark:text-white focus:border-blue-500 transition-all"
                                            placeholder="Paste URL or upload local file..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tech Section */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                                    <div className="flex items-center gap-2">
                                        <Settings className="size-4 text-slate-400" />
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-display">Fiche Technique</h4>
                                    </div>
                                    <button
                                        onClick={onAddSpec}
                                        className="text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        + Ajouter Caractéristique
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {Object.entries(product.specs || {}).map(([key, val], idx) => (
                                        <div key={idx} className="flex gap-3 p-3 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl animate-fade-up relative group">
                                            <input
                                                value={key} onChange={e => {
                                                    const newSpecs = { ...product.specs };
                                                    const oldVal = newSpecs[key];
                                                    delete newSpecs[key];
                                                    newSpecs[e.target.value] = oldVal;
                                                    onUpdateField('specs', newSpecs);
                                                }}
                                                className="w-1/3 bg-slate-50 dark:bg-slate-900 border-none rounded-lg px-3 py-2 text-[9px] font-black uppercase dark:text-white focus:ring-1 focus:ring-blue-600"
                                                placeholder="Spec"
                                            />
                                            <input
                                                value={val} onChange={e => onUpdateField('specs', { ...product.specs, [key]: e.target.value })}
                                                className="flex-1 bg-slate-50 dark:bg-slate-900 border-none rounded-lg px-3 py-2 text-[10px] font-bold dark:text-white focus:ring-1 focus:ring-blue-600"
                                                placeholder="Valeur"
                                            />
                                            <button
                                                onClick={() => onRemoveSpec(key)}
                                                className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                    {Object.keys(product.specs || {}).length === 0 && (
                                        <div className="h-24 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center">
                                            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Aucune caractéristique définie</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Actions Footer */}
                <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 flex justify-end items-center gap-4 backdrop-blur-md shrink-0">
                    <div className="mr-auto text-[8px] font-black text-slate-400 uppercase tracking-widest hidden md:flex items-center gap-2">
                        <div className="size-1.5 bg-emerald-500 rounded-full"></div>
                        Ready to Update Elite Catalog
                    </div>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl text-[9px] font-black uppercase text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all tracking-widest"
                    >
                        Annuler Modifications
                    </button>
                    <button
                        onClick={onSave}
                        className="relative group h-12 px-8 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all font-display shadow-xl shadow-slate-900/10 dark:shadow-blue-600/20"
                    >
                        <Save className="size-4 group-hover:-translate-y-0.5 transition-transform" />
                        Sauvegarder l-Produit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProductEditor;
