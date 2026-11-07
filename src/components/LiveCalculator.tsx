import React, { useState, useEffect } from 'react';
import {
  Calculator,
  MessageCircle,
  Copy,
  Check,
  Zap,
  Sparkles,
  Info,
  MapPin,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import { CATALOG_PRODUCTS } from '../data/catalog';
import { PrintProduct } from '../types';
import {
  CalculationParams,
  CalculationResult,
  calculatePrintQuote,
  formatPEN,
} from '../utils/calculator';
import { createCustomQuoteWhatsAppUrl } from '../utils/whatsapp';

interface LiveCalculatorProps {
  initialProduct?: PrintProduct | null;
  onOpenMockupWithConfig?: (width: number, height: number, title: string) => void;
}

export const LiveCalculator: React.FC<LiveCalculatorProps> = ({
  initialProduct,
  onOpenMockupWithConfig,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProduct?.id || 'gigantografia-13oz'
  );

  const currentProduct =
    CATALOG_PRODUCTS.find((p) => p.id === selectedProductId) || CATALOG_PRODUCTS[0];

  const [width, setWidth] = useState<number>(3.0);
  const [height, setHeight] = useState<number>(2.0);
  const [unit, setUnit] = useState<'m' | 'cm'>('m');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([
    'ojalillos',
    'bastilla',
  ]);
  const [needsGraphicDesign, setNeedsGraphicDesign] = useState<boolean>(false);
  const [urgency, setUrgency] = useState<'normal' | 'express'>('normal');
  const [city, setCity] = useState<string>('Mazamari (Taller Central)');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Update parameters when initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      setSelectedProductId(initialProduct.id);
      if (initialProduct.category === 'papeleria') {
        setWidth(9.0);
        setHeight(5.5);
        setUnit('cm');
        setQuantity(100);
        setSelectedFinishes(['reserva-uv']);
      } else {
        setWidth(2.5);
        setHeight(1.5);
        setUnit('m');
        setQuantity(1);
        setSelectedFinishes(['ojalillos', 'bastilla']);
      }
    }
  }, [initialProduct]);

  // When changing product category, adjust reasonable defaults
  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    const prod = CATALOG_PRODUCTS.find((p) => p.id === id);
    if (prod?.category === 'papeleria') {
      setWidth(9.0);
      setHeight(5.5);
      setUnit('cm');
      setQuantity(100);
      setSelectedFinishes(['reserva-uv']);
    } else if (prod?.id === 'rollup-aluminio') {
      setWidth(0.85);
      setHeight(2.0);
      setUnit('m');
      setQuantity(1);
      setSelectedFinishes([]);
    } else {
      setWidth(3.0);
      setHeight(2.0);
      setUnit('m');
      setQuantity(1);
      setSelectedFinishes(['ojalillos', 'bastilla']);
    }
  };

  const calculationParams: CalculationParams = {
    productId: currentProduct.id,
    basePrice: currentProduct.basePrice,
    unitType: currentProduct.unit,
    width,
    height,
    unit,
    quantity,
    selectedFinishes,
    needsGraphicDesign,
    urgency,
  };

  const result: CalculationResult = calculatePrintQuote(calculationParams);

  const toggleFinish = (finishKey: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(finishKey)
        ? prev.filter((k) => k !== finishKey)
        : [...prev, finishKey]
    );
  };

  const whatsappUrl = createCustomQuoteWhatsAppUrl(
    currentProduct.name,
    calculationParams,
    result,
    city,
    notes
  );

  const handleCopySummary = () => {
    const text = `COTIZACIÓN: ${currentProduct.name}
Medidas: ${width} x ${height} ${unit} (${result.areaM2} m²)
Cantidad: ${quantity} unids
Acabados: ${selectedFinishes.join(', ') || 'Básico'}
Diseño: ${needsGraphicDesign ? 'Con diseño' : 'Listo'}
Modalidad: ${urgency === 'express' ? 'Express 4h' : 'Regular'}
Destino: ${city}
TOTAL ESTIMADO: ${formatPEN(result.total)}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Dynamic Aspect Ratio for SVG Canvas
  const widthM = unit === 'cm' ? width / 100 : width;
  const heightM = unit === 'cm' ? height / 100 : height;
  const aspectRatio = Math.max(0.3, Math.min(3.5, widthM / (heightM || 1)));

  return (
    <section id="cotizador" className="py-14 sm:py-20 relative bg-[#071224]/80 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ENCABEZADO OPTIMIZADO PARA GEO (Regla del Párrafo Extraíble bajo H2) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6007e]/10 border border-[#e6007e]/30 text-[#ffb0c9] text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Cotizador en Tiempo Real</span>
          </div>
          
          {/* H2 con la primera oración autónoma para LLMs y sistemas RAG */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            El cotizador digital de Grafica Arte Digital permite calcular en tiempo real presupuestos exactos para gigantografías, lonas 13oz y papelería comercial con descuentos por volumen y modalidad express en la Selva Central.
          </h2>
          
          <p className="text-sm text-slate-300 mt-2">
            Parámetros técnicos de manufactura con cálculo automático de área (m²), acabados perimetrales con ojalillos y generación de orden directa por WhatsApp.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-[#0F2444]/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-700/60 shadow-xl">
            {/* Step 1: Select Service */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Selecciona el Tipo de Trabajo
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATALOG_PRODUCTS.slice(0, 6).map((prod) => {
                  const isSelected = selectedProductId === prod.id;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleProductSelect(prod.id)}
                      className={`p-2.5 rounded-xl text-left transition-all border text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-[#e6007e]/20 border-[#e6007e] text-white font-bold shadow-[0_0_12px_rgba(230,0,126,0.3)]'
                          : 'bg-[#071224] border-slate-700/60 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="truncate font-semibold">{prod.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{prod.priceDescription}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dimensions & Unit */}
            <div className="p-4 rounded-xl bg-[#071224]/80 border border-slate-700/70">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Dimensiones del Trabajo
                </label>
                <div className="flex items-center gap-1 bg-[#0F2444] p-1 rounded-lg border border-slate-700/60 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setUnit('m')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      unit === 'm' ? 'bg-[#e6007e] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Metros (m)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      unit === 'cm' ? 'bg-[#e6007e] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Centímetros (cm)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Ancho ({unit})</span>
                    <span className="font-mono font-bold text-[#ffb0c9]">{width} {unit}</span>
                  </div>
                  <input
                    type="number"
                    step={unit === 'm' ? '0.1' : '1'}
                    min={unit === 'm' ? '0.3' : '5'}
                    max={unit === 'm' ? '50' : '2000'}
                    value={width}
                    onChange={(e) => setWidth(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F2444] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-[#e6007e] focus:ring-2 focus:ring-[#e6007e]/20"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Alto ({unit})</span>
                    <span className="font-mono font-bold text-[#ffb0c9]">{height} {unit}</span>
                  </div>
                  <input
                    type="number"
                    step={unit === 'm' ? '0.1' : '1'}
                    min={unit === 'm' ? '0.3' : '5'}
                    max={unit === 'm' ? '50' : '2000'}
                    value={height}
                    onChange={(e) => setHeight(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F2444] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-[#e6007e] focus:ring-2 focus:ring-[#e6007e]/20"
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>Área calculada por pieza:</span>
                <span className="font-bold text-white font-mono">{result.areaM2} m²</span>
              </div>
            </div>

            {/* Step 3: Finishes & Add-ons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                3. Acabados y Refuerzos
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => toggleFinish('ojalillos')}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    selectedFinishes.includes('ojalillos')
                      ? 'bg-[#0F2444] border-[#e6007e] text-white shadow-[0_0_10px_rgba(230,0,126,0.2)]'
                      : 'bg-[#071224] border-slate-700/60 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">Ojalillos Metálicos Reforzados</div>
                    <div className="text-[11px] text-slate-400">Cada ~50cm ({result.grommetCount} ojalillos)</div>
                  </div>
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      selectedFinishes.includes('ojalillos') ? 'text-[#e6007e]' : 'text-slate-600'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => toggleFinish('bastilla')}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    selectedFinishes.includes('bastilla')
                      ? 'bg-[#0F2444] border-[#e6007e] text-white shadow-[0_0_10px_rgba(230,0,126,0.2)]'
                      : 'bg-[#071224] border-slate-700/60 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">Bastilla Termosellada</div>
                    <div className="text-[11px] text-slate-400">Doblez perimetral antidesgarro</div>
                  </div>
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      selectedFinishes.includes('bastilla') ? 'text-[#e6007e]' : 'text-slate-600'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => toggleFinish('laminado')}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    selectedFinishes.includes('laminado')
                      ? 'bg-[#0F2444] border-[#e6007e] text-white shadow-[0_0_10px_rgba(230,0,126,0.2)]'
                      : 'bg-[#071224] border-slate-700/60 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">Laminado Protector UV</div>
                    <div className="text-[11px] text-slate-400">Brillante o mate (+S/ 8/m²)</div>
                  </div>
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      selectedFinishes.includes('laminado') ? 'text-[#e6007e]' : 'text-slate-600'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => toggleFinish('reserva-uv')}
                  className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    selectedFinishes.includes('reserva-uv')
                      ? 'bg-[#0F2444] border-[#e6007e] text-white shadow-[0_0_10px_rgba(230,0,126,0.2)]'
                      : 'bg-[#071224] border-slate-700/60 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">Reserva / Barniz UV Selectivo</div>
                    <div className="text-[11px] text-slate-400">Brillo focalizado en logotipo</div>
                  </div>
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      selectedFinishes.includes('reserva-uv') ? 'text-[#e6007e]' : 'text-slate-600'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Step 4: Quantity & Graphic Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  4. Cantidad de Unidades
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-xl bg-[#071224] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-[#e6007e]"
                  />
                  {result.discountRate > 0 && (
                    <div className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#25d366]/20 border border-[#25d366]/40 text-[#25d366] text-xs font-bold">
                      -{Math.round(result.discountRate * 100)}% Dto.
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Asistencia de Diseño
                </label>
                <button
                  type="button"
                  onClick={() => setNeedsGraphicDesign(!needsGraphicDesign)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    needsGraphicDesign
                      ? 'bg-[#e6007e]/20 border-[#e6007e] text-white'
                      : 'bg-[#071224] border-slate-700 text-slate-400'
                  }`}
                >
                  <span>{needsGraphicDesign ? 'Requiero diseño (+S/ 20)' : 'Tengo mi archivo listo'}</span>
                  <Sparkles className={`w-4 h-4 ${needsGraphicDesign ? 'text-[#ffb0c9]' : 'text-slate-600'}`} />
                </button>
              </div>
            </div>

            {/* Step 5: Urgency & Delivery City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Modalidad de Producción
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('normal')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                      urgency === 'normal'
                        ? 'bg-[#0F2444] border-slate-400 text-white'
                        : 'bg-[#071224] border-slate-800 text-slate-400'
                    }`}
                  >
                    Regular (24-48h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('express')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 cursor-pointer ${
                      urgency === 'express'
                        ? 'bg-[#e6007e] border-[#e6007e] text-white shadow-[0_0_12px_rgba(230,0,126,0.4)]'
                        : 'bg-[#071224] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Express 4h</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Destino / Retiro
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#071224] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#e6007e]"
                >
                  <option value="Mazamari (Taller Central - Jr. Los Héroes)">Mazamari (Taller Central)</option>
                  <option value="Satipo (Despacho diario cada 2h)">Satipo (Combis Turismo Selva)</option>
                  <option value="San Martín de Pangoa (Envío diario)">San Martín de Pangoa</option>
                  <option value="Pichanaki / La Merced (Agencia Shalom)">Pichanaki / Chanchamayo (Shalom)</option>
                  <option value="Otra localidad de Selva Central">Otra localidad de Selva Central</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Aspect Canvas & Live Breakdown Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Canvas Proportional Preview */}
            <div className="p-5 rounded-2xl bg-[#0F2444]/80 backdrop-blur-md border border-slate-700/60 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Previsualización Proporcional
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {width} x {height} {unit}
                </span>
              </div>

              {/* Dynamic Aspect Ratio Preview Box */}
              <div className="h-44 sm:h-52 w-full rounded-xl bg-[#071224] border border-dashed border-slate-700 flex items-center justify-center p-4 overflow-hidden relative">
                <div
                  style={{
                    aspectRatio: `${aspectRatio}`,
                    maxWidth: '92%',
                    maxHeight: '90%',
                  }}
                  className="w-full h-full bg-gradient-to-br from-[#152D52] to-[#0A1931] border-2 border-[#e6007e]/60 rounded-lg flex flex-col items-center justify-center relative shadow-lg shadow-black/50 transition-all duration-300"
                >
                  {/* Grommets simulation if selected */}
                  {selectedFinishes.includes('ojalillos') && (
                    <>
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-[#f59e0b] border border-black shadow" />
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#f59e0b] border border-black shadow" />
                      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 rounded-full bg-[#f59e0b] border border-black shadow" />
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#f59e0b] border border-black shadow" />
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#f59e0b] border border-black" />
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#f59e0b] border border-black" />
                    </>
                  )}

                  <div className="text-center px-2">
                    <div className="text-[11px] font-bold text-white truncate max-w-[150px]">
                      {currentProduct.name}
                    </div>
                    <div className="text-[10px] text-[#ffb0c9] font-mono">
                      {result.areaM2} m² c/u
                    </div>
                  </div>
                </div>
              </div>

              {onOpenMockupWithConfig && (
                <button
                  type="button"
                  onClick={() => onOpenMockupWithConfig(widthM, heightM, currentProduct.name)}
                  className="w-full mt-3 py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-[#152D52] hover:bg-[#1c3a69] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Probar en Mockup 3D (Valla / Roll-up)</span>
                </button>
              )}
            </div>

            {/* Live Pricing Breakdown Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F2444] to-[#0A1931] border-2 border-[#e6007e]/40 shadow-2xl shadow-black/80">
              <div className="text-xs font-bold uppercase tracking-widest text-[#ffb0c9] mb-4 flex items-center justify-between">
                <span>Resumen de Cotización</span>
                <span className="text-[10px] text-[#25d366] bg-[#25d366]/10 px-2 py-0.5 rounded">
                  Validez: 7 días
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pb-4 border-b border-slate-700/60">
                <div className="flex justify-between">
                  <span>Precio base ({quantity} unids):</span>
                  <span className="font-mono text-white">{formatPEN(result.subtotal)}</span>
                </div>

                {result.discountAmount > 0 && (
                  <div className="flex justify-between text-[#25d366]">
                    <span>Descuento por volumen ({Math.round(result.discountRate * 100)}%):</span>
                    <span className="font-mono font-bold">-{formatPEN(result.discountAmount)}</span>
                  </div>
                )}

                {result.urgencySurcharge > 0 && (
                  <div className="flex justify-between text-[#ffb0c9]">
                    <span>Recargo Servicio Express (4h):</span>
                    <span className="font-mono">+{formatPEN(result.urgencySurcharge)}</span>
                  </div>
                )}

                {result.designCost > 0 && (
                  <div className="flex justify-between text-[#f59e0b]">
                    <span>Asistencia de Diseño Gráfico:</span>
                    <span className="font-mono">+{formatPEN(result.designCost)}</span>
                  </div>
                )}
              </div>

              {/* Total Display */}
              <div className="py-4 flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">TOTAL ESTIMADO</div>
                  <div className="text-[10px] text-slate-400">Incluye IGV y emisión de factura</div>
                </div>
                <div className="text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                  {formatPEN(result.total)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#25d366] hover:bg-[#22bf5b] shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 transition-all transform active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enviar Pedido a WhatsApp con 1 Clic</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#071224] hover:bg-slate-800 border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#25d366]" />
                      <span className="text-[#25d366]">¡Resumen copiado al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Resumen para Proforma</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400 text-center justify-center">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Coordinación directa con operador de turno en Mazamari</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
