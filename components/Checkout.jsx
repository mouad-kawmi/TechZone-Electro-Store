
import React, { useState } from 'react';
import {
  ShieldCheck, Lock, CreditCard, Wallet,
  Truck, ArrowLeft, ChevronDown, CheckCircle2,
  Trash2, Plus, Minus, ShoppingBag, Tag, Ticket,
  MapPin, Phone, User, Apple, Landmark, Info, ArrowRight
} from 'lucide-react';


const Checkout = ({ items, onBack, onUpdateQuantity, onRemove, onConfirm, coupons = [] }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Casablanca',
    address: ''
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal >= 2000 ? 0 : 25;
  const total = subtotal - discountAmount + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'ELITE20') {
      setDiscount(20);
    } else if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscount(10);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.name || !formData.phone || !formData.address)) return;
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    if (step === 1) onBack();
    else setStep(prev => prev - 1);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm({
        ...formData,
        items, // Crucial: Include the cart items
        finalTotal: total,
        appliedDiscount: discount,
        paymentMethod
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const paymentOptions = [
    { id: 'card', label: 'Carte Bancaire', icon: CreditCard, description: 'Visa / Mastercard / CMI' },
    { id: 'paypal', label: 'PayPal', icon: Landmark, description: 'Digital Wallet Transfer' },
    { id: 'cod', label: 'Cash on Delivery', icon: Wallet, description: 'Khless f l-bab' }
  ];

  const steps = [
    { id: 1, label: 'Coordonnées', icon: User },
    { id: 2, label: 'Paiement', icon: CreditCard },
    { id: 3, label: 'Confirmation', icon: CheckCircle2 }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 animate-fade-up">
      {/* Step Progress Indicator */}
      <div className="flex items-center justify-center mb-16 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 sm:gap-12 min-w-max">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-3 transition-opacity duration-500 ${step >= s.id ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`size-10 sm:size-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${step === s.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' :
                  step > s.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                  {step > s.id ? <CheckCircle2 className="size-5" /> : <s.icon className="size-5" />}
                </div>
                <div className="hidden sm:block">
                  <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-0.5">Étape 0{s.id}</p>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${step === s.id ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{s.label}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 sm:w-16 h-px bg-slate-200 dark:bg-slate-800"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Active Step View */}
        <div className="lg:col-span-7 space-y-12">
          {step === 1 && (
            <section className="space-y-10 animate-fade-right">
              <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="size-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                  <Truck className="size-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display">Livraison (Shipping Info)</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nom Complet</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-slate-300 group-focus-within:text-blue-600" />
                    <input
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-6 text-sm font-bold focus:border-blue-600 transition-all outline-none dark:text-white"
                      placeholder="Smiya w l-Kniya"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-slate-300 group-focus-within:text-blue-600" />
                    <input
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-6 text-sm font-bold focus:border-blue-600 transition-all outline-none dark:text-white"
                      placeholder="06 -- -- -- --"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Ville (City)</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-10 text-sm font-bold focus:border-blue-600 transition-all appearance-none cursor-pointer dark:text-white"
                  >
                    {['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Agadir', 'Fès', 'Meknès', 'Oujda'].map(city => <option key={city}>{city}</option>)}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Adresse Complète</label>
                <textarea
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-3xl py-6 px-8 text-sm font-bold focus:border-blue-600 transition-all outline-none resize-none dark:text-white"
                  placeholder="Raqm d dar, Zenqa, l-quartier..."
                ></textarea>
              </div>

              <button
                onClick={handleNextStep}
                disabled={!formData.name || !formData.phone || !formData.address}
                className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
              >
                Suivant : Paiement
              </button>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-10 animate-fade-right">
              <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="size-10 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-600">
                  <CreditCard className="size-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display">Mode de Paiement</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paymentOptions.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-start gap-4 ${paymentMethod === m.id
                      ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-600/5'
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950'
                      }`}
                  >
                    <div className={`p-4 rounded-2xl ${paymentMethod === m.id ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-400'}`}>
                      <m.icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-[11px] font-black uppercase tracking-widest dark:text-white">{m.label}</h4>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-wider">{m.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button onClick={handlePrevStep} className="px-8 h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Retour</button>
                <button onClick={handleNextStep} className="flex-1 h-16 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all">Suivant : Confirmation</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-10 animate-fade-right">
              <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="size-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="size-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display">Vérification Finale</h3>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 space-y-6 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Envoyé à</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white font-display">{formData.name}</p>
                    <p className="text-xs font-bold text-slate-500 mt-1">{formData.address}, {formData.city}</p>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">{formData.phone}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-600/10 px-4 py-2 rounded-xl">Modifier</button>
                </div>
                <hr className="border-slate-100 dark:border-slate-800" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Paiement</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase font-display">{paymentOptions.find(o => o.id === paymentMethod)?.label}</p>
                  </div>
                  <button onClick={() => setStep(2)} className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-600/10 px-4 py-2 rounded-xl">Modifier</button>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handlePrevStep} className="px-8 h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Retour</button>
                <button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="flex-1 h-16 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="size-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Confirmation l'Commande <ArrowRight className="size-4" /></>
                  )}
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Right Side: Order Summary (Always Visible) */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-[#0f172a] rounded-[3.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] lg:sticky lg:top-32 space-y-10">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display">Résumé l-Commande</h3>

            {/* Product List */}
            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
              {items.map(item => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedStorage}`} className="flex gap-6 group">
                  <div className="size-20 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-3 shrink-0 flex items-center justify-center transition-all group-hover:scale-110">
                    <img src={item.image} className="h-full w-full object-contain" alt={item.title} />
                  </div>
                  <div className="flex-1 py-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-tight line-clamp-1">{item.title}</h4>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{item.selectedColor} • {item.selectedStorage}</p>
                    </div>
                    <p className="text-xs font-black text-blue-600 dark:text-blue-400">
                      {item.quantity} x {item.price.toLocaleString()} DH
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="flex gap-3">
              <input
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                className="flex-1 h-14 bg-slate-50 dark:bg-slate-900/50 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest border border-transparent focus:border-blue-600 outline-none dark:text-white"
                placeholder="KOD PROMO"
              />
              <button onClick={handleApplyCoupon} className="bg-slate-900 dark:bg-blue-600 text-white px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest font-display">Ok</button>
            </div>

            {/* Calculations */}
            <div className="space-y-5 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Sous-total</span>
                <span className="text-slate-900 dark:text-white font-display">{subtotal.toLocaleString()} DH</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  <span>Remise Elite ({discount}%)</span>
                  <span>-{discountAmount.toLocaleString()} DH</span>
                </div>
              )}
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">
                <span>Livraison</span>
                <span className={shipping === 0 ? 'text-emerald-500 font-black' : 'text-slate-900 dark:text-white'}>
                  {shipping === 0 ? 'OFFERTE' : '25 DH'}
                </span>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Total Final</p>
                  <h4 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter font-display">
                    {total.toLocaleString()} <span className="text-lg">DH</span>
                  </h4>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-500" />
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Garantie Elite</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-blue-600" />
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
