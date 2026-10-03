import React from 'react';
import { useAppData } from '../../../context/AppDataContext';
import { useAudioPlayer } from '../../../context/AudioPlayerContext';
import { 
  Globe, 
  ArrowRight, 
  MapPin, 
  Volume2, 
  Play, 
  Pause, 
  Eye, 
  Sparkles, 
  Coins, 
  AlertCircle 
} from 'lucide-react';

interface InternacionalProps {
  onSelectArticle: (articleId: string) => void;
}

export const Internacional: React.FC<InternacionalProps> = ({ onSelectArticle }) => {
  const { articles, isDataSaverActive } = useAppData();
  const { activeCapsule, playCapsule, pauseCapsule } = useAudioPlayer();

  const internationalArticles = articles.filter(a => a.section === 'internacional' && a.status === 'publicado');

  return (
    <div className="space-y-6">
      
      {/* Cabecera Internacional */}
      <div className="bg-gradient-to-r from-[#145582] to-[#0b2f48] text-white p-6 rounded-3xl shadow-sm border border-sky-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/10 rounded-2xl shadow-md">
              <Globe size={28} className="text-[#e4a834]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-[#e4a834] tracking-wider block">
                Cables del Mundo con Mirada Campesina
              </span>
              <h2 className="text-2xl font-black font-serif text-white">
                Internacional & Cono Sur
              </h2>
              <p className="text-xs text-sky-200 mt-0.5">
                Noticias globales sobre soberanía alimentaria, sequías, precios de cereales y luchas por el agua explicadas en función de su impacto directo en el Maule Sur.
              </p>
            </div>
          </div>

          <div className="bg-black/30 px-3.5 py-2 rounded-xl text-xs font-semibold self-start md:self-auto border border-sky-800 text-sky-200">
            Enlace con Medios Populares de América Latina
          </div>
        </div>
      </div>

      {/* Grid de Noticias Internacionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {internationalArticles.map((art) => {
          const isPlayingThis = activeCapsule?.id === art.id && activeCapsule.isPlaying;

          return (
            <article
              key={art.id}
              className="bg-white rounded-3xl border border-sky-200 hover:border-[#145582] transition-all shadow-2xs overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {!isDataSaverActive && (
                  <div 
                    onClick={() => onSelectArticle(art.id)}
                    className="h-52 w-full overflow-hidden bg-gray-100 relative cursor-pointer"
                    title="Haz clic para leer el cable internacional"
                  >
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#145582] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow">
                      Mundo & Cono Sur
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-bold text-[#145582] flex items-center gap-1">
                      <Globe size={13} /> Cable Internacional
                    </span>
                    <span>{art.date}</span>
                  </div>

                  <h3
                    onClick={() => onSelectArticle(art.id)}
                    className="text-lg font-bold text-gray-900 group-hover:text-[#145582] leading-snug cursor-pointer transition-colors"
                  >
                    {art.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {art.subtitle}
                  </p>

                  {/* Recuadro Especial: ¿Cómo afecta esto al Maule Sur? */}
                  {art.localImpactMaule && (
                    <div className="mt-4 p-3.5 rounded-2xl bg-[#f0f7fc] border border-sky-200 text-xs text-sky-950 space-y-1">
                      <div className="font-black flex items-center gap-1 text-[#145582] uppercase text-[11px]">
                        <AlertCircle size={13} /> ¿Cómo afecta esto al Maule Sur?
                      </div>
                      <p className="text-gray-800 leading-relaxed font-medium">
                        {art.localImpactMaule}
                      </p>
                    </div>
                  )}

                  {/* Módulo Audio-Primer de la Cápsula */}
                  {art.hasAudioCapsule && (
                    <div className="mt-4 p-2.5 rounded-xl bg-[#181c22] text-white flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => {
                            if (isPlayingThis) {
                              pauseCapsule();
                            } else {
                              playCapsule(art.id, art.title, art.author, art.audioUrl || '');
                            }
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isPlayingThis ? 'bg-[#b84227] text-white' : 'bg-[#e4a834] text-[#14171a]'
                          }`}
                        >
                          {isPlayingThis ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                        </button>
                        <div className="text-[11px]">
                          <span className="text-amber-400 font-bold block">Despacho Internacional</span>
                          <span className="text-gray-300">Audio 90s</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {art.audioDuration || '01:30'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-[#f8fafd] border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-600 font-semibold">{art.author}</span>
                <button
                  onClick={() => onSelectArticle(art.id)}
                  className="font-bold text-[#145582] hover:underline flex items-center gap-1"
                >
                  <Eye size={13} /> Leer receta completa
                </button>
              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
};
