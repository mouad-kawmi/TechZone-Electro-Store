import React from 'react';
import { PackageSearch } from 'lucide-react';

const TopBar = ({ onTrackOrder, onContactClick }) => (
    <div className="w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    <span className="size-1 bg-blue-500 rounded-full animate-pulse"></span>
                    Livraison Gratuite dès 2000 DH
                </span>
            </div>
            <div className="flex items-center gap-6">
                <button onClick={onTrackOrder} className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase hover:text-blue-600 transition-colors tracking-widest flex items-center gap-2">
                    <PackageSearch className="size-3.5" /> Suivre Commande
                </button>
                <button onClick={onContactClick} className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase hover:text-blue-600 transition-colors tracking-widest">Aide</button>
            </div>
        </div>
    </div>
);

export default TopBar;
