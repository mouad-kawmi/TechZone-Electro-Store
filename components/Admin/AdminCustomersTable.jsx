import React from 'react';
import { User, Mail, CreditCard, Shield, MoreVertical } from 'lucide-react';

const AdminCustomersTable = ({ customers = [] }) => {
    // Mock data if no customers passed
    const displayCustomers = customers.length > 0 ? customers : [
        { id: 1, name: "Ahmed Benani", email: "ahmed.b@gmail.com", orders: 12, spend: 45000, status: 'Elite' },
        { id: 2, name: "Sara Mansouri", email: "sara.m@outlook.com", orders: 5, spend: 12000, status: 'Classic' },
        { id: 3, name: "Youssef Tazi", email: "tazi.y@techzone.ma", orders: 28, spend: 89000, status: 'Elite' },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800">
                            <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Customer Identity</th>
                            <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Tier Status</th>
                            <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">Orders</th>
                            <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 text-right">LTV Capital</th>
                            <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 text-right">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {displayCustomers.map((c) => (
                            <tr key={c.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 transition-colors group-hover:text-white">
                                            <User className="size-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{c.name}</span>
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{c.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${c.status === 'Elite' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/10'}`}>
                                        <Shield className="size-3" />
                                        {c.status}
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <span className="text-[11px] font-black text-slate-900 dark:text-white">{c.orders}</span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <span className="text-[11px] font-black text-blue-600 dark:text-blue-400 tracking-tighter">{c.spend.toLocaleString()} DH</span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                        <MoreVertical className="size-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCustomersTable;
