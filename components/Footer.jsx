
import React from 'react';
import {
  Facebook, Twitter, Instagram, Youtube, Globe,
  Mail, Phone, MapPin, ArrowRight, ShieldCheck,
  CreditCard, Truck, Headphones, Sparkles
} from 'lucide-react';

const Footer = ({
  onAboutClick,
  onContactClick,
  onCategoryClick,
  onPolicyClick,
  onAdminClick
}) => {
  const currentYear = new Date().getFullYear();

  const SHOP_LINKS = ['Smartphones', 'Laptops', 'Tablets', 'Audio'];

  const SUPPORT_LINKS = [
    { label: 'Livraison', action: () => onPolicyClick?.('shipping') },
    { label: 'Retours', action: () => onPolicyClick?.('returns') },
    { label: 'FAQ', action: () => onPolicyClick?.('faq') },
    { label: 'Contactez-nous', action: onContactClick }
  ];

  const COMPANY_LINKS = [
    { label: 'À Propos', action: onAboutClick },
    { label: 'Confidentialité', action: () => onPolicyClick?.('privacy') },
    { label: 'Conditions', action: () => onPolicyClick?.('terms') },
    { label: 'Admin Portal', action: onAdminClick }
  ];

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden font-sans">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] translate-y-1/2"></div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 pt-24 pb-12 relative z-10">

        {/* Newsletter Section */}
        <div className="relative mb-24 p-8 lg:p-14 rounded-3xl bg-slate-900 overflow-hidden border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="size-4 text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Newsletter Exclusive</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight uppercase leading-[0.9] font-display">
                Rejoignez la <span className="text-blue-500 block lg:inline">TechZone</span>
              </h2>
              <p className="text-slate-400 font-medium text-xs max-w-sm uppercase tracking-wider">
                Restez informé de nos dernières innovations et offres privées.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex w-full items-stretch rounded-2xl h-14 bg-white/5 border border-white/10 p-1.5 focus-within:border-blue-500/50 transition-all">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 bg-transparent border-none text-white placeholder:text-slate-600 text-xs font-bold uppercase tracking-widest px-4 focus:ring-0"
                />
                <button className="bg-white text-slate-950 hover:bg-blue-50 transition-all px-6 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group">
                  S'abonner <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="size-12 bg-white text-slate-950 rounded-xl flex items-center justify-center font-bold text-xl font-display">TZ</div>
              <h2 className="text-2xl font-bold uppercase tracking-tighter font-display">TechZone</h2>
            </div>
            <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider leading-relaxed">
              Destination premium pour l'électronique de haute performance au Maroc. Qualité, Innovation et Service d'exception.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="size-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group shadow-sm">
                  <Icon className="size-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 font-display">Catalogue</h3>
            <ul className="space-y-4">
              {SHOP_LINKS.map(item => (
                <li key={item}>
                  <button onClick={() => onCategoryClick?.(item)} className="text-slate-400 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 group">
                    <span className="size-1 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-all"></span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 font-display">Aide & Support</h3>
            <ul className="space-y-4">
              {SUPPORT_LINKS.map(item => (
                <li key={item.label}>
                  <button onClick={item.action} className="text-slate-400 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 group text-left">
                    <span className="size-1 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-all"></span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 font-display">Contact Direct</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="size-4 text-blue-500 mt-1" />
                <div>
                  <p className="text-[9px] font-bold uppercase text-slate-500 mb-0.5">Showroom</p>
                  <p className="text-[10px] font-bold uppercase text-white">Twin Center, Casablanca</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="size-4 text-blue-500 mt-1" />
                <div>
                  <p className="text-[9px] font-bold uppercase text-slate-500 mb-0.5">Contact</p>
                  <p className="text-[10px] font-bold uppercase text-white">+212 600 000 000</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
              <Globe className="size-3 text-slate-500" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Maroc / Français</span>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
              © {currentYear} TechZone Store. Performance Électronique.
            </p>
          </div>

          <div className="flex items-center gap-6 opacity-50">
            <ShieldCheck className="size-8 text-slate-500" />
            <div className="flex items-center gap-4">
              {[CreditCard, Truck, Headphones].map((Icon, i) => (
                <Icon key={i} className="size-4 text-slate-600" />
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

