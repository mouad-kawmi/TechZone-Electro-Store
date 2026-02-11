import React, { useState } from 'react';

const ProductGallery = ({ imgs, title }) => {
    const [sel, setSel] = useState(0);

    return (
        <div className="lg:col-span-7 space-y-6 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
                <div className="aspect-[4/3] w-full rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-6 sm:p-12 relative group">
                    <img
                        src={imgs[sel] || null}
                        alt={title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
                    />
                </div>
                <div className="grid grid-cols-4 gap-3 sm:gap-6">
                    {imgs.slice(0, 4).map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSel(idx)}
                            className={`aspect-square rounded-xl sm:rounded-[2rem] overflow-hidden border-2 transition-all p-2 sm:p-3 bg-white dark:bg-slate-900 ${sel === idx ? 'border-blue-600 shadow-lg' : 'border-slate-100 dark:border-slate-800'
                                }`}
                        >
                            <img src={img || null} className="w-full h-full object-contain" alt="Thumb" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;
