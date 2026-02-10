
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CreditCard, Plus, Trash2, ShieldCheck, Lock,
    X, AlertCircle, CheckCircle2
} from 'lucide-react';
import { updateUser, setToast } from '../../store';

const ProfilePayments = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [savedMethods, setSavedMethods] = useState(user?.paymentMethods || [
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true, color: 'from-blue-600 to-indigo-700' }
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newCard, setNewCard] = useState({ number: '', expiry: '', cvc: '', type: 'Visa' });

    const handleAddCard = (e) => {
        e.preventDefault();
        if (newCard.number.length < 16) {
            dispatch(setToast({ msg: "Numéro de carte invalide (16 chiffres requis)", type: "error" }));
            return;
        }

        const card = {
            id: Date.now(),
            type: newCard.number.startsWith('4') ? 'Visa' : 'Mastercard',
            last4: newCard.number.slice(-4),
            expiry: newCard.expiry,
            isDefault: savedMethods.length === 0,
            color: newCard.number.startsWith('4') ? 'from-blue-600 to-indigo-700' : 'from-slate-800 to-slate-950'
        };

        const updatedMethods = [...savedMethods, card];
        setSavedMethods(updatedMethods);

        dispatch(updateUser({ paymentMethods: updatedMethods }));
        dispatch(setToast({ msg: "Carte ajoutée avec succès !", type: "success" }));

        setShowAddForm(false);
        setNewCard({ number: '', expiry: '', cvc: '', type: 'Visa' });
    };

    const handleDeleteCard = (id) => {
        const updatedMethods = savedMethods.filter(m => m.id !== id);
        setSavedMethods(updatedMethods);
        dispatch(updateUser({ paymentMethods: updatedMethods }));
        dispatch(setToast({ msg: "Méthode de paiement supprimée.", type: "info" }));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Méthodes de Paiement</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Gérez vos cartes et moyens de paiement sécurisés</p>
                </div>
                {!showAddForm && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-slate-900/10"
                    >
                        <Plus className="size-4" />
                        Ajouter
                    </button>
                )}
            </div>

            {showAddForm && (
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border-2 border-blue-600/30 shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <Plus className="size-4" />
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-widest dark:text-white">Nouvelle Carte</h4>
                        </div>
                        <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                            <X className="size-5" />
                        </button>
                    </div>

                    <form onSubmit={handleAddCard} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Numéro de Carte</label>
                            <input
                                required
                                maxLength="16"
                                type="text"
                                placeholder="4242 4242 4242 4242"
                                value={newCard.number}
                                onChange={(e) => setNewCard({ ...newCard, number: e.target.value.replace(/\D/g, '') })}
                                className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-blue-500 outline-none font-bold text-xs dark:text-white"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Exp.</label>
                                <input
                                    required
                                    placeholder="MM/YY"
                                    value={newCard.expiry}
                                    onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-blue-500 outline-none font-bold text-xs dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVC</label>
                                <input
                                    required
                                    maxLength="3"
                                    placeholder="***"
                                    value={newCard.cvc}
                                    onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value.replace(/\D/g, '') })}
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-blue-500 outline-none font-bold text-xs dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 pt-4">
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                                Confirmer l'ajout
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {savedMethods.map((method) => (
                    <div key={method.id} className={`relative p-8 rounded-[2.5rem] bg-gradient-to-br ${method.color} text-white shadow-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500`}>
                        <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                            <CreditCard className="size-20" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <div className="size-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                                        <div className="font-bold italic">{method.type[0]}</div>
                                    </div>
                                    {method.isDefault && (
                                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-1">
                                            <CheckCircle2 className="size-2" /> Principal
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDeleteCard(method.id)}
                                    className="size-8 bg-white/10 hover:bg-rose-500 rounded-full flex items-center justify-center transition-all group/del"
                                >
                                    <Trash2 className="size-4 group-hover/del:scale-110" />
                                </button>
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Numéro de carte</p>
                                <p className="text-xl font-medium tracking-[0.3em]">**** **** **** {method.last4}</p>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Expiration</p>
                                    <p className="text-sm font-bold">{method.expiry}</p>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-80">
                                    <ShieldCheck className="size-3" />
                                    Sécurisé
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {savedMethods.length === 0 && !showAddForm && (
                    <div className="md:col-span-2 py-20 bg-slate-50 dark:bg-slate-900 shadow-inner rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-4">
                        <div className="size-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
                            <AlertCircle className="size-8 text-slate-300" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aucune carte enregistrée</p>
                        <button onClick={() => setShowAddForm(true)} className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">Ajouter ma première carte</button>
                    </div>
                )}
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-500/20 rounded-3xl p-6 flex items-start gap-4">
                <div className="size-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-emerald-500 shadow-sm shrink-0">
                    <Lock className="size-5" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Données Encryptées</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Vos informations de paiement sont sécurisées par un cryptage SSL 256-bits. TechZone ne stocke jamais vos numéros de carte complets.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePayments;
