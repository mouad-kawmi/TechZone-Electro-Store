import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const ProductSpecs = ({ specs }) => {
    const [allS, setAllS] = useState(false);
    const entries = Object.entries(specs || {});

    return (
        <div className="space-y-8 sm:space-y-12">
            <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter dark:text-white font-display">Performance Elite</h3>
                    <p className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {entries.length} Spécifications trouvées
                    </p>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-2xl">
                    Ce produit est conçu pour répondre aux exigences les plus élevées des professionnels de la tech au Maroc.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {entries.slice(0, allS ? undefined : 6).map(([key, val]) => (
                        <div key={key} className="flex justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 transition-colors group">
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">{key}</span>
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white text-right ml-4">{val}</span>
                        </div>
                    ))}
                </div>

                {entries.length > 6 && (
                    <div className="flex justify-center pt-4 sm:pt-8">
                        <button
                            onClick={() => setAllS(!allS)}
                            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm flex items-center gap-3"
                        >
                            {allS ? "Voir moins" : "Voir toutes les spécifications"}
                            <Plus className={`size-4 transition-transform duration-500 ${allS ? 'rotate-45' : ''}`} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductSpecs;
