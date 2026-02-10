import React from 'react';
import { useSelector } from 'react-redux';
import {
    Terminal, Zap, ShieldCheck, Cpu, ChevronRight, LayoutDashboard, Menu, Mail,
    Trash2, Save, Image as ImageIcon, Plus as PlusIcon, Settings, ChevronDown,
    Database, Palette, X, Sparkles, Info
} from 'lucide-react';

const AdminProductEditor = ({
    isOpen, onClose, product, allProducts, onSave, onUpdateField, onAddSpec, onRemoveSpec,
    onAddVariation, onUpdateVariation, onRemoveVariation
}) => {
    const fileInputRef = React.useRef(null);
    const [catQuery, setCatQuery] = React.useState('');
    const [brandQuery, setBrandQuery] = React.useState('');
    const [showCatSuggestions, setShowCatSuggestions] = React.useState(false);
    const [showBrandSuggestions, setShowBrandSuggestions] = React.useState(false);

    const { customCategories, customBrands } = useSelector(state => state.products);

    // Dynamic Lists
    const existingCats = React.useMemo(() => {
        const productCats = (allProducts || []).map(p => p.category).filter(Boolean);
        return [...new Set([...productCats, ...customCategories])].sort();
    }, [allProducts, customCategories]);

    const existingBrandsForCat = React.useMemo(() => {
        if (!product?.category) {
            return [...new Set([...(allProducts || []).map(p => p.brand), ...customBrands.map(b => b.name)].filter(Boolean))].sort();
        }
        const productBrands = (allProducts || [])
            .filter(p => p.category === product.category)
            .map(p => p.brand)
            .filter(Boolean);

        const filteredCustomBrands = customBrands
            .filter(b => b.category === product.category)
            .map(b => b.name);

        return [...new Set([...productBrands, ...filteredCustomBrands])].sort();
    }, [allProducts, product?.category, customBrands]);

    React.useEffect(() => {
        if (product) {
            setCatQuery(product.category || '');
            setBrandQuery(product.brand || '');
        }
    }, [product?.id, isOpen]);

    // Auto-calculate Global Stock from storage variations
    React.useEffect(() => {
        if (product?.variations?.storage?.length > 0) {
            const totalStock = product.variations.storage.reduce((acc, item) => {
                const stockVal = typeof item === 'object' ? (item.stock || 0) : 0;
                return acc + stockVal;
            }, 0);

            if (product.stock !== totalStock) {
                onUpdateField('stock', totalStock);
            }
        }
    }, [product?.variations?.storage, onUpdateField, product?.stock]);

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
            <div className="relative w-full max-w-5xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] lg:h-[80vh] animate-fade-up selection:bg-blue-600/20 selection:text-blue-600">

                {/* Modal Header */}
                <div className="px-5 lg:px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-3 lg:gap-4">
                        <div className="size-9 lg:size-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30 group">
                            <Sparkles className="size-4 lg:size-5 group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                            <h3 className="text-lg lg:text-xl font-black uppercase tracking-tighter dark:text-white font-display leading-none">
                                {product.id ? 'Modifier Elite' : 'Nouveau Elite'}
                            </h3>
                            <p className="text-[8px] lg:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1">Product Configuration Module</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="group size-9 lg:size-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm">
                        <X className="size-4 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 lg:p-8 space-y-8 custom-scrollbar">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Column 1 */}
                        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
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
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-[600] overflow-hidden max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                                                    {(catQuery === product.category || !catQuery ? existingCats : existingCats.filter(c => c.toLowerCase().includes(catQuery.toLowerCase()))).map(cat => (
                                                        <button
                                                            key={cat} type="button"
                                                            onClick={() => { onUpdateField('category', cat); setCatQuery(cat); setShowCatSuggestions(false); }}
                                                            className={`w-full text-left px-5 py-3 text-xs font-black uppercase transition-all flex items-center justify-between group/item ${cat === product.category ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                                        >
                                                            {cat}
                                                            <ChevronRight className={`size-3 transition-all ${cat === product.category ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0'}`} />
                                                        </button>
                                                    ))}
                                                    {catQuery && !existingCats.some(c => c.toLowerCase() === catQuery.toLowerCase()) && (
                                                        <button type="button" onClick={() => { onUpdateField('category', catQuery); setShowCatSuggestions(false); }} className="w-full text-left px-5 py-3 text-[10px] font-black text-blue-600 bg-blue-50/50 dark:bg-blue-500/10 italic border-t border-slate-100 dark:border-slate-800 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
                                                            + Ajouter "{catQuery}" comme nouvelle catégorie
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
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-[600] overflow-hidden max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                                                    {(brandQuery === product.brand || !brandQuery ? existingBrandsForCat : existingBrandsForCat.filter(b => b.toLowerCase().includes(brandQuery.toLowerCase()))).map(brand => (
                                                        <button
                                                            key={brand} type="button"
                                                            onClick={() => { onUpdateField('brand', brand); setBrandQuery(brand); setShowBrandSuggestions(false); }}
                                                            className={`w-full text-left px-5 py-3 text-xs font-black uppercase transition-all flex items-center justify-between group/item ${brand === product.brand ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                                        >
                                                            {brand}
                                                            <ChevronRight className={`size-3 transition-all ${brand === product.brand ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0'}`} />
                                                        </button>
                                                    ))}
                                                    {brandQuery && !existingBrandsForCat.some(b => b.toLowerCase() === brandQuery.toLowerCase()) && (
                                                        <button type="button" onClick={() => { onUpdateField('brand', brandQuery); setShowBrandSuggestions(false); }} className="w-full text-left px-5 py-3 text-[10px] font-black text-blue-600 bg-blue-50/50 dark:bg-blue-500/10 italic border-t border-slate-100 dark:border-slate-800 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
                                                            + Ajouter "{brandQuery}" {product.category ? `dans ${product.category}` : ''}
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
                                        <input type="number" value={product.price} onChange={e => onUpdateField('price', Number(e.target.value))} className="w-full h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 text-xs font-black text-blue-600 dark:text-blue-400 outline-none" />
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

                            <section className="bg-slate-50/50 dark:bg-slate-950/20 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                        <Zap className="size-4" />
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-widest dark:text-white font-display">Promotion & Visibilité</h4>
                                </div>
                                <div className="flex items-center gap-8 px-1">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" checked={product.isNew} onChange={e => onUpdateField('isNew', e.target.checked)} className="peer sr-only" />
                                        <div className="w-10 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer-checked:bg-blue-600 transition-all relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 peer-checked:after:translate-x-5 shadow-inner"></div>
                                        <span className="text-[9px] font-black uppercase text-slate-600 dark:text-slate-400 tracking-wider">Badge New</span>
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-2 group">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Ancien Prix (DH)</label>
                                        <input type="number" value={product.oldPrice || 0} onChange={e => onUpdateField('oldPrice', Number(e.target.value))} className="w-full h-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 text-xs font-black dark:text-white outline-none" />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-3">Fin Promo</label>
                                        <input type="datetime-local" value={product.promoExpiresAt || ''} onChange={e => onUpdateField('promoExpiresAt', e.target.value)} className="w-full h-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 text-[9px] font-black dark:text-white outline-none" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Column 2 */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-3 font-display">Image Principale</label>
                                <div className="bg-slate-50 dark:bg-slate-950/20 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 flex items-center justify-center aspect-video relative group overflow-hidden shadow-inner">
                                    {product.image ? (
                                        <img src={product.image} className="h-full w-full object-contain" alt="Preview" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-4 text-slate-300">
                                            <ImageIcon className="size-10 stroke-1" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Aucune Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3 px-1">
                                            <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Source l-Image</label>
                                            <button
                                                type="button"
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

                            {/* Variations Section */}
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
                                            <div key={idx} className="flex gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl animate-fade-up group/var">
                                                <div className="flex-1 space-y-1">
                                                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-2">Capacité / Taille</span>
                                                    <input
                                                        value={typeof item === 'object' ? item.name : item}
                                                        onChange={e => onUpdateVariation('storage', idx, typeof item === 'object' ? { ...item, name: e.target.value } : e.target.value)}
                                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-transparent focus:border-blue-500/30 rounded-xl px-4 py-2 text-[10px] font-black dark:text-white outline-none transition-all"
                                                        placeholder="Ex: 256GB"
                                                    />
                                                </div>
                                                <div className="w-24 space-y-1">
                                                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-2">Stock</span>
                                                    <div className="relative group/stock">
                                                        <input
                                                            type="number"
                                                            value={typeof item === 'object' ? item.stock : 10}
                                                            onChange={e => onUpdateVariation('storage', idx, typeof item === 'object' ? { ...item, stock: Math.max(0, Number(e.target.value)) } : { name: item, stock: Math.max(0, Number(e.target.value)) })}
                                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-transparent focus:border-blue-500 rounded-xl px-3 py-2 text-[10px] font-black text-center dark:text-white outline-none transition-all appearance-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-end pb-1.5">
                                                    <button type="button" onClick={() => onRemoveVariation('storage', idx)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all">
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
                                            <div key={idx} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl group/color animate-fade-up transition-all hover:border-emerald-500/30">
                                                <div className="size-8 rounded-xl border-4 border-white dark:border-slate-800 shadow-lg transition-transform group-hover/color:scale-110" style={{ backgroundColor: color.toLowerCase() }} />
                                                <input
                                                    value={color}
                                                    onChange={e => onUpdateVariation('colors', idx, e.target.value)}
                                                    className="w-24 bg-transparent text-[10px] font-black uppercase dark:text-white outline-none tracking-widest"
                                                    placeholder="Color Name"
                                                />
                                                <button type="button" onClick={() => onRemoveVariation('colors', idx)} className="opacity-0 group-hover/color:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all">
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-3">
                                    <div className="flex items-center gap-2">
                                        <Settings className="size-4 text-slate-400" />
                                        <h4 className="text-[10px] font-black uppercase text-slate-400">Spécifications</h4>
                                    </div>
                                    <button onClick={onAddSpec} className="text-blue-600 text-[9px] font-black uppercase underline decoration-2 underline-offset-4">+ Ajouter</button>
                                </div>
                                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                                    {Object.entries(product.specs || {}).map(([key, val], idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input value={key} onChange={e => {
                                                const newSpecs = { ...product.specs }; delete newSpecs[key];
                                                newSpecs[e.target.value] = val; onUpdateField('specs', newSpecs);
                                            }} className="w-1/3 bg-slate-50 dark:bg-slate-950 border-none rounded-lg px-3 py-2 text-[9px] font-black dark:text-white" />
                                            <input value={val} onChange={e => onUpdateField('specs', { ...product.specs, [key]: e.target.value })} className="flex-1 bg-slate-50 dark:bg-slate-950 border-none rounded-lg px-3 py-2 text-[10px] font-bold dark:text-white" />
                                            <button onClick={() => onRemoveSpec(key)} className="p-1.5 text-slate-300 hover:text-rose-500"><Trash2 className="size-3.5" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-5 lg:px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-t flex flex-col sm:flex-row justify-end items-center gap-4 shrink-0">
                        <button onClick={onClose} className="w-full sm:w-auto px-6 py-3 text-[9px] font-black uppercase text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Annuler</button>
                        <button onClick={onSave} className="w-full sm:w-auto px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-blue-600/20">Sauvegarder</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductEditor;
