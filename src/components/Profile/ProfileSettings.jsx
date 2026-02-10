
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Lock, Trash2, Save, KeyRound, ShieldAlert } from 'lucide-react';
import { updateUser, setToast } from '../../store';

const ProfileSettings = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '06 00 00 00 00'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            dispatch(updateUser(formData));
            dispatch(setToast({ msg: "Profil mis à jour avec succès !", type: "success" }));
            setIsLoading(false);
        }, 800);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            dispatch(setToast({ msg: "Les nouveaux mots de passe ne correspondent pas !", type: "error" }));
            return;
        }
        setIsPasswordLoading(true);
        setTimeout(() => {
            dispatch(setToast({ msg: "Mot de passe modifié avec succès !", type: "success" }));
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setIsPasswordLoading(false);
        }, 1200);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
            <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Paramètres du Compte</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Gérez vos informations et votre sécurité</p>
            </div>

            <div className="grid lg:grid-cols-1 gap-8">
                {/* Profile Information */}
                <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
                    <div className="flex items-center gap-4 py-2 border-b border-slate-50 dark:border-white/5">
                        <div className="size-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center">
                            <User className="size-5" />
                        </div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Informations Personnelles</h4>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom d'utilisateur</label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-blue-500 transition-all outline-none font-bold text-slate-900 dark:text-white text-xs"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-blue-500 transition-all outline-none font-bold text-slate-900 dark:text-white text-xs"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-transform disabled:opacity-50"
                        >
                            {isLoading ? "Enregistrement..." : <>Enregistrer les modifications <Save className="size-4" /></>}
                        </button>
                    </div>
                </form>

                {/* Password Change Section */}
                <form onSubmit={handlePasswordChange} className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
                    <div className="flex items-center gap-4 py-2 border-b border-slate-50 dark:border-white/5">
                        <div className="size-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center">
                            <KeyRound className="size-5" />
                        </div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Modifier le Mot de Passe</h4>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mot de passe actuel</label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full h-14 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-6 text-sm font-bold focus:border-blue-500 transition-all outline-none dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nouveau mot de passe</label>
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full h-14 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-sm font-bold focus:border-blue-500 transition-all outline-none dark:text-white"
                                />
                            </div>
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmer le nouveau mot de passe</label>
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full h-14 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 text-sm font-bold focus:border-blue-500 transition-all outline-none dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isPasswordLoading}
                            className="bg-amber-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-transform disabled:opacity-50 shadow-lg shadow-amber-600/20"
                        >
                            {isPasswordLoading ? "Mise à jour..." : <>Mettre à jour le mot de passe <KeyRound className="size-4" /></>}
                        </button>
                    </div>
                </form>

                {/* Danger Zone */}
                <div className="p-10 rounded-[3rem] border-2 border-dashed border-rose-100 dark:border-rose-900/30 bg-rose-50/20 dark:bg-rose-950/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-center md:text-left">
                        <div className="size-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm shrink-0">
                            <ShieldAlert className="size-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Zone de Danger</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">La suppression du compte est irréversible.</p>
                        </div>
                    </div>
                    <button className="px-8 py-4 rounded-2xl border border-rose-200 dark:border-rose-800 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                        Supprimer mon compte
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
