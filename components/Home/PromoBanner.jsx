import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, Sparkles } from 'lucide-react';
import { checkExpiry } from '../../store';

const PromoBanner = ({ products = [], onViewDetails }) => {
    const dispatch = useDispatch();
    const { promo: config } = useSelector(state => state.banner);
    const { isActive, selectedProductIds, expiryTime } = config;


    useEffect(() => {
        if (!expiryTime) return;

        dispatch(checkExpiry());
        const timer = setInterval(() => dispatch(checkExpiry()), 60000);

        return () => clearInterval(timer);
    }, [expiryTime, dispatch]);


    const promoProducts = useMemo(() => {
        if (selectedProductIds?.length > 0) {
            return products.filter(p => selectedProductIds.includes(p.id));
        }
        return products.filter(p => p.image).slice(0, 3);
    }, [products, selectedProductIds]);

    if (!isActive || promoProducts.length === 0) return null;


    const styles = {
        wrapper: "relative group rounded-[2rem] lg:rounded-[3rem] bg-slate-900 border border-white/10 shadow-2xl overflow-hidden",
        gridContainer: "relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 lg:p-16",
        productCard: "group/item relative flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm border border-white/5 rounded-[2rem] transition-all duration-500 hover:-translate-y-2"
    };

    return (
        <section className="py-12 lg:py-20 bg-white dark:bg-slate-950">
            <div className="max-w-[1440px] mx-auto px-4">
                <div className={styles.wrapper}>


                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(37,99,235,0.1),transparent_50%)]" />

                    <div className={styles.gridContainer}>

                        <div className="lg:col-span-5 space-y-6">
                            <Badge label="Édition Limitée" />

                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-6xl font-black text-white leading-none italic uppercase">
                                    VIVEZ <br />
                                    <span className="text-blue-500">L'INNOVATION</span>
                                </h2>
                                <p className="text-slate-400 max-w-sm border-l-2 border-blue-500/50 pl-4">
                                    Explorez le futur du digital avec notre sélection d'élite.
                                </p>
                            </div>

                            <button
                                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-tighter hover:bg-blue-50 transition-colors"
                            >
                                Voir la Collection
                                <ArrowRight size={18} />
                            </button>
                        </div>


                        <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {promoProducts.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    onClick={() => onViewDetails?.(product)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Badge = ({ label }) => (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
        <Sparkles className="text-blue-400" size={14} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">{label}</span>
    </div>
);

const ProductItem = ({ product, onClick }) => {
    const discount = product.oldPrice
        ? Math.round((1 - product.price / product.oldPrice) * 100)
        : null;

    return (
        <div onClick={onClick} className="group relative p-4 bg-white/5 rounded-3xl border border-white/5 hover:border-blue-500/50 cursor-pointer transition-all">
            <div className="aspect-square mb-4">
                <img src={product.image || null} alt={product.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <h3 className="text-[10px] text-slate-400 uppercase font-bold truncate">{product.title}</h3>
            <p className="text-blue-400 font-black mt-1">{product.price.toLocaleString()} DH</p>

            {discount && (
                <span className="absolute top-2 left-2 bg-rose-500 text-[8px] font-bold px-2 py-1 rounded-full text-white">
                    -{discount}%
                </span>
            )}
        </div>
    );
};

export default PromoBanner;