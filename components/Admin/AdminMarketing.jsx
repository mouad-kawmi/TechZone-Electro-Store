import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Target, TrendingUp, Percent, ArrowUpRight, Monitor, Clock, CheckCircle2, Circle, Search } from 'lucide-react';
import { toggleBanner, setSelectedProducts, setBannerExpiry } from '../../store';

const BannerControl = ({ type, banner, products, title, subtitle, search, setSearch, onProductToggle, onToggleBanner, onSetExpiry }) => {
    const config = banner[type];
    const filteredProducts = products
        .filter(p => (p.image || p.images?.[0]) && p.title.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 10);

    return (
        <div className="bg-slate-900 rounded-[2.5rem] border border-blue-500/20 p-6 lg:p-10 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-8 lg:gap-10">
                <div className="flex-1 space-y-6 lg:space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                            <Monitor className="size-6" />
                        </div>
                        <div>
                            <h3 className="text-[11px] lg:text-sm font-black text-white uppercase tracking-widest">{title}</h3>
                            <p className="text-[8px] lg:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{subtitle}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => onToggleBanner(type, !config.isActive)}
                            className={`px-5 py-4 lg:px-6 rounded-2xl border transition-all flex items-center justify-center sm:justify-start gap-3 flex-1 sm:flex-initial ${config.isActive
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                                : 'bg-slate-800 border-slate-700 text-slate-500'
                                }`}
                        >
                            {config.isActive ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
                            <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest">
                                {config.isActive ? 'Activée' : 'Désactivée'}
                            </span>
                        </button>

                        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-2xl p-2 px-4 flex-1 sm:flex-initial">
                            <Clock className="size-4 text-slate-400" />
                            <select
                                className="bg-transparent text-[9px] lg:text-[10px] font-black text-white uppercase tracking-widest outline-none cursor-pointer w-full [&>option]:bg-slate-900 [&>option]:text-white"
                                onChange={(e) => onSetExpiry(type, e.target.value === 'null' ? null : Number(e.target.value))}
                                value={config.expiryTime ? "custom" : "null"}
                            >
                                <option value="null">Pas de limite</option>
                                <option value="1">Pendant 1 Heure</option>
                                <option value="6">Pendant 6 Heures</option>
                                <option value="24">Pendant 24 Heures</option>
                                <option value="48">Pendant 48 Heures</option>
                                {config.expiryTime && <option value="custom" disabled>Timer Actif</option>}
                            </select>
                        </div>
                    </div>

                    {config.expiryTime && (
                        <div className="text-[8px] lg:text-[9px] font-black text-blue-400 uppercase tracking-widest animate-pulse flex items-center gap-2">
                            <TrendingUp className="size-3" />
                            Expire le : {new Date(config.expiryTime).toLocaleString('fr-FR')}
                        </div>
                    )}
                </div>

                <div className="xl:w-[400px] space-y-4 pt-6 xl:pt-0 border-t border-slate-800 xl:border-t-0">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Produits Séléctionnés (Max 2)</h4>
                        <div className="relative group">
                            <Search className="absolute right-0 top-1/2 -translate-y-1/2 size-3 text-slate-600 group-focus-within:text-blue-400" />
                            <input
                                type="text"
                                placeholder="FILTRER..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-transparent border-none outline-none text-[9px] font-bold text-blue-400 uppercase placeholder:text-slate-600 pr-5 w-24 text-right"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2 max-h-[220px] lg:max-h-[160px] overflow-y-auto pr-2 custom-scrollbar-slate">
                        {filteredProducts.map(product => {
                            const isSelected = config.selectedProductIds.includes(product.id);
                            return (
                                <div
                                    key={product.id}
                                    onClick={() => onProductToggle(type, product.id)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isSelected
                                        ? 'bg-blue-600/10 border-blue-600/30 ring-1 ring-blue-600/20'
                                        : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/60'
                                        }`}
                                >
                                    <div className="size-10 rounded-lg bg-white p-1 overflow-hidden shrink-0">
                                        <img src={product.image || product.images?.[0]} className="w-full h-full object-contain" alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[9px] font-black text-white truncate uppercase tracking-tighter">{product.title}</p>
                                        <p className="text-[8px] font-bold text-blue-400">{product.price.toLocaleString()} DH</p>
                                    </div>
                                    <div className={`size-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-700'}`}>
                                        {isSelected && <CheckCircle2 className="size-3" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminMarketing = () => {
    const dispatch = useDispatch();
    const banner = useSelector(state => state.banner);
    const products = useSelector(state => state.products.all);
    const [promoSearch, setPromoSearch] = useState('');
    const [flashSearch, setFlashSearch] = useState('');

    const handleProductToggle = (type, id) => {
        const currentSelection = banner[type].selectedProductIds;
        const newSelection = currentSelection.includes(id)
            ? currentSelection.filter(pid => pid !== id)
            : [...currentSelection, id].slice(0, 2); // Max 2
        dispatch(setSelectedProducts({ type, productIds: newSelection }));
    };

    const handleToggleBanner = (type, value) => dispatch(toggleBanner({ type, value }));
    const handleSetExpiry = (type, hours) => dispatch(setBannerExpiry({ type, hours }));

    return (
        <div className="space-y-8 animate-fade-up px-1">
            {/* Headers Banners Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BannerControl
                    type="promo"
                    banner={banner}
                    products={products}
                    title="Promo (VIVEZ L'INNOVATION)"
                    subtitle="Visibilité Section VIP"
                    search={promoSearch}
                    setSearch={setPromoSearch}
                    onProductToggle={handleProductToggle}
                    onToggleBanner={handleToggleBanner}
                    onSetExpiry={handleSetExpiry}
                />

                <BannerControl
                    type="flash"
                    banner={banner}
                    products={products}
                    title="Offres Flash"
                    subtitle="Offres Limitées"
                    search={flashSearch}
                    setSearch={setFlashSearch}
                    onProductToggle={handleProductToggle}
                    onToggleBanner={handleToggleBanner}
                    onSetExpiry={handleSetExpiry}
                />
            </div>

            {/* Campaign Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Winter Tech Blowout", reach: "12.5k", conv: "3.2%", color: "text-blue-500", bg: "bg-blue-500/10" },
                    { title: "Apple Elite Access", reach: "45.1k", conv: "8.9%", color: "text-indigo-500", bg: "bg-indigo-500/10" },
                    { title: "Audio Pro Promo", reach: "8.9k", conv: "1.5%", color: "text-pink-500", bg: "bg-pink-500/10" }
                ].map((camp, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900/40 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`size-10 rounded-xl ${camp.bg} flex items-center justify-center ${camp.color}`}>
                                <Target className="size-5" />
                            </div>
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/10 flex items-center gap-1.5">
                                <TrendingUp className="size-2.5" /> En cours
                            </span>
                        </div>
                        <h4 className="text-[10px] lg:text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">{camp.title}</h4>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Portée impact</p>
                                <p className="text-[11px] lg:text-xs font-black text-slate-900 dark:text-white">{camp.reach}</p>
                            </div>
                            <div>
                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Conversion</p>
                                <p className="text-[11px] lg:text-xs font-black text-blue-600 dark:text-blue-400">{camp.conv}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Coupons Section */}
            <div className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 lg:p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h3 className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white flex items-center gap-3">
                        <Percent className="size-4 text-blue-600" /> Registre des Coupons
                    </h3>
                    <button className="text-[8px] lg:text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest py-2 px-4 bg-blue-500/5 rounded-xl border border-blue-500/10">+ Générer Nouveau</button>
                </div>
                <div className="p-6 lg:p-10 space-y-4">
                    {[
                        { code: "ELITE25", disc: "25%", usage: "1,240", status: "Actif" },
                        { code: "WELCOME10", disc: "10%", usage: "3,120", status: "Épuisé" },
                        { code: "FREESHIP", disc: "Gratuit", usage: "450", status: "Actif" }
                    ].map((c, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-4 lg:p-6 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 gap-4 group hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-4 lg:gap-6 w-full sm:w-auto">
                                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 text-[10px] lg:text-[11px] font-mono font-black text-slate-900 dark:text-white min-w-[100px] text-center">
                                    {c.code}
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[9px] lg:text-[10px] font-black text-slate-900 dark:text-white uppercase">Remise: {c.disc}</p>
                                    <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{c.usage} Utilisations</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 text-right">
                                <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${c.status === 'Actif' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10' : 'bg-slate-500/10 text-slate-400 border-slate-200 dark:border-slate-800'}`}>
                                    {c.status}
                                </span>
                                <ArrowUpRight className="size-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminMarketing;
