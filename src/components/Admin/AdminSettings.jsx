
import React, { useState } from 'react';
import { Save, Store, Mail, Phone, MapPin, Globe, ShieldCheck, Zap } from 'lucide-react';


const AdminSettings = ({ settings = { name: '', email: '', phone: '', address: '' }, onSave }) => {
    const [formData, setFormData] = useState(settings);
    const [isSaving, setIsSaving] = useState(false);

    React.useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate save delay
        setTimeout(() => {
            onSave(formData);
            setIsSaving(false);
        }, 800);
    };

    return (
        <div className="space-y-6 md:space-y-8 animate-fade-up px-1 md:px-0">
            {/* Header Section */}
            <div className="bg-slate-950 dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] border border-blue-500/20 p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-blue-600/10 blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center gap-4 md:gap-6 text-center sm:text-left">
                    <div className="size-12 md:size-16 rounded-2xl md:rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20 shrink-0">
                        <Store className="size-6 md:size-8" />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter font-display">Paramètres du Magasin</h2>
                        <p className="text-[8px] md:text-[10px] font-black text-slate-500 md:text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1">Module de Configuration Globale</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
                {/* Main Settings Form */}
                <div className="xl:col-span-8 order-2 xl:order-1">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/40 rounded-3xl md:rounded-[3rem] border border-slate-100 dark:border-slate-800 p-6 md:p-8 lg:p-12 shadow-sm space-y-8 md:space-y-10">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">01. Informations Essentielles</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2 md:space-y-3">
                                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 md:ml-3">Nom du Magasin</label>
                                    <div className="relative group">
                                        <Store className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full h-12 md:h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl pl-12 pr-6 text-xs md:text-sm font-black outline-none focus:border-blue-600 dark:text-white transition-all"
                                            placeholder="TechZone Electro"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:space-y-3">
                                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 md:ml-3">E-mail de Contact</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full h-12 md:h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl pl-12 pr-6 text-xs md:text-sm font-black outline-none focus:border-blue-600 dark:text-white transition-all"
                                            placeholder="contact@techzone.ma"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">02. Communication & Localisation</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2 md:space-y-3">
                                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 md:ml-3">Numéro de Téléphone</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full h-12 md:h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl pl-12 pr-6 text-xs md:text-sm font-black outline-none focus:border-blue-600 dark:text-white transition-all"
                                            placeholder="+212 6XX XX XX XX"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:space-y-3">
                                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 md:ml-3">Adresse du Magasin</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full h-12 md:h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl pl-12 pr-6 text-xs md:text-sm font-black outline-none focus:border-blue-600 dark:text-white transition-all"
                                            placeholder="Casablanca, Maroc"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="pt-4 md:pt-6 flex flex-col sm:flex-row justify-end gap-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="relative group w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 bg-slate-950 dark:bg-blue-600 text-white rounded-2xl md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-600/20"
                            >
                                {isSaving ? (
                                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save className="size-4 md:size-5" />
                                        <span className="truncate">Sauvegarder</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sidebar Info Cards */}
                <div className="xl:col-span-4 space-y-4 md:space-y-6 order-1 xl:order-2">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 space-y-4">
                        <div className="size-10 md:size-12 rounded-xl md:rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <ShieldCheck className="size-5 md:size-6" />
                        </div>
                        <h4 className="text-xs md:text-sm font-black text-emerald-600 uppercase tracking-widest">Système Sécurisé</h4>
                        <p className="text-[9px] md:text-[10px] font-bold text-emerald-600/70 leading-relaxed uppercase tracking-wider">
                            Ces informations doivent être exactes car elles apparaîtront sur les factures et les emails des clients.
                        </p>
                    </div>

                    <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 space-y-4">
                        <div className="size-10 md:size-12 rounded-xl md:rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                            <Zap className="size-5 md:size-6" />
                        </div>
                        <h4 className="text-xs md:text-sm font-black text-blue-600 uppercase tracking-widest">Optimisation Tech</h4>
                        <p className="text-[9px] md:text-[10px] font-bold text-blue-600/70 leading-relaxed uppercase tracking-wider">
                            Toutes les mises à jour seront instantanément reflétées sur l'interface client.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
