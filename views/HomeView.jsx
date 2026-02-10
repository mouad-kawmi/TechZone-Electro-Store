
import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import TrustBadges from '../components/TrustBadges';
import BrandLogos from '../components/BrandLogos';
import CategoryGrid from '../components/CategoryGrid';
import FlashSales from '../components/FlashSales';
import PromoBanner from '../components/PromoBanner';

import { CATEGORIES } from '../data/products';
import {
    LayoutGrid, Smartphone, Laptop, Tablet,
    Headphones
} from 'lucide-react';

const CATEGORY_ICONS = {
    "All": LayoutGrid,
    "Smartphones": Smartphone,
    "Laptops": Laptop,
    "Tablets": Tablet,
    "Audio": Headphones
};

const ITEMS_PER_PAGE = 20;

const HomeView = ({
    searchQuery,
    activeCategory,
    onCategoryChange,
    filteredProducts,
    allProducts, // Ensure this is passed
    onViewDetails,
    onQuickView,
    onAddToCart,
    onToggleWishlist,
    onAddToCompare,
    wishlistItems,
    compareItems
}) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const gridRef = React.useRef(null);

    // Reset pagination on category or search change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchQuery]);

    // Calculate product counts for each category
    const categoryCounts = React.useMemo(() => {
        const counts = { "All": (allProducts || []).length };
        CATEGORIES.forEach(cat => {
            if (cat !== "All") {
                counts[cat] = (allProducts || []).filter(p => p.category === cat).length;
            }
        });
        return counts;
    }, [allProducts]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Better scroll with offset for fixed header
        if (gridRef.current) {
            const yOffset = -100; // Account for fixed header
            const element = gridRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="page-content bg-white dark:bg-slate-950">
            {!searchQuery && (
                <>
                    <Hero />
                    <TrustBadges />
                    <BrandLogos />
                    <PromoBanner products={allProducts} onViewDetails={onViewDetails} />
                    <CategoryGrid onCategoryChange={(cat) => { onCategoryChange(cat); setCurrentPage(1); }} allProducts={allProducts} />
                </>
            )}

            <section className="max-w-[1440px] mx-auto px-6 py-16" id="products" ref={gridRef}>
                <div className="flex flex-col gap-8 mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter font-display leading-tight">
                        {searchQuery ? `Résultats : ${searchQuery}` : <>TechZone <span className="text-blue-600">Elite Store</span></>}
                    </h2>

                    <div className="relative group">
                        {/* Gradient Fade for Scroll */}
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-3 overflow-x-auto pb-6 no-scrollbar -mx-6 px-6 scroll-smooth">
                            {CATEGORIES.map(cat => {
                                const Icon = CATEGORY_ICONS[cat] || LayoutGrid;
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => { onCategoryChange(cat); setCurrentPage(1); }}
                                        className={`
                                            shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-500 group/btn
                                            ${isActive
                                                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30 scale-105'
                                                : 'bg-slate-50 dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-blue-600/30'}
                                        `}
                                    >
                                        <Icon className={`size-4 transition-transform duration-500 group-hover/btn:rotate-12 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-[9px] font-black uppercase tracking-widest">{cat}</span>
                                            <span className={`text-[8px] font-bold uppercase mt-1 ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                                                {categoryCounts[cat]} Produits
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {paginatedProducts.map((product) => (
                        <div key={product.id} className="product-card-anim">
                            <ProductCard
                                product={product}
                                onViewDetails={onViewDetails}
                                onQuickView={onQuickView}
                                onAddToCart={onAddToCart}
                                onToggleWishlist={onToggleWishlist}
                                onAddToCompare={onAddToCompare}
                                isFavorite={wishlistItems.some((wi) => wi.id === product.id)}
                                isComparing={compareItems.some((ci) => ci.id === product.id)}
                            />
                        </div>
                    ))}
                </div>

                {/* Technical Pagination Console */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`size-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${currentPage === i + 1
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-800'
                                        }`}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>

            {!searchQuery && (
                <>
                    <FlashSales onAddToCart={onAddToCart} />
                    <Testimonials />
                </>
            )}
            {searchQuery && <Testimonials />}
        </div>
    );
};

export default HomeView;
