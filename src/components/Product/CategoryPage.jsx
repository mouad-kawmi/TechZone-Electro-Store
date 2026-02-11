import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronRight, Filter, SlidersHorizontal, Star,
  ShoppingCart, Heart, LayoutGrid, List, Search,
  ArrowLeft, ChevronDown, CheckCircle2, Sparkles, Box
} from 'lucide-react';
import ProductCard from './ProductCard';
import Breadcrumbs from '../Layout/Breadcrumbs';

const CategoryPage = (props) => {
  const {
    category: cat, products: prods, onViewDetails, onQuickView,
    onAddToCart, onBack, onToggleWishlist, onAddToCompare,
    wishlistItems: wish, compareItems: comp
  } = props;

  const [price, setPrice] = useState(25000);
  const [brnds, setBrnds] = useState([]);
  const [rams, setRams] = useState([]);
  const [vStoc, setVStoc] = useState([]);
  const [pg, setPg] = useState(1);

  const SIZE = 20;

  const bList = useMemo(() => Array.from(new Set(prods.map(p => p.brand))).filter(Boolean), [prods]);

  const rList = useMemo(() => {
    const list = new Set();
    prods.forEach(p => {
      const r = p.technicalSpecs?.ram || p.specs?.RAM || p.specs?.ram;
      if (r) list.add(r);
    });
    return Array.from(list).sort();
  }, [prods]);

  const sList = useMemo(() => {
    const list = new Set();
    prods.forEach(p => {
      const s = p.technicalSpecs?.storage || p.specs?.Stockage || p.specs?.storage || p.specs?.["Stockage SSD"];
      if (s) list.add(s);
    });
    return Array.from(list).sort();
  }, [prods]);

  const filts = useMemo(() => {
    return prods.filter(p => {
      const mPrice = p.price <= price;
      const mBrand = brnds.length === 0 || brnds.includes(p.brand);
      const pR = p.technicalSpecs?.ram || p.specs?.RAM || p.specs?.ram;
      const pS = p.technicalSpecs?.storage || p.specs?.Stockage || p.specs?.storage || p.specs?.["Stockage SSD"];
      const mRam = rams.length === 0 || (pR && rams.includes(pR));
      const mStoc = vStoc.length === 0 || (pS && vStoc.includes(pS));
      return mPrice && mBrand && mRam && mStoc;
    });
  }, [prods, price, brnds, rams, vStoc]);

  useEffect(() => {
    setPg(1);
  }, [price, brnds, rams, vStoc, cat]);

  const total = Math.ceil(filts.length / SIZE);
  const items = filts.slice((pg - 1) * SIZE, pg * SIZE);

  const go = (p) => {
    setPg(p);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const toggle = (list, set, val) => {
    if (list.includes(val)) set(list.filter(x => x !== val));
    else set([...list, val]);
  };

  const Filtre = ({ title, opts, sel, onTog }) => (
    <div className="space-y-5 p-6 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem]">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-1 rounded-full bg-blue-600"></div>
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{title}</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {opts.map(o => (
          <label key={o} className="flex items-center gap-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={sel.includes(o)}
              onChange={() => onTog(o)}
              className="size-5 rounded-lg border-2 border-slate-200 dark:border-slate-800 text-blue-600 appearance-none checked:bg-blue-600 transition-all"
            />
            <span className={`text-[10px] font-black uppercase tracking-wider transition-colors ${sel.includes(o) ? 'text-blue-600' : 'text-slate-500'}`}>{o}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-up bg-[#fafafa] dark:bg-slate-950 transition-colors duration-500">
      <div className="relative h-[280px] bg-slate-950 flex items-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10">
          <Breadcrumbs paths={[{ label: cat, view: 'CATEGORY' }]} onHomeClick={onBack} />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/60">Elite Collection 2024</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              {cat} <span className="text-blue-600">Universe.</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-3"><SlidersHorizontal className="h-4 w-4" /> Filtres</h3>
              <button onClick={() => { setBrnds([]); setRams([]); setVStoc([]); setPrice(25000); }} className="text-[9px] font-black uppercase text-blue-600">Reset</button>
            </div>

            <div className="space-y-5 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem]">
              <div className="flex justify-between items-end mb-1">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Budget</p>
                <span className="text-[9px] font-black text-blue-600">{price} DH</span>
              </div>
              <input
                type="range" min="0" max="25000" step="500" value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200/50 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <Filtre title="Marques" opts={bList} sel={brnds} onTog={(v) => toggle(brnds, setBrnds, v)} />
            {rList.length > 0 && (cat === "Smartphones" || cat === "Laptops" || cat === "Tablets") && (
              <Filtre title="RAM" opts={rList} sel={rams} onTog={(v) => toggle(rams, setRams, v)} />
            )}
            {sList.length > 0 && (cat === "Smartphones" || cat === "Laptops" || cat === "Tablets") && (
              <Filtre title="Stockage" opts={sList} sel={vStoc} onTog={(v) => toggle(vStoc, setVStoc, v)} />
            )}
          </aside>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="space-y-0.5">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Collection</p>
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Elite {cat}</h2>
              </div>
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{filts.length} Produits</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {items.map(p => (
                <ProductCard
                  key={p.id} product={p} onViewDetails={onViewDetails}
                  onQuickView={onQuickView} onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist} onAddToCompare={onAddToCompare}
                  isFavorite={wish.some(x => x.id === p.id)}
                  isComparing={comp.some(x => x.id === p.id)}
                />
              ))}
            </div>

            {total > 1 && (
              <div className="flex items-center justify-center gap-2 pt-10 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => go(Math.max(1, pg - 1))}
                  disabled={pg === 1}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest hover:bg-white disabled:opacity-30 transition-all"
                >
                  Prev
                </button>
                <div className="flex items-center gap-2">
                  {[...Array(total)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => go(i + 1)}
                      className={`size-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${pg === i + 1
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => go(Math.min(total, pg + 1))}
                  disabled={pg === total}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest hover:bg-white disabled:opacity-30 transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
