import React from 'react';
import { 
  Palette, 
  Sparkles, 
  Check, 
  Layers, 
  Eye, 
  Download, 
  Compass, 
  Flame, 
  Droplet, 
  Radio, 
  Mountain, 
  Sun 
} from 'lucide-react';

import { useAppData } from '../../../context/AppDataContext';

export interface LogoDetail {
  id: string;
  category: 'comunicacion' | 'territorio_belleza' | 'clasica';
  categoryLabel: string;
  num: number;
  title: string;
  elements: string;
  symbolism: string;
  imageSrc: string;
}

export const NEW_LOGOS_COLLECTION: LogoDetail[] = [
  // --- GRUPO 1: 10 CONCEPTOS DE COMUNICACIÓN POPULAR Y DEFENSA TERRITORIAL ---
  {
    id: 'v2_1',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 1,
    title: 'Torre de Transmisión & Roble Hualo',
    elements: 'Antena de transmisión comunitaria emergiendo junto a una hoja de roble nativo andino.',
    symbolism: 'Las ondas de radio comunitaria que enraízan con la fuerza del bosque nativo del Maule Sur.',
    imageSrc: '/images/logo_v2_1.jpg'
  },
  {
    id: 'v2_2',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 2,
    title: 'Cántaro de Greda & Ondas de Agua Acústicas',
    elements: 'Tinaja tradicional de alfarería campesina generando círculos concéntricos de audio y agua.',
    symbolism: 'La vasija que resguarda el agua y emite la memoria viva de nuestras loceras rurales.',
    imageSrc: '/images/logo_v2_2.jpg'
  },
  {
    id: 'v2_3',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 3,
    title: 'Río Achibueno Sonoro & Frecuencias',
    elements: 'Curvas de agua fluvial verde y dorada que se transforman directamente en ondas de frecuencia modulada.',
    symbolism: 'El cauce libre de las cuencas del Achibueno y Maule convertido en canal sonoro para las comunidades.',
    imageSrc: '/images/logo_v2_3.jpg'
  },
  {
    id: 'v2_4',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 4,
    title: 'Micrófono Popular & Gota de Riego con Brote (Recomendado)',
    elements: 'Micrófono de radiodifusión clásica entrelazado con una gota cristalina y un brote agrícola.',
    symbolism: 'Periodismo de utilidad cotidiana: la voz que defiende las APR y hace germinar la soberanía alimentaria.',
    imageSrc: '/images/logo_v2_4.jpg'
  },
  {
    id: 'v2_5',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 5,
    title: 'Cumbres Andinas & Frecuencia Terracota',
    elements: 'Silueta de la cordillera abrazada por arcos concéntricos en tonos arcilla y verde bosque.',
    symbolism: 'La señal que traspasa las quebradas y une a las familias arrieras de la alta cordillera.',
    imageSrc: '/images/logo_v2_5.jpg'
  },
  {
    id: 'v2_6',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 6,
    title: 'Cumbres Nevadas & Arco Solar Dorado',
    elements: 'Crestas montañosas bajo una cúpula de frecuencias y luz solar de precordillera.',
    symbolism: 'El amanecer sobre el cajón cordillerano alumbrando la información comunitaria.',
    imageSrc: '/images/logo_v2_6.jpg'
  },
  {
    id: 'v2_7',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 7,
    title: 'Cesto Campesino & Ondas de Soberanía',
    elements: 'Canasto rural de mimbre o mimbre trenzado emitiendo señales expansivas.',
    symbolism: 'La recolección de historias y trueques campesinos transmitidos a toda la provincia.',
    imageSrc: '/images/logo_v2_7.jpg'
  },
  {
    id: 'v2_8',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 8,
    title: 'Trenzado de Rari & Círculo Radial',
    elements: 'Estructura circular de fibra tradicional con ondas concéntricas de sonido.',
    symbolism: 'El arte patrimonial de las artesanas en Crin de Rari sincronizado con la radio popular.',
    imageSrc: '/images/logo_v2_8.jpg'
  },
  {
    id: 'v2_9',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 9,
    title: 'Manos Protectoras & Señal de Agua Pura',
    elements: 'Par de manos campesinas que sostienen una gota viva rodeada de ondas de radio.',
    symbolism: 'Cuidado mutuo, protección de las napas subterráneas y solidaridad vecinal ante emergencias.',
    imageSrc: '/images/logo_v2_9.jpg'
  },
  {
    id: 'v2_10',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 10,
    title: 'Receptor Radial Campesino & Brote Verde',
    elements: 'Aparato de radio de madera con dial analógico coronado por un brote y silueta de montaña.',
    symbolism: 'La fiel radio a pilas que acompaña la ordeña, la cosecha y las mañanas frías del Maule Sur.',
    imageSrc: '/images/logo_v2_10.jpg'
  },
  {
    id: 'v2_11',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 11,
    title: 'Mandalas de Agua & Espigas de Trigo',
    elements: 'Gotas de agua y espigas de trigo organizadas en red de cuatro cuadrantes cardinales.',
    symbolism: 'La comunión entre el regadío y las siembras de trigo y legumbres tradicionales.',
    imageSrc: '/images/logo_v2_11.jpg'
  },
  {
    id: 'v2_12',
    category: 'comunicacion',
    categoryLabel: 'Concepto Territorial & Radio',
    num: 12,
    title: 'Sol Naciente & Valles de la Cuenca',
    elements: 'Sol resplandeciente emergiendo tras los riscos andinos irradiando hacia las tierras bajas.',
    symbolism: 'La esperanza campesina y la claridad informativa al servicio del bien común.',
    imageSrc: '/images/logo_v2_12.jpg'
  },

  // --- GRUPO 2: 10 EMBLEMAS DE BELLEZA NATURAL, FLORA Y FAUNA ENDÉMICA ---
  {
    id: 'v2_13',
    category: 'territorio_belleza',
    categoryLabel: 'Belleza Natural & Especies del Maule',
    num: 13,
    title: 'Loro Tricahue en Vuelo Libre',
    elements: 'Silueta vibrante del loro Tricahue (Cyanoliseus patagonus) extendiendo sus alas con plumaje turquesa y oliva.',
    symbolism: 'Símbolo emblemático de las laderas y barrancos del Maule Sur; voz estridente y gregaria del territorio.',
    imageSrc: '/images/logo_v2_13.jpg'
  },
  {
    id: 'v2_14',
    category: 'territorio_belleza',
    categoryLabel: 'Belleza Natural & Especies del Maule',
    num: 14,
    title: 'Cóndor Andino sobre las Altas Cumbres',
    elements: 'Cóndor chileno sobrevolando un cerro nevado enmarcado en un escudo circular verde laurel.',
    symbolism: 'Guardián milenario de las altas cumbres del Cajón del Achibueno y el Melado.',
    imageSrc: '/images/logo_v2_14.jpg'
  },
  {
    id: 'v2_15',
    category: 'territorio_belleza',
    categoryLabel: 'Belleza Natural & Especies del Maule',
    num: 15,
    title: 'Ramillete de Copihues Silvestres',
    elements: 'Campanas rojas del copihue nativo colgando de una guía de bosque húmedo.',
    symbolism: 'La flor nacional floreciendo en las quebradas protegidas de la precordillera.',
    imageSrc: '/images/logo_v2_15.jpg'
  },
  {
    id: 'v2_16',
    category: 'territorio_belleza',
    categoryLabel: 'Belleza Natural & Especies del Maule',
    num: 16,
    title: 'Follaje Sagrado de Canelo',
    elements: 'Hojas medicinales del árbol sagrado del Canelo (Foye) dispuestas en equilibrio geométrico.',
    symbolism: 'Planta de sanación, espiritualidad mapuche y respeto por la naturaleza.',
    imageSrc: '/images/logo_v2_16.jpg'
  },
  {
    id: 'v2_17',
    category: 'territorio_belleza',
    categoryLabel: 'Belleza Natural & Especies del Maule',
    num: 17,
    title: 'Racimo de Uva País & Hoja Otoñal',
    elements: 'Uvas tintas ancestrales de viña de rulo con hoja de parra en tonos cobrizos.',
    symbolism: 'Patrimonio vitivinícola campesino del secano interior de Cauquenes y San Javier.',
    imageSrc: '/images/logo_v2_17.jpg'
  },
  {
    id: 'v2_18',
    category: 'territorio_belleza',
    categoryLabel: 'Belleza Natural & Especies del Maule',
    num: 18,
    title: 'Vendimia Tradicional del Maule Sur',
    elements: 'Cosecha de uva de parrones familiares campesinos de cepas patrimoniales.',
    symbolism: 'El trabajo asociativo en las vendimias que unen familias enteras en el campo.',
    imageSrc: '/images/logo_v2_18.jpg'
  },
  {
    id: 'v2_19',
    category: 'territorio_belleza',
    categoryLabel: 'Belleza Natural & Especies del Maule',
    num: 19,
    title: 'Rama con Frutos Silvestres de Maqui',
    elements: 'Bayas oscuras de maqui maduro con follaje perenne de sotobosque.',
    symbolism: 'El superalimento silvestre de recolección comunitaria en las quebradas del Maule.',
    imageSrc: '/images/logo_v2_19.jpg'
  },
  {
    id: 'v2_20',
    category: 'territorio_belleza',
    categoryLabel: 'Belleza Natural & Especies del Maule',
    num: 20,
    title: 'Pájaro Chucao en Rama de Roble (Emblema Oficial)',
    elements: 'El emblemático pájaro Chucao con su pecho cobrizo y cola erguida sobre una rama de roble andino con brotes.',
    symbolism: 'El vigía y mensajero del bosque nativo del Maule Sur; símbolo de buen augurio, cercanía y vida silvestre.',
    imageSrc: '/images/logo_chucao_20.jpg'
  }
];

export const LogosGallery: React.FC = () => {
  const { selectedLogo, setSelectedLogo } = useAppData();
  const [filterCategory, setFilterCategory] = React.useState<'todas' | 'comunicacion' | 'territorio_belleza'>('todas');

  const filteredList = NEW_LOGOS_COLLECTION.filter(item => {
    if (filterCategory === 'todas') return true;
    return item.category === filterCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-[#18231c] via-[#24352a] to-[#121a15] text-white p-6 sm:p-8 rounded-3xl shadow-md border border-emerald-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/10 rounded-2xl text-amber-300 shadow-inner">
              <Palette size={28} />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider block">
                Catálogo de Identidad Visual & Simbología (20+ Opciones)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                Propuestas de Logos para Maule Red
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-2xl">
                10 conceptos de radio comunitaria y defensa territorial + 10 emblemas de belleza natural, aves, flora y cumbres del Maule Sur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#1b4332] px-4 py-2 rounded-xl text-xs font-black border border-emerald-400/40 text-white shadow-sm">
            <Check size={16} className="text-amber-300 stroke-[3]" />
            <span>Logo Activo en la Web: {selectedLogo}</span>
          </div>
        </div>
      </div>

      {/* Selector de Filtros */}
      <div className="flex items-center gap-2 flex-wrap bg-white p-2 rounded-2xl border border-gray-200 shadow-xs">
        <button
          onClick={() => setFilterCategory('todas')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            filterCategory === 'todas'
              ? 'bg-[#1b4332] text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Todas las Opciones ({NEW_LOGOS_COLLECTION.length})
        </button>
        <button
          onClick={() => setFilterCategory('comunicacion')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            filterCategory === 'comunicacion'
              ? 'bg-[#1b4332] text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Radio size={14} className="text-amber-400" />
          <span>1. Conceptos de Radio & Territorio (12)</span>
        </button>
        <button
          onClick={() => setFilterCategory('territorio_belleza')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            filterCategory === 'territorio_belleza'
              ? 'bg-[#1b4332] text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Mountain size={14} className="text-emerald-500" />
          <span>2. Belleza Natural, Aves & Montañas (11)</span>
        </button>
      </div>

      {/* Imagen Lámina Maestra 4x5 Completa */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-gray-300 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black font-serif text-gray-950 flex items-center gap-2">
              <Eye size={18} className="text-[#1b4332]" />
              <span>Lámina Completa Generada en Grilla</span>
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Filas 1 y 2: Comunicación y cuencas • Filas 3 y 4: Flora, fauna y geografía icónica
            </p>
          </div>

          <a
            href="/images/veinte_logos_maule_sur.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors border border-gray-300 self-start sm:self-auto cursor-pointer"
          >
            <Download size={13} />
            <span>Descargar Lámina Original en Alta Definición</span>
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white p-2 shadow-inner">
          <img
            src="/images/veinte_logos_maule_sur.jpg"
            alt="Grilla 4x5 con más de 20 propuestas de logotipos para la Red de Noticias y Comunicación Popular del Maule Sur"
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>
      </div>

      {/* Desglose Individual con Botón "Usar este logo" */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2">
          <h3 className="text-lg font-black font-serif text-gray-950">
            Catálogo Individual: Haz clic para activar tu favorito
          </h3>
          <span className="text-xs font-bold text-gray-600 bg-gray-200 px-2.5 py-0.5 rounded-full">
            {filteredList.length} Opciones disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((logo) => {
            const isSelected = selectedLogo === logo.id;

            return (
              <div
                key={logo.id}
                className={`p-5 rounded-3xl border-2 transition-all shadow-xs flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-600 ring-4 ring-emerald-500/25 shadow-xl scale-[1.02]'
                    : 'bg-white border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 rounded-2xl bg-white p-1 border-2 border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden group">
                    <img 
                      src={logo.imageSrc} 
                      alt={logo.title} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isSelected 
                          ? 'bg-emerald-700 text-white shadow-xs' 
                          : logo.category === 'comunicacion'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-sky-100 text-sky-900 border border-sky-300'
                      }`}>
                        {logo.categoryLabel}
                      </span>

                      <span className="text-[10px] font-bold text-gray-500">
                        #{logo.num}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-gray-950 leading-snug">
                      {logo.title}
                    </h4>

                    <div className="mt-2 text-xs text-gray-700 space-y-1">
                      <p className="line-clamp-2">
                        <strong className="text-gray-900">Elementos:</strong> {logo.elements}
                      </p>
                      <p className="text-gray-600 italic line-clamp-2">
                        "{logo.symbolism}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    {isSelected ? (
                      <span className="text-emerald-700 font-black flex items-center gap-1 bg-emerald-100 px-2.5 py-1 rounded-lg text-xs">
                        <Check size={14} className="stroke-[3]" /> Activo en Cabecera
                      </span>
                    ) : (
                      <span className="text-gray-500 text-[11px]">Listo para aplicar</span>
                    )}
                  </div>

                  {!isSelected && (
                    <button
                      onClick={() => setSelectedLogo(logo.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-gray-900 hover:bg-[#1b4332] text-white text-xs font-black transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1"
                    >
                      <span>Usar este logo</span>
                      <Sparkles size={12} className="text-amber-400" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

