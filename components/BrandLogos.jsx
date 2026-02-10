import React from 'react';
import { BRANDS } from '../data/products';

const BrandLogos = () => {
    return (
        <section className="py-12 bg-white dark:bg-slate-950 border-y border-slate-50 dark:border-slate-800/50 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">Partenaires Officiels</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0">
                    {BRANDS.map((brand, idx) => (
                        <div key={idx} className="h-8 lg:h-10 w-24 lg:w-32 flex items-center justify-center transition-transform hover:scale-110">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-h-full max-w-full object-contain dark:invert"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandLogos;
