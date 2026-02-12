import React from 'react';
import { User, Mail, Calendar, CheckCircle, ExternalLink, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { markAsRead, deleteMessage } from '../../../store';

const AdminMessages = ({ messages }) => {
    const dispatch = useDispatch();

    if (!messages || messages.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-200 dark:border-white/5 py-32 text-center space-y-8 shadow-sm">
                <div className="relative mx-auto size-24">
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20"></div>
                    <div className="relative size-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-blue-600 shadow-xl">
                        <Mail className="size-10 animate-bounce" />
                    </div>
                </div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-display uppercase tracking-tight">Votre boîte est vide</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] max-w-xs mx-auto font-bold leading-relaxed">
                        Aucun message client pour le moment.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`group relative bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl ${msg.read
                        ? 'border-slate-200 dark:border-white/5 opacity-80'
                        : 'border-blue-500/30'
                        }`}
                >
                    {!msg.read && (
                        <div className="absolute -top-2 -right-2 flex">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="space-y-1.5 flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-slate-950 dark:text-white text-lg md:text-xl truncate">
                                        {msg.subject}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] md:text-xs">
                                    <div className="flex items-center gap-2 text-blue-600 font-bold">
                                        <User className="size-3.5" />
                                        <span>{msg.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Mail className="size-3.5" />
                                        <span>{msg.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                                        <Calendar className="size-3.5" />
                                        <span>{new Date(msg.date).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-white/5">
                                {!msg.read && (
                                    <button
                                        onClick={() => dispatch(markAsRead(msg.id))}
                                        className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="size-4" /> Lu
                                    </button>
                                )}
                                <a
                                    href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                    className="flex-1 sm:flex-none h-10 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <ExternalLink className="size-4" /> Répondre
                                </a>
                                <button
                                    onClick={() => dispatch(deleteMessage(msg.id))}
                                    className="size-10 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                                {msg.message}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminMessages;
