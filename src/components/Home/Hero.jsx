
import React from 'react';

const Hero = () => {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 hero-gradient pointer-events-none"></div>
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Content Section */}
          <div className="flex flex-col space-y-8 lg:space-y-10 max-w-2xl text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md w-fit shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400">Nouvelle Collection 2025</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-tight leading-[1.1] lg:leading-[0.9] text-slate-950 dark:text-white">
                L'Élite de la <br /><span className="text-blue-500 italic font-black">Technologie.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
                Vivez une expérience mobile sans précédent avec le tout nouveau Elite. Une puissance brute dans un design d'une finesse absolue.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
              <button
                onClick={scrollToProducts}
                className="group relative flex items-center space-x-4 px-8 sm:px-10 py-4 sm:py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-bold transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <span className="uppercase tracking-widest text-sm">Découvrir l'Elite</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>

              <div className="flex items-center space-x-4 sm:pl-2 sm:border-l border-slate-200 dark:border-slate-800">
                <div className="text-left">
                  <p className="text-[10px] sm:text-sm font-bold text-slate-900 dark:text-white leading-none">Note Globale</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-yellow-400 text-sm fill-current" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-10 pt-4 opacity-70 text-slate-950 dark:text-white border-t border-slate-100 dark:border-slate-800 w-full lg:w-fit">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="material-symbols-outlined text-xl text-blue-500">verified</span>
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-center sm:text-left">Certifié</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="material-symbols-outlined text-xl text-blue-500">shield</span>
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-center sm:text-left">Sécurisé</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="material-symbols-outlined text-xl text-blue-500">local_shipping</span>
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-center sm:text-left">Express</span>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative h-[550px] sm:h-[650px] lg:h-[800px] flex items-center justify-center order-1 lg:order-2 scale-90 sm:scale-100 transition-transform">
            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full"></div>

            {/* Phone Frame */}
            <div className="relative w-[280px] sm:w-[320px] lg:w-[340px] h-[560px] sm:h-[640px] lg:h-[680px] rounded-[50px] sm:rounded-[55px] border-[8px] sm:border-[12px] border-slate-900/95 dark:border-slate-800/95 shadow-[0_40px_100px_rgba(0,0,0,0.3)] product-placeholder flex flex-col items-center justify-center p-1.5 sm:p-2 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>

              {/* FIXED Wallpaper (No hover scale) */}
              <img
                alt="Elite Smartphone"
                className="relative z-10 w-full h-full object-cover rounded-[35px] sm:rounded-[40px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] pointer-events-none select-none"
                src="https://i.pinimg.com/564x/bd/33/c3/bd33c34e725ef7811be832a74e91b257.jpg"
              />
            </div>

            {/* Floating Cards - Hidden on very small screens, adjusted for tablet */}
            <div className="absolute top-[10%] -left-4 sm:-left-8 lg:-left-12 spec-card scale-75 sm:scale-90 lg:scale-100 hover:scale-110 transition-transform">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined text-lg sm:text-xl">important_devices</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter leading-none">Écran</p>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">6.8" AMOLED</p>
              </div>
            </div>

            <div className="absolute top-[35%] -right-4 sm:-right-12 lg:-right-16 spec-card scale-75 sm:scale-90 lg:scale-100 hover:scale-110 transition-transform">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined text-lg sm:text-xl">photo_camera</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter leading-none">Objectif</p>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">200MP Pro</p>
              </div>
            </div>

            <div className="absolute bottom-[25%] -left-2 sm:-left-4 lg:-left-8 spec-card scale-75 sm:scale-90 lg:scale-100 hover:scale-110 transition-transform">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined text-lg sm:text-xl">bolt</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter leading-none">Énergie</p>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">120W Turbo</p>
              </div>
            </div>

            {/* Simple Bottom Badge */}
            <div className="absolute -bottom-4 lg:-bottom-6 left-1/2 -translate-x-1/2 w-fit min-w-[280px] glass-morphism rounded-3xl sm:rounded-[2.5rem] p-3 sm:p-4 pr-8 sm:pr-10 shadow-2xl flex items-center gap-4 sm:gap-5 z-20 group/badge hover:shadow-blue-500/10 transition-all border border-white/40 dark:border-white/10">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl sm:rounded-2xl rotate-6 group-hover/badge:rotate-12 transition-transform"></div>
                <div className="absolute inset-0 bg-slate-900 dark:bg-white flex items-center justify-center rounded-xl sm:rounded-2xl shadow-lg">
                  <span className="material-symbols-outlined text-xl sm:text-2xl text-white dark:text-slate-950">auto_awesome</span>
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-[7px] sm:text-[8px] font-black text-blue-500 uppercase border border-blue-500/20 whitespace-nowrap">Édition Limitée</span>
                </div>
                <p className="text-base sm:text-xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-none mb-1">Elite S24 Ultra</p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Performance Pure</p>
              </div>
            </div>

            {/* Background Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] sm:w-[120%] h-[110%] sm:h-[120%] border border-slate-200/50 dark:border-slate-800/30 rounded-full -z-10 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[85%] h-[80%] sm:h-[85%] border border-slate-200/50 dark:border-slate-800/30 rounded-full -z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center space-y-3 opacity-30">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Scroll</span>
        <div className="w-[1.5px] h-10 bg-gradient-to-b from-slate-400 to-transparent"></div>
      </div>
    </main>
  );
};

export default Hero;


