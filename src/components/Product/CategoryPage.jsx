import React, { useState, useMemo } from 'react';
import {
  ChevronRight, Filter, SlidersHorizontal, Star,
  ShoppingCart, Heart, LayoutGrid, List, Search,
  ArrowLeft, ChevronDown, CheckCircle2, Sparkles, Box
} from 'lucide-react';
import ProductCard from './ProductCard';
import Breadcrumbs from '../Layout/Breadcrumbs';

const CategoryPage = ({
  category, products, onViewDetails, onQuickView, onAddToCart, onBack, onToggleWishlist, onAddToCompare, wishlistItems, compareItems
}) => {
  const [priceRange, setPriceRange] = useState(25000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 20;

  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).filter(Boolean), [products]);
  const ramOptions = useMemo(() => {
    const options = new Set();
    products.forEach(p => {
      const ram = p.technicalSpecs?.ram || p.specs?.RAM || p.specs?.ram;
      if (ram) options.add(ram);
    });
    return Array.from(options).sort();
  }, [products]);

  const storageOptions = useMemo(() => {
    const options = new Set();
    products.forEach(p => {
      const storage = p.technicalSpecs?.storage || p.specs?.Stockage || p.specs?.storage || p.specs?.["Stockage SSD"];
      if (storage) options.add(storage);
    });
    return Array.from(options).sort();
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchPrice = p.price <= priceRange;
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const pRam = p.technicalSpecs?.ram || p.specs?.RAM || p.specs?.ram;
      const pStorage = p.technicalSpecs?.storage || p.specs?.Stockage || p.specs?.storage || p.specs?.["Stockage SSD"];
      const matchRam = selectedRam.length === 0 || (pRam && selectedRam.includes(pRam));
      const matchStorage = selectedStorage.length === 0 || (pStorage && selectedStorage.includes(pStorage));
      return matchPrice && matchBrand && matchRam && matchStorage;
    });
  }, [products, priceRange, selectedBrands, selectedRam, selectedStorage]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, selectedBrands, selectedRam, selectedStorage, category]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const toggleFilter = (list, set, value) => {
    set(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const FilterSection = ({ title, options, selected, onToggle }) => (
    <div className="space-y-5 p-6 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-1 rounded-full bg-blue-600"></div>
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-display">{title}</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-4 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
                className="peer size-5 rounded-lg border-2 border-slate-200 dark:border-slate-800 text-blue-600 appearance-none checked:bg-blue-600 checked:border-blue-600 transition-all"
              />
              <CheckCircle2 className="absolute size-3.5 text-white opacity-0 peer-checked:opacity-100 left-[3px] pointer-events-none" />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-wider transition-colors ${selected.includes(opt) ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-900'}`}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-up bg-[#fafafa] dark:bg-slate-950 transition-colors duration-500">
      <div className="relative h-[280px] bg-slate-950 flex items-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-slate-800/20 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 to-transparent"></div>

        <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10">
          <Breadcrumbs
            paths={[{ label: category, view: 'CATEGORY' }]}
            onHomeClick={onBack}
          />

          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/60">Elite Collection 2024</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight font-display">
              {category} <span className="text-blue-600">Universe.</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-3"><SlidersHorizontal className="h-4 w-4" /> Filtres Avancés</h3>
              <button onClick={() => { setSelectedBrands([]); setSelectedRam([]); setSelectedStorage([]); setPriceRange(25000); }} className="text-[9px] font-black uppercase text-blue-600">Reset</button>
            </div>

            <div className="space-y-5 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm">
              <div className="flex justify-between items-end mb-1">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-display">Budget Max</p>
                <span className="text-[9px] font-black text-blue-600">{priceRange.toLocaleString()} DH</span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                step="500"
                value={priceRange}
                onChange={e => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200/50 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all"
              />
            </div>

            <FilterSection title="Marques" options={brands} selected={selectedBrands} onToggle={(v) => toggleFilter(selectedBrands, setSelectedBrands, v)} />
            {ramOptions.length > 0 && (category === "Smartphones" || category === "Laptops" || category === "Tablets") && (
              <FilterSection title="RAM" options={ramOptions} selected={selectedRam} onToggle={(v) => toggleFilter(selectedRam, setSelectedRam, v)} />
            )}
            {storageOptions.length > 0 && (category === "Smartphones" || category === "Laptops" || category === "Tablets") && (
              <FilterSection title="Stockage" options={storageOptions} selected={selectedStorage} onToggle={(v) => toggleFilter(selectedStorage, setSelectedStorage, v)} />
            )}
          </aside>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="space-y-0.5">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Collection</p>
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display">Elite {category}</h2>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Aperçu : <span className="text-blue-600 ml-2">{filtered.length} Produits</span></p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginated.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewDetails}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCompare={onAddToCompare}
                  isFavorite={wishlistItems.some(p => p.id === product.id)}
                  isComparing={compareItems.some(p => p.id === product.id)}
                />
              ))}
            </div>

            {/* Pagination Console */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-10 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-slate-900 disabled:opacity-30 transition-all font-display"
                >
                  Prev Set
                </button>
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`size-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${currentPage === i + 1
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900'
                        }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-slate-900 disabled:opacity-30 transition-all font-display"
                >
                  Next Set
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
