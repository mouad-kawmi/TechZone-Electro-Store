import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp } from 'lucide-react';

const SearchSystem = ({ searchQuery, onSearch, onSearchSubmit, allProducts, onViewProduct }) => {
    const [showRes, setShowRes] = useState(false);
    const sRef = useRef(null);

    useEffect(() => {
        const f = (e) => { if (sRef.current && !sRef.current.contains(e.target)) setShowRes(false); };
        document.addEventListener('mousedown', f);
        return () => document.removeEventListener('mousedown', f);
    }, []);

    let results = [];
    if (searchQuery && searchQuery.length >= 2) {
        const q = searchQuery.toLowerCase();
        results = allProducts
            .filter(p => p.title.toLowerCase().includes(q))
            .slice(0, 5);
    }

    const go = (e) => {
        if (e.key === 'Enter' && searchQuery.trim() !== '') {
            onSearchSubmit?.(searchQuery);
            setShowRes(false);
        }
    };

    return (
        <div className="relative hidden md:block" ref={sRef}>
            <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl px-4 py-2 border border-transparent focus-within:border-blue-500/30 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all duration-300 w-64 lg:w-80">
                <Search className="size-4 text-slate-400 mr-3" />
                <input
                    type="text"
                    className="bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 p-0 text-[11px] font-medium w-full outline-none"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onFocus={() => setShowRes(true)}
                    onChange={(e) => onSearch(e.target.value)}
                    onKeyDown={go}
                />
            </div>

            {showRes && results.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/5 p-2 z-[110]">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-50 dark:border-white/5 mb-1">
                        <TrendingUp className="size-3 text-blue-500" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Populaire</span>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                        {results.map(p => (
                            <div
                                key={p.id}
                                className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer group"
                                onClick={() => { onViewProduct?.(p); setShowRes(false); }}
                            >
                                <div className="size-10 bg-slate-50 dark:bg-white rounded-lg p-1">
                                    <img src={p.image || null} className="w-full h-full object-contain" alt={p.title} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-[10px] font-bold text-slate-900 dark:text-white truncate">{p.title}</p>
                                    <p className="text-[9px] font-bold text-blue-600">{p.price.toLocaleString()} DH</p>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => { onSearchSubmit?.(searchQuery); setShowRes(false); }}
                            className="w-full text-center py-3 text-[9px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-xl transition-all"
                        >
                            Voir tous les résultats
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchSystem;
