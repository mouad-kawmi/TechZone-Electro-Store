import React from 'react';
import { Bell } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { markNotificationRead, clearNotifications } from '../../../store';

const AdminNotifications = ({ notifications, isOpen, setIsOpen, setActiveTab, unreadCount }) => {
    const dispatch = useDispatch();

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative size-10 sm:size-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center justify-center transition-all shadow-sm"
            >
                <Bell className="size-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 size-5 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-slate-950/20 md:bg-transparent" onClick={() => setIsOpen(false)}></div>
                    <div className="fixed inset-x-4 top-24 md:absolute md:inset-auto md:right-0 md:top-14 md:w-96 bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 md:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                            <div className="flex items-center gap-2">
                                <div className="size-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <h3 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] md:text-xs">Notifications</h3>
                            </div>
                            {notifications?.length > 0 && (
                                <button onClick={() => dispatch(clearNotifications())} className="text-[10px] font-bold text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors">
                                    Tout effacer
                                </button>
                            )}
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                            {!notifications || notifications.length === 0 ? (
                                <div className="p-8 text-center space-y-3">
                                    <div className="size-12 rounded-full bg-slate-50 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-300">
                                        <Bell className="size-5" />
                                    </div>
                                    <p className="text-xs text-slate-400">Aucune notification</p>
                                </div>
                            ) : (
                                notifications.map(n => (
                                    <div
                                        key={n.id}
                                        onClick={() => {
                                            if (!n.read) dispatch(markNotificationRead(n.id));
                                            if (n.link === '/admin/orders') setActiveTab('orders');
                                            if (n.link === '/admin/reviews') setActiveTab('reviews');
                                            if (n.link === '/admin/messages') setActiveTab('messages');
                                            setIsOpen(false);
                                        }}
                                        className={`p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer flex gap-4 ${!n.read ? 'bg-blue-50/30' : ''}`}
                                    >
                                        <div className={`mt-1 size-2 rounded-full shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold">{n.title}</h4>
                                            <p className="text-xs text-slate-500 leading-snug">{n.message}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">
                                                {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminNotifications;
