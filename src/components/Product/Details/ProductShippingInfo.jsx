import React from 'react';
import { Truck, ShieldCheck, Clock } from 'lucide-react';

const ProductShippingInfo = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {[
                { title: "Livraison", icon: Truck, text: "Ghi f 24h/48h f kola mdina f lmghrib." },
                { title: "Paiement", icon: ShieldCheck, text: "Khless f l-bab dyal dar (Cash on Delivery) aw b la carte." },
                { title: "Retour", icon: Clock, text: "3andek 7 ayyam bach tbedel rayek ila ma3ajbakch." }
            ].map((it, i) => (
                <div key={i} className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <it.icon className="size-8 sm:size-10 text-blue-600 mb-4 sm:mb-6" />
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter mb-2 sm:mb-4 dark:text-white">{it.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{it.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductShippingInfo;
