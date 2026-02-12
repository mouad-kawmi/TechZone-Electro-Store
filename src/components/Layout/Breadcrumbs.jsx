import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ paths, onHomeClick, onNavigate }) => {
    return (
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 overflow-x-auto no-scrollbar py-2">
            <button
                onClick={onHomeClick}
                className="hover:text-blue-600 transition-colors flex items-center gap-2 shrink-0 group"
            >
                <Home className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Accueil</span>
            </button>

            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="h-3 w-3 shrink-0 text-slate-300 dark:text-slate-700" />
                    <button
                        onClick={() => onNavigate && onNavigate(path.view, path.params)}
                        className={`transition-colors shrink-0 whitespace-nowrap ${index === paths.length - 1
                                ? 'text-slate-900 dark:text-white cursor-default'
                                : 'hover:text-blue-600'
                            }`}
                        disabled={index === paths.length - 1}
                    >
                        {path.label}
                    </button>
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
