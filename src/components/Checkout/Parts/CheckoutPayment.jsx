
import React, { useState } from 'react';
import { CreditCard, Landmark, Wallet, Plus, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutPayment = ({
    paymentOptions, paymentMethod, setPaymentMethod, user,
    isAddingNewCard, setIsAddingNewCard, selectedCardId, setSelectedCardId,
    onPrev, onNext, total
}) => {
    const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '', name: '' });

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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none animate-fade-up">
                                {/* Card Preview */}
                                <div className="relative aspect-[1.6/1] bg-gradient-to-br from-slate-900 to-black rounded-3xl p-8 text-white overflow-hidden shadow-2xl flex flex-col justify-between group">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                                    <div className="absolute -top-20 -right-20 size-64 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-all duration-700"></div>

                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="size-12 bg-slate-800/50 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 italic font-black text-xs">CHIP</div>
                                        <div className="text-right">
                                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Premium Partner</p>
                                            <p className="text-xs font-black uppercase italic tracking-tighter">ELITE CARD</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1 relative z-10">
                                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">Card Number</p>
                                        <p className="text-base sm:text-lg font-display font-black tracking-[0.2em]">{cardData.number || '•••• •••• •••• ••••'}</p>
                                    </div>

                                    <div className="flex justify-between items-end relative z-10">
                                        <div>
                                            <p className="text-[7px] font-black uppercase tracking-widest text-slate-500">Card Holder</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest">{cardData.name || 'VOTRE NOM'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[7px] font-black uppercase tracking-widest text-slate-500">Expires</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest">{cardData.expiry || 'MM/YY'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Form */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <ShieldCheck className="size-4 text-emerald-500" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Paiement 256-bit SSL sécurisé</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Titulaire</label>
                                            <input
                                                type="text"
                                                placeholder="NOM COMPLET"
                                                value={cardData.name}
                                                onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                                                className="w-full h-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-[10px] font-black focus:border-blue-600 transition-all outline-none dark:text-white uppercase tracking-widest"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Numéro de Carte</label>
                                            <input
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                maxLength="19"
                                                value={cardData.number}
                                                onChange={(e) => {
                                                    let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                                                    let matches = v.match(/\d{4,16}/g);
                                                    let match = matches && matches[0] || '';
                                                    let parts = [];
                                                    for (let i = 0, len = match.length; i < len; i += 4) parts.push(match.substring(i, i + 4));
                                                    if (parts.length) setCardData({ ...cardData, number: parts.join(' ') });
                                                    else setCardData({ ...cardData, number: v });
                                                }}
                                                className="w-full h-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-[10px] font-black focus:border-blue-600 transition-all outline-none dark:text-white tracking-[0.2em]"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Expiration</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                    value={cardData.expiry}
                                                    onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                                                    className="w-full h-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-[10px] font-black focus:border-blue-600 transition-all outline-none dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">CVC</label>
                                                <input
                                                    type="text"
                                                    placeholder="000"
                                                    maxLength="3"
                                                    value={cardData.cvc}
                                                    onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                                                    className="w-full h-14 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-[10px] font-black focus:border-blue-600 transition-all outline-none dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-400 mt-4">
                                        <Zap className="size-3 text-orange-500" />
                                        Paiement vérifié par 3D Secure
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-10 rounded-[3rem] border border-blue-100 dark:border-blue-500/20 space-y-8">
                        <div className="text-center space-y-4">
                            <div className="size-20 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                                <Landmark className="size-10 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black uppercase dark:text-white">Paiement PayPal</h4>
                                <p className="text-xs text-slate-500 mt-1">Transaction sécurisée et instantanée.</p>
                            </div>
                        </div>

                        <div className="max-w-md mx-auto">
                            <PayPalButtons
                                style={{ layout: "vertical", shape: "pill", label: "pay" }}
                                fundingSource="paypal"
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: (total / 10).toFixed(2), // Conversion fictive DH -> USD pour le test
                                            },
                                        }],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        onNext(); // Passer à l'étape suivante après succès
                                    });
                                }}
                            />
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
                {paymentMethod !== 'paypal' && (
                    <button onClick={onNext} className="flex-1 h-16 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all">Suivant : Confirmation</button>
                )}
            </div>
        </section>
    );
};

export default CheckoutPayment;
