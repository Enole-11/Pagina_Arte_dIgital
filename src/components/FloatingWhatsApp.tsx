import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WORKSHOP_METRICS } from '../data/catalog';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive Tooltip bubble */}
      {showTooltip && (
        <div className="mb-2 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0F2444]/95 backdrop-blur-md border border-[#25d366]/40 shadow-xl text-xs text-white max-w-xs animate-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#25d366] shadow-[0_0_8px_#25d366] animate-ping shrink-0" />
          <div className="leading-tight">
            <span className="font-bold text-[#25d366] block">Taller Mazamari:</span>
            <span>Operador en línea para cotizaciones</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5 ml-1"
            aria-label="Cerrar tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Pill Pod */}
      <a
        href={WORKSHOP_METRICS.whatsappDirect}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25d366] hover:bg-[#22bf5b] text-white shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="Contactar al taller por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">
          WhatsApp Taller
        </span>
      </a>
    </div>
  );
};
