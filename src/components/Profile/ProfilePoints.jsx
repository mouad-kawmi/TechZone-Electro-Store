
import React from 'react';
import { Star, Gift, History, ChevronRight } from 'lucide-react';

const ProfilePoints = ({ points = 0, history = [] }) => {

    // Logic for next reward
    const rewards = [
        { points: 500, label: "Bon d'achat 50 DH", color: "bg-emerald-50 text-emerald-600" },
        { points: 1000, label: "Bon d'achat 120 DH", color: "bg-blue-50 text-blue-600" },
        { points: 2500, label: "Livraison Gratuite 1 an", color: "bg-purple-50 text-purple-600" },
    ];

    const nextReward = rewards.find(r => r.points > points) || rewards[rewards.length - 1];
    const prevRewardPoints = rewards.filter(r => r.points <= points).pop()?.points || 0;

    // Calculate progress (clamped between 0 and 100)
    // If we have passed the max reward, just show 100%
    const isMaxReached = points >= rewards[rewards.length - 1].points;
    const progress = isMaxReached ? 100 : Math.min(100, Math.max(0, ((points - prevRewardPoints) / (nextReward.points - prevRewardPoints)) * 100));

    const pointsNeeded = Math.max(0, nextReward.points - points);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header Card */}
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[3rem] p-10 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="size-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                            <Star className="h-10 w-10 text-white fill-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase tracking-widest opacity-80">Solde TechZone</p>
                            <h2 className="text-5xl font-black uppercase tracking-tighter font-display">{points} <span className="text-2xl">PTS</span></h2>
                        </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-xs w-full">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Prochaine Récompense</p>
                        <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold">
                            <span>{points} pts</span>
                            <span>{nextReward.points} pts</span>
                        </div>
                        <p className="mt-2 text-xs font-bold">
                            {isMaxReached ? "Niveau Maximum atteint !" : `Plus que ${pointsNeeded} points pour ${nextReward.label} !`}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Rewards Section */}
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-2xl flex items-center justify-center">
                            <Gift className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Récompenses</h3>
                    </div>

                    <div className="space-y-4">
                        {rewards.map((reward, i) => (
                            <div key={i} className={`p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-slate-200 transition-all ${points >= reward.points ? 'opacity-100' : 'opacity-50 grayscale'}`}>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${reward.color}`}>
                                        {reward.points} PTS
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{reward.label}</span>
                                </div>
                                {points >= reward.points && (
                                    <button className="size-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* History Section */}
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center">
                            <History className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Historique</h3>
                    </div>

                    <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {history.length > 0 ? (
                            history.map((item, i) => (
                                <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{item.action}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {typeof item.date === 'string' ? item.date : new Date(item.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="text-emerald-500 font-black text-sm">{item.amount}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-400 text-sm font-medium">
                                Aucun historique de points pour le moment.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePoints;
