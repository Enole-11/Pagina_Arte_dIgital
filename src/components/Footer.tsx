import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { WORKSHOP_METRICS } from '../data/catalog';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#071224] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#e6007e] flex items-center justify-center font-extrabold text-white text-base shadow-[0_0_12px_rgba(230,0,126,0.5)]">
                G
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Gráfica Arte Digital
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Taller de fabricación gráfica industrial, gigantografías y publicidad exterior en Selva Central. Impresión directa en lona 13oz, rotulación de flotas, papelería fina con reserva UV y packaging personalizado.
            </p>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-[#e6007e] shrink-0" />
              <span>Jr. Los Héroes 420, Mazamari, Provincia de Satipo, Junín</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Navegación
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('catalogo')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Catálogo de Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('cotizador')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cotizador en Tiempo Real
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('mockup')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pre-Prensa & Mockup 3D
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('seguimiento')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Seguimiento de Órdenes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('taller')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Taller & Cobertura Mazamari
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Atención & Pedidos
            </div>
            <p className="text-slate-300">
              {WORKSHOP_METRICS.hoursWeekday}
              <br />
              {WORKSHOP_METRICS.hoursSunday}
            </p>
            <div className="pt-2">
              <a
                href={WORKSHOP_METRICS.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#22bf5b] text-white font-bold text-xs shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {WORKSHOP_METRICS.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean copyright & regional pride */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-300">
          <div>
            © {new Date().getFullYear()} Gráfica Arte Digital. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span>Orgullosamente producido en Mazamari · Selva Central, Perú</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
