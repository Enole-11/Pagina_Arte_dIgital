import React, { useState } from 'react';
import {
  Search,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Printer,
  Sparkles,
  MessageCircle,
  MapPin,
  Layers,
} from 'lucide-react';
import { DEMO_TRACKING_ORDERS } from '../data/catalog';
import { OrderTrackingItem } from '../types';
import { createOrderInquiryWhatsAppUrl } from '../utils/whatsapp';
import { formatPEN } from '../utils/calculator';

export const OrderTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('GAD-8492');
  const [selectedOrder, setSelectedOrder] = useState<OrderTrackingItem>(
    DEMO_TRACKING_ORDERS[0]
  );

  const handleSearch = (code: string) => {
    setSearchTerm(code);
    const found = DEMO_TRACKING_ORDERS.find(
      (o) =>
        o.id.toLowerCase() === code.trim().toLowerCase() ||
        o.clientName.toLowerCase().includes(code.trim().toLowerCase())
    );
    if (found) {
      setSelectedOrder(found);
    }
  };

  const steps = [
    { number: 1, title: 'Arte Aprobado', desc: 'Pre-prensa y RIP completado' },
    { number: 2, title: 'En Impresión', desc: 'Plotter solvente en línea' },
    { number: 3, title: 'Mesa de Acabados', desc: 'Ojalillos, bastilla o barniz' },
    { number: 4, title: 'Control de Calidad', desc: 'Inspección de color y secado' },
    { number: 5, title: 'Listo / Despacho', desc: 'Taller o envío a Selva Central' },
  ];

  return (
    <section id="seguimiento" className="py-14 sm:py-20 relative bg-[#071224]/90 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] text-xs font-bold uppercase tracking-wider mb-3">
            <Package className="w-3.5 h-3.5" />
            <span>Seguimiento de Producción en Vivo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Rastrea tu Orden de Trabajo
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Ingresa tu código de orden emitido en taller (ej. GAD-8492) para conocer el estado exacto de impresión y hora de entrega.
          </p>
        </div>

        {/* Quick Search Bar & Demo Order Chips */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Ingresa código (ej. GAD-8492 o nombre del cliente)..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0F2444] border border-slate-700 text-white placeholder-slate-400 text-sm font-mono focus:outline-none focus:border-[#e6007e] focus:ring-2 focus:ring-[#e6007e]/20"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400">Órdenes de demostración:</span>
            {DEMO_TRACKING_ORDERS.map((ord) => (
              <button
                key={ord.id}
                onClick={() => handleSearch(ord.id)}
                className={`px-2.5 py-1 rounded-lg font-mono transition-colors cursor-pointer ${
                  selectedOrder.id === ord.id
                    ? 'bg-[#e6007e] text-white font-bold'
                    : 'bg-[#0F2444] text-slate-300 hover:text-white border border-slate-700/50'
                }`}
              >
                #{ord.id}
              </button>
            ))}
          </div>
        </div>

        {/* Main Tracking Card */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0F2444]/75 backdrop-blur-md border border-slate-700/60 p-6 sm:p-10 shadow-2xl">
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#ffb0c9] bg-[#e6007e]/20 px-2 py-0.5 rounded">
                  #{selectedOrder.id}
                </span>
                <span className="text-xs text-slate-400">{selectedOrder.date}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1">
                {selectedOrder.projectName}
              </h3>
              <p className="text-xs text-slate-300">Cliente: <strong>{selectedOrder.clientName}</strong></p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-400">Estimado de Entrega</div>
              <div className="text-base font-bold text-[#f59e0b] font-mono mt-0.5 flex items-center gap-1.5 sm:justify-end">
                <Clock className="w-4 h-4 text-[#f59e0b]" />
                <span>{selectedOrder.estimatedCompletion}</span>
              </div>
              <div className="text-xs text-slate-300 mt-1 flex items-center gap-1 sm:justify-end">
                <MapPin className="w-3.5 h-3.5 text-[#ffb0c9]" />
                <span>{selectedOrder.destination}</span>
              </div>
            </div>
          </div>

          {/* 5-Step Visual Timeline */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {steps.map((st) => {
                const isCompleted = st.number < selectedOrder.stepNumber;
                const isCurrent = st.number === selectedOrder.stepNumber;

                return (
                  <div
                    key={st.number}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                      isCurrent
                        ? 'bg-[#152D52] border-[#e6007e] shadow-[0_0_15px_rgba(230,0,126,0.25)]'
                        : isCompleted
                        ? 'bg-[#071224] border-[#25d366]/40 text-slate-300'
                        : 'bg-[#071224]/50 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-slate-400">0{st.number}</span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-[#25d366]" />
                      ) : isCurrent ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e6007e] shadow-[0_0_8px_#e6007e] animate-pulse" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-700" />
                      )}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isCurrent ? 'text-white' : ''}`}>
                        {st.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{st.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operator Production Notes & WhatsApp Inquiry */}
          <div className="p-4 rounded-xl bg-[#071224] border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-[#ffb0c9]" />
                <span>Bitácora del Operador de Taller:</span>
              </div>
              <p className="text-xs text-slate-300 italic">{selectedOrder.operatorNotes}</p>
              <div className="text-[11px] text-slate-400">{selectedOrder.specsSummary}</div>
            </div>

            <a
              href={createOrderInquiryWhatsAppUrl(selectedOrder.id, selectedOrder.clientName)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#25d366] hover:bg-[#22bf5b] shadow-[0_0_12px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2 transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Consultar Pedido #{selectedOrder.id}</span>
            </a>
          </div>
        </div>

        {/* Live Workshop Machinery Load Indicators */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#0F2444]/50 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400">Plotter 1 (Solvente 3.20m)</span>
              <span className="text-[#25d366] font-bold">Activo</span>
            </div>
            <div className="text-white font-semibold">Produciendo Lona 13oz</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#e6007e] h-full rounded-full w-2/3" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F2444]/50 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400">Plotter 2 (Alta Res. 1.80m)</span>
              <span className="text-[#25d366] font-bold">Disponible</span>
            </div>
            <div className="text-white font-semibold">Cola de Espera Express: 0 min</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#25d366] h-full rounded-full w-1/5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F2444]/50 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400">Mesa de Ojalillado & Bastilla</span>
              <span className="text-[#f59e0b] font-bold">Operativa</span>
            </div>
            <div className="text-white font-semibold">Turno de Tarde Mazamari</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#f59e0b] h-full rounded-full w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
