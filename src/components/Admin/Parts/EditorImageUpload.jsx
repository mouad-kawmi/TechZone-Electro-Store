import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const EditorImageUpload = ({ product, onUpdateField, fileInputRef, handleImageUpload }) => {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-3 font-display">Image Principale</label>
            <div className="bg-slate-50 dark:bg-slate-950/20 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 flex items-center justify-center aspect-video relative group overflow-hidden shadow-inner">
                {product.image ? (
                    <img src={product.image} className="h-full w-full object-contain" alt="Preview" />
                ) : (
                    <div className="flex flex-col items-center gap-4 text-slate-300">
                        <ImageIcon className="size-10 stroke-1" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Aucune Image</span>
                    </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Source Image</label>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-[8px] font-black uppercase text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            Upload Local
                        </button>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    <input
                        value={product.image}
                        onChange={e => onUpdateField('image', e.target.value)}
                        className="w-full h-10 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg px-4 text-[9px] font-bold outline-none dark:text-white"
                        placeholder="Paste URL or upload file..."
                    />
                </div>
            </div>
        </div>
    );
};

export default EditorImageUpload;
