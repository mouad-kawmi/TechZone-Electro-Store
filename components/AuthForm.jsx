
import React, { useState } from 'react';
import {
    Mail, Lock, Eye, EyeOff, ArrowRight, Chrome,
    ChevronLeft, User, ShieldCheck, Sparkles,
    Fingerprint, CheckCircle2
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginSuccess, registerSuccess, setToast } from '../store';

const AuthForm = ({ onBack }) => {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        username: "",
        email: isLogin ? "admin" : "",
        password: isLogin ? "admin" : ""
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            const mockUser = {
                id: Math.random().toString(36).substr(2, 9),
                username: isLogin ? (formData.email === 'admin' ? "Admin.Elite" : "Ahmed.TZ") : formData.username,
                email: formData.email,
                role: formData.email === 'admin' ? "admin" : "user",
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
            };

            const mockToken = "tj_elite_token_" + Math.random().toString(36).substr(2);

            if (isLogin) {
                dispatch(loginSuccess({ user: mockUser, token: mockToken }));
                dispatch(setToast({ message: "Bienvenue sur TechZone Elite !", type: "success" }));
            } else {
                dispatch(registerSuccess({ user: mockUser, token: mockToken }));
                dispatch(setToast({ message: "Compte créé avec succès !", type: "success" }));
            }
            setIsLoading(false);
            onBack?.(); // Return to shop after auth
        }, 1500);
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-6 py-12 relative overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-[550px] relative z-10">
                <button
                    onClick={onBack}
                    className="mb-8 flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-black text-[10px] uppercase tracking-[0.3em] group"
                >
                    <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Retour l-Dar
                </button>

                <div className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] dark:shadow-none border border-slate-200 dark:border-slate-800 p-8 md:p-12 lg:p-14 relative overflow-hidden">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center size-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] mb-8 shadow-2xl shadow-blue-600/30 transform hover:scale-110 transition-transform duration-500 group">
                            {isLogin ? (
                                <Fingerprint className="h-10 w-10 text-white" strokeWidth={1.5} />
                            ) : (
                                <Sparkles className="h-10 w-10 text-white" strokeWidth={1.5} />
                            )}
                        </div>
                        <h1 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-black mb-3 uppercase tracking-tighter font-display">
                            {isLogin ? "L-Ittisal" : "Incha'a l-7isab"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                            {isLogin ? "Accédez au monde de l'innovation" : "Rejoignez l'élite TechZone"}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none z-10">
                                    <User className="h-5 w-5" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="peer w-full h-16 rounded-2xl border-2 border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50 pl-14 pr-6 pt-5 text-sm font-black text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-600 transition-all outline-none"
                                />
                                <label className="absolute left-14 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest text-slate-400 pointer-events-none transition-all peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-valid:-translate-y-6">
                                    Dakhl smiytk (Full Name)
                                </label>
                            </div>
                        )}

                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none z-10">
                                <Mail className="h-5 w-5" />
                            </div>
                            <input
                                id="email"
                                type="text"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="peer w-full h-16 rounded-2xl border-2 border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50 pl-14 pr-6 pt-5 text-sm font-black text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-600 transition-all outline-none"
                            />
                            <label className="absolute left-14 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest text-slate-400 pointer-events-none transition-all peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-valid:-translate-y-6">
                                Email dyalk
                            </label>
                        </div>

                        <div className="relative group">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none z-10">
                                <Lock className="h-5 w-5" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="peer w-full h-16 rounded-2xl border-2 border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50 pl-14 pr-16 pt-5 text-sm font-black text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-600 transition-all outline-none"
                            />
                            <label className="absolute left-14 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest text-slate-400 pointer-events-none transition-all peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-valid:-translate-y-6">
                                L-Code (Password)
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end px-2">
                                <button type="button" className="text-[9px] font-black uppercase text-blue-600 hover:underline tracking-widest">
                                    N-ssiti l-code?
                                </button>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="flex items-center gap-3 px-4 py-2">
                                <div className="size-4 shrink-0 rounded bg-blue-600 flex items-center justify-center">
                                    <CheckCircle2 className="size-3 text-white" />
                                </div>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">
                                    Kan-wafeq 3la l-qawanin dyal TechZone Elite.
                                </p>
                            </div>
                        )}

                        <button
                            disabled={isLoading}
                            className="w-full bg-slate-900 dark:bg-blue-600 text-white font-black h-20 rounded-[1.8rem] hover:bg-blue-600 dark:hover:bg-blue-500 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-900/10 dark:shadow-blue-600/20 active:scale-[0.98] uppercase tracking-[0.25em] text-xs group overflow-hidden relative"
                            type="submit"
                        >
                            {isLoading ? (
                                <div className="size-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span className="relative z-10">{isLogin ? "Se Connecter" : "Incha'a"}</span>
                                    <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px]">
                            <span className="bg-white dark:bg-slate-900 px-6 text-slate-400 font-bold uppercase tracking-[0.4em]">AW</span>
                        </div>
                    </div>

                    <button
                        onClick={() => dispatch(setToast({ message: "Bientôt disponible !", type: "info" }))}
                        className="flex items-center justify-center gap-4 w-full h-16 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] bg-white dark:bg-slate-950/30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] group"
                    >
                        <Chrome className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Compte Google account</span>
                    </button>

                    <div className="mt-10 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {isLogin ? "Ba9i ma-3ndkch 7isab?" : "3ndk déjà 7isab?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-3 text-blue-600 font-black hover:underline uppercase"
                            >
                                {isLogin ? "S-jjel hna" : "T-khul hna"}
                            </button>
                        </p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                        <ShieldCheck className="size-3.5" /> Elite Tech Security • SSL ENCRYPTED
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
