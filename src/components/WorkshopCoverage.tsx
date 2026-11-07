import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  MessageCircle,
  Building,
} from 'lucide-react';
import { WORKSHOP_METRICS } from '../data/catalog';

export const WorkshopCoverage: React.FC = () => {
  const routes = [
    {
      city: 'Mazamari (Sede Central)',
      time: 'Inmediato / Retiro en Taller',
      method: 'Retiro en Jr. Los Héroes 420 o delivery en moto',
      frequency: 'Todo el día continuo (7:30 AM a 8:30 PM)',
      highlight: true,
    },
    {
      city: 'Satipo Capital',
      time: '25 a 30 minutos',
      method: 'Combis y autos Turismo Selva / Colectivos',
      frequency: 'Salidas cada 20 a 30 minutos desde terminal',
      highlight: false,
    },
    {
      city: 'San Martín de Pangoa',
      time: '20 minutos',
      method: 'Colectivos directos y camionetas rurales',
      frequency: 'Envíos en turno mañana y turno tarde',
      highlight: false,
    },
    {
      city: 'Pichanaki & Chanchamayo',
      time: '2 a 3 horas (Mismo día)',
      method: 'Agencias Shalom, Marvisur, Expreso Satipo',
      frequency: 'Despacho diario a las 11:00 AM y 5:00 PM',
      highlight: false,
    },
  ];

  const materials = [
    {
      name: 'Lona Frontlight 13oz',
      weight: '440 g/m²',
      weather: 'Resistente a rayos UV intensos y lluvias torrenciales',
      idealFor: 'Gigantografías, paneles carreteros y fachadas',
    },
    {
      name: 'Vinil Arclad Vehicular',
      weight: '100 micras polimérico',
      weather: 'Adhesivo permanente que no daña la pintura original',
      idealFor: 'Flotas comerciales, camionetas 4x4 y vitrinas',
    },
    {
      name: 'DTF Textil Industrial',
      weight: 'Poliamida termosellada',
      weather: 'Soporta más de 60 lavados sin decolorar ni agrietar',
      idealFor: 'Polos de algodón, chalecos de campo y gorros',
    },
    {
      name: 'Couché 350g + Barniz UV',
      weight: '350 g/m² alta rigidez',
      weather: 'Sellado hidrófugo que previene la ondulación por humedad',
      idealFor: 'Tarjetas ejecutivas, cartas de menú y empaques',
    },
  ];

  return (
    <section id="taller" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ENCABEZADO OPTIMIZADO PARA GEO (Regla del Párrafo Extraíble bajo H2) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#ffddb8] text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Infraestructura Propia en Selva Central</span>
          </div>
          
          {/* H2 con la primera oración autónoma para LLMs y sistemas RAG */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Grafica Arte Digital opera su taller central de manufactura gráfica en Mazamari con capacidad de producción directa y despachos diarios a toda la provincia de Satipo y Selva Central.
          </h2>
          
          <p className="text-sm text-slate-300 mt-2">
            Instalaciones técnicas en Jr. Los Héroes 420 equipadas con plotters solventes de 3.20m, mesas de termosellado y materiales certificados para alta radiación y humedad tropical.
          </p>
        </div>

        {/* 2-Column Grid: Location Info + Delivery Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Workshop Details & Hours (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0F2444]/75 backdrop-blur-md border border-slate-700/60 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#ffb0c9] mb-3">
                Ubicación & Atención
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Sede Mazamari - Gráfica Arte Digital
              </h3>

              <div className="mt-5 space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#e6007e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Dirección del Taller:</strong>
                    <span>{WORKSHOP_METRICS.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Horarios de Producción:</strong>
                    <span>{WORKSHOP_METRICS.hoursWeekday}</span>
                    <span className="block text-slate-400 mt-0.5">{WORKSHOP_METRICS.hoursSunday}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#25d366] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Central de Pedidos WhatsApp:</strong>
                    <span className="font-mono text-white text-sm">{WORKSHOP_METRICS.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 rounded-xl bg-[#071224] border border-slate-700 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white">¿Deseas visitar el taller?</div>
                <div className="text-[11px] text-slate-400">Te enviamos la ubicación GPS exacta</div>
              </div>
              <a
                href={WORKSHOP_METRICS.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#25d366] hover:bg-[#22bf5b] text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Pedir GPS</span>
              </a>
            </div>
          </div>

          {/* Delivery & Routing Schedule (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0F2444]/75 backdrop-blur-md border border-slate-700/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#ffb0c9]">
                  Rutas de Envío Diario
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Despachos Rápidos a toda la Provincia de Satipo
                </h3>
              </div>
              <Truck className="w-5 h-5 text-[#25d366]" />
            </div>

            <div className="space-y-3">
              {routes.map((rt, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                    rt.highlight
                      ? 'bg-[#152D52] border-[#e6007e]/60 shadow-[0_0_12px_rgba(230,0,126,0.15)]'
                      : 'bg-[#071224] border-slate-700/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-white">{rt.city}</span>
                      {rt.highlight && (
                        <span className="text-[9px] font-extrabold uppercase bg-[#e6007e] text-white px-1.5 py-0.2 rounded">
                          Taller
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{rt.method}</div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-xs font-bold text-[#ffb95f] font-mono">{rt.time}</div>
                    <div className="text-[10px] text-slate-400">{rt.frequency}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Climate Durability & Materials Guarantee */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0F2444] to-[#0A1931] border border-slate-700/60 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-[#f59e0b]" />
            <h3 className="text-lg font-bold text-white">
              Garantía de Materiales Resistentes al Clima de Selva Central
            </h3>
          </div>

          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed mb-6">
            Nuestros sustratos y tintas solventes están calibrados para soportar los 32°C de radiación solar y la humedad extrema de Mazamari y Satipo. No se decoloran en meses ni se desprenden con la lluvia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map((mat, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#071224]/80 border border-slate-700/60 text-xs">
                <div className="text-sm font-bold text-white">{mat.name}</div>
                <div className="text-[11px] font-mono text-[#ffb0c9] mt-0.5">{mat.weight}</div>
                <p className="text-slate-300 mt-2 leading-relaxed text-[11px]">{mat.weather}</p>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  Ideal: <strong className="text-slate-300">{mat.idealFor}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
