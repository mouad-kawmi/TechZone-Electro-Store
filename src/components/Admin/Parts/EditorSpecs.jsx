import React from 'react';
import { Settings, Trash2 } from 'lucide-react';

const EditorSpecs = ({ product, onAddSpec, onRemoveSpec, onUpdateField }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-2">
                    <Settings className="size-4 text-slate-400" />
                    <h4 className="text-[10px] font-black uppercase text-slate-400">Spécifications</h4>
                </div>
                <button onClick={onAddSpec} className="text-blue-600 text-[9px] font-black uppercase underline decoration-2 underline-offset-4">+ Ajouter</button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {Object.entries(product.specs || {}).map(([key, val], idx) => (
                    <div key={idx} className="flex gap-2">
                        <input
                            value={key}
                            onChange={e => {
                                const newSpecs = { ...product.specs };
                                delete newSpecs[key];
                                newSpecs[e.target.value] = val;
                                onUpdateField('specs', newSpecs);
                            }}
                            className="w-1/3 bg-slate-50 dark:bg-slate-950 border-none rounded-lg px-3 py-2 text-[9px] font-black dark:text-white"
                        />
                        <input
                            value={val}
                            onChange={e => onUpdateField('specs', { ...product.specs, [key]: e.target.value })}
                            className="flex-1 bg-slate-50 dark:bg-slate-950 border-none rounded-lg px-3 py-2 text-[10px] font-bold dark:text-white"
                        />
                        <button onClick={() => onRemoveSpec(key)} className="p-1.5 text-slate-300 hover:text-rose-500">
                            <Trash2 className="size-3.5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditorSpecs;
