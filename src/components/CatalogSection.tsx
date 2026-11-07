import React, { useState } from 'react';
import { Search, Sparkles, MessageCircle, Sliders, Clock, Layers, ArrowUpRight } from 'lucide-react';
import { PrintProduct, ProductCategory } from '../types';
import { CATALOG_PRODUCTS } from '../data/catalog';
import { createProductWhatsAppUrl } from '../utils/whatsapp';

interface CatalogSectionProps {
  onSelectProductForQuote: (product: PrintProduct) => void;
  onOpenProductDetail: (product: PrintProduct) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onSelectProductForQuote,
  onOpenProductDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'todos', label: 'Todos los Trabajos' },
    { id: 'gigantografias', label: 'Gigantografías & Banners' },
    { id: 'papeleria', label: 'Tarjetas & Papelería' },
    { id: 'merchandising', label: 'Merchandising & DTF' },
    { id: 'empaques', label: 'Empaques & Stickers' },
    { id: 'senaletica', label: 'Señalética & Celtex' },
  ];

  const filteredProducts = CATALOG_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#ffb0c9] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Catálogo Comercial 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Servicios de Impresión para Empresas & Negocios
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Equipamiento industrial propio en Mazamari. Precios directos por metro cuadrado y por millar con acabados garantizados.
            </p>
          </div>

          {/* Search Input with Fuchsia Ring Focus */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar banner, vinil, tarjeta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071224] border border-slate-700/70 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#e6007e] focus:ring-3 focus:ring-[#e6007e]/20 transition-all"
            />
          </div>
        </div>

        {/* Filterable Horizontal Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#e6007e] text-white shadow-[0_0_15px_rgba(230,0,126,0.4)]'
                    : 'bg-[#0F2444] text-slate-300 hover:text-white hover:bg-[#152D52] border border-slate-700/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid: 3-column desktop, 2-column tablet, 1-column mobile */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0F2444]/40 border border-slate-800">
            <p className="text-base font-semibold text-slate-300">
              No encontramos servicios con la búsqueda "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#e6007e]"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const whatsappUrl = createProductWhatsAppUrl(product.name, product.priceDescription);

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl bg-[#0F2444]/75 backdrop-blur-md border border-slate-700/50 hover:border-[#e6007e]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-4px_rgba(230,0,126,0.25)] flex flex-col overflow-hidden"
                >
                  {/* Top Half: Aspect Ratio 4:3 Product Mockup */}
                  <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Gradient Fallback / Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2444] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Right Urgent / Trust Ribbon */}
                    {product.badge && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-white bg-[#e6007e] shadow-[0_0_10px_rgba(230,0,126,0.6)]">
                        {product.badge}
                      </div>
                    )}

                    {/* Turnaround Badge */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-200 bg-[#071224]/85 backdrop-blur-sm border border-slate-700/60 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#ffb0c9]" />
                      <span>{product.turnaround}</span>
                    </div>
                  </div>

                  {/* Bottom Half: Details & Controls */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Unboxed Metadata: Category & Min Order */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                        <span className="font-medium text-[#ffb0c9]">{product.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.minQuantity}</span>
                      </div>

                      {/* Product Title */}
                      <h3
                        onClick={() => onOpenProductDetail(product)}
                        className="text-base font-bold text-white group-hover:text-[#ffb0c9] transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      {/* Product Short Description */}
                      <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="mt-5 pt-4 border-t border-slate-700/50">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xs text-slate-400">Precio base:</span>
                        <span className="text-base font-extrabold text-white font-mono tabular-nums">
                          {product.priceDescription}
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        {/* Primary Configure Button (4 cols) */}
                        <button
                          onClick={() => onSelectProductForQuote(product)}
                          className="col-span-4 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#e6007e] hover:bg-[#ff1a98] shadow-[0_0_15px_rgba(230,0,126,0.35)] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Configurar y Cotizar</span>
                        </button>

                        {/* Direct WhatsApp Quote Shortcut (1 col) */}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="col-span-1 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#22bf5b] text-white flex items-center justify-center shadow-[0_0_12px_rgba(37,211,102,0.3)] transition-all active:scale-95"
                          title="Cotizar por WhatsApp"
                          aria-label={`Cotizar ${product.name} por WhatsApp`}
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                        </a>
                      </div>

                      <button
                        onClick={() => onOpenProductDetail(product)}
                        className="w-full mt-2 py-1 text-center text-[11px] font-semibold text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Ver ficha técnica y muestras</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
