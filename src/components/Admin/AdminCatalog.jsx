
import React, { useState } from 'react';
import { Plus, Trash2, Tag, Briefcase, Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, addBrand, deleteCategory, deleteBrand } from '../../store';

const AdminCatalog = () => {
    const dispatch = useDispatch();
    const { all: products, customCategories, customBrands } = useSelector(state => state.products);

    const [newCat, setNewCat] = useState('');
    const [newBrand, setNewBrand] = useState('');
    const [selectedCatForBrand, setSelectedCatForBrand] = useState('');

    // Derived lists to show everything (from products + custom ones)
    const allCategories = [...new Set([...products.map(p => p.category), ...customCategories].filter(Boolean))].sort();
    const allBrands = [
        ...new Set(products.map(p => JSON.stringify({ name: p.brand, category: p.category }))),
        ...customBrands.map(b => JSON.stringify(b))
    ].map(s => JSON.parse(s)).filter(b => b.name && b.category).sort((a, b) => a.name.localeCompare(b.name));

    const handleAddCat = (e) => {
        e.preventDefault();
        if (newCat && !allCategories.includes(newCat)) {
            dispatch(addCategory(newCat));
            setNewCat('');
        }
    };

    const handleAddBrand = (e) => {
        e.preventDefault();
        if (newBrand && selectedCatForBrand) {
            dispatch(addBrand({ name: newBrand, category: selectedCatForBrand }));
            setNewBrand('');
            setSelectedCatForBrand(''); // Clear selected category after adding
        }
    };

    return (
        <div className="space-y-8 animate-fade-up">
            {/* Header Section */}
            <div className="bg-slate-950 dark:bg-slate-900 rounded-[2.5rem] border border-blue-500/20 p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex items-center gap-6">
                    <div className="size-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                        <Tag className="size-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter font-display">Gestion du Catalogue</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Catégories & Marques de TechZone</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Categories Section */}
                <div className="bg-white dark:bg-slate-900/40 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="flex items-center gap-3">
                            <Tag className="size-5 text-blue-600" />
                            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-lg">Catégories</h3>
                        </div>
                        <span className="text-[10px] font-black bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full uppercase">
                            {allCategories.length} au total
                        </span>
                    </div>

                    <form onSubmit={handleAddCat} className="flex gap-2">
                        <input
                            type="text"
                            value={newCat}
                            onChange={(e) => setNewCat(e.target.value)}
                            placeholder="Nouvelle catégorie..."
                            className="flex-1 h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 text-sm font-bold outline-none focus:border-blue-600 dark:text-white transition-all"
                        />
                        <button
                            type="submit"
                            className="size-12 bg-slate-900 dark:bg-blue-600 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
                        >
                            <Plus className="size-6" />
                        </button>
                    </form>

                    <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {allCategories.map(cat => {
                            const isCustom = customCategories.includes(cat);
                            const isInUse = products.some(p => p.category === cat);

                            return (
                                <div key={cat} className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 rounded-2xl transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">{cat}</span>
                                        <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">
                                            {isInUse ? 'En cours d\'utilisation' : isCustom ? 'M-zyd b-yeddek' : 'Système'}
                                        </span>
                                    </div>
                                    {isCustom ? (
                                        <button
                                            onClick={() => dispatch(deleteCategory(cat))}
                                            className="size-9 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                            title="Supprimer la catégorie"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    ) : (
                                        <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700" title="Catégorie système">
                                            <Tag className="size-4" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Brands Section */}
                <div className="bg-white dark:bg-slate-900/40 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div className="flex items-center gap-3">
                            <Briefcase className="size-5 text-blue-600" />
                            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-lg">Marques</h3>
                        </div>
                        <span className="text-[10px] font-black bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full uppercase">
                            {allBrands.length} au total
                        </span>
                    </div>

                    <form onSubmit={handleAddBrand} className="space-y-3">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newBrand}
                                onChange={(e) => setNewBrand(e.target.value)}
                                placeholder="Nouvelle marque..."
                                className="flex-1 h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 text-sm font-bold outline-none focus:border-blue-600 dark:text-white transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!newBrand || !selectedCatForBrand}
                                className="size-12 bg-slate-900 dark:bg-blue-600 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <Plus className="size-6" />
                            </button>
                        </div>
                        <select
                            value={selectedCatForBrand}
                            onChange={(e) => setSelectedCatForBrand(e.target.value)}
                            className="w-full h-11 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 outline-none focus:border-blue-600"
                        >
                            <option value="">Choisir la catégorie...</option>
                            {allCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </form>

                    <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {allBrands.map((brand, idx) => {
                            const isCustom = customBrands.some(b => b.name === brand.name && b.category === brand.category);
                            const isInUse = products.some(p => p.brand === brand.name && p.category === brand.category);

                            return (
                                <div key={`${brand.name}-${brand.category}-${idx}`} className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 rounded-2xl transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">{brand.name}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[7px] font-black bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                                {brand.category}
                                            </span>
                                            <span className="text-[7px] font-bold text-slate-400 uppercase">
                                                {isInUse ? 'En cours' : isCustom ? 'Custom' : 'System'}
                                            </span>
                                        </div>
                                    </div>
                                    {isCustom ? (
                                        <button
                                            onClick={() => dispatch(deleteBrand({ name: brand.name, category: brand.category }))}
                                            className="size-9 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                            title="Supprimer la marque"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    ) : (
                                        <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700" title="Marque système">
                                            <Briefcase className="size-4" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-6 flex gap-4">
                <AlertCircle className="size-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-blue-600/70 uppercase tracking-wider leading-relaxed">
                    Had l-blastat katkhlik tzeyed les categories w les marques li ma3ndhomch l-anm l-produirat.
                    Ila m-shiti t-m-shihoum, gha-y-t-m-shou gha ila kanti z-d-tihoum b-yedik hna w ma-khdaminch f hta chi produit khor.
                </p>
            </div>
        </div>
    );
};

export default AdminCatalog;
