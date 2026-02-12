import React from 'react';
import {
  ChevronRight,
  ArrowLeft,
  Truck,
  ShieldAlert,
  HelpCircle,
  Lock,
  FileText,
  Clock,
  MapPin,
  CreditCard
} from 'lucide-react';


const PolicyPage = ({ type, onBack, onNavigateTo }) => {
  const renderContent = () => {
    switch (type) {
      case 'faq':
        return (
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Foire Aux Questions (FAQ)</h2>
            <div className="space-y-8">
              {[
                { q: "Quels sont les délais de livraison au Maroc ?", a: "Nous livrons partout au Maroc sous 24h à 48h ouvrables. Les livraisons à Casablanca et Rabat peuvent souvent être effectuées le jour même." },
                { q: "Quelles sont les méthodes de paiement acceptées ?", a: "Nous acceptons le paiement en espèces à la livraison (Cash on Delivery), les cartes bancaires nationales et internationales, ainsi que PayPal." },
                { q: "Les produits sont-ils sous garantie ?", a: "Oui, tous nos produits neufs bénéficient d'une garantie officielle de 12 mois minimum. Le service après-vente est géré directement dans nos ateliers à Casablanca." },
                { q: "Puis-je annuler ma commande ?", a: "Vous pouvez annuler votre commande sans frais tant qu'elle n'a pas été expédiée. Contactez-nous via WhatsApp pour une annulation rapide." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <h4 className="text-lg font-black text-slate-900 mb-3">{item.q}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'shipping':
        return (
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Livraison & Expédition</h2>
            <div className="prose prose-slate max-w-none text-slate-600 font-medium space-y-6">
              <p className="text-lg">TechZone assure une logistique de pointe pour garantir que vos produits premium arrivent en parfait état et dans les meilleurs délais.</p>
              <div className="grid md:grid-cols-2 gap-8 py-8">
                <div className="p-8 bg-blue-50 rounded-[2.5rem] space-y-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                  <h4 className="text-xl font-black text-slate-900 uppercase">Livraison Standard</h4>
                  <p className="text-sm">Gratuite pour toutes les commandes supérieures à 2000 DH. Frais fixes de 25 DH pour les commandes inférieures.</p>
                </div>
                <div className="p-8 bg-orange-50 rounded-[2.5rem] space-y-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <h4 className="text-xl font-black text-slate-900 uppercase">Délais</h4>
                  <p className="text-sm">Casablanca/Rabat: 24h. Autres villes: 48h à 72h selon la zone géographique.</p>
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase">Suivi de colis</h3>
              <p>Une fois votre commande validée, vous recevrez un SMS avec un lien de suivi en temps réel pour localiser votre livreur TechZone.</p>
            </div>
          </div>
        );
      case 'returns':
        return (
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Retours & Remboursements</h2>
            <div className="p-10 border-2 border-dashed border-slate-100 rounded-[3rem] space-y-8">
              <div className="flex gap-6 items-start">
                <div className="size-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-slate-900 uppercase">Politique de 7 jours</h4>
                  <p className="text-slate-500 font-medium">Vous disposez de 7 jours après réception pour demander un retour si le produit ne vous satisfait pas ou présente un défaut.</p>
                </div>
              </div>
              <div className="space-y-6 text-slate-600 font-medium">
                <p>Conditions de retour :</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>L'article doit être dans son emballage d'origine scellé.</li>
                  <li>Tous les accessoires et manuels doivent être présents.</li>
                  <li>La facture d'achat doit être jointe au colis.</li>
                </ul>
                <p className="pt-6">Les frais de retour sont à la charge de TechZone en cas de produit défectueux, et à la charge du client en cas de changement d'avis.</p>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Politique de Confidentialité</h2>
            <div className="space-y-8 text-slate-600 font-medium leading-relaxed">
              <p>Chez TechZone, nous prenons la sécurité de vos données très au sérieux. Cette politique explique comment nous traitons vos informations personnelles.</p>
              <div className="space-y-4">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">1. Collecte des données</h4>
                <p>Nous collectons les informations nécessaires au traitement de votre commande : Nom, Adresse, Téléphone et Email.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">2. Utilisation</h4>
                <p>Vos données sont exclusivement utilisées pour la livraison de vos produits et pour vous envoyer des offres promotionnelles si vous y avez consenti.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">3. Sécurité</h4>
                <p>Toutes les transactions par carte bancaire sont sécurisées via le protocole SSL et traitées par notre partenaire CMI agréé par Bank Al-Maghrib.</p>
              </div>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Conditions Générales de Vente</h2>
            <div className="space-y-10 text-slate-600 font-medium leading-relaxed">
              <p>L'utilisation du site TechZone implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après.</p>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Article 1 : Prix</h4>
                <p className="text-sm">Les prix affichés sur le site sont en Dirhams Marocains (MAD) et incluent la TVA. TechZone se réserve le droit de modifier ses prix à tout moment.</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Article 2 : Disponibilité</h4>
                <p className="text-sm">Nos offres de produits sont valables tant qu'elles sont visibles sur le site et dans la limite des stocks disponibles.</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Article 3 : Responsabilité</h4>
                <p className="text-sm">TechZone ne saurait être tenu pour responsable des dommages résultant d'une mauvaise utilisation de l'appareil acheté.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const navItems = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'shipping', label: 'Livraison', icon: Truck },
    { id: 'returns', label: 'Retours', icon: ShieldAlert },
    { id: 'privacy', label: 'Confidentialité', icon: Lock },
    { id: 'terms', label: 'Conditions', icon: FileText },
  ];

  return (
    <div className="bg-white min-h-screen animate-fade-up ">
      {/* Header / Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <button onClick={onBack} className="hover:text-blue-600 transition-colors flex items-center gap-2">
            <ArrowLeft className="h-3.5 w-3.5" /> ACCUEIL
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900 uppercase">Aide & Support</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pb-32">
        <div className="flex flex-col lg:flex-row gap-20 mt-12">

          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-72 shrink-0 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigateTo(item.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all ${type === item.id
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}

            <div className="pt-10 space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-5">Besoin d'aide immédiate ?</p>
              <a href="https://wa.me/212600000000" className="w-full bg-[#25D366] text-white p-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 active:scale-95 transition-all">
                <Clock className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-widest">Chat WhatsApp</span>
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow max-w-4xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
