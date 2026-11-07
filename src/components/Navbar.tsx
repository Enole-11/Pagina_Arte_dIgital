import React, { useState } from 'react';
import { MessageCircle, Menu, X, PhoneCall } from 'lucide-react';
import { WORKSHOP_METRICS } from '../data/catalog';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenQuickQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuickQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'cotizador', label: 'Cotizador en Vivo' },
    { id: 'mockup', label: 'Pre-Prensa & Mockup' },
    { id: 'seguimiento', label: 'Seguimiento' },
    { id: 'taller', label: 'Taller Mazamari' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#081325]/90 backdrop-blur-md border-b border-slate-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 single-line links) - Zone 3 (1 primary action) */}
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('catalogo')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#e6007e] flex items-center justify-center font-extrabold text-white text-base shadow-[0_0_15px_rgba(230,0,126,0.5)] group-hover:bg-[#ff1a98] transition-colors">
              G
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0">
              Gráfica Arte Digital
            </span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#ffb0c9] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e6007e] rounded-full shadow-[0_0_8px_#e6007e]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={WORKSHOP_METRICS.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#25d366] hover:bg-[#22bf5b] rounded-full shadow-[0_0_16px_rgba(37,211,102,0.35)] transition-all transform active:scale-98 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={WORKSHOP_METRICS.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white bg-[#25d366] rounded-full shadow-[0_0_12px_rgba(37,211,102,0.3)] sm:hidden"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-700/50 bg-[#081325]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-[#0F2444] text-[#ffb0c9] border border-[#e6007e]/40'
                  : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="w-2 h-2 rounded-full bg-[#e6007e] shadow-[0_0_6px_#e6007e]" />
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenQuickQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl text-center font-bold text-sm text-white bg-[#e6007e] hover:bg-[#ff1a98] shadow-[0_0_20px_rgba(230,0,126,0.4)]"
            >
              Cotizar en Línea
            </button>
            <a
              href={WORKSHOP_METRICS.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-center font-bold text-sm text-white bg-[#25d366] hover:bg-[#22bf5b] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chatear por WhatsApp (+51 984 892 143)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
