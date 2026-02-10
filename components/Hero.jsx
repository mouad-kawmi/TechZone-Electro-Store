
import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight, Zap, ShieldCheck, Globe } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out"
      })
        .from(".hero-image-container", {
          scale: 0.95,
          opacity: 0,
          duration: 2,
          ease: "expo.out"
        }, "-=1");

      gsap.to(".floating-shape", {
        y: 30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[85vh] flex items-center bg-white dark:bg-slate-950 text-slate-950 dark:text-white overflow-hidden transition-colors duration-500 pt-20">
      {/* Refined Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="floating-shape absolute -top-[10%] -left-[10%] w-[40%] h-[60%] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="floating-shape absolute -bottom-[10%] -right-[10%] w-[45%] h-[65%] bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-[140px]" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div className="hero-content space-y-10 lg:pr-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Nouvelle Collection 2025</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] uppercase font-display">
                Next-Gen <br />
                <span className="text-blue-600 dark:text-blue-500">Boutique.</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
                Découvrez l'excellence technologique. Smartphones, PC, et accessoires premium avec livraison express partout au Maroc.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <button className="group bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                Explorer le Store
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
                <div className="px-5 flex flex-col justify-center">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">10k+ Clients</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Confiance & Qualité</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Garantie 1 An</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Globe className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Livraison 24h</span>
              </div>
            </div>
          </div>

          <div className="hero-image-container relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl p-4">
              <img
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-auto rounded-[2rem] object-cover transition-transform duration-700 hover:scale-110"
                alt="Premium Tech"
                loading="eager"
              />
            </div>

            {/* Minimalist Floating Accent */}
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-white/5 animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Zap className="size-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">En Stock</div>
                  <div className="text-sm font-black text-slate-900 dark:text-white leading-none mt-1">S24 Ultra Elite</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

