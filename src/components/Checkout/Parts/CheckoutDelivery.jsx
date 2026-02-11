import React from 'react';
import { Truck, User, Phone, MapPin, ChevronDown } from 'lucide-react';

const CheckoutDelivery = ({ formData, setFormData, onNext }) => {
    return (
        <section className="space-y-10 animate-fade-right">
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="size-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <Truck className="size-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display">Livraison Elite</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nom Complet</label>
                    <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-slate-300 group-focus-within:text-blue-600" />
                        <input
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-6 text-sm font-bold focus:border-blue-600 transition-all outline-none dark:text-white"
                            placeholder="Nom et Prénom"
                        />
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Téléphone</label>
                    <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-slate-300 group-focus-within:text-blue-600" />
                        <input
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-6 text-sm font-bold focus:border-blue-600 transition-all outline-none dark:text-white"
                            placeholder="06 -- -- -- --"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Ville</label>
                <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                    <select
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-10 text-sm font-bold focus:border-blue-600 transition-all appearance-none cursor-pointer dark:text-white"
                    >
                        {['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Agadir', 'Fès', 'Meknès', 'Oujda'].map(city => <option key={city}>{city}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                </div>
            </div>

            <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Adresse Complète</label>
                <textarea
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-3xl py-6 px-8 text-sm font-bold focus:border-blue-600 transition-all outline-none resize-none dark:text-white"
                    placeholder="N° d'appartement, Rue, Quartier..."
                ></textarea>
            </div>

            <button
                onClick={onNext}
                disabled={!formData.name || !formData.phone || !formData.address}
                className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
            >
                Suivant : Paiement
            </button>
        </section>
    );
};

export default CheckoutDelivery;
