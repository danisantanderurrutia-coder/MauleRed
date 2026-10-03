import React, { useState } from 'react';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { useAppData } from '../../context/AppDataContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  Signal, 
  Square,
  ChevronDown,
  Headphones,
  ExternalLink,
  Check,
  X
} from 'lucide-react';

export const RadioPlayerBar: React.FC = () => {
  const { themeStyle } = useAppData();
  const [stationModalOpen, setStationModalOpen] = useState(false);

  const {
    isRadioPlaying,
    toggleRadio,
    radioVolume,
    setRadioVolume,
    isMuted,
    toggleMute,
    bitrate,
    setBitrate,
    currentStation,
    currentShow,
    selectedStationId,
    selectStation,
    stations,
    spotifyPodcastUrl,
    activeCapsule,
    stopCapsule
  } = useAudioPlayer();

  const isOpC = themeStyle === 'opcionC';

  return (
    <div 
      className={`border-b shadow-md sticky top-0 z-40 transition-colors duration-200 ${
        isOpC 
          ? 'bg-[#24110d] text-amber-50 border-[#4a261c]' 
          : 'bg-[#0a1e16] text-emerald-50 border-[#1b382a]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
        
        {/* Lado izquierdo: Estación & Identidad Radial & Selector de Radios */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <button
              onClick={toggleRadio}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-md cursor-pointer ${
                isRadioPlaying 
                  ? 'bg-[#10b981] text-white ring-2 ring-emerald-400/70' 
                  : isOpC 
                    ? 'bg-[#b37d14] text-white hover:bg-[#c98e18]' 
                    : 'bg-[#c68b28] text-white hover:bg-[#d9992d]'
              }`}
              title={isRadioPlaying ? 'Pausar radio comunitaria' : 'Sintonizar radio en vivo'}
              aria-label={isRadioPlaying ? 'Pausar radio' : 'Reproducir radio'}
            >
              {isRadioPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current ml-0.5" />}
            </button>
            {isRadioPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-white border shadow-2xs ${
                isOpC ? 'bg-[#7a3a29] border-amber-500/30' : 'bg-[#1b4332] border-emerald-500/30'
              }`}>
                <Radio size={11} className="animate-pulse" /> EN VIVO
              </span>

              {/* Botón Selector de Estación */}
              <button
                onClick={() => setStationModalOpen(true)}
                className="text-xs font-black tracking-wide text-amber-300 hover:text-amber-200 truncate flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md border border-white/10 hover:border-amber-400/50 transition-colors cursor-pointer"
                title="Cambiar sintonía radial o elegir Radio Cristalina de Panimávida"
              >
                <span className="truncate">{currentStation}</span>
                <ChevronDown size={13} className="text-amber-400 flex-shrink-0" />
              </button>

              {/* Enlace Directo a Spotify Podcast */}
              <a
                href={spotifyPodcastUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-black bg-[#1DB954] hover:bg-[#1ed760] text-black px-2.5 py-0.5 rounded-full shadow-sm transition-transform active:scale-95"
                title="Escuchar podcast 'El Maule Sur también existe' en Spotify"
              >
                <Headphones size={11} />
                <span>Spotify Podcast</span>
                <ExternalLink size={10} />
              </a>
            </div>

            <p className="text-xs font-semibold text-gray-100 truncate flex items-center gap-1.5 mt-0.5">
              <span>{currentShow}</span>
            </p>
          </div>
        </div>

        {/* Centro: Cápsula Activa o Ecualizador */}
        <div className="hidden lg:flex items-center gap-4 flex-1 justify-center max-w-md">
          {activeCapsule && activeCapsule.isPlaying ? (
            <div className="bg-[#1f262e] px-3 py-1.5 rounded-lg flex items-center justify-between gap-3 w-full border border-theme-accent/50 animate-pulse">
              <div className="flex items-center gap-2 truncate">
                <Sparkles size={15} className="text-theme-accent flex-shrink-0" />
                <div className="truncate text-xs">
                  <span className="text-theme-accent font-bold block">Cápsula de Audio (90s):</span>
                  <span className="text-gray-200 truncate block">{activeCapsule.title}</span>
                </div>
              </div>
              <button
                onClick={stopCapsule}
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700 cursor-pointer"
                title="Detener cápsula sonora"
              >
                <Square size={13} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-gray-300 bg-[#101418] px-3 py-1 rounded-full border border-gray-800">
              <div className="flex items-end gap-1 h-3.5">
                <div className={`w-1 bg-theme-accent rounded-t ${isRadioPlaying ? 'wave-bar-1' : 'h-1'}`}></div>
                <div className={`w-1 bg-theme-primary rounded-t ${isRadioPlaying ? 'wave-bar-2' : 'h-1'}`}></div>
                <div className={`w-1 bg-theme-secondary rounded-t ${isRadioPlaying ? 'wave-bar-3' : 'h-1'}`}></div>
                <div className={`w-1 bg-theme-accent rounded-t ${isRadioPlaying ? 'wave-bar-4' : 'h-1'}`}></div>
                <div className={`w-1 bg-theme-primary rounded-t ${isRadioPlaying ? 'wave-bar-5' : 'h-1'}`}></div>
              </div>
              <span className="truncate text-[11px] font-medium">
                {isRadioPlaying ? `Conectado a ${currentStation}` : 'Haz clic en reproducir o cambia de emisora'}
              </span>
            </div>
          )}
        </div>

        {/* Lado derecho: Selector 3G Bitrate & Volumen */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          {/* Selector de Calidad / Ahorro Rural */}
          <div className="flex items-center bg-[#101418] p-0.5 rounded-lg border border-gray-800 text-xs">
            <button
              onClick={() => setBitrate('32k')}
              className={`px-2 py-0.5 rounded font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                bitrate === '32k' 
                  ? 'bg-theme-primary text-white shadow-sm font-bold' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              title="Transmisión ultraliviana para redes rurales 3G"
            >
              <Signal size={11} />
              <span className="text-[11px]">32k (3G)</span>
            </button>
            <button
              onClick={() => setBitrate('128k')}
              className={`px-2 py-0.5 rounded font-medium transition-colors text-[11px] cursor-pointer ${
                bitrate === '128k' 
                  ? 'bg-theme-secondary text-white shadow-sm font-bold' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              title="Calidad estudio estéreo"
            >
              128k HQ
            </button>
          </div>

          {/* Control de Volumen */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <button
              onClick={toggleMute}
              className="p-1 hover:text-white rounded hover:bg-gray-800 transition-colors cursor-pointer"
              title={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted || radioVolume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : radioVolume}
              onChange={(e) => {
                setRadioVolume(parseFloat(e.target.value));
                if (isMuted) toggleMute();
              }}
              className="w-14 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-theme-accent"
              aria-label="Volumen del reproductor"
            />
          </div>
        </div>

      </div>

      {/* Modal / Selector de Radios Populares & Podcast */}
      {stationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#14181f] text-white w-full max-w-lg rounded-3xl border border-gray-700 shadow-2xl overflow-hidden">
            
            <div className="p-5 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#1b4332] text-amber-400">
                  <Radio size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white font-serif">
                    Sintonizador de Radios Populares y Comunitarias
                  </h3>
                  <p className="text-xs text-gray-400">
                    Elige la emisora de tu sector o conecta con el Podcast en Spotify
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStationModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              
              {/* Tarjeta destacada de Spotify */}
              <div className="bg-gradient-to-r from-[#1DB954]/20 to-[#12151a] p-4 rounded-2xl border border-[#1DB954]/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1DB954] text-black flex items-center justify-center flex-shrink-0 font-black shadow-md">
                    <Headphones size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#1DB954] tracking-wider block">
                      PODCAST OFICIAL
                    </span>
                    <h4 className="font-bold text-sm text-white">
                      El Maule Sur también existe
                    </h4>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Episodios y reportajes de investigación sonora en Spotify
                    </p>
                  </div>
                </div>

                <a
                  href={spotifyPodcastUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-black text-xs shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  <span>Abrir en Spotify</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Lista de Radios */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Emisoras Disponibles:
                </span>

                {stations.map((st) => {
                  const isSelected = selectedStationId === st.id;
                  return (
                    <div
                      key={st.id}
                      onClick={() => {
                        selectStation(st.id);
                        setStationModalOpen(false);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#1b4332]/40 border-amber-400/80 ring-2 ring-amber-400/30 shadow-md'
                          : 'bg-[#1b2029] border-gray-800 hover:border-gray-600 hover:bg-[#202733]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                          isSelected ? 'bg-amber-400 text-black' : 'bg-gray-800 text-gray-300'
                        }`}>
                          <Radio size={16} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white truncate">
                              {st.name}
                            </span>
                            <span className="bg-gray-800 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded">
                              {st.dial}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {st.currentShow} • <span className="text-gray-300">{st.location}</span>
                          </p>
                        </div>
                      </div>

                      {isSelected ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                          <Check size={13} /> Sintonizada
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-gray-400 hover:text-white">
                          Conectar →
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            <div className="p-4 bg-[#0e1116] border-t border-gray-800 text-center text-xs text-gray-500">
              Transmisiones optimizadas con bajo consumo de datos para receptores rurales.
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
