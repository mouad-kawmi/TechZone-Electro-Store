import React, { useLayoutEffect, useRef } from 'react';
import { CheckCircle2, Package, ArrowRight, Download, Share2, Truck } from 'lucide-react';
import gsap from 'gsap';

const OrderSuccess = ({ onContinue, orderData, onTrack }) => {
  const orderNumber = orderData?.id || "TZ-" + Math.floor(Math.random() * 900000 + 100000);
  const customerName = orderData?.name || "Client Elite";
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate Checkmark
      tl.from(".success-circle", {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      })
        .from(".success-title", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out"
        }, "-=0.5")
        .from(".success-card", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out"
        }, "-=0.6")
        .from(".success-btn", {
          scale: 0.9,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.4");

      // Generate "Confetti" particles
      const particles = document.querySelectorAll(".confetti");
      particles.forEach((p) => {
        gsap.set(p, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          opacity: 0,
          scale: gsap.utils.random(0.5, 1.5)
        });
        gsap.to(p, {
          x: gsap.utils.random(-400, 400),
          y: gsap.utils.random(-400, 400),
          opacity: 1,
          duration: gsap.utils.random(1.5, 2.5),
          ease: "power2.out",
          repeat: 0
        });
        gsap.to(p, {
          opacity: 0,
          delay: 2,
          duration: 1
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-slate-950 py-20 px-6  relative overflow-hidden transition-colors duration-500">
      {/* Hidden Confetti Particles */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className={`confetti absolute top-1/2 left-1/2 size-3 rounded-full pointer-events-none z-0 ${['bg-blue-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-rose-500'][i % 4]}`} />
      ))}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-10">
          <div className="success-circle size-28 bg-emerald-100 dark:bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center text-emerald-600 shadow-2xl shadow-emerald-500/20">
            <CheckCircle2 className="h-14 w-14" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="success-title text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Commande Confirmée !</h1>
        <p className="success-title text-slate-500 dark:text-slate-400 text-lg font-medium mb-12">Merci pour votre confiance {customerName}. Votre colis est déjà en route.</p>

        <div className="success-card bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-14 border border-slate-100 dark:border-slate-800 mb-12 text-left shadow-2xl shadow-slate-900/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-10 border-b border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Numéro de commande Elite</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{orderNumber}</p>
            </div>
            <div className="flex gap-3">
              <button className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/5">
                <Package className="h-7 w-7" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Préparation Elite</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">Votre colis est minutieusement vérifié et emballé dans notre centre Maarif.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-orange-100 dark:bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/5">
                <Truck className="h-7 w-7" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Expédition Priority</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">Livraison prévue demain à Casablanca avant 14h00.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={onContinue}
            className="success-btn w-full sm:w-auto bg-slate-900 dark:bg-blue-600 text-white px-12 py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-4"
          >
            Continuer mon Shopping
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={onTrack}
            className="success-btn w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-800 px-12 py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Suivre mon colis
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
