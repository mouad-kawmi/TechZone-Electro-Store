
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, Search, ArrowLeft } from 'lucide-react';

const FAQView = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('Général');
    const [openItems, setOpenItems] = useState([0]);

    const toggleItem = (idx) => {
        if (openItems.includes(idx)) {
            setOpenItems(openItems.filter(i => i !== idx));
        } else {
            setOpenItems([...openItems, idx]);
        }
    };

    const categories = ['Général', 'Commandes', 'Paiement', 'Garantie'];

    const faqs = {
        'Général': [
            { q: "Est-ce que l'adresse Twin Center est ouverte au public ?", a: "Oui, notre Showroom Elite au Twin Center (Casablanca) vous accueille de 10h à 20h pour tester nos derniers produits Apple, Samsung et plus." },
            { q: "Les produits sont-ils originaux ?", a: "À 100%. TechZone ne vend que des produits authentiques bénéficiant d'une garantie constructeur officielle. Pas de reconditionné sans mention explicite." },
            { q: "Comment vous contacter rapidement ?", a: "Le bouton WhatsApp en bas à droite est le moyen le plus rapide. Nous répondons généralement en moins de 15 minutes." }
        ],
        'Commandes': [
            { q: "Comment suivre ma commande ?", a: "Une fois confirmée, utilisez votre numéro (ex: TZ-123456) dans la section 'Suivre mon colis' de votre profil ou reçu mail." },
            { q: "Puis-je annuler ma commande ?", a: "Oui, tant qu'elle n'est pas passée en état 'Expédiée'. Contactez-nous vite par téléphone." }
        ],
        'Paiement': [
            { q: "Quels sont les modes de paiement acceptés ?", a: "Carte Bancaire (CMI), PayPal, et Paiement à la Livraison (Cash on Delivery) sans frais supplémentaires." },
            { q: "Le paiement par carte est-il sécurisé ?", a: "Elite Security : toutes les transactions sont traitées via une plateforme certifiée CMI avec authentification 3D Secure." }
        ],
        'Garantie': [
            { q: "Quelle est la durée de la garantie ?", a: "La plupart de nos produits high-tech bénéficient d'une garantie constructeur de 12 mois minimum." },
            { q: "Le service après-vente est-il à Casablanca ?", a: "Oui, notre centre technique principal est basé à Maarif, Casablanca." }
        ]
    };

    return (
        <div className="page-content bg-[#f8fafc] dark:bg-slate-950 min-h-screen pt-32 pb-24 transition-colors duration-500">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 space-y-6 animate-fade-up">
                    <button
                        onClick={onBack}
                        className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all mb-4"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        Retour l-Accueil
                    </button>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="size-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600">
                            <HelpCircle className="size-6" />
                        </div>
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Centre d'aide TechZone</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display leading-[0.9]">
                        Des Questions ?<br /><span className="text-blue-600">On a les Réponses.</span>
                    </h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest max-w-lg mx-auto">Tout ce que vous devez savoir pour une expérience shopping Elite.</p>
                </div>

                {/* Search Bar - Aesthetic Only for now */}
                <div className="relative mb-12 max-w-2xl mx-auto group animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Jereb t-qleb 3la chi haja : 'Garantie'..."
                        className="w-full h-16 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] pl-16 pr-8 text-sm font-bold outline-none focus:border-blue-600 dark:text-white transition-all shadow-xl shadow-slate-900/5 placeholder:text-slate-300 font-display uppercase tracking-wider"
                    />
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-center gap-3 mb-12 overflow-x-auto no-scrollbar pb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setActiveTab(cat); setOpenItems([0]); }}
                            className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all min-w-max ${activeTab === cat
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                                : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Questions Grid */}
                <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                    {faqs[activeTab].map((faq, idx) => (
                        <div
                            key={idx}
                            className={`bg-white dark:bg-slate-900 border transition-all duration-500 overflow-hidden ${openItems.includes(idx)
                                ? 'border-blue-500/30 rounded-[2rem] shadow-xl shadow-slate-900/5'
                                : 'border-slate-100 dark:border-slate-800 rounded-3xl hover:border-blue-500/20'
                                }`}
                        >
                            <button
                                onClick={() => toggleItem(idx)}
                                className="w-full p-8 flex items-center justify-between gap-6"
                            >
                                <span className={`text-sm font-black text-left uppercase tracking-tight font-display transition-colors ${openItems.includes(idx) ? 'text-blue-600' : 'text-slate-900 dark:text-white'}`}>
                                    {faq.q}
                                </span>
                                <div className={`size-8 rounded-xl flex items-center justify-center transition-all ${openItems.includes(idx) ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                                    <ChevronDown className="size-4" />
                                </div>
                            </button>

                            <div className={`transition-all duration-500 ${openItems.includes(idx) ? 'max-h-96 opacity-100 pb-8 px-8' : 'max-h-0 opacity-0'}`}>
                                <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic uppercase tracking-wider">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="mt-20 p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3.5rem] animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    <div className="bg-slate-950 rounded-[3.4rem] p-12 text-center space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent)] pointer-events-none"></div>
                        <div className="flex items-center justify-center gap-4">
                            <MessageSquare className="size-6 text-blue-500" />
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter font-display">Ma lqitich l-jawab ?</h3>
                        </div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-sm mx-auto">Hdar m-3ana directement f WhatsApp. On est là pour toi.</p>
                        <button className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                            Chit-chat m-3a l-Expert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQView;
