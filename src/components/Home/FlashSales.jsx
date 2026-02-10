import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Timer, Zap, ArrowRight, Star, ShoppingCart } from 'lucide-react';

const FlashSales = ({ products = [], onAddToCart }) => {
    const { flash: config } = useSelector(state => state.banner);
    const { isActive, selectedProductIds } = config;

    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Select products based on admin selection or fallback
    const displayProducts = selectedProductIds.length > 0
        ? products.filter(p => selectedProductIds.includes(p.id))
        : products.filter(p => p.image && p.oldPrice).slice(0, 2);

    if (!isActive || displayProducts.length === 0) return null;

    return (
        <section className="py-24 bg-[#050a18] text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between mb-20 gap-10">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 mb-6">
                            <Zap className="h-4 w-4 text-orange-500 fill-orange-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Offres Flash du jour</span>
                        </div>
                        <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-tight">
                            NE MANQUEZ <br />
                            <span className="text-blue-500">PAS L'OFFRE !</span>
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        {[
                            { label: "Heures", val: timeLeft.hours },
                            { label: "Minutes", val: timeLeft.minutes },
                            { label: "Secondes", val: timeLeft.seconds }
                        ].map((unit, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="size-20 lg:size-24 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3">
                                    <span className="text-3xl lg:text-4xl font-black font-mono">
                                        {unit.val.toString().padStart(2, '0')}
                                    </span>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{unit.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {displayProducts.map((p, idx) => (
                        <div key={idx} className="group flex flex-col md:flex-row bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3.5rem] overflow-hidden hover:bg-white/10 transition-all duration-500">
                            <div className="w-full md:w-2/5 aspect-square p-10 flex items-center justify-center bg-white/5 relative overflow-hidden">
                                {p.oldPrice && (
                                    <div className="absolute top-6 left-6 z-20 bg-orange-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                                    </div>
                                )}
                                <img
                                    src={p.image || null}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                    alt={p.title}
                                />
                            </div>
                            <div className="flex-1 p-10 flex flex-col justify-center">
                                <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4 inline-block">{p.category}</span>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">{p.title}</h3>
                                <div className="flex items-end gap-5 mb-10">
                                    <span className="text-4xl font-black text-white">{p.price.toLocaleString()} DH</span>
                                    {p.oldPrice && (
                                        <span className="text-lg font-bold text-slate-500 line-through mb-1">{p.oldPrice.toLocaleString()} DH</span>
                                    )}
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => onAddToCart?.(p)}
                                        className="h-16 flex-1 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3"
                                    >
                                        <ShoppingCart className="h-5 w-5" /> Ajouter au Panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSales;
