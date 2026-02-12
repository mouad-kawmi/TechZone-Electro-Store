
import React, { useEffect, useRef } from 'react';
import { TrendingUp, ArrowUpRight, Activity, Package } from 'lucide-react';
import gsap from 'gsap';

const AdminStats = ({ stats, breakdown }) => {
    const statsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-card", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            });
            gsap.from(".breakdown-container", {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 0.5,
                ease: "power4.out"
            });
        }, statsRef);
        return () => ctx.revert();
    }, []);

    const total = (breakdown.smartphoneStock + breakdown.otherStock) || 1;
    const smartphonePercent = Math.round((breakdown.smartphoneStock / total) * 100);
    const otherPercent = 100 - smartphonePercent;

    return (
        <div ref={statsRef} className="space-y-8 lg:space-y-12 mb-16 px-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                {stats.map((s, i) => (
                    <div key={i} className="stat-card group relative bg-white dark:bg-slate-900/40 p-6 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] dark:hover:shadow-none overflow-hidden">
                        <div className="absolute -top-10 -right-10 size-40 bg-blue-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        <div className={`relative size-12 lg:size-16 rounded-2xl lg:rounded-[1.5rem] ${s.bg} ${s.color} flex items-center justify-center mb-6 lg:mb-10 shadow-2xl shadow-black/5 group-hover:scale-110 transition-transform duration-500`}>
                            <s.icon className="size-6 lg:size-8" strokeWidth={2.5} />
                        </div>

                        <div className="relative">
                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] font-display mb-2 lg:mb-3">{s.label}</p>
                            <h4 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tighter font-display">{s.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Inventory Breakdown & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Stock Breakdown Card */}
                <div className="breakdown-container lg:col-span-2 bg-white dark:bg-slate-900/40 p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8 lg:mb-10">
                            <div className="size-10 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-600">
                                <Package className="size-5" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Repartition par Categorie</h3>
                        </div>

                        <div className="space-y-10 lg:space-y-12">
                            {/* Visual Progress Bar */}
                            <div className="space-y-4 lg:space-y-6">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <h4 className="text-base lg:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">Smartphones</h4>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{breakdown.smartphoneStock} Unites</p>
                                    </div>
                                    <span className="text-xl lg:text-2xl font-black text-blue-600 tracking-tighter">{smartphonePercent}%</span>
                                </div>
                                <div className="h-3 lg:h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]" style={{ width: `${smartphonePercent}%` }}></div>
                                </div>
                            </div>

                            <div className="space-y-4 lg:space-y-6">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <h4 className="text-base lg:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">Autres Gadgets</h4>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{breakdown.otherStock} Unites</p>
                                    </div>
                                    <span className="text-xl lg:text-2xl font-black text-slate-400 dark:text-slate-600 tracking-tighter">{otherPercent}%</span>
                                </div>
                                <div className="h-3 lg:h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400 dark:bg-slate-700 rounded-full" style={{ width: `${otherPercent}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Insights / Alerts */}
                <div className="breakdown-container bg-slate-950 dark:bg-slate-900 rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 space-y-8 lg:space-y-10">
                        <div className="flex items-center gap-3">
                            <Activity className="size-5 text-blue-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400/60">Elite Insights</h3>
                        </div>

                        <div className="space-y-6 lg:space-y-8">
                            {/* Low Stock Alerts Sorted */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <p className="text-[8px] font-black text-blue-400/60 uppercase tracking-[0.3em]">Performance Elite</p>
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Stock Restant</span>
                                </div>
                                <div className="space-y-4">
                                    {breakdown.lowStockProducts?.length > 0 ? (
                                        breakdown.lowStockProducts.map((p) => {
                                            const healthPercent = Math.min(100, Math.max(10, (p.stock / 50) * 100)); // Just for visual
                                            return (
                                                <div key={p.id} className="p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-blue-500/20 transition-all space-y-4 group/item">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <Activity className="size-4 text-blue-400/80" />
                                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Stock Health</span>
                                                        </div>
                                                        <span className="text-xs font-black text-white">{p.stock} units</span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-1000"
                                                            style={{ width: `${healthPercent}%` }}
                                                        ></div>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-blue-500">
                                                        <TrendingUp className="size-3" />
                                                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">High Momentum</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="p-6 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                                                Aucune alerte critique.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-5 lg:p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all cursor-default">
                                <p className="text-[8px] font-black text-emerald-500/60 uppercase tracking-[0.3em] mb-2">Statut Operationnel</p>
                                <h4 className="text-xs lg:text-sm font-bold leading-relaxed">
                                    {stats.find(s => s.label === "Commandes")?.value || 0} commandes à gérer.
                                </h4>
                            </div>
                        </div>

                        <button className="w-full py-4 lg:py-5 bg-white dark:bg-blue-600 text-slate-950 dark:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                            Generer Rapport PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
