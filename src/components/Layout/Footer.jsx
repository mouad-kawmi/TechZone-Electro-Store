
import React from 'react';
import {
  Facebook, Twitter, Instagram, Youtube, Globe,
  Mail, Phone, MapPin, ArrowRight, ShieldCheck,
  CreditCard, Truck, Headphones, Sparkles
} from 'lucide-react';
import { useSelector } from 'react-redux';

const Footer = ({
  onAboutClick,
  onContactClick,
  onCategoryClick,
  onPolicyClick,
  onAdminClick,
  onReviewsClick
}) => {
  // Récupération des paramètres du magasin depuis Redux
  const settings = useSelector(state => state.settings);

  // Année actuelle pour le copyright
  const currentYear = new Date().getFullYear();

  // Catégories principales du catalogue
  const catalogueCategories = ['Smartphones', 'Laptops', 'Tablets', 'Audio'];

  // Liens d'aide et support client
  const supportLinks = [
    { label: 'Livraison', action: () => onPolicyClick?.('shipping') },
    { label: 'Retours', action: () => onPolicyClick?.('returns') },
    { label: 'FAQ', action: () => onPolicyClick?.('faq') },
    { label: 'Contactez-nous', action: onContactClick }
  ];

  // Liens de l'entreprise
  const companyLinks = [
    { label: 'À Propos', action: onAboutClick },
    { label: 'Avis Clients', action: onReviewsClick },
    { label: 'Confidentialité', action: () => onPolicyClick?.('privacy') },
    { label: 'Conditions', action: () => onPolicyClick?.('terms') }
  ];

  // Réseaux sociaux - TODO: Ajouter les vrais liens
  const socialIcons = [Facebook, Instagram, Youtube, Twitter];

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden font-sans">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] translate-y-1/2"></div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-12 md:pt-24 pb-12 relative z-10">

        {/* Newsletter Section */}
        <div className="relative mb-16 md:mb-24 p-6 md:p-8 lg:p-14 rounded-3xl bg-slate-900 overflow-hidden border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Sparkles className="size-3.5 md:size-4 text-blue-400" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-blue-400">Newsletter Exclusive</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight uppercase leading-[1.1] md:leading-[0.9] font-display">
                Rejoignez la <span className="text-blue-500 block lg:inline">TechZone</span>
              </h2>
              <p className="text-slate-400 font-medium text-[10px] md:text-xs max-w-sm mx-auto lg:mx-0 uppercase tracking-wider">
                Restez informé de nos dernières innovations et offres privées.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Merci pour votre inscription à la TechZone Newsletter !");
                }}
                className="flex w-full items-stretch rounded-2xl h-12 md:h-14 bg-white/5 border border-white/10 p-1 md:p-1.5 focus-within:border-blue-500/50 transition-all"
              >
                <input
                  type="email"
                  required
                  placeholder="votre@email.com"
                  className="flex-1 bg-transparent border-none text-white placeholder:text-slate-600 text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 focus:ring-0"
                />
                <button type="submit" className="bg-white text-slate-950 hover:bg-blue-50 transition-all px-4 md:px-6 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group whitespace-nowrap">
                  S'abonner <ArrowRight className="size-3 md:size-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6 md:gap-16 mb-24">

          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer justify-center lg:justify-start" onClick={() => window.scrollTo(0, 0)}>
              <div className="size-10 md:size-12 bg-white text-slate-950 rounded-xl flex items-center justify-center font-bold text-lg md:text-xl font-display">TZ</div>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tighter font-display">TechZone</h2>
            </div>
            <p className="text-slate-400 text-[10px] md:text-[11px] font-medium uppercase tracking-wider leading-relaxed text-center lg:text-left">
              Destination premium pour l'électronique de haute performance au Maroc. Qualité, Innovation et Service d'exception.
            </p>
            <div className="flex justify-center lg:justify-start gap-3 md:gap-4">
              {[
                { Icon: Facebook, url: 'https://facebook.com' },
                { Icon: Instagram, url: 'https://instagram.com' },
                { Icon: Youtube, url: 'https://youtube.com' },
                { Icon: Twitter, url: 'https://twitter.com' }
              ].map(({ Icon, url }, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 md:size-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group shadow-sm"
                >
                  <Icon className="size-3.5 md:size-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6 md:space-y-8 text-left">
            <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 font-display">Catalogue</h3>
            <ul className="space-y-3 md:space-y-4">
              {catalogueCategories.map(item => (
                <li key={item}>
                  <button onClick={() => onCategoryClick?.(item)} className="text-slate-400 hover:text-white transition-all text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 group">
                    <span className="size-1 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-all"></span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 md:space-y-8 text-left">
            <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 font-display">Entreprise</h3>
            <ul className="space-y-3 md:space-y-4">
              {companyLinks.map(item => (
                <li key={item.label}>
                  <button onClick={item.action} className="text-slate-400 hover:text-white transition-all text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 group text-left">
                    <span className="size-1 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-all"></span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 md:space-y-8 text-left">
            <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 font-display">Support</h3>
            <ul className="space-y-3 md:space-y-4">
              {supportLinks.map(item => (
                <li key={item.label}>
                  <button onClick={item.action} className="text-slate-400 hover:text-white transition-all text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 group text-left">
                    <span className="size-1 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-all"></span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1 space-y-6 md:space-y-8">
            <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 font-display text-center lg:text-left">Contact Direct</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="flex items-start gap-4 justify-center lg:justify-start">
                <MapPin className="size-3.5 md:size-4 text-blue-500 mt-1 shrink-0" />
                <div>
                  <p className="text-[8px] md:text-[9px] font-bold uppercase text-slate-500 mb-0.5">Showroom</p>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase text-white leading-tight">{settings.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 justify-center lg:justify-start">
                <Phone className="size-3.5 md:size-4 text-blue-500 mt-1 shrink-0" />
                <div>
                  <p className="text-[8px] md:text-[9px] font-bold uppercase text-slate-500 mb-0.5">Contact</p>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase text-white leading-tight">{settings.phone}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-8 text-center lg:text-left">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
              <Globe className="size-3 text-slate-500" />
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-400">Maroc / Français</span>
            </div>
            <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-600">
              © {currentYear} TechZone Store. Performance Électronique.
            </p>
          </div>

          <div className="flex items-center gap-8 opacity-50 mb-4 lg:mb-0">
            <ShieldCheck className="size-6 md:size-8 text-slate-500" />
            <div className="flex items-center gap-5">
              {[CreditCard, Truck, Headphones].map((Icon, i) => (
                <Icon key={i} className="size-3.5 md:size-4 text-slate-600" />
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

