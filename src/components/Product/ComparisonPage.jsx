import React, { useMemo } from 'react';
import { X, ShoppingCart, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';

const ComparisonPage = ({ products, onBack, onRemove, onAddToCart, onViewDetails }) => {
  const specKeys = React.useMemo(() => {
    return Array.from(new Set(products.flatMap(p => Object.keys(p.specs))));
  }, [products]);


  return (
    <div className="min-h-screen bg-white dark:bg-slate-950  animate-fade-up">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="flex items-center gap-4 mb-16">
          <button onClick={onBack} className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-blue-600 transition-all shadow-sm">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Comparateur Pro</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Détails techniques side-by-side</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-32 text-center bg-slate-50 dark:bg-slate-900 rounded-[4rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
            <BarChart2 className="size-16 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">Aucun produit à comparer</h3>
            <button onClick={onBack} className="mt-8 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest">Retour au catalogue</button>
          </div>
        ) : (
          <div className="overflow-x-auto pb-12 no-scrollbar">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1 hidden md:block"></div>
                {products.map(p => (
                  <div key={p.id} className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-6">
                    <button onClick={() => onRemove(p.id)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 transition-all"><X className="size-5" /></button>
                    <img src={p.image || null} className="h-32 mx-auto object-contain" />
                    <div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">{p.title}</h3>
                      <p className="text-xl font-black text-blue-600 mt-2">{p.price.toLocaleString()} DH</p>
                    </div>
                    <button onClick={() => onAddToCart(p)} className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
                      <ShoppingCart className="size-4" /> Acheter
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-12 space-y-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Caractéristiques Générales</h3>
                </div>
                {specKeys.map((key, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 py-6 border-b border-slate-100 dark:border-slate-800 items-center">
                    <div className="md:col-span-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{key}</div>
                    {products.map(p => (
                      <div key={p.id} className="text-sm font-bold text-slate-900 dark:text-white">
                        {p.specs[key] || "—"}
                      </div>
                    ))}
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 py-10 items-center">
                  <div className="md:col-span-1 text-[11px] font-black uppercase tracking-widest text-slate-400">Stock</div>
                  {products.map(p => (
                    <div key={p.id} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${p.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {p.stock > 0 ? <><CheckCircle2 className="size-3.5" /> En Stock</> : 'Épuisé'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;
