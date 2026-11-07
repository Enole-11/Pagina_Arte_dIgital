import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Zap, Printer, MapPin, Sparkles } from 'lucide-react';
import { HERO_IMAGE, WORKSHOP_METRICS } from '../data/catalog';

interface HeroProps {
  onStartQuote: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuote, onExploreCatalog }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-800/80">
      {/* Background radial gradient pools for dark glassmorphism */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-[#e6007e]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#0A1931]/80 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Commercial Copy & Conversion Triggers */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Local Trust Badge: Amber Gold */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#ffddb8] text-xs font-bold tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Taller Propio en Mazamari · Envíos Diarios a Todo Satipo y Selva Central</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              Imprenta Digital & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb0c9] via-[#e6007e] to-[#ffb95f]">Gigantografías</span> de Alta Precisión
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Producción industrial directa sin intermediarios. Banners en lona pesada 13oz, rotulación vehicular, papelería fina con reserva UV, cajas y DTF textil. Resistencia garantizada al sol tropical y lluvias de la Selva Central.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onStartQuote}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-[#e6007e] hover:bg-[#ff1a98] shadow-[0_0_24px_rgba(230,0,126,0.45)] hover:shadow-[0_0_32px_rgba(230,0,126,0.6)] transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calcular Cotización en Vivo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={WORKSHOP_METRICS.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white bg-[#25d366] hover:bg-[#22bf5b] shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all transform active:scale-98 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chatear con Producción</span>
              </a>

              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-[#0F2444]/60 hover:bg-[#0F2444] border border-slate-700/50 transition-colors flex items-center justify-center cursor-pointer"
              >
                Ver Catálogo Completo
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Zap className="w-4 h-4 text-[#ffb0c9]" />
                <span>Entrega Express desde 4 Horas</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#f59e0b]" />
                <span>Tintas Solventes Resistentes a la Lluvia</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Printer className="w-4 h-4 text-[#25d366]" />
                <span>Plotter Solvente de 3.20m</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Workshop Showcase Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-[#e6007e]/30 via-slate-800/40 to-slate-900/60 shadow-2xl shadow-black/80">
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#0F2444]">
                <img
                  src={HERO_IMAGE}
                  alt="Taller de impresión digital y gigantografías en Mazamari"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback container if needed
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Subtle dark gradient scrim for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081325]/90 via-[#081325]/30 to-transparent" />

                {/* Live Workshop Operational Status Overlay */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-[#071224]/85 backdrop-blur-md border border-slate-600/40 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25d366] shadow-[0_0_8px_#25d366] animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Plotter 3.20m Operativo
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#0F2444]/90 backdrop-blur-md border border-slate-600/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Resolución Máxima</div>
                    <div className="text-sm font-extrabold text-white">1440 DPI Fotográfico</div>
                  </div>
                  <div className="h-7 w-px bg-slate-700" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Material Estrella</div>
                    <div className="text-sm font-extrabold text-[#ffb0c9]">Lona 13oz Frontlight</div>
                  </div>
                  <div className="h-7 w-px bg-slate-700" />
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-medium">Mazamari</div>
                    <div className="text-xs font-bold text-[#f59e0b]">Jr. Los Héroes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Trust Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-[#0F2444]/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              +12,500 <span className="text-base text-[#ffb0c9] font-sans font-semibold">m²</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">Impresos en Selva Central</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F2444]/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#ffb0c9] font-mono tabular-nums">
              4 a 24 <span className="text-base font-sans font-semibold">hrs</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">Tiempo récord de entrega</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F2444]/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#f59e0b] font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1">Garantía clima lluvioso y sol</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F2444]/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#25d366] font-mono tabular-nums">
              5 Ciudades
            </div>
            <div className="text-xs text-slate-400 mt-1">Mazamari, Satipo, Pangoa y más</div>
          </div>
        </div>
      </div>
    </section>
  );
};
