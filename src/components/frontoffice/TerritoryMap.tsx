import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { TERRITORY_COMMUNES } from '../../data/mockData';
import { ComunaMaule, CuencaMaule } from '../../types';
import { 
  MapPin, 
  Layers, 
  RotateCcw, 
  AlertCircle, 
  FileText, 
  Droplets,
  Eye
} from 'lucide-react';

interface TerritoryMapProps {
  onSelectArticlePreview?: (articleId: string) => void;
}

export const TerritoryMap: React.FC<TerritoryMapProps> = ({ onSelectArticlePreview }) => {
  const {
    selectedComuna,
    setSelectedComuna,
    selectedCuenca,
    setSelectedCuenca,
    articles,
    emergencies
  } = useAppData();

  const cuencasDisponibles: CuencaMaule[] = [
    'Río Maule',
    'Río Melado',
    'Río Achibueno',
    'Río Loncomilla',
    'Río Perquilauquén'
  ];

  // Cálculo de alertas y noticias por comuna
  const getCommuneStats = (comunaName: ComunaMaule) => {
    const newsCount = articles.filter(a => a.comuna === comunaName && a.status === 'publicado').length;
    const emgCount = emergencies.filter(e => e.comuna === comunaName && e.status !== 'resuelto').length;
    return { newsCount, emgCount };
  };

  // Resumen del filtro actual
  const currentFilteredArticles = articles.filter(a => {
    if (selectedComuna !== 'todas' && a.comuna !== selectedComuna) return false;
    if (selectedCuenca !== 'todas' && a.cuenca !== selectedCuenca) return false;
    return a.status === 'publicado';
  });

  const currentFilteredEmergencies = emergencies.filter(e => {
    if (selectedComuna !== 'todas' && e.comuna !== selectedComuna) return false;
    if (selectedCuenca !== 'todas' && e.cuenca && e.cuenca !== selectedCuenca) return false;
    return e.status !== 'resuelto';
  });

  return (
    <div className="bg-white rounded-2xl border border-[#e2dcd2] shadow-sm overflow-hidden mb-6">
      
      {/* Barra de Filtros en Tiempo Real */}
      <div className="bg-[#f5efe4] p-4 border-b border-[#e2dcd2]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#1b6ca8] text-white shadow-sm">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#14171a] flex items-center gap-2">
                Mapa Territorial de Cuencas y Comunas
                {(selectedComuna !== 'todas' || selectedCuenca !== 'todas') && (
                  <span className="bg-[#b84227] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    Filtrado Activo
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-600">
                Selecciona tu territorio para ver solo las noticias, fichas de utilidad y alertas de tu zona.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Filtro por Cuenca */}
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-300 text-xs shadow-inner">
              <Droplets size={14} className="text-[#1b6ca8]" />
              <label className="font-semibold text-gray-700">Cuenca:</label>
              <select
                value={selectedCuenca}
                onChange={(e) => setSelectedCuenca(e.target.value as CuencaMaule | 'todas')}
                className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="todas">Todas las cuencas</option>
                {cuencasDisponibles.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Comuna */}
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-300 text-xs shadow-inner">
              <MapPin size={14} className="text-[#b84227]" />
              <label className="font-semibold text-gray-700">Comuna:</label>
              <select
                value={selectedComuna}
                onChange={(e) => setSelectedComuna(e.target.value as ComunaMaule | 'todas')}
                className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="todas">Todo el Maule Sur</option>
                {TERRITORY_COMMUNES.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Resetear Filtros */}
            {(selectedComuna !== 'todas' || selectedCuenca !== 'todas') && (
              <button
                onClick={() => {
                  setSelectedComuna('todas');
                  setSelectedCuenca('todas');
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs font-semibold transition-colors"
                title="Ver todo el Maule Sur"
              >
                <RotateCcw size={13} />
                <span>Ver Todo</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Cuerpo del Mapa & Panel Lateral de Reportes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Mapa Vectorial SVG Interactivo */}
        <div className="lg:col-span-8 p-4 bg-[#fbf9f4] relative min-h-[380px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#e2dcd2]">
          
          {/* Fondo del relieve y los ríos en SVG */}
          <div className="w-full max-w-2xl relative">
            <svg
              viewBox="0 0 100 90"
              className="w-full h-auto drop-shadow-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Relieve: Cordillera a la derecha */}
              <path
                d="M75,0 L100,0 L100,90 L80,90 Q72,50 75,0 Z"
                fill="#e6ded0"
                opacity="0.6"
              />
              <path
                d="M85,0 L100,0 L100,90 L90,90 Z"
                fill="#d8cebc"
                opacity="0.5"
              />

              {/* Océano Pacífico a la izquierda */}
              <path
                d="M0,0 L8,0 L6,90 L0,90 Z"
                fill="#d8e8f2"
                opacity="0.8"
              />

              {/* Río Maule (Cuenca Norte) */}
              <path
                d="M95,15 Q65,22 40,24 Q25,25 6,28"
                stroke="#1b6ca8"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                opacity={selectedCuenca === 'todas' || selectedCuenca === 'Río Maule' ? 1 : 0.25}
              />
              <text x="75" y="14" fontSize="2.8" fill="#1b6ca8" fontWeight="bold">Río Maule</text>

              {/* Río Melado (Afluente precordillerano) */}
              <path
                d="M90,32 Q75,28 65,22"
                stroke="#1b6ca8"
                strokeWidth="1.6"
                strokeDasharray="2 1"
                fill="none"
                opacity={selectedCuenca === 'todas' || selectedCuenca === 'Río Melado' ? 1 : 0.25}
              />
              <text x="78" y="32" fontSize="2.5" fill="#1b6ca8">Río Melado</text>

              {/* Río Achibueno (Santuario Precordillera a Valle Central) */}
              <path
                d="M92,42 Q70,40 50,38 Q42,32 40,24"
                stroke="#2a8cd0"
                strokeWidth="2"
                fill="none"
                opacity={selectedCuenca === 'todas' || selectedCuenca === 'Río Achibueno' ? 1 : 0.25}
              />
              <text x="68" y="44" fontSize="2.8" fill="#1b6ca8" fontWeight="bold">Río Achibueno</text>

              {/* Río Loncomilla */}
              <path
                d="M40,24 Q38,40 32,58"
                stroke="#1b6ca8"
                strokeWidth="1.8"
                fill="none"
                opacity={selectedCuenca === 'todas' || selectedCuenca === 'Río Loncomilla' ? 1 : 0.25}
              />
              <text x="26" y="38" fontSize="2.5" fill="#1b6ca8">Río Loncomilla</text>

              {/* Río Perquilauquén (Límite Sur) */}
              <path
                d="M80,78 Q55,72 32,58 Q20,52 6,65"
                stroke="#1b6ca8"
                strokeWidth="2"
                fill="none"
                opacity={selectedCuenca === 'todas' || selectedCuenca === 'Río Perquilauquén' ? 1 : 0.25}
              />
              <text x="50" y="78" fontSize="2.8" fill="#1b6ca8" fontWeight="bold">Río Perquilauquén</text>
            </svg>

            {/* Marcadores Interactivos de Comunas posicionados absolutamente */}
            <div className="absolute inset-0 pointer-events-none">
              {TERRITORY_COMMUNES.map((commune) => {
                const isSelected = selectedComuna === commune.name;
                const isCuencaMatch = selectedCuenca === 'todas' || selectedCuenca === commune.cuenca;
                const { newsCount, emgCount } = getCommuneStats(commune.name);

                return (
                  <div
                    key={commune.name}
                    style={{ left: `${commune.x}%`, top: `${commune.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                    } ${!isCuencaMatch ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <button
                      onClick={() => {
                        setSelectedComuna(commune.name);
                        setSelectedCuenca(commune.cuenca);
                      }}
                      className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-md transition-all ${
                        isSelected
                          ? 'bg-[#b84227] text-white ring-2 ring-amber-300 shadow-lg'
                          : 'bg-white text-gray-800 border border-gray-300 hover:border-[#b84227]'
                      }`}
                      aria-label={`Comuna ${commune.name}`}
                    >
                      <MapPin
                        size={13}
                        className={isSelected ? 'text-amber-300' : 'text-[#b84227]'}
                      />
                      <span>{commune.name}</span>

                      {/* Contador de alertas o noticias */}
                      {emgCount > 0 ? (
                        <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-black animate-pulse">
                          {emgCount}
                        </span>
                      ) : newsCount > 0 ? (
                        <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                          isSelected ? 'bg-white/25 text-white' : 'bg-[#e4a834] text-[#14171a]'
                        }`}>
                          {newsCount}
                        </span>
                      ) : null}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leyenda territorial inferior */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-gray-500 bg-white/85 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
                Falla / Emergencia Activa
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e4a834] inline-block"></span>
                Noticias Territoriales
              </span>
            </div>
            <span className="font-semibold text-gray-700">
              {selectedComuna === 'todas' ? 'Todo el Maule Sur' : `Zona: ${selectedComuna} (${selectedCuenca})`}
            </span>
          </div>

        </div>

        {/* Panel Lateral: Alertas y Noticias Geolocalizadas */}
        <div className="lg:col-span-4 p-4 bg-[#f8f6f0] flex flex-col justify-between max-h-[460px] overflow-y-auto">
          <div>
            <div className="border-b border-[#e2dcd2] pb-2 mb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#14171a]">
                  {selectedComuna === 'todas' ? 'Todo el Territorio' : selectedComuna}
                </h3>
                <span className="text-xs text-[#793822] font-semibold">
                  {selectedCuenca === 'todas' ? '5 Cuencas' : selectedCuenca}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 mt-0.5">
                {currentFilteredEmergencies.length} alertas activas • {currentFilteredArticles.length} crónicas y noticias
              </p>
            </div>

            {/* Lista de Alertas en la zona */}
            {currentFilteredEmergencies.length > 0 && (
              <div className="mb-4">
                <h4 className="text-[11px] font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <AlertCircle size={13} /> Cortes y Alertas Inmediatas
                </h4>
                <div className="space-y-2">
                  {currentFilteredEmergencies.slice(0, 2).map(emg => (
                    <div key={emg.id} className="bg-red-50 p-2.5 rounded-xl border border-red-200 text-xs">
                      <div className="font-bold text-red-900 leading-tight">{emg.title}</div>
                      <div className="text-[11px] text-red-700 mt-0.5">
                        {emg.sector} • <span className="font-semibold">{emg.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lista de Noticias en la zona */}
            <div>
              <h4 className="text-[11px] font-bold text-[#793822] uppercase tracking-wider mb-2 flex items-center gap-1">
                <FileText size={13} /> Contenido Popular Vinculado
              </h4>
              {currentFilteredArticles.length === 0 ? (
                <p className="text-xs text-gray-500 py-3 text-center italic">
                  No hay artículos publicados en este cuadrante por el momento.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {currentFilteredArticles.slice(0, 3).map(art => (
                    <div
                      key={art.id}
                      onClick={() => onSelectArticlePreview && onSelectArticlePreview(art.id)}
                      className="bg-white p-2.5 rounded-xl border border-gray-200 hover:border-[#b84227] cursor-pointer transition-all shadow-2xs group"
                    >
                      <span className="text-[10px] font-extrabold text-[#b84227] uppercase block">
                        {art.section} • {art.comuna}
                      </span>
                      <h5 className="font-bold text-xs text-[#14171a] group-hover:text-[#b84227] line-clamp-2 leading-snug mt-0.5">
                        {art.title}
                      </h5>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1.5 pt-1 border-t border-gray-100">
                        <span>{art.author}</span>
                        <span className="flex items-center gap-0.5 font-semibold text-[#1b6ca8]">
                          <Eye size={11} /> Leer receta
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#e2dcd2] text-[11px] text-center text-gray-500">
            Haz clic en cualquier comuna del mapa para reenfocar la cobertura
          </div>
        </div>

      </div>

    </div>
  );
};
