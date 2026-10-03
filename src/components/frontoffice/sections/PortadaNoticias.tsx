import React from 'react';
import { useAppData } from '../../../context/AppDataContext';
import { useAudioPlayer } from '../../../context/AudioPlayerContext';
import { 
  Flame, 
  AlertTriangle, 
  MapPin, 
  Volume2, 
  Play, 
  Pause, 
  Clock, 
  ArrowRight, 
  Eye, 
  Sparkles, 
  Map, 
  TrendingUp, 
  Coins, 
  Globe, 
  Users,
  ShieldCheck
} from 'lucide-react';
import { SectionType } from '../../../types';

interface PortadaNoticiasProps {
  onSelectArticle: (articleId: string) => void;
  onNavigateSection: (section: SectionType) => void;
}

export const PortadaNoticias: React.FC<PortadaNoticiasProps> = ({ 
  onSelectArticle, 
  onNavigateSection 
}) => {
  const { 
    articles, 
    emergencies, 
    selectedComuna, 
    selectedCuenca, 
    isDataSaverActive,
    isEmergencyThemeActive
  } = useAppData();
  
  const { activeCapsule, playCapsule, pauseCapsule } = useAudioPlayer();

  // Filtrado según selección territorial
  const publishedArticles = articles.filter(a => {
    if (a.status !== 'publicado') return false;
    if (selectedComuna !== 'todas' && a.comuna !== selectedComuna) return false;
    if (selectedCuenca !== 'todas' && a.cuenca !== selectedCuenca) return false;
    return true;
  });

  // Noticia destacada (primera con isFeatured o la primera de la lista)
  const featuredArticle = publishedArticles.find(a => a.isFeatured) || publishedArticles[0];
  const otherArticles = publishedArticles.filter(a => a.id !== featuredArticle?.id);
  const breakingNews = publishedArticles.find(a => a.isBreakingNews);
  const activeEmergencies = emergencies.filter(e => e.status !== 'resuelto');

  const isPlayingFeaturedCapsule = activeCapsule?.id === featuredArticle?.id && activeCapsule.isPlaying;

  return (
    <div className="space-y-8">
      
      {/* Mensaje de Emergencia Territorial activado desde Panel de Administradores */}
      {isEmergencyThemeActive && (
        <aside 
          aria-label="Alerta de Emergencia Territorial"
          className="bg-gradient-to-r from-[#7a3a29] via-[#8c2d19] to-[#632d1f] text-white p-4 sm:p-5 rounded-3xl shadow-xl border-2 border-[#b37d14] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-pulse"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/15 rounded-2xl text-amber-300 shadow-inner flex-shrink-0">
              <AlertTriangle size={28} className="animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-gray-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                  ESTADO DE EMERGENCIA TERRITORIAL
                </span>
                <span className="text-xs font-semibold text-amber-200">
                  Modo de Cobertura Crítica Activo
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black font-serif text-white mt-0.5">
                Red Comunitaria en Alerta: Monitoreo Activo de Cortes de Agua, Suministro y Contingencias
              </h2>
              <p className="text-xs text-amber-100 mt-1 max-w-2xl font-medium">
                La redacción popular activó la paleta de contingencia territorial. Por favor revisa los reportes vecinales del Avisador de Cortes o envía reportes ciudadanos directos.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateSection('alerta')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 text-gray-950 hover:bg-amber-300 font-black text-xs shadow-lg transition-all whitespace-nowrap active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <span>Ver Alertas del Territorio</span>
            <ArrowRight size={14} />
          </button>
        </aside>
      )}

      {/* 1. Cinta de Alerta / Noticia de Último Minuto */}
      {breakingNews && (
        <div className="bg-theme-alert text-white p-3.5 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="bg-white text-theme-alert text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
              ÚLTIMO MINUTO
            </span>
            <span className="font-bold text-xs sm:text-sm line-clamp-1">
              {breakingNews.title}
            </span>
          </div>
          <button
            onClick={() => onSelectArticle(breakingNews.id)}
            className="flex items-center gap-1 bg-black/30 hover:bg-black/40 text-white text-xs font-bold px-3 py-1 rounded-lg transition-colors self-start sm:self-auto"
          >
            <span>Ver reporte</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* 2. Bloque Principal: Portada Hero de Alto Impacto con Efecto Bolsillo */}
      {featuredArticle && (
        <section className="bg-theme-surface rounded-3xl border border-theme-border hover:border-theme-primary transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Imagen de Apertura de Alto Impacto */}
            <div 
              onClick={() => onSelectArticle(featuredArticle.id)}
              className="lg:col-span-7 relative min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] bg-theme-surfaceSoft overflow-hidden cursor-pointer group/img"
              title="Haz clic en la imagen para abrir la noticia completa"
            >
              {!isDataSaverActive ? (
                <>
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out brightness-[0.92] group-hover/img:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none"></div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-theme-accentBg p-6 text-xs text-theme-accentText font-semibold text-center">
                  [Modo Ahorro 3G: Imagen pausada para acelerar la carga en redes rurales - Clic para ver noticia]
                </div>
              )}

              {/* Insignias Superiores */}
              <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
                <div className="bg-theme-primary/95 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
                  <Flame size={14} className="text-amber-400" />
                  <span>Efecto Bolsillo • Noticia Central</span>
                </div>
                <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 hidden sm:flex items-center gap-1">
                  <Sparkles size={11} className="text-amber-300" />
                  <span>Exclusiva Territorial</span>
                </div>
              </div>

              {/* Barra Inferior Territorial en la Foto */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md text-white p-3.5 rounded-2xl flex items-center justify-between text-xs border border-white/15 shadow-xl">
                <span className="flex items-center gap-1.5 font-black text-amber-300">
                  <MapPin size={15} className="text-amber-400" /> 
                  <span>{featuredArticle.comuna}</span>
                  <span className="text-white/60 font-normal">({featuredArticle.cuenca})</span>
                </span>
                <span className="text-gray-300 font-semibold">{featuredArticle.date}</span>
              </div>
            </div>

            {/* Contenido Editorial de la Noticia Central */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-theme-surface">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-theme-primary block">
                    {featuredArticle.section.toUpperCase()} • INVESTIGACIÓN POPULAR
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                    LECTURA 3 MIN
                  </span>
                </div>

                <h2 
                  onClick={() => onSelectArticle(featuredArticle.id)}
                  className="text-xl sm:text-2xl font-black font-serif text-theme-textMain hover:text-theme-primary leading-tight cursor-pointer transition-colors"
                >
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-theme-textMuted font-medium mt-3 leading-relaxed">
                  {featuredArticle.subtitle}
                </p>

                {/* Síntesis en 3 bloques rápida */}
                <div className="mt-4 p-4 rounded-2xl bg-theme-surfaceSoft/80 border border-theme-border text-xs space-y-2">
                  <div className="text-theme-textMain leading-snug">
                    <strong className="text-theme-primary font-black">1. ¿Qué pasó?:</strong> {featuredArticle.block1WhatHappened.slice(0, 110)}...
                  </div>
                  <div className="text-theme-textMuted leading-snug">
                    <strong className="text-theme-accent font-black">2. En simple:</strong> {featuredArticle.block2TheCause.slice(0, 95)}...
                  </div>
                </div>

                {/* Módulo Audio-Primer */}
                {featuredArticle.hasAudioCapsule && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-[#141b22] text-white flex items-center justify-between gap-3 shadow-md border border-white/10 hover:border-amber-400/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (isPlayingFeaturedCapsule) {
                            pauseCapsule();
                          } else {
                            playCapsule(featuredArticle.id, featuredArticle.title, featuredArticle.author, featuredArticle.audioUrl || '');
                          }
                        }}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isPlayingFeaturedCapsule
                            ? 'bg-theme-primary text-white ring-4 ring-emerald-400'
                            : 'bg-theme-accent text-white hover:opacity-90 shadow-md'
                        }`}
                        aria-label={isPlayingFeaturedCapsule ? 'Pausar audio' : 'Escuchar audio'}
                      >
                        {isPlayingFeaturedCapsule ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                      </button>
                      <div className="text-xs">
                        <span className="text-[10px] font-bold text-amber-300 uppercase flex items-center gap-1">
                          <Volume2 size={12} /> Cápsula de 90 segundos
                        </span>
                        <span className="font-bold text-white block">
                          {isPlayingFeaturedCapsule ? 'Reproduciendo audio...' : 'Escuchar despacho radial'}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold bg-gray-800/90 px-2.5 py-1 rounded-md text-gray-200 border border-gray-700">
                      {featuredArticle.audioDuration || '01:28'}
                    </span>
                  </div>
                )}
              </div>

              {/* Pie de la Noticia Central */}
              <div className="pt-5 mt-5 border-t border-theme-border flex items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-2 text-theme-textMain">
                  <div className="w-8 h-8 rounded-full bg-theme-primary/10 flex items-center justify-center font-bold text-theme-primary text-xs">
                    {featuredArticle.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold block leading-tight">{featuredArticle.author}</span>
                    <span className="text-[10px] text-theme-textMuted flex items-center gap-1">
                      {featuredArticle.isVerifiedCorrespondent && (
                        <ShieldCheck size={12} className="text-emerald-600 inline" />
                      )}
                      Corresponsal Verificado
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectArticle(featuredArticle.id)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-theme-primary text-white font-black text-xs hover:bg-theme-primaryHover transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Eye size={14} />
                  <span>Leer Noticia Completa</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 3. Accesos Rápidos Territoriales y Atajos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <button
          onClick={() => onNavigateSection('alerta')}
          className="bg-white p-3.5 rounded-2xl border-2 border-red-200 hover:border-[#8c2d19] text-left transition-all shadow-xs group flex items-center gap-3 cursor-pointer"
        >
          <div className="p-2.5 rounded-xl bg-red-100 text-red-800 group-hover:bg-[#8c2d19] group-hover:text-white transition-colors">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="font-black text-xs text-gray-900 block">Alerta Maule</span>
            <span className="text-[11px] text-red-700 font-bold">{activeEmergencies.length} activas</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateSection('campo')}
          className="bg-white p-3.5 rounded-2xl border-2 border-amber-200 hover:border-[#b37d14] text-left transition-all shadow-xs group flex items-center gap-3 cursor-pointer"
        >
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 group-hover:bg-[#b37d14] group-hover:text-white transition-colors">
            <Coins size={20} />
          </div>
          <div>
            <span className="font-black text-xs text-gray-900 block">Precios de Feria</span>
            <span className="text-[11px] text-gray-700 font-semibold">Linares y Parral</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateSection('internacional')}
          className="bg-white p-3.5 rounded-2xl border-2 border-sky-200 hover:border-[#1c5274] text-left transition-all shadow-xs group flex items-center gap-3 cursor-pointer"
        >
          <div className="p-2.5 rounded-xl bg-sky-100 text-sky-900 group-hover:bg-[#1c5274] group-hover:text-white transition-colors">
            <Globe size={20} />
          </div>
          <div>
            <span className="font-black text-xs text-gray-900 block">Internacional</span>
            <span className="text-[11px] text-sky-800 font-semibold">Impacto en el Maule</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateSection('mapa')}
          className="bg-white p-3.5 rounded-2xl border-2 border-emerald-200 hover:border-[#1b4332] text-left transition-all shadow-xs group flex items-center gap-3 cursor-pointer"
        >
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 group-hover:bg-[#1b4332] group-hover:text-white transition-colors">
            <Map size={20} />
          </div>
          <div>
            <span className="font-black text-xs text-gray-900 block">Mapa Territorial</span>
            <span className="text-[11px] text-emerald-800 font-semibold">5 Cuencas y Comunas</span>
          </div>
        </button>
      </div>

      {/* 4. Mosaico de Noticias y Crónicas del Territorio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2">
          <div>
            <h3 className="text-lg font-black font-serif text-gray-900 flex items-center gap-2">
              <span>Crónicas y Noticias del Maule Sur</span>
              <span className="text-xs font-sans font-black bg-gray-200 text-gray-900 px-2.5 py-0.5 rounded-full">
                {publishedArticles.length} Notas
              </span>
            </h3>
            <p className="text-xs text-gray-700 font-medium">
              Periodismo popular levantado directamente por corresponsales campesinos y comunitarios.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((art) => (
            <article
              key={art.id}
              className="bg-theme-surface rounded-2xl border border-theme-border hover:border-theme-primary transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                {!isDataSaverActive && (
                  <div 
                    onClick={() => onSelectArticle(art.id)}
                    className="h-48 w-full overflow-hidden bg-theme-surfaceSoft relative cursor-pointer group/cardimg"
                    title="Haz clic en la imagen para leer la noticia"
                  >
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover/cardimg:scale-105 transition-transform duration-500 brightness-95 group-hover/cardimg:brightness-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover/cardimg:opacity-40 transition-opacity"></div>
                    <div className="absolute top-3 left-3 bg-theme-primary/95 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md border border-white/20">
                      {art.section}
                    </div>
                    {art.isBreakingNews && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md animate-pulse">
                        Urgente
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-theme-textMuted mb-2.5">
                    <span className="font-extrabold text-theme-primary flex items-center gap-1">
                      <MapPin size={13} className="text-amber-500" /> {art.comuna}
                    </span>
                    <span className="text-[11px] font-medium">{art.date}</span>
                  </div>

                  <h4 
                    onClick={() => onSelectArticle(art.id)}
                    className="font-black text-base text-theme-textMain group-hover:text-theme-primary leading-snug cursor-pointer transition-colors line-clamp-2"
                  >
                    {art.title}
                  </h4>

                  <p className="text-xs text-theme-textMuted mt-2.5 line-clamp-3 leading-relaxed">
                    {art.subtitle}
                  </p>

                  {/* Audio badge */}
                  {art.hasAudioCapsule && (
                    <div className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-black text-theme-accentText bg-theme-accentBg px-2.5 py-1 rounded-lg border border-theme-accentBorder shadow-2xs">
                      <Volume2 size={13} className="text-amber-600 animate-pulse" />
                      <span>Cápsula sonora (90s) disponible</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-theme-surfaceSoft/60 border-t border-theme-border flex items-center justify-between text-xs">
                <span className="text-theme-textMuted font-bold truncate max-w-[150px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  {art.author}
                </span>
                <button
                  onClick={() => onSelectArticle(art.id)}
                  className="text-theme-secondary font-black hover:text-theme-primary flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Receta 3 bloques</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
