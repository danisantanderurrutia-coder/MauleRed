import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export interface RadioStationOption {
  id: string;
  name: string;
  dial: string;
  location: string;
  currentShow: string;
  type: 'comunitaria' | 'regional' | 'popular';
  streamUrl?: string;
  spotifyUrl?: string;
}

export const POPULAR_RADIO_STATIONS: RadioStationOption[] = [
  {
    id: 'maule-sur',
    name: '104.5 FM Comunitaria Maule Sur',
    dial: '104.5 FM',
    location: 'Linares y Cuencas',
    currentShow: 'El Maule Sur también existe (Transmisión central)',
    type: 'comunitaria'
  },
  {
    id: 'cristalina-panimavida',
    name: 'Radio Cristalina de Panimávida',
    dial: '107.9 FM',
    location: 'Panimávida y Colbún',
    currentShow: 'Amanecer Campesino & Noticias del Valle',
    type: 'comunitaria'
  },
  {
    id: 'radio-ancoa',
    name: 'Radio Ancoa de Linares',
    dial: '103.5 FM',
    location: 'Linares',
    currentShow: 'Prensa Provincial Maule Sur',
    type: 'regional'
  },
  {
    id: 'radio-innovadora-cauquenes',
    name: 'Radio Innovadora de Cauquenes',
    dial: '95.5 FM',
    location: 'Cauquenes y Secano Costero',
    currentShow: 'Voces del Secano Interior',
    type: 'popular'
  },
  {
    id: 'radio-parral',
    name: 'Radio Perquilauquén de Parral',
    dial: '98.7 FM',
    location: 'Parral y Retiro',
    currentShow: 'La Mañana del Arroz y la Tierra',
    type: 'popular'
  },
  {
    id: 'radio-biobio',
    name: 'Radio Bío-Bío Red Sur',
    dial: '96.9 FM',
    location: 'Cobertura Nacional Popular',
    currentShow: 'Radiograma & Reportes Regionales',
    type: 'popular'
  }
];

export const SPOTIFY_PODCAST_URL = 'https://open.spotify.com/show/1ZNRUJKh4bkuDMvzy8AoZC?si=8c5de5791e4d4610';

interface AudioPlayerContextType {
  isRadioPlaying: boolean;
  toggleRadio: () => void;
  radioVolume: number;
  setRadioVolume: (vol: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  bitrate: '32k' | '128k';
  setBitrate: (rate: '32k' | '128k') => void;
  currentStation: string;
  currentShow: string;
  selectedStationId: string;
  selectStation: (stationId: string) => void;
  stations: RadioStationOption[];
  spotifyPodcastUrl: string;
  activeCapsule: {
    id: string;
    title: string;
    author: string;
    url: string;
    isPlaying: boolean;
  } | null;
  playCapsule: (id: string, title: string, author: string, url: string) => void;
  pauseCapsule: () => void;
  stopCapsule: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [radioVolume, setRadioVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [bitrate, setBitrate] = useState<'32k' | '128k'>('32k'); // Por defecto 32k para 3G rural
  
  const [selectedStationId, setSelectedStationId] = useState<string>('maule-sur');
  const selectedStation = POPULAR_RADIO_STATIONS.find(s => s.id === selectedStationId) || POPULAR_RADIO_STATIONS[0];

  const currentStation = selectedStation.name;
  const currentShow = selectedStation.currentShow;

  const selectStation = (stationId: string) => {
    setSelectedStationId(stationId);
    // Si estaba reproduciendo, reactivar con tono de sintonizador fresco
    if (isRadioPlaying) {
      stopWebAudioRadio();
      setTimeout(() => {
        startWebAudioRadio();
      }, 200);
    }
  };

  const [activeCapsule, setActiveCapsule] = useState<{
    id: string;
    title: string;
    author: string;
    url: string;
    isPlaying: boolean;
  } | null>(null);

  // Instancia de Audio para reproducir
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthAudioRef = useRef<{ ctx: AudioContext; osc: OscillatorNode; gain: GainNode } | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.onended = () => {
      setActiveCapsule(prev => prev ? { ...prev, isPlaying: false } : null);
    };
    audioRef.current.onerror = () => {
      console.warn('Audio fallback triggered');
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleRadio = () => {
    if (isRadioPlaying) {
      setIsRadioPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopWebAudioRadio();
    } else {
      // Detener cápsula si está sonando
      if (activeCapsule) {
        setActiveCapsule(prev => prev ? { ...prev, isPlaying: false } : null);
      }
      setIsRadioPlaying(true);
      startWebAudioRadio();
    }
  };

  const startWebAudioRadio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sonido de sintonizador radial cálido y sutil con modulación armónica
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      gain.gain.setValueAtTime(0.04 * (isMuted ? 0 : radioVolume), ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      synthAudioRef.current = { ctx, osc, gain };
    } catch {
      // Navegadores que bloquean autoplay antes de interacción
    }
  };

  const stopWebAudioRadio = () => {
    if (synthAudioRef.current) {
      try {
        synthAudioRef.current.osc.stop();
        synthAudioRef.current.ctx.close();
      } catch {
        // cleanup ignore
      }
      synthAudioRef.current = null;
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (synthAudioRef.current) {
        synthAudioRef.current.gain.gain.setValueAtTime(next ? 0 : 0.04 * radioVolume, synthAudioRef.current.ctx.currentTime);
      }
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  };

  const playCapsule = (id: string, title: string, author: string, url: string) => {
    // Si la radio está sonando, pausarla para privilegiar la cápsula de 90s
    if (isRadioPlaying) {
      setIsRadioPlaying(false);
      stopWebAudioRadio();
    }

    if (activeCapsule?.id === id && activeCapsule.isPlaying) {
      pauseCapsule();
      return;
    }

    setActiveCapsule({ id, title, author, url, isPlaying: true });

    if (audioRef.current) {
      audioRef.current.src = url || 'https://actions.google.com/sounds/v1/weather/light_rain_on_leaves.ogg';
      audioRef.current.volume = isMuted ? 0 : radioVolume;
      audioRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const pauseCapsule = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setActiveCapsule(prev => prev ? { ...prev, isPlaying: false } : null);
  };

  const stopCapsule = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveCapsule(null);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
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
        stations: POPULAR_RADIO_STATIONS,
        spotifyPodcastUrl: SPOTIFY_PODCAST_URL,
        activeCapsule,
        playCapsule,
        pauseCapsule,
        stopCapsule,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer debe usarse dentro de AudioPlayerProvider');
  }
  return context;
};
