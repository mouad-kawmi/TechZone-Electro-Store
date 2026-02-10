import React, { useState } from 'react';
import {
  ShoppingBag, Package, Truck, CheckCircle2,
  Search, ArrowRight, MapPin, Clock, ArrowLeft
} from 'lucide-react';

const OrderTracking = ({ onBack, orders = [] }) => {
  const [searchId, setSearchId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = () => {
    setError("");
    const normalizedInput = searchId.toUpperCase().replace(/[^0-9]/g, ''); // Extract only numbers

    if (!normalizedInput) {
      setError("Veuillez entrer les chiffres de l'ID (ex: 482931)");
      return;
    }

    const order = orders.find(o => {
      const orderCoreId = o.id?.toString().replace(/[^0-9]/g, ''); // Extract only numbers from order ID
      return orderCoreId === normalizedInput;
    });

    if (order) {
      setTrackedOrder(order);
    } else {
      setError("Commande introuvable. Vérifiez l'ID ou utilisez un ID de test (ex: 482931)");
      setTrackedOrder(null);
    }
  };

  const getSteps = (status) => {
    const allSteps = [
      { label: "Payée", key: 'Pending', icon: ShoppingBag },
      { label: "En cours", key: 'En Cours', icon: Package },
      { label: "Expédiée", key: 'Expédié', icon: Truck },
      { label: "Livrée", key: 'Livré', icon: CheckCircle2 },
    ];

    const statusWeights = {
      'En Attente': 1,
      'En Cours': 2,
      'Expédié': 3,
      'Livré': 5 // Standardized to "Livré"
    };

    const currentWeight = statusWeights[status] || 1;

    return allSteps.map((step, idx) => {
      const stepWeight = idx + 1;
      let stepStatus = "pending";
      let desc = "Attendu";

      if (stepWeight < currentWeight) {
        stepStatus = "completed";
        desc = "Confirmé";
      } else if (stepWeight === currentWeight) {
        stepStatus = "active";
        desc = "Action en cours";
      }

      return { ...step, status: stepStatus, desc };
    });
  };

  const currentSteps = trackedOrder ? getSteps(trackedOrder.status) : [];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 py-12 px-6 animate-fade-up">
      <div className="max-w-4xl mx-auto">

        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-12">
          <button onClick={onBack} className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-blue-600 transition-all shadow-sm active:scale-95">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display">Suivi l-Commande</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Tracez votre colis TechZone Elite</p>
          </div>
        </div>

        {!trackedOrder ? (
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/5 text-center">
            <div className="size-20 bg-blue-50 dark:bg-blue-600/10 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Package className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase font-display">Vérifier l-commande</h2>
            <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto text-sm">Entrez l'ID de votre commande (ex: TZ-XXXXXX) pour voir le statut réel.</p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Ex: TZ-482931"
                className="flex-1 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-8 py-5 text-sm font-black focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 outline-none transition-all uppercase placeholder:normal-case dark:text-white"
              />
              <button
                onClick={handleTrack}
                className="bg-slate-900 dark:bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3"
              >
                Suivre <Search className="h-4 w-4" />
              </button>
            </div>
            {error && <p className="mt-6 text-[10px] font-black text-rose-500 uppercase tracking-widest">{error}</p>}

            {/* Suggestions */}
            {orders.length > 0 && (
              <div className="mt-12 pt-12 border-t border-slate-50 dark:border-slate-800/50">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Commandes Récentes</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {orders.slice(0, 3).map(o => (
                    <button
                      key={o.id}
                      onClick={() => { setSearchId(o.id); setTimeout(handleTrack, 100); }}
                      className="px-5 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:border-blue-500 transition-all flex items-center gap-2"
                    >
                      <Clock className="size-3" /> #{o.id}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            {/* Order Identity Card */}
            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl shadow-slate-900/20 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-6">
                  <div className="size-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Package className="h-8 w-8 text-blue-400 shadow-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">REFERENCE</p>
                    <h3 className="text-3xl font-black uppercase text-white tracking-tighter font-display">#{trackedOrder.id}</h3>
                  </div>
                </div>
                <div className="flex gap-12 text-center md:text-left">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Date d'Achat</p>
                    <p className="font-bold text-white text-sm">{trackedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Montant Total</p>
                    <p className="font-black text-blue-400 text-sm tracking-tighter">{(trackedOrder.finalTotal || trackedOrder.amount).toLocaleString()} DH</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Content */}
            <div className="bg-white dark:bg-slate-900/40 rounded-[3.5rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-4 mb-12">
                {/* Connector Line */}
                <div className="absolute left-[31px] md:left-0 top-0 h-full md:h-0.5 w-0.5 md:w-full bg-slate-100 dark:bg-slate-800 md:top-8 z-0"></div>

                {currentSteps.map((step, idx) => (
                  <div key={idx} className="relative z-10 flex md:flex-col items-center gap-6 md:gap-4 md:w-1/4">
                    <div className={`size-16 rounded-[1.5rem] flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-xl transition-all duration-700 ${step.status === 'completed' ? 'bg-emerald-500 text-white' :
                      step.status === 'active' ? 'bg-blue-600 text-white scale-110 ring-8 ring-blue-500/10' :
                        'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                      }`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="text-left md:text-center">
                      <h4 className={`text-xs font-black uppercase tracking-tighter ${step.status === 'pending' ? 'text-slate-300 dark:text-slate-700' : 'text-slate-900 dark:text-white'}`}>{step.label}</h4>
                      <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${step.status === 'active' ? 'text-blue-500' : 'text-slate-400'}`}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button
                onClick={() => setTrackedOrder(null)}
                className="group px-8 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-950 hover:text-white transition-all shadow-sm"
              >
                Vérifier un autre colis <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
