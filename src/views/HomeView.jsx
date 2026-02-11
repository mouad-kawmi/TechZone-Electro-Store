import React, { useState, useEffect, useMemo, useRef } from 'react';
import Hero from '../components/Home/Hero';
import ProductCard from '../components/Product/ProductCard';
import Testimonials from '../components/Home/Testimonials';
import TrustBadges from '../components/UI/TrustBadges';
import BrandLogos from '../components/Home/BrandLogos';
import CategoryGrid from '../components/Product/CategoryGrid';
import FlashSales from '../components/Home/FlashSales';
import PromoBanner from '../components/Home/PromoBanner';

import {
    LayoutGrid, Smartphone, Laptop, Tablet,
    Headphones
} from 'lucide-react';

const ICONS = {
    "All": LayoutGrid,
    "Smartphones": Smartphone,
    "Laptops": Laptop,
    "Tablets": Tablet,
    "Audio": Headphones
};

const PAGE_SIZE = 20;

const HomeView = (props) => {
    const {
        searchQuery: q,
        activeCategory: cat,
        activeBrand: brand,
        onCategoryChange,
        onBrandChange,
        filteredProducts: filtered,
        allProducts: all,
        onViewDetails,
        onQuickView,
        onAddToCart,
        onToggleWishlist,
        onAddToCompare,
        wishlistItems: wish,
        compareItems: comp,
        onReadMoreReviews
    } = props;

    const [curr, setCurr] = useState(1);
    const grid = useRef(null);

    useEffect(() => {
        setCurr(1);
    }, [cat, brand, q]);

    const listes = useMemo(() => {
        const p = all || [];
        const c = ["All", ...new Set(p.map(x => x.category).filter(Boolean))].sort();
        const b = ["All", ...new Set(p.map(x => x.brand).filter(Boolean))].sort();
        return { c, b };
    }, [all]);

    const counts = useMemo(() => {
        const c1 = {};
        const p = all || [];
        listes.c.forEach(x => {
            c1[x] = x === "All" ? p.length : p.filter(y => y.category === x).length;
        });
        return c1;
    }, [all, listes]);

    const pages = Math.ceil(filtered.length / PAGE_SIZE);
    const displayed = filtered.slice((curr - 1) * PAGE_SIZE, curr * PAGE_SIZE);

    const goPage = (p) => {
        setCurr(p);
        if (grid.current) {
            window.scrollTo({ top: grid.current.offsetTop - 100, behavior: 'smooth' });
        }
    };

    return (
        <div className="page-content bg-white dark:bg-slate-950">
            {!q && (
                <>
                    <Hero />
                    <TrustBadges />
                    <BrandLogos />
                    <PromoBanner products={all} onViewDetails={onViewDetails} />
                    <CategoryGrid onCategoryChange={(c) => { onCategoryChange(c); onBrandChange("All"); setCurr(1); }} allProducts={all} />
                </>
            )}

            <section className="max-w-[1440px] mx-auto px-6 py-16" id="products" ref={grid}>
                <div className="flex flex-col gap-10 mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter font-display leading-tight">
                        {q ? `Résultats : ${q}` : <>TechZone <span className="text-blue-600">Elite Store</span></>}
                    </h2>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Rayons</h4>
                        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 scroll-smooth">
                            {listes.c.map(x => {
                                const Icon = ICONS[x] || LayoutGrid;
                                const active = cat === x;
                                return (
                                    <button
                                        key={x}
                                        onClick={() => { onCategoryChange(x); setCurr(1); }}
                                        className={`shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-500 group/btn
                                            ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30 scale-105'
                                                : 'bg-slate-50 dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-blue-600/30'}
                                        `}
                                    >
                                        <Icon className={`size-4 transition-transform duration-500 group-hover/btn:rotate-12 ${active ? 'text-white' : 'text-blue-600'}`} />
                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-[9px] font-black uppercase tracking-widest">{x}</span>
                                            <span className={`text-[8px] font-bold uppercase mt-1 ${active ? 'text-blue-200' : 'text-slate-400'}`}>
                                                {counts[x]} Produits
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {displayed.map((p) => (
                        <div key={p.id} className="product-card-anim">
                            <ProductCard
                                product={p}
                                onViewDetails={onViewDetails}
                                onQuickView={onQuickView}
                                onAddToCart={onAddToCart}
                                onToggleWishlist={onToggleWishlist}
                                onAddToCompare={onAddToCompare}
                                isFavorite={wish.some((w) => w.id === p.id)}
                                isComparing={comp.some((c) => c.id === p.id)}
                            />
                        </div>
                    ))}
                </div>

                {pages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <button
                            onClick={() => goPage(Math.max(1, curr - 1))}
                            disabled={curr === 1}
                            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Back
                        </button>

                        <div className="flex items-center gap-2">
                            {[...Array(pages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => goPage(i + 1)}
                                    className={`size-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${curr === i + 1
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-800'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => goPage(Math.min(pages, curr + 1))}
                            disabled={curr === pages}
                            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>

            {!q && (
                <>
                    <FlashSales products={all} onAddToCart={onAddToCart} />
                    <Testimonials onReadMoreReviews={onReadMoreReviews} allProducts={all} />
                </>
            )}
            {q && <Testimonials onReadMoreReviews={onReadMoreReviews} allProducts={all} />}
        </div>
    );
};

export default HomeView;
