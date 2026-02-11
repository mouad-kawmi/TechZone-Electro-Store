import React from 'react';
import { CreditCard, Landmark, Wallet, Plus, CheckCircle2 } from 'lucide-react';

const CheckoutPayment = ({
    paymentOptions, paymentMethod, setPaymentMethod, user,
    isAddingNewCard, setIsAddingNewCard, selectedCardId, setSelectedCardId,
    onPrev, onNext
}) => {
    return (
        <section className="space-y-10 animate-fade-right">
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="size-10 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-600">
                    <CreditCard className="size-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display">Mode de Paiement</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paymentOptions.map(m => (
                    <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-start gap-4 ${paymentMethod === m.id
                            ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-600/5'
                            : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950'
                            }`}
                    >
                        <div className={`p-4 rounded-2xl ${paymentMethod === m.id ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-400'}`}>
                            <m.icon className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                            <h4 className="text-[11px] font-black uppercase tracking-widest dark:text-white">{m.label}</h4>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-wider">{m.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="animate-fade-up">
                {paymentMethod === 'card' && (
                    <div className="space-y-6">
                        {user?.paymentMethods?.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vos Cartes Enregistrées</h4>
                                    <button
                                        onClick={() => setIsAddingNewCard(!isAddingNewCard)}
                                        className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
                                    >
                                        {isAddingNewCard ? "Utiliser ma carte enregistrée" : "+ Ajouter une nouvelle"}
                                    </button>
                                </div>

                                {!isAddingNewCard && (
                                    <div className="grid gap-4">
                                        {user.paymentMethods.map(card => (
                                            <button
                                                key={card.id}
                                                onClick={() => setSelectedCardId(card.id)}
                                                className={`flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all ${selectedCardId === card.id ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-600/5' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950/50'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`size-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white`}>
                                                        <CreditCard className="size-6" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">**** **** **** {card.last4}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Expire: {card.expiry}</p>
                                                    </div>
                                                </div>
                                                <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedCardId === card.id ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 dark:border-slate-800'}`}>
                                                    {selectedCardId === card.id && <CheckCircle2 className="size-3" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {(isAddingNewCard || !user?.paymentMethods?.length) && (
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-8">
                                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                                    <Plus className="size-5 text-blue-600" />
                                    <h4 className="text-sm font-black uppercase tracking-widest dark:text-white">Nouvelle Carte</h4>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Numéro de Carte</label>
                                        <input type="text" placeholder="**** **** **** ****" className="w-full h-14 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-sm font-bold focus:border-blue-600 transition-all outline-none dark:text-white" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Expiration (MM/YY)</label>
                                            <input type="text" placeholder="MM/YY" className="w-full h-14 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-sm font-bold focus:border-blue-600 transition-all outline-none dark:text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">CVC</label>
                                            <input type="text" placeholder="***" className="w-full h-14 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-sm font-bold focus:border-blue-600 transition-all outline-none dark:text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-500/20 text-center space-y-6">
                        <div className="size-20 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                            <Landmark className="size-10 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="text-lg font-black uppercase dark:text-white">Redirection PayPal</h4>
                            <p className="text-xs text-slate-500 mt-1">Vous allez être redirigé vers l'interface sécurisée de PayPal pour finaliser votre transaction.</p>
                        </div>
                    </div>
                )}

                {paymentMethod === 'cod' && (
                    <div className="bg-orange-50 dark:bg-orange-900/10 p-10 rounded-[3rem] border border-orange-100 dark:border-orange-500/20 flex gap-6 items-center">
                        <div className="size-16 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center shadow-lg shrink-0">
                            <Wallet className="size-8 text-orange-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black uppercase dark:text-white">Paiement à la livraison</h4>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Payez en espèces dès réception de votre commande.</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-4">
                <button onClick={onPrev} className="px-8 h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Retour</button>
                <button onClick={onNext} className="flex-1 h-16 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all">Suivant : Confirmation</button>
            </div>
        </section>
    );
};

export default CheckoutPayment;
