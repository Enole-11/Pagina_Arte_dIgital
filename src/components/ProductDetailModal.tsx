import React from 'react';
import { X, Clock, ShieldCheck, Check, Sliders, MessageCircle, ArrowRight } from 'lucide-react';
import { PrintProduct } from '../types';
import { createProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: PrintProduct | null;
  onClose: () => void;
  onOpenCalculator: (product: PrintProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCalculator,
}) => {
  if (!product) return null;

  const whatsappUrl = createProductWhatsAppUrl(product.name, product.priceDescription);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#152D52] border border-slate-600/60 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/60 bg-[#0F2444]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#ffb0c9] uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            {product.badge && (
              <span className="text-[10px] font-extrabold uppercase bg-[#e6007e] text-white px-2 py-0.5 rounded">
                {product.badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Preview & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-[#071224]/90 text-[11px] font-semibold text-slate-200 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#ffb0c9]" />
                <span>{product.turnaround}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-white leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>
              <div className="p-3 rounded-xl bg-[#071224] border border-slate-700/70">
                <div className="text-[11px] text-slate-400">Tarifa de Referencia:</div>
                <div className="text-xl font-extrabold text-white font-mono">
                  {product.priceDescription}
                </div>
                <div className="text-[10px] text-[#25d366] font-semibold mt-0.5">
                  Pedido mínimo: {product.minQuantity}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Sheet */}
          <div className="p-4 rounded-xl bg-[#0F2444]/60 border border-slate-700/60 space-y-3 text-xs">
            <div className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#f59e0b]" />
              <span>Especificaciones de Fabricación</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-slate-400 block">Material Base:</span>
                <span className="text-white font-semibold">{product.specs.material}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Resolución de Salida:</span>
                <span className="text-white font-semibold">{product.specs.resolution}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Durabilidad Externa:</span>
                <span className="text-white font-semibold">{product.specs.durability}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Formatos Habituales:</span>
                <span className="text-white font-semibold">{product.specs.standardSizes.join(', ')}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/60">
              <span className="text-slate-400 block mb-1.5">Acabados Disponibles en Taller:</span>
              <div className="flex flex-wrap gap-1.5">
                {product.specs.finishes.map((f, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-[#071224] border border-slate-700 text-slate-200 text-[11px] font-medium"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-5 border-t border-slate-700/60 bg-[#0F2444] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onOpenCalculator(product);
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#e6007e] hover:bg-[#ff1a98] shadow-[0_0_15px_rgba(230,0,126,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>Configurar y Calcular en Vivo</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#25d366] hover:bg-[#22bf5b] shadow-[0_0_15px_rgba(37,211,102,0.35)] transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
