import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 left-6 z-[150]">
      {/* WhatsApp Link */}
      <a
        href="https://wa.me/212600000000"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block"
      >
        <div className="bg-[#25D366] p-4 rounded-2xl shadow-2xl shadow-green-500/40 hover:scale-110 active:scale-90 transition-all duration-300">
          <MessageCircle className="h-7 w-7 text-white fill-current" />
        </div>
        <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-2 transition-all whitespace-nowrap pointer-events-none shadow-xl">
          WhatsApp Direct
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
