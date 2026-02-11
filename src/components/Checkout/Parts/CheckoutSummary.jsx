import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const CheckoutSummary = ({
    items, couponCode, setCouponCode, handleApplyCoupon,
    subtotal, discount, discountAmount, shipping, total
}) => {
    return (
        <div className="bg-white dark:bg-[#0f172a] rounded-[3.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] lg:sticky lg:top-32 space-y-10">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display">Résumé Commande</h3>

            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {items.map(item => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedStorage}`} className="flex gap-6 group">
                        <div className="size-20 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-3 shrink-0 flex items-center justify-center transition-all group-hover:scale-110">
                            <img src={item.image || null} className="h-full w-full object-contain" alt={item.title} />
                        </div>
                        <div className="flex-1 py-1 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-tight line-clamp-1">{item.title}</h4>
                                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{item.selectedColor} • {item.selectedStorage}</p>
                            </div>
                            <p className="text-xs font-black text-blue-600 dark:text-blue-400">
                                {item.quantity} x {item.price.toLocaleString()} DH
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-3">
                <input
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    className="flex-1 h-14 bg-slate-50 dark:bg-slate-900/50 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest border border-transparent focus:border-blue-600 outline-none dark:text-white"
                    placeholder="CODE PROMO"
                />
                <button onClick={handleApplyCoupon} className="bg-slate-900 dark:bg-blue-600 text-white px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest font-display">Appliquer</button>
            </div>

            <div className="space-y-5 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Sous-total</span>
                    <span className="text-slate-900 dark:text-white font-display">{subtotal.toLocaleString()} DH</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                        <span>Remise Elite ({discount}%)</span>
                        <span>-{discountAmount.toLocaleString()} DH</span>
                    </div>
                )}
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    <span>Livraison</span>
                    <span className={shipping === 0 ? 'text-emerald-500 font-black' : 'text-slate-900 dark:text-white'}>
                        {shipping === 0 ? 'OFFERTE' : '25 DH'}
                    </span>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Total Final</p>
                        <h4 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter font-display">
                            {total.toLocaleString()} <span className="text-lg">DH</span>
                        </h4>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-500" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Garantie Elite</span>
                </div>
                <div className="flex items-center gap-2">
                    <Lock className="size-4 text-blue-600" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sécurisé</span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSummary;
