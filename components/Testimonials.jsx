
import React from 'react';
import { Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

const Testimonials = ({ onReadMoreReviews }) => {
  return (
    <section className="py-24 bg-[#fafafa] dark:bg-slate-950/50  transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
            Approuvé par les Experts
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            La performance rencontre le design de classe mondiale. Rejoignez la communauté des professionnels qui ne font aucun compromis.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="group flex flex-col gap-8 bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
                "{t.content}"
              </p>

              <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-2xl flex items-center justify-center text-sm font-black tracking-widest ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white text-base font-black uppercase tracking-tight">{t.name}</p>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Achat Vérifié</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mb-24">
          <button
            onClick={onReadMoreReviews}
            className="group flex items-center gap-3 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-blue-800 dark:hover:text-blue-200"
          >
            <span>Lire les 1200+ avis clients</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
          </button>
        </div>

        {/* Trust Badges / Logos */}
        <div className="pt-20 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-slate-300 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] text-center mb-12">Reconnaissance de l'industrie</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 dark:opacity-20 grayscale hover:grayscale-0 hover:opacity-100 dark:hover:opacity-100 transition-all duration-700">
            <div className="text-xl font-black tracking-tighter dark:text-white">TECHCRUNCH</div>
            <div className="text-2xl font-serif font-black dark:text-white">WIRED</div>
            <div className="text-xl font-sans font-black uppercase tracking-tight dark:text-white">THE VERGE</div>
            <div className="text-2xl font-bold tracking-tighter dark:text-white">CNET</div>
            <div className="text-xl font-serif font-medium uppercase tracking-widest dark:text-white">ENGADGET</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
