import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { X, Sparkles, Zap } from 'lucide-react';

// Parts
import EditorBasicInfo from './Parts/EditorBasicInfo';
import EditorVariations from './Parts/EditorVariations';
import EditorSpecs from './Parts/EditorSpecs';
import EditorImageUpload from './Parts/EditorImageUpload';

const AdminProductEditor = ({
    isOpen, onClose, product, allProducts, onSave, onUpdateField, onAddSpec, onRemoveSpec,
    onAddVariation, onUpdateVariation, onRemoveVariation
}) => {
    const fileInputRef = useRef(null);
    const [catQuery, setCatQuery] = useState('');
    const [brandQuery, setBrandQuery] = useState('');
    const [showCatSuggestions, setShowCatSuggestions] = useState(false);
    const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);

    const { customCategories, customBrands } = useSelector(state => state.products);

    const existingCats = useMemo(() => {
        const productCats = (allProducts || []).map(p => p.category).filter(Boolean);
        return [...new Set([...productCats, ...customCategories])].sort();
    }, [allProducts, customCategories]);

    const existingBrandsForCat = useMemo(() => {
        const cats = (allProducts || []);
        const filtered = product?.category ? cats.filter(p => p.category === product.category) : cats;
        const brandNames = filtered.map(p => p.brand).filter(Boolean);
        const filteredCustom = product?.category ? customBrands.filter(b => b.category === product.category) : customBrands;
        return [...new Set([...brandNames, ...filteredCustom.map(b => b.name)])].sort();
    }, [allProducts, product?.category, customBrands]);

    useEffect(() => {
        if (product) {
            setCatQuery(product.category || '');
            setBrandQuery(product.brand || '');
        }
    }, [product?.id, isOpen]);

    useEffect(() => {
        if (product?.variations?.storage?.length > 0) {
            const totalStock = product.variations.storage.reduce((acc, item) => acc + (item.stock || 0), 0);
            if (product.stock !== totalStock) onUpdateField('stock', totalStock);
        }
    }, [product?.variations?.storage, onUpdateField, product?.stock]);

    if (!isOpen || !product) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => onUpdateField('image', reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 lg:p-6">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl animate-fade-in" onClick={onClose} />
            <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] lg:h-[80vh] animate-fade-up">

                {/* Header */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/20 border-b flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
                            <Sparkles className="size-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display">
                                {product.id ? 'Modifier Produit' : 'Nouveau Produit'}
                            </h3>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Configurateur Elite</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="size-10 flex items-center justify-center bg-white dark:bg-slate-900 border rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                        <X className="size-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 lg:p-8 space-y-8 custom-scrollbar">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        <div className="xl:col-span-7 space-y-8">
                            <EditorBasicInfo
                                product={product} onUpdateField={onUpdateField}
                                catQuery={catQuery} setCatQuery={setCatQuery} showCatSuggestions={showCatSuggestions} setShowCatSuggestions={setShowCatSuggestions}
                                existingCats={existingCats}
                                brandQuery={brandQuery} setBrandQuery={setBrandQuery} showBrandSuggestions={showBrandSuggestions} setShowBrandSuggestions={setShowBrandSuggestions}
                                existingBrandsForCat={existingBrandsForCat}
                            />

                            <section className="bg-slate-50 dark:bg-slate-950/20 p-6 rounded-2xl border space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                        <Zap className="size-4" />
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-widest dark:text-white font-display">Promotion & Visibilité</h4>
                                </div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={product.isNew} onChange={e => onUpdateField('isNew', e.target.checked)} className="peer sr-only" />
                                    <div className="w-10 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer-checked:bg-blue-600 transition-all relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 peer-checked:after:translate-x-5"></div>
                                    <span className="text-[9px] font-black uppercase text-slate-600 dark:text-slate-400">Badge Nouveau</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Ancien Prix (DH)</label>
                                        <input type="number" value={product.oldPrice || 0} onChange={e => onUpdateField('oldPrice', Number(e.target.value))} className="w-full h-10 bg-white dark:bg-slate-950 border rounded-lg px-4 text-xs font-black dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Fin Promo</label>
                                        <input type="datetime-local" value={product.promoExpiresAt || ''} onChange={e => onUpdateField('promoExpiresAt', e.target.value)} className="w-full h-10 bg-white dark:bg-slate-950 border rounded-lg px-4 text-[9px] font-black dark:text-white" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="xl:col-span-5 space-y-8">
                            <EditorImageUpload product={product} onUpdateField={onUpdateField} fileInputRef={fileInputRef} handleImageUpload={handleImageUpload} />
                            <EditorVariations product={product} onAddVariation={onAddVariation} onUpdateVariation={onUpdateVariation} onRemoveVariation={onRemoveVariation} />
                            <EditorSpecs product={product} onAddSpec={onAddSpec} onRemoveSpec={onRemoveSpec} onUpdateField={onUpdateField} />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/20 border-t flex flex-col sm:flex-row justify-end items-center gap-4 shrink-0">
                    <button onClick={onClose} className="w-full sm:w-auto px-6 py-2 text-[9px] font-black uppercase text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Annuler</button>
                    <button onClick={onSave} className="w-full sm:w-auto px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-blue-600/20">Sauvegarder l-Elite</button>
                </div>
            </div>
        </div>
    );
};

export default AdminProductEditor;
