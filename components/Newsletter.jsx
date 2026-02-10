import React from 'react';
import { Send, Mail, BellRing } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="py-24 bg-white dark:bg-slate-950 ">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="relative rounded-[4rem] bg-blue-600 overflow-hidden p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 shadow-2xl shadow-blue-600/30">
                    {/* Artistic Background elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-900/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[60px]"></div>

                    <div className="relative z-10 text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/20 border border-white/20 mb-8">
                            <BellRing className="h-4 w-4 text-white" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Newsletter Exclusive</span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-8">
                            Ma-t-khlli <br />
                            <span className="text-indigo-900/50">Walo i-foutek !</span>
                        </h2>
                        <p className="text-blue-100 text-lg lg:text-xl max-w-lg font-medium">
                            Abouné m3ana bach n-sifto l-ik les meilleures offres w jdid dyal TechZone dghya.
                        </p>
                    </div>

                    <div className="relative z-10 w-full max-w-xl">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-[3rem] border border-white/20 flex flex-col sm:flex-row items-center gap-4 transition-all focus-within:bg-white/20">
                            <div className="flex-1 w-full flex items-center gap-4 pl-6">
                                <Mail className="h-6 w-6 text-white/50" />
                                <input
                                    className="w-full bg-transparent border-none text-white text-lg font-black placeholder:text-white/40 focus:ring-0 uppercase tracking-tighter"
                                    placeholder="ADRESSE EMAIL..."
                                    type="email"
                                />
                            </div>
                            <button className="w-full sm:w-auto bg-white text-blue-600 h-20 px-10 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-900 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl">
                                Rejoindre <Send className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="mt-6 text-[10px] font-black text-blue-100 uppercase tracking-[0.2em] text-center opacity-60">
                            Bla @Spam, ghi l-faida. Dima mzyan m3akom.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
