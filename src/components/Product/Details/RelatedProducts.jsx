import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../ProductCard';

const RelatedProducts = ({ products, onViewDetails, onQuickView, onAddToCart, onToggleWishlist, onAddToCompare, wishlistItems, compareItems }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="space-y-8 sm:space-y-16">
            <div className="flex items-end justify-between">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                    Produit <span className="text-blue-600">Similaires</span>
                </h2>
                <button className="hidden sm:flex items-center gap-3 text-blue-600 font-black text-[10px] uppercase tracking-widest group">
                    Voir tout <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
                {products.map((p) => (
                    <div key={p.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <ProductCard
                            product={p}
                            onViewDetails={onViewDetails}
                            onQuickView={onQuickView}
                            onAddToCart={onAddToCart}
                            onToggleWishlist={onToggleWishlist}
                            onAddToCompare={onAddToCompare}
                            isFavorite={wishlistItems.some((wi) => wi.id === p.id)}
                            isComparing={compareItems.some((ci) => ci.id === p.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
