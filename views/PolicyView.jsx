
import React from 'react';
import { Truck, RotateCcw, ShieldCheck, FileText, ArrowLeft, Clock, Globe, Shield } from 'lucide-react';

const PolicyView = ({ type, onBack }) => {
    const content = {
        shipping: {
            title: "Politique de Livraison",
            subtitle: "Performance & Rapidité",
            icon: Truck,
            color: "blue",
            sections: [
                {
                    title: "Zones & Délais",
                    items: [
                        { label: "Casablanca & Environs", detail: "Livraison le jour même (avant 14h) ou 24h." },
                        { label: "Rabat, Marrakech, Tanger", detail: "24h à 48h ouvrables." },
                        { label: "Autres Villes du Maroc", detail: "48h à 72h via nos partenaires logistiques." }
                    ]
                },
                {
                    title: "Tarifs de Livraison",
                    items: [
                        { label: "Commandes > 2000 DH", detail: "Livraison GRATUITE partout au Maroc." },
                        { label: "Commandes < 2000 DH", detail: "Frais fixes de 25 DH." },
                        { label: "Retrait en Magasin", detail: "Gratuit (Showroom Maarif, Casablanca)." }
                    ]
                },
                {
                    title: "Suivi & Réception",
                    items: [
                        { label: "Suivi en temps réel", detail: "Recevez un SMS dès que votre colis quitte notre entrepôt." },
                        { label: "Vérification", detail: "Vous avez le droit de vérifier l'état du colis à la réception." }
                    ]
                }
            ]
        },
        returns: {
            title: "Retours & Remboursements",
            subtitle: "Sérénité Garantie",
            icon: RotateCcw,
            color: "orange",
            sections: [
                {
                    title: "Conditions de Retour",
                    items: [
                        { label: "Délai de réflexion", detail: "7 jours pour changer d'avis (produit non ouvert)." },
                        { label: "État du produit", detail: "Emballage original intact et accessoires complets." },
                        { label: "Produits défectueux", detail: "Échange immédiat ou réparation sous garantie." }
                    ]
                },
                {
                    title: "Procédure Elite",
                    items: [
                        { label: "Étape 1", detail: "Contactez notre support via WhatsApp ou Mail." },
                        { label: "Étape 2", detail: "Notre transporteur passe récupérer le colis chez vous." },
                        { label: "Étape 3", detail: "Remboursement sous 5 jours après inspection." }
                    ]
                }
            ]
        },
        privacy: {
            title: "Confidentialité",
            subtitle: "Vos données sont sacrées",
            icon: ShieldCheck,
            color: "emerald",
            sections: [
                {
                    title: "Protection des Données",
                    items: [
                        { label: "Sécurité", detail: "Chiffrement SSL 256 bits pour toutes vos transactions." },
                        { label: "Utilisation", detail: "Vos données ne sont jamais vendues à des tiers." }
                    ]
                }
            ]
        },
        terms: {
            title: "Conditions Générales",
            subtitle: "Contrat de Confiance",
            icon: FileText,
            color: "slate",
            sections: [
                {
                    title: "Utilisation du Site",
                    items: [
                        { label: "Acceptation", detail: "En utilisant TechZone, vous acceptez nos CGU." },
                        { label: "Prix", detail: "Les prix affichés sont en Dirhams (DH) TTC." }
                    ]
                }
            ]
        }
    };

    const current = content[type] || content.shipping;
    const Icon = current.icon;

    const colorClasses = {
        blue: "bg-blue-600/10 text-blue-600 border-blue-600/20",
        orange: "bg-orange-600/10 text-orange-600 border-orange-600/20",
        emerald: "bg-emerald-600/10 text-emerald-600 border-emerald-600/20",
        slate: "bg-slate-600/10 text-slate-600 border-slate-600/20"
    };

    return (
        <div className="page-content bg-[#f8fafc] dark:bg-slate-950 min-h-screen pt-32 pb-24 transition-colors duration-500">
            <div className="max-w-5xl mx-auto px-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 animate-fade-up">
                    <div className="space-y-4">
                        <button
                            onClick={onBack}
                            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all"
                        >
                            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                            Retour à l'Accueil
                        </button>
                        <div className="flex items-center gap-6">
                            <div className={`size-16 rounded-2xl flex items-center justify-center border-2 ${colorClasses[current.color]}`}>
                                <Icon className="size-8" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display leading-[0.9]">
                                    {current.title}
                                </h1>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">{current.subtitle}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                            <Clock className="size-5 text-blue-600" />
                            <div>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Mis à jour</p>
                                <p className="text-[10px] font-bold dark:text-white uppercase">Février 2026</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    {current.sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] hover:border-blue-500/30 transition-all duration-500"
                        >
                            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8 font-display border-b border-slate-50 dark:border-slate-800 pb-4">
                                {section.title}
                            </h3>
                            <div className="space-y-8">
                                {section.items.map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                            {item.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Support Banner */}
                <div className="mt-16 bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter font-display mb-2">Besoin d'aide supplémentaire ?</h2>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Notre support Elite est disponible 7j/7.</p>
                        </div>
                        <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                            Contactez un expert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolicyView;
