
import React from 'react';
import { Plus, Edit3, Trash2, MapPin } from 'lucide-react';

const ProfileAddresses = ({ addresses }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Mes Adresses</h3>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all">
                        <Plus className="h-4 w-4" /> Ajouter
                    </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                        <div key={addr.id} className={`p-8 rounded-[2.5rem] border-2 transition-all ${addr.primary ? 'border-blue-600 bg-blue-50/30' : 'border-slate-50 bg-white'}`}>
                            <div className="flex justify-between items-start mb-6">
                                <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${addr.primary ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {addr.type}
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit3 className="h-4 w-4" /></button>
                                    {!addr.primary && <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="h-4 w-4" /></button>}
                                </div>
                            </div>
                            <p className="text-sm font-bold text-slate-900 leading-relaxed mb-6">"{addr.address}"</p>
                            <div className="flex items-center gap-2 text-slate-400">
                                <MapPin className="h-3.5 w-3.5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{addr.phone}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileAddresses;
