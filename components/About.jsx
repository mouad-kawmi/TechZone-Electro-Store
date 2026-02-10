import React from 'react';
import { ArrowLeft, ChevronRight, Zap, Target, Users, ShieldCheck } from 'lucide-react';

const About = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen animate-fade-up ">
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <button onClick={onBack} className="hover:text-blue-600 transition-colors flex items-center gap-2">
            <ArrowLeft className="h-3.5 w-3.5" /> ACCUEIL
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">À PROPOS DE NOUS</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-black rounded-xl uppercase tracking-[0.2em] border border-blue-100">
              Notre Mission
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">
              Redéfinir le <span className="text-blue-600">Digital</span> au Maroc.
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Depuis 2020, TechZone s'est imposé comme la destination numéro 1 pour les passionnés de technologie premium, offrant les dernières innovations avec un service irréprochable.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl shadow-blue-600/10">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=90"
                alt="TechZone Office"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-50 hidden md:block">
              <div className="flex items-center gap-6">
                <div className="size-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <Rocket className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900 uppercase">24h</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Livraison Express</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-24 my-24">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Clients Satisfaits", value: "10k+", icon: Users },
              { label: "Produits Premium", value: "500+", icon: Target },
              { label: "Ans d'Expertise", value: "5ans", icon: ShieldCheck },
              { label: "Points de Vente", value: "3", icon: MapPin }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-4 group">
                <div className="mx-auto size-16 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <stat.icon className="h-7 w-7" />
                </div>
                <h3 className="text-5xl font-black text-white tracking-tighter uppercase">{stat.value}</h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-6">Nos Valeurs Fondamentales</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">Nous ne vendons pas seulement des gadgets, nous offrons une expérience technologique complète basée sur la confiance et l'excellence.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "L'Excellence",
              desc: "Chaque produit est rigoureusement testé pour garantir une performance optimale dès la première utilisation.",
              icon: Target,
              bg: "bg-blue-50",
              color: "text-blue-600"
            },
            {
              title: "La Confiance",
              desc: "Garantie officielle de 1 an sur tous nos articles et un support technique disponible 7j/7 pour vous accompagner.",
              icon: ShieldCheck,
              bg: "bg-emerald-50",
              color: "text-emerald-600"
            },
            {
              title: "L'Innovation",
              desc: "Nous sourçons les dernières sorties mondiales en un temps record pour que vous soyez toujours à la pointe.",
              icon: Heart,
              bg: "bg-rose-50",
              color: "text-rose-600"
            }
          ].map((val, idx) => (
            <div key={idx} className="p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center space-y-6 group">
              <div className={`mx-auto size-20 rounded-3xl ${val.bg} ${val.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <val.icon className="h-10 w-10" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{val.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6 pt-12">
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" className="rounded-[2.5rem] shadow-lg" alt="Team" />
                  <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80" className="rounded-[2.5rem] shadow-lg" alt="Office" />
                </div>
                <div className="space-y-6">
                  <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80" className="rounded-[2.5rem] shadow-lg" alt="Support" />
                  <div className="aspect-square bg-blue-600 rounded-[2.5rem] flex items-center justify-center p-10 text-white shadow-xl shadow-blue-600/20">
                    <p className="text-lg font-black uppercase tracking-tighter leading-tight">Basé à Casablanca, livrant dans tout le royaume.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-10 order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">Notre Histoire</h2>
              <div className="space-y-6 text-slate-600 text-lg font-medium leading-relaxed">
                <p>
                  Tout a commencé avec une idée simple : le Maroc mérite un accès direct et rapide aux meilleures technologies mondiales sans compromis sur le service après-vente.
                </p>
                <p>
                  En 2020, nous avons ouvert notre premier showroom à Casablanca. Aujourd'hui, TechZone est devenu un écosystème complet regroupant boutiques physiques et une plateforme e-commerce de pointe, servant des milliers de clients de Tanger à Lagouira.
                </p>
                <p>
                  Notre équipe d'experts est animée par la même passion : vous aider à choisir l'équipement qui boostera votre créativité, votre productivité et votre style de vie.
                </p>
              </div>
              <button onClick={onBack} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10">
                Retourner au catalogue
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
