import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const CheckoutVerification = ({ formData, paymentMethod, paymentOptions, onPrev, onConfirm, isSubmitting, setStep }) => {
    return (
        <section className="space-y-10 animate-fade-right">
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="size-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="size-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display">Vérification Finale</h3>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 space-y-6 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Envoyé à</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white font-display">{formData.name}</p>
                        <p className="text-xs font-bold text-slate-500 mt-1">{formData.address}, {formData.city}</p>
                        <p className="text-xs font-bold text-slate-500 mt-0.5">{formData.phone}</p>
                    </div>
                    <button onClick={() => setStep(1)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-600/10 px-4 py-2 rounded-xl">Modifier</button>
                </div>
                <hr className="border-slate-100 dark:border-slate-800" />
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Paiement</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase font-display">{paymentOptions.find(o => o.id === paymentMethod)?.label}</p>
                    </div>
                    <button onClick={() => setStep(2)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-600/10 px-4 py-2 rounded-xl">Modifier</button>
                </div>
            </div>

            <div className="flex gap-4">
                <button onClick={onPrev} className="px-8 h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Retour</button>
                <button
                    onClick={onConfirm}
                    disabled={isSubmitting}
                    className="flex-1 h-16 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <div className="size-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>Confirmer la Commande <ArrowRight className="size-4" /></>
                    )}
                </button>
            </div>
        </section>
    );
};

export default CheckoutVerification;
