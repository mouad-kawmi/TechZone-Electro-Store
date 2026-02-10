
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const PromoBanner = ({ products = [], onViewDetails }) => {
    // Select top 3 products with images for the banner
    const promoProducts = products
        .filter(p => p.image)
        .slice(0, 3);

    if (promoProducts.length === 0) return null;

    return (
        <section className="py-12 bg-white dark:bg-slate-950 font-sans">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 border border-white/5 shadow-2xl">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-1/3 h-full bg-indigo-600/5 blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center p-8 lg:p-12">
                        {/* Text Content */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                    <Sparkles className="size-4" />
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Offres de la Semaine</span>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none font-display uppercase">
                                    Sélection <span className="text-blue-500">Premium</span>
                                </h2>
                                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider max-w-sm">
                                    Les meilleures innovations technologiques à prix exceptionnels.
                                </p>
                            </div>
                            <button className="flex items-center gap-3 text-white font-bold text-[10px] uppercase tracking-widest group transition-all">
                                Voir toutes les offres <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Product Grid */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {promoProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => onViewDetails?.(product)}
                                    className="group/item relative bg-white/5 border border-white/10 rounded-3xl p-4 cursor-pointer hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
                                >
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 mb-4 border border-white/5">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-[10px] font-bold text-white uppercase tracking-tight truncate">
                                            {product.title}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-400 text-[10px] font-black">{product.price.toLocaleString()} DH</span>
                                            <div className="size-6 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                <ArrowRight className="size-3 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Discount Badge If Exists */}
                                    {product.oldPrice && (
                                        <div className="absolute top-6 right-6 bg-rose-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;
