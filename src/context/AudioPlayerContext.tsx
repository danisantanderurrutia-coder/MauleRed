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
    type: 'comunitaria',
    streamUrl: 'https://unlimited11-cl.dps.live/cooperativafm/mp3/icecast.audio'
  },
  {
    id: 'cristalina-panimavida',
    name: 'Radio Cristalina de Panimávida',
    dial: '107.9 FM',
    location: 'Panimávida y Colbún',
    currentShow: 'Amanecer Campesino & Noticias del Valle',
    type: 'comunitaria',
    streamUrl: 'https://unlimited3-cl.dps.live/biobiosantiago/mp3/icecast.audio'
  },
  {
    id: 'radio-ancoa',
    name: 'Radio Ancoa de Linares',
    dial: '103.5 FM',
    location: 'Linares',
    currentShow: 'Prensa Provincial Maule Sur',
    type: 'regional',
    streamUrl: 'https://unlimited11-cl.dps.live/cooperativafm/mp3/icecast.audio'
  },
  {
    id: 'radio-innovadora-cauquenes',
    name: 'Radio Innovadora de Cauquenes',
    dial: '95.5 FM',
    location: 'Cauquenes y Secano Costero',
    currentShow: 'Voces del Secano Interior',
    type: 'popular',
    streamUrl: 'https://unlimited3-cl.dps.live/biobiosantiago/mp3/icecast.audio'
  },
  {
    id: 'radio-parral',
    name: 'Radio Perquilauquén de Parral',
    dial: '98.7 FM',
    location: 'Parral y Retiro',
    currentShow: 'La Mañana del Arroz y la Tierra',
    type: 'popular',
    streamUrl: 'https://unlimited11-cl.dps.live/cooperativafm/mp3/icecast.audio'
  },
  {
    id: 'radio-biobio',
    name: 'Radio Bío-Bío Red Sur',
    dial: '96.9 FM',
    location: 'Cobertura Nacional Popular',
    currentShow: 'Radiograma & Reportes Regionales',
    type: 'popular',
    streamUrl: 'https://unlimited3-cl.dps.live/biobiosantiago/mp3/icecast.audio'
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

  const [activeCapsule, setActiveCapsule] = useState<{
    id: string;
    title: string;
    author: string;
    url: string;
    isPlaying: boolean;
  } | null>(null);

  // Instancias de Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const radioAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthAudioRef = useRef<{ ctx: AudioContext; osc: OscillatorNode; gain: GainNode } | null>(null);

  const startWebAudioRadio = React.useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Tono armónico cálido suave (onda triangular 220Hz La campesino)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.02 * (isMuted ? 0 : radioVolume), ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      synthAudioRef.current = { ctx, osc, gain };
    } catch {
      // Autoplay policy fallback
    }
  }, [isMuted, radioVolume]);

  const stopWebAudioRadio = React.useCallback(() => {
    if (synthAudioRef.current) {
      try {
        synthAudioRef.current.osc.stop();
        synthAudioRef.current.ctx.close();
      } catch {
        // cleanup ignore
      }
      synthAudioRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Instancia para cápsulas
    audioRef.current = new Audio();
    audioRef.current.onended = () => {
      setActiveCapsule(prev => prev ? { ...prev, isPlaying: false } : null);
    };
    audioRef.current.onerror = () => {
      console.warn('Capsule audio error, fallback handled');
    };

    // Instancia para radio en vivo
    radioAudioRef.current = new Audio();
    radioAudioRef.current.onerror = () => {
      console.warn('Radio stream fallback triggered');
      startWebAudioRadio();
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (radioAudioRef.current) {
        radioAudioRef.current.pause();
        radioAudioRef.current = null;
      }
      stopWebAudioRadio();
    };
  }, [startWebAudioRadio, stopWebAudioRadio]);

  const selectStation = (stationId: string) => {
    setSelectedStationId(stationId);
    const station = POPULAR_RADIO_STATIONS.find(s => s.id === stationId);
    if (isRadioPlaying && station) {
      stopWebAudioRadio();
      if (radioAudioRef.current && station.streamUrl) {
        radioAudioRef.current.src = station.streamUrl;
        radioAudioRef.current.volume = isMuted ? 0 : radioVolume;
        radioAudioRef.current.play().catch(() => {
          startWebAudioRadio();
        });
      } else {
        startWebAudioRadio();
      }
    }
  };

  const toggleRadio = () => {
    if (isRadioPlaying) {
      setIsRadioPlaying(false);
      if (radioAudioRef.current) {
        radioAudioRef.current.pause();
      }
      stopWebAudioRadio();
    } else {
      // Detener cápsula si está sonando
      if (activeCapsule) {
        setActiveCapsule(prev => prev ? { ...prev, isPlaying: false } : null);
        if (audioRef.current) audioRef.current.pause();
      }
      setIsRadioPlaying(true);
      if (radioAudioRef.current && selectedStation?.streamUrl) {
        radioAudioRef.current.src = selectedStation.streamUrl;
        radioAudioRef.current.volume = isMuted ? 0 : radioVolume;
        radioAudioRef.current.play().catch(() => {
          startWebAudioRadio();
        });
      } else {
        startWebAudioRadio();
      }
    }
  };

  const updateVolume = (vol: number) => {
    setRadioVolume(vol);
    if (radioAudioRef.current) {
      radioAudioRef.current.volume = isMuted ? 0 : vol;
    }
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : vol;
    }
    if (synthAudioRef.current) {
      synthAudioRef.current.gain.gain.setValueAtTime(isMuted ? 0 : 0.02 * vol, synthAudioRef.current.ctx.currentTime);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (synthAudioRef.current) {
        synthAudioRef.current.gain.gain.setValueAtTime(next ? 0 : 0.02 * radioVolume, synthAudioRef.current.ctx.currentTime);
      }
      if (radioAudioRef.current) {
        radioAudioRef.current.muted = next;
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
      if (radioAudioRef.current) radioAudioRef.current.pause();
      stopWebAudioRadio();
    }

    if (activeCapsule?.id === id && activeCapsule.isPlaying) {
      pauseCapsule();
      return;
    }

    setActiveCapsule({ id, title, author, url, isPlaying: true });

    if (audioRef.current) {
      audioRef.current.src = url || '/audio/capsula_demo.wav';
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
        setRadioVolume: updateVolume,
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
