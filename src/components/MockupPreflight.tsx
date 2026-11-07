import React, { useState } from 'react';
import {
  Upload,
  CheckCircle,
  AlertTriangle,
  Eye,
  Sliders,
  Image as ImageIcon,
  ShieldCheck,
  Maximize2,
  RefreshCw,
} from 'lucide-react';
import { HERO_IMAGE } from '../data/catalog';

interface MockupPreflightProps {
  onSendToCalculator?: (title: string) => void;
}

export const MockupPreflight: React.FC<MockupPreflightProps> = ({ onSendToCalculator }) => {
  const [activeMockupType, setActiveMockupType] = useState<
    'billboard' | 'rollup' | 'tarjetas' | 'caja'
  >('billboard');

  const [showBleedGuides, setShowBleedGuides] = useState<boolean>(true);
  const [colorMode, setColorMode] = useState<'rgb' | 'cmyk'>('cmyk');

  // Sample artwork presets
  const sampleArts = [
    {
      id: 'selva-fest',
      title: 'Festival Selva Central 2026',
      type: 'Gigantografía 6x3m',
      url: HERO_IMAGE,
      dpi: 300,
      hasBleed: true,
      colorScore: 'CMYK FOGRA39 Óptimo',
    },
    {
      id: 'cafe-mazamari',
      title: 'Café Mazamari - Empaque Gourmet',
      type: 'Cajas & Etiquetas',
      url: '/src/assets/images/product_packaging_etiquetas_1794065963924.jpg',
      dpi: 350,
      hasBleed: true,
      colorScore: 'CMYK + Tinta Oro Directa',
    },
    {
      id: 'tarjeta-estudio',
      title: 'Estudio Jurídico Satipo',
      type: 'Tarjetas con Barniz UV',
      url: '/src/assets/images/product_tarjetas_acabado_uv_1794065963050.jpg',
      dpi: 300,
      hasBleed: true,
      colorScore: 'CMYK + Máscara UV Spot',
    },
    {
      id: 'volante-promo',
      title: 'Campaña Volantes Farmacia',
      type: 'Volantes Couché 150g',
      url: '/src/assets/images/product_volantes_folletos_1794065963997.jpg',
      dpi: 240,
      hasBleed: false,
      colorScore: 'CMYK Estándar',
    },
  ];

  const [selectedArt, setSelectedArt] = useState(sampleArts[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomImage(result);
        setSelectedArt({
          id: 'custom',
          title: file.name,
          type: 'Arte Subido por Cliente',
          url: result,
          dpi: 280,
          hasBleed: true,
          colorScore: 'Verificación Automática',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const activeArtworkUrl = customImage || selectedArt.url;

  return (
    <section id="mockup" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ENCABEZADO OPTIMIZADO PARA GEO (Regla del Párrafo Extraíble bajo H2) */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb95f]/10 border border-[#ffb95f]/30 text-[#ffddb8] text-xs font-bold uppercase tracking-wider mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>Pre-Prensa Digital & Visualizador 3D</span>
          </div>
          
          {/* H2 con la primera oración autónoma para LLMs y sistemas RAG */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            El módulo de pre-prensa y mockup 3D de Grafica Arte Digital verifica la resolución DPI, perfiles de color CMYK y márgenes de sangría antes del proceso de impresión industrial.
          </h2>
          
          <p className="text-sm text-slate-300 mt-2">
            Inspección automatizada de archivos gráficos con simulación tridimensional en vallas de carretera, roll-ups retráctiles, tarjetas con reserva UV y empaques troquelados.
          </p>
        </div>

        {/* Mockup Type Switcher Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <button
            onClick={() => setActiveMockupType('billboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMockupType === 'billboard'
                ? 'bg-[#e6007e] text-white shadow-[0_0_15px_rgba(230,0,126,0.4)]'
                : 'bg-[#0F2444] text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            Valla Exterior / Billboard
          </button>
          <button
            onClick={() => setActiveMockupType('rollup')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMockupType === 'rollup'
                ? 'bg-[#e6007e] text-white shadow-[0_0_15px_rgba(230,0,126,0.4)]'
                : 'bg-[#0F2444] text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            Roll-Up Retráctil 85x200cm
          </button>
          <button
            onClick={() => setActiveMockupType('tarjetas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMockupType === 'tarjetas'
                ? 'bg-[#e6007e] text-white shadow-[0_0_15px_rgba(230,0,126,0.4)]'
                : 'bg-[#0F2444] text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            Tarjetas Mate con Brillo UV
          </button>
          <button
            onClick={() => setActiveMockupType('caja')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMockupType === 'caja'
                ? 'bg-[#e6007e] text-white shadow-[0_0_15px_rgba(230,0,126,0.4)]'
                : 'bg-[#0F2444] text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            Empaque & Cajas
          </button>
        </div>

        {/* Main Workspace Grid: Mockup Stage (8 cols) + Pre-Flight Inspector (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Stage: 3D Mockup Visual Display (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl bg-[#0F2444]/80 backdrop-blur-md border border-slate-700/70 p-6 sm:p-8 min-h-[420px] flex flex-col items-center justify-center overflow-hidden shadow-2xl">
              {/* Scene Backdrop Lighting */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#081325]/90 via-[#0A1931]/60 to-[#071224] pointer-events-none" />

              {/* Billboard Simulation */}
              {activeMockupType === 'billboard' && (
                <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                  {/* Spotlight Lamps */}
                  <div className="flex justify-between w-4/5 mb-2 px-6">
                    <div className="w-5 h-3 bg-slate-400 rounded-t shadow-[0_5px_15px_rgba(255,255,255,0.7)]" />
                    <div className="w-5 h-3 bg-slate-400 rounded-t shadow-[0_5px_15px_rgba(255,255,255,0.7)]" />
                    <div className="w-5 h-3 bg-slate-400 rounded-t shadow-[0_5px_15px_rgba(255,255,255,0.7)]" />
                  </div>

                  {/* Metal Frame */}
                  <div className="w-full p-3.5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 rounded-lg shadow-2xl border border-slate-500/50">
                    <div className="relative aspect-[16/8] w-full rounded overflow-hidden bg-black shadow-inner">
                      <img
                        src={activeArtworkUrl}
                        alt="Previsualización de valla publicitaria"
                        className={`w-full h-full object-cover ${
                          colorMode === 'cmyk' ? 'saturate-90 contrast-105' : 'saturate-115'
                        }`}
                        referrerPolicy="no-referrer"
                      />

                      {/* Bleed Guide Overlay */}
                      {showBleedGuides && (
                        <div className="absolute inset-2 sm:inset-3 border border-dashed border-[#e6007e]/80 pointer-events-none flex items-start justify-end p-1">
                          <span className="text-[9px] font-mono font-bold bg-[#e6007e] text-white px-1 rounded">
                            Línea de Seguridad 30mm
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Heavy Steel Support Column */}
                  <div className="w-12 h-14 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 border-x border-slate-600" />
                  <div className="w-28 h-3 bg-slate-700 rounded-t" />
                </div>
              )}

              {/* Roll-up Display Simulation */}
              {activeMockupType === 'rollup' && (
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-48 sm:w-56 p-2 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t-sm shadow">
                    <div className="w-full h-1 bg-slate-300" />
                  </div>
                  <div className="relative w-44 sm:w-52 aspect-[1/2.2] bg-black shadow-2xl border-x-2 border-slate-400 overflow-hidden">
                    <img
                      src={activeArtworkUrl}
                      alt="Previsualización de roll-up"
                      className={`w-full h-full object-cover ${
                        colorMode === 'cmyk' ? 'saturate-90' : 'saturate-115'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {showBleedGuides && (
                      <div className="absolute inset-2 border border-dashed border-[#25d366]/80 pointer-events-none p-1">
                        <span className="text-[8px] font-mono bg-[#25d366] text-black px-1 rounded font-bold">
                          Zona Visible
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Aluminum Base Stand */}
                  <div className="w-56 sm:w-64 h-7 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 rounded-b-md shadow-xl flex items-center justify-around px-4">
                    <div className="w-8 h-1.5 bg-slate-700 rounded-full" />
                    <div className="w-8 h-1.5 bg-slate-700 rounded-full" />
                  </div>
                </div>
              )}

              {/* Tarjetas UV Simulation */}
              {activeMockupType === 'tarjetas' && (
                <div className="relative z-10 w-full max-w-md flex flex-col items-center py-6">
                  <div className="relative w-72 sm:w-80 aspect-[1.75/1] rounded-xl bg-[#071224] border-2 border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <img
                      src={activeArtworkUrl}
                      alt="Previsualización de tarjeta"
                      className={`w-full h-full object-cover ${
                        colorMode === 'cmyk' ? 'saturate-95' : 'saturate-110'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {/* Simulated UV Gloss Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
                    {showBleedGuides && (
                      <div className="absolute inset-2 border border-dashed border-[#ffb95f] pointer-events-none p-1">
                        <span className="text-[8px] font-mono bg-[#f59e0b] text-black px-1 rounded font-bold">
                          Corte 9x5.5cm
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-4 text-center">
                    Simulación con plastificado mate soft-touch y reserva UV sectorizada
                  </div>
                </div>
              )}

              {/* Packaging Simulation */}
              {activeMockupType === 'caja' && (
                <div className="relative z-10 w-full max-w-md flex flex-col items-center py-4">
                  <div className="relative w-64 sm:w-72 aspect-[1.3/1] rounded-xl bg-[#0F2444] border-2 border-slate-600 shadow-2xl overflow-hidden p-3 bg-gradient-to-br from-slate-900 to-black">
                    <div className="w-full h-full rounded-lg overflow-hidden border border-[#e6007e]/50 relative">
                      <img
                        src={activeArtworkUrl}
                        alt="Previsualización de empaque"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#e6007e] text-white text-[9px] font-bold">
                        Troquelado Láser
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 mt-4 text-center">
                    Caja personalizada con cartón sulfatado de 350g
                  </div>
                </div>
              )}

              {/* Live Overlay Controls inside the stage */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 px-3 py-2 rounded-xl bg-[#071224]/80 backdrop-blur-md border border-slate-700/60">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowBleedGuides(!showBleedGuides)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#ffb0c9]" />
                    <span>{showBleedGuides ? 'Ocultar Guías' : 'Ver Guías de Corte'}</span>
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    onClick={() => setColorMode(colorMode === 'cmyk' ? 'rgb' : 'cmyk')}
                    className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#25d366]" />
                    <span>Modo: <strong className="text-white uppercase font-mono">{colorMode}</strong></span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                  Resolución estimada: {selectedArt.dpi} DPI
                </div>
              </div>
            </div>

            {/* Artwork Presets Selector + Upload Button */}
            <div className="p-4 rounded-xl bg-[#0F2444]/50 border border-slate-700/50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-bold text-slate-400 shrink-0">Artes de Prueba:</span>
                {sampleArts.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      setSelectedArt(art);
                      setCustomImage(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedArt.id === art.id && !customImage
                        ? 'bg-[#e6007e] text-white shadow-[0_0_10px_rgba(230,0,126,0.3)]'
                        : 'bg-[#071224] text-slate-300 hover:text-white border border-slate-700'
                    }`}
                  >
                    {art.title}
                  </button>
                ))}
              </div>

              {/* Upload Own Artwork Button */}
              <label className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#152D52] hover:bg-[#1f3e70] border border-slate-600 flex items-center gap-1.5 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#ffb0c9]" />
                <span>Subir mi archivo (JPG/PNG)</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Right Inspector: Pre-Flight Diagnostics (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-[#0F2444]/70 backdrop-blur-md border border-slate-700/60 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/50">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#25d366]" />
                  <span>Diagnóstico Pre-Prensa</span>
                </h3>
                <span className="text-[10px] font-mono text-[#25d366] bg-[#25d366]/10 px-2 py-0.5 rounded">
                  PASS OK
                </span>
              </div>

              {/* Item 1: DPI Check */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Resolución de Impresión</span>
                  <span className="font-mono font-bold text-[#25d366]">{selectedArt.dpi} DPI</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#25d366] h-full rounded-full shadow-[0_0_8px_#25d366]"
                    style={{ width: `${Math.min(100, (selectedArt.dpi / 300) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  {selectedArt.dpi >= 300
                    ? 'Óptima para gigantografía y papelería sin pixelado.'
                    : 'Aceptable para visualización a más de 1.5 metros.'}
                </p>
              </div>

              {/* Item 2: Color Space */}
              <div className="p-3 rounded-xl bg-[#071224] border border-slate-700/60 space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-300">Espacio de Color:</span>
                  <span className="text-[#ffb0c9] font-mono">{selectedArt.colorScore}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Perfil de color adaptado al cabezal de impresión solvente Selva Central.
                </p>
              </div>

              {/* Item 3: Bleed & Safety Margin */}
              <div className="p-3 rounded-xl bg-[#071224] border border-slate-700/60 space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-300">Margen de Sangría:</span>
                  <span className="text-[#f59e0b] font-mono">+3mm Perimetral</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Textos y logotipos protegidos dentro de la zona de seguridad para evitar cortes.
                </p>
              </div>

              {/* CTA: Mandar a Cotizar este arte */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onSendToCalculator) {
                      onSendToCalculator(selectedArt.title);
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#e6007e] hover:bg-[#ff1a98] shadow-[0_0_15px_rgba(230,0,126,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Cotizar Producción de este Arte</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
