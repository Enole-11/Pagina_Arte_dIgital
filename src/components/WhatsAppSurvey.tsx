
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type InitialCommercialStatus = 'Nuevo' | 'Cotizó';

interface WhatsAppSurveyContextType {
  openWhatsAppSurvey: (
    whatsappUrl: string,
    productInterest?: string,
    commercialStatus?: InitialCommercialStatus
  ) => void;
}

interface WhatsAppSurveyProviderProps {
  children: React.ReactNode;
}

interface OriginOption {
  label: string;
  classification: string;
}

const WhatsAppSurveyContext =
  createContext<WhatsAppSurveyContextType | undefined>(undefined);

const CLIENT_TYPES = [
  'Persona',
  'Negocio local',
  'Colegio / institución',
  'Evento',
];

const ORIGIN_OPTIONS: OriginOption[] = [
  {
    label: 'Encontré el negocio en los resultados normales de Google (no era un anuncio)',
    classification: 'Google orgánico (SEO)',
  },
  {
    label: 'Vi un anuncio patrocinado al buscar en Google',
    classification: 'Google Ads - Búsqueda',
  },
  {
    label: 'Vi un anuncio o publicidad de Gráfica Arte Digital en Facebook',
    classification: 'Anuncio Facebook - Banners',
  },
  {
    label: 'Encontré su perfil o publicaciones en Instagram',
    classification: 'Redes orgánicas (Instagram)',
  },
  {
    label: 'Encontré su perfil o videos en TikTok',
    classification: 'Redes orgánicas (TikTok)',
  },
  {
    label: 'Alguien me recomendó el negocio',
    classification: 'Recomendación',
  },
  {
    label: 'Ya conocía Gráfica Arte Digital',
    classification: 'Cliente conocido',
  },
  {
    label: 'Otro medio',
    classification: 'Otro origen',
  },
];

export const WhatsAppSurveyProvider: React.FC<
  WhatsAppSurveyProviderProps
> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [clientType, setClientType] = useState('');
  const [discoverySource, setDiscoverySource] = useState('');

  const [pendingWhatsAppUrl, setPendingWhatsAppUrl] = useState('');
  const [productInterest, setProductInterest] = useState('Consulta general');
  const [commercialStatus, setCommercialStatus] =
    useState<InitialCommercialStatus>('Nuevo');

  const [error, setError] = useState('');

  const openWhatsAppSurvey = useCallback(
    (
      whatsappUrl: string,
      product = 'Consulta general',
      status: InitialCommercialStatus = 'Nuevo'
    ) => {
      setPendingWhatsAppUrl(whatsappUrl);
      setProductInterest(product);
      setCommercialStatus(status);
      setError('');
      setIsOpen(true);
    },
    []
  );

  const closeSurvey = useCallback(() => {
    setIsOpen(false);
    setError('');
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setError('');
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !clientType || !discoverySource) {
      setError('Completa todos los campos para continuar.');
      return;
    }

    try {
      const whatsappUrl = new URL(pendingWhatsAppUrl);

      const originalMessage =
        whatsappUrl.searchParams.get('text') ||
        'Hola, deseo comunicarme con Gráfica Arte Digital.';

      const selectedOrigin = ORIGIN_OPTIONS.find(
        (option) => option.classification === discoverySource
      );

      const surveyMessage = [
        '*REGISTRO DE INTERESADO*',
        '',
        `Nombre completo: ${name.trim()}`,
        `Tipo de cliente: ${clientType}`,
        `Origen elegido: ${selectedOrigin?.label || discoverySource}`,
        `Clasificación de origen: ${discoverySource}`,
        `Producto de interés: ${productInterest}`,
        `Estado comercial: ${commercialStatus}`,
        '',
        '*CONSULTA DEL CLIENTE*',
        originalMessage,
      ].join('\n');

      whatsappUrl.searchParams.set('text', surveyMessage);

      // Se abre WhatsApp con el mensaje preparado.
      // El cliente debe pulsar enviar manualmente.
      window.open(
        whatsappUrl.toString(),
        '_blank',
        'noopener,noreferrer'
      );

      setIsOpen(false);
      setName('');
      setClientType('');
      setDiscoverySource('');
      setError('');
    } catch {
      setError(
        'No se pudo preparar el enlace de WhatsApp. Inténtalo nuevamente.'
      );
    }
  };

  return (
    <WhatsAppSurveyContext.Provider value={{ openWhatsAppSurvey }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSurvey();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-survey-title"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1b30] p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeSurvey}
              aria-label="Cerrar encuesta"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              ×
            </button>

            <div className="mb-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#10b981]/10 text-2xl">
                👋
              </div>

              <h2
                id="whatsapp-survey-title"
                className="pr-8 text-2xl font-bold text-white"
              >
                Antes de continuar...
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Queremos conocerte un poco mejor para brindarte una atención
                más adecuada. Completa estos datos y continuaremos por
                WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="survey-name"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Nombre completo
                  <span className="ml-1 text-[#e6007e]">*</span>
                </label>

                <input
                  id="survey-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Escribe tus nombres y apellidos"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="w-full rounded-xl border border-white/10 bg-[#081325] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#e6007e]"
                />
              </div>

              <div>
                <label
                  htmlFor="survey-client-type"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  ¿Qué tipo de cliente eres?
                  <span className="ml-1 text-[#e6007e]">*</span>
                </label>

                <select
                  id="survey-client-type"
                  value={clientType}
                  onChange={(event) => setClientType(event.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#081325] px-4 py-3 text-sm text-white outline-none transition focus:border-[#e6007e]"
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>

                  {CLIENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="survey-origin"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  ¿Cómo conociste Gráfica Arte Digital?
                  <span className="ml-1 text-[#e6007e]">*</span>
                </label>

                <select
                  id="survey-origin"
                  value={discoverySource}
                  onChange={(event) =>
                    setDiscoverySource(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#081325] px-4 py-3 text-sm leading-relaxed text-white outline-none transition focus:border-[#e6007e]"
                >
                  <option value="" disabled>
                    Selecciona cómo nos encontraste
                  </option>

                  {ORIGIN_OPTIONS.map((option) => (
                    <option
                      key={option.classification}
                      value={option.classification}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                >
                  {error}
                </p>
              )}

              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <p className="text-xs leading-relaxed text-slate-400">
                  Al continuar, se abrirá WhatsApp con tus datos y tu
                  consulta preparados. Tú decides cuándo enviar el mensaje.
                </p>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10b981] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#10b981]/10 transition hover:bg-[#059669] active:scale-[0.98]"
              >
                <span>Continuar a WhatsApp</span>
                <span aria-hidden="true">➜</span>
              </button>

              <button
                type="button"
                onClick={closeSurvey}
                className="w-full py-2 text-sm font-medium text-slate-500 transition hover:text-white"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </WhatsAppSurveyContext.Provider>
  );
};

export const useWhatsAppSurvey = (): WhatsAppSurveyContextType => {
  const context = useContext(WhatsAppSurveyContext);

  if (!context) {
    throw new Error(
      'useWhatsAppSurvey debe utilizarse dentro de WhatsAppSurveyProvider.'
    );
  }

  return context;
};