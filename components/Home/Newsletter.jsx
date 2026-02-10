import React from 'react';
import { Send, Mail, BellRing } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="py-12 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6">
                <div className="relative rounded-3xl md:rounded-[4rem] bg-blue-600 overflow-hidden p-8 md:p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16 shadow-2xl shadow-blue-600/30">
                    {/* Artistic Background elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] opacity-40 md:opacity-100"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-900/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[60px] opacity-40 md:opacity-100"></div>

                    <div className="relative z-10 text-center lg:text-left space-y-4 md:space-y-0">
                        <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl bg-white/20 border border-white/20 mb-4 md:mb-8 mx-auto lg:mx-0">
                            <BellRing className="size-3 md:size-4 text-white" />
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white">Newsletter Exclusive</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[1.1] md:leading-tight mb-4 md:mb-8">
                            Ne manquez <br />
                            <span className="text-indigo-900/50">plus rien !</span>
                        </h2>
                        <p className="text-blue-100 text-sm md:text-lg lg:text-xl max-w-lg font-medium leading-relaxed">
                            Abonnez-vous pour recevoir les meilleures offres et les nouveautés TechZone en avant-première.
                        </p>
                    </div>

                    <div className="relative z-10 w-full max-w-xl">
                        <div className="bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-2xl md:rounded-[3rem] border border-white/20 flex flex-col sm:flex-row items-center gap-3 md:gap-4 transition-all focus-within:bg-white/20">
                            <div className="flex-1 w-full flex items-center gap-3 md:gap-4 pl-4 md:pl-6">
                                <Mail className="h-5 w-5 md:h-6 md:w-6 text-white/50" />
                                <input
                                    className="w-full bg-transparent border-none text-sm md:text-lg font-black placeholder:text-white/40 focus:ring-0 uppercase tracking-tighter text-white"
                                    placeholder="ADRESSE EMAIL..."
                                    type="email"
                                />
                            </div>
                            <button className="w-full sm:w-auto bg-white text-blue-600 h-14 md:h-20 px-6 md:px-10 rounded-xl md:rounded-[2.5rem] font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 group">
                                Rejoindre
                                <Send className="size-4 md:size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                        <p className="mt-4 md:mt-6 text-[8px] md:text-[10px] font-bold text-blue-100 uppercase tracking-[0.2em] text-center opacity-60">
                            Zéro Spam, que de la valeur. Toujours à vos côtés.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
