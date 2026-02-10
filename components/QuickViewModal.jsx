import React from 'react';
import { X, ShoppingCart, Star, ShieldCheck, Truck, Cpu, HardDrive, Battery, Maximize2, Zap } from 'lucide-react';

const QuickViewModal = ({ product, onClose, onAddToCart, onViewDetails }) => {
  if (!product) return null;

  // Extract top specs for the elite density grid
  const mainSpecs = product.specs ? Object.entries(product.specs).slice(0, 4) : [];

  // Icon mapping for specs
  const getSpecIcon = (key) => {
    const k = key.toLowerCase();
    if (k.includes('écr') || k.includes('screen')) return <Maximize2 className="size-3.5" />;
    if (k.includes('proc') || k.includes('cpu')) return <Cpu className="size-3.5" />;
    if (k.includes('ram') || k.includes('mémoire')) return <HardDrive className="size-3.5" />;
    if (k.includes('batt')) return <Battery className="size-3.5" />;
    return <Zap className="size-3.5" />;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white dark:bg-[#020617] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border border-slate-100 dark:border-slate-800/50">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-lg border border-slate-100 dark:border-slate-800"
        >
          <X className="size-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Area with Technical Background */}
          <div className="relative bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-12 flex items-center justify-center aspect-square lg:aspect-auto border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/50 overflow-hidden">
            {/* Micro-grid background */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative z-10 group">
              <img
                src={product.image}
                className="w-full max-w-[380px] object-contain transition-transform duration-700 group-hover:scale-105"
                alt={product.title}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'; }}
              />
              {product.isNew && (
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/30">
                  Elite Release
                </div>
              )}
            </div>
          </div>

          {/* Details Area - High Density Console Aesthetic */}
          <div className="p-8 sm:p-14 flex flex-col justify-center space-y-7 relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border border-blue-600/10">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 rounded-md border border-amber-500/10">
                    <Star className="size-3 text-amber-500 fill-amber-500" />
                    <span className="text-[9px] font-black text-amber-600">{product.rating}</span>
                  </div>
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Model: TZ-{product.id}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[1.1] font-display">
                {product.title}
              </h2>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-blue-600 dark:text-blue-500 tracking-tighter italic">
                  {product.price.toLocaleString()} DH
                </span>
                {product.oldPrice && (
                  <span className="text-slate-400 text-lg line-through font-bold opacity-50 tracking-tight">
                    {product.oldPrice.toLocaleString()} DH
                  </span>
                )}
              </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-[13px] font-medium leading-relaxed line-clamp-2">
              {product.description}
            </p>

            {/* Elite Specs Grid */}
            {mainSpecs.length > 0 && (
              <div className="grid grid-cols-2 gap-3 pb-2">
                {mainSpecs.map(([key, value]) => (
                  <div key={key} className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-800/50 flex items-center gap-3 group transition-all hover:border-blue-500/30">
                    <div className="size-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm transition-transform group-hover:scale-110">
                      {getSpecIcon(key)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{key}</span>
                      <span className="text-[10px] font-black text-slate-900 dark:text-white truncate max-w-[120px] leading-none uppercase">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-5 pt-2 border-t border-slate-100 dark:border-slate-800/50">
              <div className="flex items-center gap-2">
                <Truck className="size-3.5 text-emerald-500" />
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Delivery Priority 24h</p>
              </div>
              <div className="size-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-blue-500" />
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Hardware Warranty Active</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 group overflow-hidden relative active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ShoppingCart className="size-4 relative z-10" />
                <span className="relative z-10">Add to System Cart</span>
              </button>
              <button
                onClick={() => onViewDetails(product)}
                className="flex-1 border border-slate-200 dark:border-slate-800/80 text-slate-900 dark:text-white py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Complete Architecture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
