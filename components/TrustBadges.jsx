import React from 'react';
import { TRUST_BADGES } from '../data/products';

const TrustBadges = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-950/50">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TRUST_BADGES.map((badge, idx) => (
                        <div key={idx} className="group relative p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/5">
                            <div className={`${badge.bg} dark:bg-slate-800 size-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <badge.icon className={`size-8 ${badge.color}`} />
                            </div>
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3">
                                {badge.title}
                            </h3>
                            <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight leading-relaxed">
                                {badge.desc}
                            </p>
                            <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-10 transition-opacity">
                                <badge.icon className="size-20 rotate-12" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
