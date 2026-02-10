import React from 'react';
import { Target, Gift, TrendingUp, Percent, ArrowUpRight } from 'lucide-react';

const AdminMarketing = () => {
    return (
        <div className="space-y-8 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Winter Tech Blowout", reach: "12.5k", conv: "3.2%", color: "text-blue-500", bg: "bg-blue-500/10" },
                    { title: "Apple Elite Access", reach: "45.1k", conv: "8.9%", color: "text-indigo-500", bg: "bg-indigo-500/10" },
                    { title: "Audio Pro Promo", reach: "8.9k", conv: "1.5%", color: "text-pink-500", bg: "bg-pink-500/10" }
                ].map((camp, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`size-10 rounded-xl ${camp.bg} flex items-center justify-center ${camp.color}`}>
                                <Target className="size-5" />
                            </div>
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/10 flex items-center gap-2">
                                <TrendingUp className="size-3" /> Active
                            </span>
                        </div>
                        <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">{camp.title}</h4>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Reach</p>
                                <p className="text-[12px] font-black text-slate-900 dark:text-white">{camp.reach}</p>
                            </div>
                            <div>
                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Conversion</p>
                                <p className="text-[12px] font-black text-blue-600">{camp.conv}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white flex items-center gap-3">
                        <Percent className="size-4 text-blue-600" /> Active Coupon Registry
                    </h3>
                    <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest">+ Generate Segment</button>
                </div>
                <div className="p-8 space-y-4">
                    {[
                        { code: "ELITE25", disc: "25%", usage: "1,240", status: "Active" },
                        { code: "NEWTECH", disc: "100 DH", usage: "3,120", status: "Depleted" },
                        { code: "IPHONE16", disc: "Free Ship", usage: "450", status: "Active" }
                    ].map((c, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-6">
                                <div className="px-4 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-black text-slate-900 dark:text-white">
                                    {c.code}
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[9px] font-black text-slate-900 dark:text-white uppercase">{c.disc} Discount Engine</p>
                                    <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{c.usage} Identifiers Logged</p>
                                </div>
                            </div>
                            <ArrowUpRight className="size-4 text-slate-400" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminMarketing;
