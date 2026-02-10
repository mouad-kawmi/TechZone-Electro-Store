import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Chrome, ChevronLeft } from 'lucide-react';

const Register = ({ onBack, onGoLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-up">
      <div className="w-full flex flex-col md:flex-row bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">

        {/* Left Side: Brand Visual */}
        <div className="hidden md:block w-5/12 relative min-h-[600px]">
          <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
            className="h-full w-full object-cover"
            alt="Tech Lifestyle"
          />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h3 className="text-4xl font-black mb-4 tracking-tight leading-tight uppercase">Élevez votre style digital.</h3>
            <p className="text-white/80 font-medium leading-relaxed">
              Rejoignez plus de 10,000 passionnés de tech qui font confiance à TechZone pour leurs équipements premium au Maroc.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour au shop
          </button>

          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Créer un Compte</h1>
            <p className="text-slate-500 font-medium">Commencez l'aventure TechZone aujourd'hui.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Nom Complet</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 py-4.5 pl-14 pr-4 text-sm font-bold focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none text-slate-900"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Adresse Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 py-4.5 pl-14 pr-4 text-sm font-bold focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none text-slate-900"
                    type="email"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Téléphone</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 py-4.5 pl-14 pr-4 text-sm font-bold focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none text-slate-900"
                    type="tel"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Mot de passe</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 py-4.5 pl-14 pr-14 text-sm font-bold focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none text-slate-900"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 select-none">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center pt-0.5">
                  <input
                    className="peer h-5 w-5 rounded-md border-2 border-slate-200 text-blue-600 focus:ring-blue-500 cursor-pointer appearance-none checked:bg-blue-600 checked:border-blue-600 transition-all"
                    type="checkbox"
                  />
                  <svg
                    className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-[3px] top-[5px] transition-opacity"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-tighter">
                  J'accepte les <a className="text-blue-600 hover:underline" href="#">Conditions Générales</a> et la <a className="text-blue-600 hover:underline" href="#">Politique de Confidentialité</a>.
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] uppercase tracking-[0.2em]" type="submit">
                <span>Créer mon Compte</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center py-5">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Ou s'inscrire avec</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>
            <button className="flex items-center justify-center gap-3 py-4.5 border-2 border-slate-100 rounded-2xl font-black text-xs hover:bg-slate-50 transition-all w-full uppercase tracking-[0.2em] active:scale-[0.98]">
              <Chrome className="w-5 h-5 text-blue-600" />
              <span>Google Account</span>
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-slate-400">
              Déjà membre ?
              <button
                onClick={onGoLogin}
                className="ml-2 text-blue-600 font-black hover:underline uppercase text-xs tracking-widest"
              >
                Se Connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
