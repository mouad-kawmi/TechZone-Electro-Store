
import React, { useEffect, useRef } from 'react';
import {
  ArrowLeft, ChevronRight, Zap, Target, Users, ShieldCheck,
  Rocket, MapPin, Heart, Globe, Award, Briefcase, Star, CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ onBack }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-text').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500 overflow-hidden">
      {/* Header / Breadcrumbs */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour</span>
          </button>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">
            TechZone Elite • Since 2020
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <div className="reveal-text inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-8 rounded-full border border-blue-100 dark:border-blue-500/20">
            <SparklesIcon className="size-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">L'excellence Redéfinie</span>
          </div>

          <h1 className="reveal-text text-5xl md:text-7xl lg:text-9xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-12">
            Beyond <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Technology</span>
          </h1>

          <p className="reveal-text text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Plus qu'un simple store, TechZone est le point de convergence entre l'innovation mondiale et les passionnés de tech au Maroc.
          </p>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="relative px-6 reveal-text">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden aspect-video md:aspect-[21/9] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1531297461136-82lw8fca33f3?auto=format&fit=crop&q=80&w=2600"
              alt="TechZone Vision"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Rocket className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black uppercase">24h</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Livraison Express</p>
                </div>
              </div>
              <p className="text-lg font-medium opacity-90">
                Nous croyons que la technologie ne devrait pas attendre. C'est pourquoi nous avons mis en place le réseau logistique le plus rapide du royaume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 mt-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Clients Heureux", value: "15K+", icon: Users },
            { label: "Références", value: "850+", icon: Target },
            { label: "Années Exp.", value: "05", icon: Award },
            { label: "Showrooms", value: "03", icon: MapPin }
          ].map((stat, i) => (
            <div key={i} className="reveal-text text-center space-y-4 group">
              <div className="mx-auto size-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-500 shadow-sm">
                <stat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="py-32 px-6">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-text space-y-10 order-2 lg:order-1">
            <div>
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4 block">Notre Histoire</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
                Né de la <br />
                <span className="text-slate-200 dark:text-slate-800">Passion</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Ce qui a commencé en 2020 comme un petit projet passionné dans un garage à Casablanca est devenu aujourd'hui la référence nationale en matière d'High-Tech.
              </p>
              <p>
                Notre frustration face au manque de produits premium et au service client défaillant nous a poussés à créer TechZone. Notre promesse était simple : "Le meilleur de la tech, tout de suite, avec le sourire."
              </p>
              <ul className="grid gap-4 mt-8">
                {['Produits 100% Authentiques', 'Garantie Officielle Maroc', 'Support Technique Expert'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-900 dark:text-white font-bold uppercase tracking-wide">
                    <CheckCircle2 className="text-blue-600 size-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal-text order-1 lg:order-2 grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] w-full h-80 object-cover mt-12 shadow-xl" alt="Office" />
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] w-full h-80 object-cover shadow-xl" alt="Team" />
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/30 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20 reveal-text">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">L'Engagement Elite</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">Pourquoi des milliers de passionnés nous font confiance chaque jour au Maroc.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticité Totale",
                desc: "Tous nos produits proviennent directement des circuits officiels avec traçabilité garantie.",
                icon: ShieldCheck,
                color: "text-emerald-500",
                bg: "bg-emerald-50 dark:bg-emerald-900/20"
              },
              {
                title: "Savoir-Faire Expert",
                desc: "Notre équipe teste chaque référence pour ne vous proposer que le meilleur de l'innovation.",
                icon: Zap,
                color: "text-amber-500",
                bg: "bg-amber-50 dark:bg-amber-900/20"
              },
              {
                title: "Satisfaction Royale",
                desc: "Un service après-vente dédié et réactif pour vous accompagner après chaque achat.",
                icon: Heart,
                color: "text-rose-500",
                bg: "bg-rose-50 dark:bg-rose-900/20"
              }
            ].map((item, i) => (
              <div key={i} className="reveal-text group bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:scale-[1.02] transition-all duration-500 shadow-sm hover:shadow-xl">
                <div className={`size-16 ${item.bg} ${item.color} rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="reveal-text max-w-4xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-blue-600/30">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Prêt à passer au <br /> niveau supérieur ?
            </h2>
            <button onClick={onBack} className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
              Explorer le Catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const SparklesIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default About;

