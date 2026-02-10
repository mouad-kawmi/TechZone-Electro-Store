
import React from 'react';
import Hero from '../components/Home/Hero';
import ProductCard from '../components/Product/ProductCard';
import Testimonials from '../components/Home/Testimonials';
import TrustBadges from '../components/UI/TrustBadges';
import BrandLogos from '../components/Home/BrandLogos';
import CategoryGrid from '../components/Product/CategoryGrid';
import FlashSales from '../components/Home/FlashSales';
import PromoBanner from '../components/Home/PromoBanner';

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
    activeBrand,
    onCategoryChange,
    onBrandChange,
    filteredProducts,
    allProducts,
    onViewDetails,
    onQuickView,
    onAddToCart,
    onToggleWishlist,
    onAddToCompare,
    wishlistItems,
    compareItems,
    onReadMoreReviews
}) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const gridRef = React.useRef(null);

    // Reset pagination
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, activeBrand, searchQuery]);

    // Dynamic Lists from actual products
    const dynamicLists = React.useMemo(() => {
        const products = allProducts || [];
        const cats = [...new Set(products.map(p => p.category).filter(Boolean))].sort();
        const brands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();

        return {
            categories: ["All", ...cats],
            brands: ["All", ...brands]
        };
    }, [allProducts]);

    const stats = React.useMemo(() => {
        const counts = { categories: {}, brands: {} };
        const products = allProducts || [];

        dynamicLists.categories.forEach(cat => {
            counts.categories[cat] = cat === "All" ? products.length : products.filter(p => p.category === cat).length;
        });

        dynamicLists.brands.forEach(brand => {
            counts.brands[brand] = brand === "All" ? products.length : products.filter(p => p.brand === brand).length;
        });

        return counts;
    }, [allProducts, dynamicLists]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (gridRef.current) {
            const yOffset = -100;
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
                    <CategoryGrid onCategoryChange={(cat) => { onCategoryChange(cat); onBrandChange("All"); setCurrentPage(1); }} allProducts={allProducts} />
                </>
            )}

            <section className="max-w-[1440px] mx-auto px-6 py-16" id="products" ref={gridRef}>
                <div className="flex flex-col gap-10 mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter font-display leading-tight">
                        {searchQuery ? `Résultats : ${searchQuery}` : <>TechZone <span className="text-blue-600">Elite Store</span></>}
                    </h2>

                    <div className="space-y-8">
                        {/* Categories Row */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Filtrer par Univers</h4>
                            <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 scroll-smooth">
                                {dynamicLists.categories.map(cat => {
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
                                                    {stats.categories[cat]} Produits
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
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
                            Précédent
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
                            Suivant
                        </button>
                    </div>
                )}
            </section>

            {!searchQuery && (
                <>
                    <FlashSales products={allProducts} onAddToCart={onAddToCart} />
                    <Testimonials onReadMoreReviews={onReadMoreReviews} allProducts={allProducts} />
                </>
            )}
            {searchQuery && <Testimonials onReadMoreReviews={onReadMoreReviews} allProducts={allProducts} />}
        </div>
    );
};

export default HomeView;
