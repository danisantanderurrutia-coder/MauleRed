import React from 'react';
import { useAppData } from '../../../context/AppDataContext';
import { useAudioPlayer } from '../../../context/AudioPlayerContext';
import { 
  AlertTriangle, 
  Play, 
  Pause, 
  Volume2, 
  ShieldCheck, 
  MapPin, 
  Camera, 
  Eye,
  Radio,
  Map
} from 'lucide-react';
import { TerritoryMap } from '../TerritoryMap';

interface AlertaMauleProps {
  onSelectArticle: (articleId: string) => void;
}

export const AlertaMaule: React.FC<AlertaMauleProps> = ({ onSelectArticle }) => {
  const { articles, selectedComuna, selectedCuenca, isDataSaverActive } = useAppData();
  const { activeCapsule, playCapsule, pauseCapsule } = useAudioPlayer();

  // Filtrar artículos de alerta socioambiental
  const alertaArticles = articles.filter(a => {
    if (a.section !== 'alerta') return false;
    if (selectedComuna !== 'todas' && a.comuna !== selectedComuna) return false;
    if (selectedCuenca !== 'todas' && a.cuenca !== selectedCuenca) return false;
    return a.status === 'publicado';
  });

  return (
    <div className="space-y-6">
      
      {/* Banner de Sección */}
      <div className="bg-gradient-to-r from-[#b84227] to-[#793822] text-white p-5 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl">
              <AlertTriangle size={28} className="text-[#e4a834]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#e4a834] uppercase tracking-wider">
                Vigilancia Socioambiental y Denuncia Vecinal
              </span>
              <h2 className="text-2xl font-black font-serif">Alerta Maule</h2>
              <p className="text-xs text-gray-200 mt-0.5">
                Defensa del agua, denuncias de áridos y cortes de servicios esenciales con cápsulas sonoras de 90 segundos.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-xl text-xs font-semibold self-start md:self-auto">
            <Radio size={15} className="text-[#e4a834] animate-pulse" />
            <span>Formato Audio-Primer (90 segundos)</span>
          </div>
        </div>
      </div>

      {/* Panel Integrado del Mapa Territorial de Cuencas y Monitoreo */}
      <div className="bg-white rounded-3xl border-2 border-[#b84227]/20 shadow-md p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-gradient-to-br from-[#b84227] to-[#793822] text-white rounded-xl shadow-xs">
              <Map size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  Monitoreo Georreferenciado
                </span>
                <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
                  11 Comunas • 5 Cuencas Hidrográficas
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black font-serif text-gray-950 mt-0.5">
                Panel Territorial: Mapa de Cuencas, Comunas y Alertas Maule Sur
              </h3>
            </div>
          </div>
          <p className="text-xs text-gray-600 max-w-sm">
            Filtra en el mapa interactivo por comuna o cuenca para geolocalizar denuncias de agua, cortes APR y eventos vecinales.
          </p>
        </div>

        {/* Componente del Mapa Territorial */}
        <TerritoryMap onSelectArticlePreview={onSelectArticle} />
      </div>

      {/* Grid de Denuncias */}
      {alertaArticles.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500">
          No hay denuncias activas en la zona seleccionada.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alertaArticles.map((art) => {
            const isPlayingThisCapsule = activeCapsule?.id === art.id && activeCapsule.isPlaying;

            return (
              <article
                key={art.id}
                className="bg-white rounded-2xl border-2 border-red-100 hover:border-[#b84227] transition-all shadow-sm overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Foto de corresponsal / portada (Ocultable en Modo 3G) */}
                  {!isDataSaverActive ? (
                    <div 
                      onClick={() => onSelectArticle(art.id)}
                      className="relative h-48 w-full overflow-hidden bg-gray-100 cursor-pointer"
                      title="Haz clic para leer la alerta completa"
                    >
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = './images/apr_vara_gruesa.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-[#b84227] text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <AlertTriangle size={12} />
                        <span>Alerta Territorial</span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                        <Camera size={11} /> Foto Corresponsal
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50 p-3 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900 font-semibold">
                      <span>[Modo 3G: Imagen pausada para ahorrar datos]</span>
                      <span>{art.comuna}</span>
                    </div>
                  )}

                  {/* Contenido Editorial */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1 font-bold text-[#b84227]">
                        <MapPin size={13} /> {art.comuna} • {art.cuenca}
                      </span>
                      <span>{art.date}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectArticle(art.id)}
                      className="text-lg font-bold text-gray-900 group-hover:text-[#b84227] leading-snug cursor-pointer transition-colors"
                    >
                      {art.title}
                    </h3>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {art.subtitle}
                    </p>

                    {/* Módulo Audio-Primer: Cápsula de 90 segundos */}
                    <div className="mt-4 p-3 rounded-xl bg-[#fff9f2] border border-[#edd5b8] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => {
                            if (isPlayingThisCapsule) {
                              pauseCapsule();
                            } else {
                              playCapsule(art.id, art.title, art.author, art.audioUrl || '');
                            }
                          }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isPlayingThisCapsule
                              ? 'bg-[#b84227] text-white ring-4 ring-[#b84227]/30'
                              : 'bg-[#e4a834] text-[#14171a] hover:bg-[#e4a834]/90'
                          }`}
                          aria-label={isPlayingThisCapsule ? 'Pausar audio cápsula' : 'Escuchar audio cápsula'}
                        >
                          {isPlayingThisCapsule ? (
                            <Pause size={18} className="fill-current" />
                          ) : (
                            <Play size={18} className="fill-current ml-0.5" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-[#793822] uppercase">
                            <Volume2 size={13} /> Cápsula Radial ({art.audioDuration || '90s'})
                          </div>
                          <span className="text-xs font-semibold text-gray-800">
                            {isPlayingThisCapsule ? 'Reproduciendo testimonio...' : 'Escuchar reporte sonoro'}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold bg-white text-gray-600 px-2 py-1 rounded border border-gray-200">
                        {art.audioDuration || '01:30'}
                      </span>
                    </div>

                    {/* Ficha rápida de 3 bloques */}
                    <div className="mt-3 text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-100 space-y-1">
                      <div className="text-gray-700">
                        <strong className="text-red-700">¿Qué pasó?:</strong> {art.block1WhatHappened.slice(0, 100)}...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pie con autor corresponsal y botón ver receta */}
                <div className="p-4 bg-[#fcfaf7] border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-700">
                    <span className="font-semibold">{art.author}</span>
                    {art.isVerifiedCorrespondent && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded" title="Corresponsal Comunitario Verificado">
                        <ShieldCheck size={11} /> Verificado
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectArticle(art.id)}
                    className="flex items-center gap-1 text-xs font-bold text-[#b84227] hover:underline"
                  >
                    <Eye size={13} />
                    <span>Ver Receta Completa</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
};
