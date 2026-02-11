import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CheckoutSteps = ({ steps, step }) => {
    return (
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
    );
};

export default CheckoutSteps;
