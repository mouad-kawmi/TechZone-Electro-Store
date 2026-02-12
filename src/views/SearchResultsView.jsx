import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowLeft, LayoutGrid, X } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import Breadcrumbs from '../components/Layout/Breadcrumbs';
import EmptyState from '../components/UI/EmptyState';

const SearchResultsView = ({
    query,
    products,
    onBack,
    onViewDetails,
    onQuickView,
    onAddToCart,
    onToggleWishlist,
    onAddToCompare,
    wishlistItems = [],
    compareItems = [],
    activeCategory
}) => {
    const [priceRange, setPriceRange] = useState(25000);
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [sortBy, setSortBy] = useState('default');

    const brands = useMemo(() => ['All', ...new Set(products.map(p => p.brand))].filter(Boolean), [products]);

    const filtered = useMemo(() => {
        let result = products.filter(p => {
            const matchesSearch = query ? (
                p.title.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase()) ||
                p.brand.toLowerCase().includes(query.toLowerCase())
            ) : true;

            const matchesPrice = p.price <= priceRange;
            const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;
            return matchesSearch && matchesPrice && matchesBrand;
        });

        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
        if (sortBy === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

        return result;
    }, [products, query, priceRange, selectedBrand, sortBy]);

    const displayTitle = query ? query : (activeCategory === "All" || !activeCategory ? "Catalogue" : activeCategory);

    if (filtered.length === 0) {
        return (
            <div className="page-content bg-white dark:bg-slate-950 min-h-[60vh] flex flex-col items-center justify-center p-6">
                <EmptyState
                    type="search"
                    title="Aucun produit !"
                    message={query ? `Aucun résultat pour "${query}"` : `Aucun produit dans la catégorie ${activeCategory}`}
                    onAction={onBack}
                    actionLabel="Retour"
                />
            </div>
        );
    }

    return (
        <div className="page-content bg-white dark:bg-slate-950 min-h-screen">
            <div className="max-w-[1440px] mx-auto px-6 py-12">
                <Breadcrumbs
                    paths={[{ label: query ? 'Recherche' : 'Rayons', view: 'SEARCH' }, { label: displayTitle, view: 'SEARCH' }]}
                    onHomeClick={onBack}
                />

                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">
                                {query ? 'Live Search' : 'Catalogue Elite'}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Elite Engine v2.0</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter font-display leading-tight">
                            {query ? <>Résultats pour <span className="text-blue-600">{query}</span></> :
                                <>Rayon <span className="text-blue-600">{displayTitle}</span></>}
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-72 space-y-6">
                        <div className="p-8 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white flex items-center gap-2">
                                    <SlidersHorizontal className="size-3.5" /> Filtres
                                </h3>
                                <button
                                    onClick={() => { setPriceRange(25000); setSelectedBrand('All'); }}
                                    className="text-[8px] font-black uppercase text-blue-600 tracking-wider"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Price range */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-display">Budget Max</p>
                                    <span className="text-[10px] font-black text-blue-600">{priceRange.toLocaleString()} DH</span>
                                </div>
                                <input
                                    type="range" min="0" max="25000" step="500" value={priceRange}
                                    onChange={e => setPriceRange(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            {/* Brands */}
                            <div className="space-y-4">
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-display">Marques</p>
                                <div className="flex flex-wrap gap-2">
                                    {brands.map(brand => (
                                        <button
                                            key={brand}
                                            onClick={() => setSelectedBrand(brand)}
                                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedBrand === brand
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-700'
                                                }`}
                                        >
                                            {brand}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sorting */}
                            <div className="space-y-4">
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest font-display">Trier par</p>
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 text-[9px] font-black uppercase tracking-widest outline-none text-slate-600 dark:text-slate-400 focus:border-blue-500"
                                >
                                    <option value="default">Par défaut</option>
                                    <option value="price-asc">Prix Croissant</option>
                                    <option value="price-desc">Prix Décroissant</option>
                                    <option value="newest">Nouveautés First</option>
                                </select>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between px-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                <span className="text-blue-600">{filtered.length}</span> Modèles Détectés
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filtered.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onViewDetails={onViewDetails}
                                    onQuickView={onQuickView}
                                    onAddToCart={onAddToCart}
                                    onToggleWishlist={onToggleWishlist}
                                    onAddToCompare={onAddToCompare}
                                    isFavorite={wishlistItems.some(wi => wi.id === product.id)}
                                    isComparing={compareItems.some(ci => ci.id === product.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsView;
