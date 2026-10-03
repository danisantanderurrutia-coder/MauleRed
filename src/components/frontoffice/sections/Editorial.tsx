import React from 'react';
import { 
  BookOpen, 
  Radio, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  ExternalLink, 
  Compass, 
  Users, 
  Flame, 
  Droplet,
  Globe,
  Share2
} from 'lucide-react';

import { Corresponsales } from './Corresponsales';
import { useAppData } from '../../../context/AppDataContext';
import { EditorialTab } from '../../../types';

export interface FriendlyMedia {
  id: string;
  name: string;
  dialOrFormat: string;
  territory: string;
  description: string;
  badge: string;
  iconType: 'radio' | 'prensa' | 'tv' | 'digital';
}

export const FRIENDLY_MEDIAS: FriendlyMedia[] = [
  {
    id: 'med-1',
    name: 'Radio Cristalina de Panimávida',
    dialOrFormat: '107.9 FM',
    territory: 'Panimávida & Colbún',
    description: 'Voz histórica de las termas, artesanas en crin y familias del valle cordillerano.',
    badge: 'Radio Comunitaria',
    iconType: 'radio'
  },
  {
    id: 'med-2',
    name: 'Radio Ancoa de Linares',
    dialOrFormat: '103.5 FM',
    territory: 'Linares & Cuenca Achibueno',
    description: 'Periodismo ciudadano y cobertura de servicios esenciales en la capital provincial.',
    badge: 'Prensa Provincial',
    iconType: 'radio'
  },
  {
    id: 'med-3',
    name: 'Radio Innovadora de Cauquenes',
    dialOrFormat: '95.5 FM',
    territory: 'Cauquenes & Secano Interior',
    description: 'Defensa de viñedos campesinos patrimoniales y problemáticas del agua en la costa.',
    badge: 'Emisora del Secano',
    iconType: 'radio'
  },
  {
    id: 'med-4',
    name: 'Radio Perquilauquén de Parral',
    dialOrFormat: '98.7 FM',
    territory: 'Parral & Retiro',
    description: 'Sintonía directa con parceleros arroceros, trabajadores de temporada y juntas de vecinos.',
    badge: 'Faena Campesina',
    iconType: 'radio'
  },
  {
    id: 'med-5',
    name: 'Periódico Resumen del Maule',
    dialOrFormat: 'Edición Digital & Papel',
    territory: 'Talca, Curicó y Linares',
    description: 'Investigación socioambiental independiente y fiscalización de áridos e industrias.',
    badge: 'Investigación Popular',
    iconType: 'prensa'
  },
  {
    id: 'med-6',
    name: 'Radio Konexión San Javier',
    dialOrFormat: 'Señal Online Comunitaria',
    territory: 'San Javier & Loncomilla',
    description: 'Espacio cultural abierto para artistas populares, memoria y problemáticas vecinales.',
    badge: 'Cultura & Territorio',
    iconType: 'radio'
  },
  {
    id: 'med-7',
    name: 'Colectivo El Melado Cordillera',
    dialOrFormat: 'Boletín Radial Campesino',
    territory: 'Cajón del Melado & Precordillera',
    description: 'Crónicas de arrieros, trashumancia andina y rescate de tradiciones de alta montaña.',
    badge: 'Crónica Arriera',
    iconType: 'digital'
  },
  {
    id: 'med-8',
    name: 'Radio Comunitaria Isla de Maipo / Red Sur',
    dialOrFormat: '107.5 FM',
    territory: 'Red de Emisoras Libres',
    description: 'Intercambio de cápsulas radiales educativas y campañas de soberanía alimentaria.',
    badge: 'Red de Radios Libres',
    iconType: 'radio'
  },
  {
    id: 'med-9',
    name: 'Medio Digital El Ciudadano Rural',
    dialOrFormat: 'Prensa Libre Web',
    territory: 'Centro Sur de Chile',
    description: 'Articulación informativa con asambleas de APR y organizaciones socioambientales.',
    badge: 'Prensa Cooperativa',
    iconType: 'digital'
  },
  {
    id: 'med-10',
    name: 'La Voz de Longaví Popular',
    dialOrFormat: 'Podcast & Altoparlante Comunitario',
    territory: 'Longaví Rural',
    description: 'Información sobre ferias libres, avisos de trueque y faenas agrícolas familiares.',
    badge: 'Comunidad Rural',
    iconType: 'digital'
  },
  {
    id: 'med-11',
    name: 'Señal Popular Radio Bío-Bío Red Sur',
    dialOrFormat: '96.9 FM',
    territory: 'Macro-zona Sur',
    description: 'Enlace para alertas de emergencia climatológica, catástrofes y ayuda mutua.',
    badge: 'Red Solidaria',
    iconType: 'radio'
  },
  {
    id: 'med-12',
    name: 'Canal Comunitario del Secano',
    dialOrFormat: 'Streaming & Video Móvil',
    territory: 'Pelluhue & Chanco',
    description: 'Cobertura de pescadores artesanales, algueras y ferias costeras populares.',
    badge: 'Pescadores & Costa',
    iconType: 'tv'
  }
];

interface EditorialProps {
  onSelectArticle?: (articleId: string) => void;
}

export const Editorial: React.FC<EditorialProps> = ({ onSelectArticle }) => {
  const { editorialTab, setEditorialTab } = useAppData();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Selector de Pestañas de la Sección Editorial */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border-2 border-theme-border shadow-sm flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setEditorialTab('editorial')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            editorialTab === 'editorial'
              ? 'bg-theme-primary text-white shadow-md ring-2 ring-theme-accent scale-102'
              : 'text-theme-textMain hover:bg-theme-surfaceSoft'
          }`}
        >
          <BookOpen size={16} />
          <span>1. Editorial (Misión & Visión)</span>
        </button>

        <button
          type="button"
          onClick={() => setEditorialTab('corresponsales')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            editorialTab === 'corresponsales'
              ? 'bg-theme-primary text-white shadow-md ring-2 ring-theme-accent scale-102'
              : 'text-theme-textMain hover:bg-theme-surfaceSoft'
          }`}
        >
          <Users size={16} />
          <span>2. Corresponsales del Maule Sur</span>
        </button>

        <button
          type="button"
          onClick={() => setEditorialTab('redes_amigas')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            editorialTab === 'redes_amigas'
              ? 'bg-theme-primary text-white shadow-md ring-2 ring-theme-accent scale-102'
              : 'text-theme-textMain hover:bg-theme-surfaceSoft'
          }`}
        >
          <Share2 size={16} />
          <span>3. Redes Amigas (Red 6x2)</span>
        </button>
      </div>

      {/* VISTA 1: EDITORIAL (MISIÓN Y VISIÓN) */}
      {(editorialTab === 'editorial') && (
        <div className="space-y-8 animate-fadeIn">
          {/* Cabecera */}
          <div className="bg-gradient-to-r from-[#1b4332] via-[#143527] to-[#0c1f17] text-white p-6 sm:p-8 rounded-3xl shadow-md border border-[#2d6a4f]/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-white/10 rounded-2xl text-amber-300 shadow-inner">
                  <BookOpen size={28} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider block">
                    Declaración de Principios & Comunicación Popular
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                    Línea Editorial & Misión Comunitaria
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-2xl">
                    Nuestra vocación nace en la tierra, las aguas y la voz de los pueblos del Maule Sur.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-black/40 px-3.5 py-2 rounded-xl text-xs font-bold border border-white/10 self-start md:self-auto text-amber-300">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Medio Sin Publicidad Financiera ni Político-Partidista</span>
              </div>
            </div>
          </div>

      {/* 2. Bloque Central: Misión y Visión Editorial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Misión */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
              <Compass size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                NUESTRO COMPROMISO COTIDIANO
              </span>
              <h3 className="text-xl font-black font-serif text-gray-950">
                Misión Editorial
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
            Ejercer un periodismo popular, hiperlocal y de utilidad cotidiana al servicio de las familias campesinas, juntas de vecinos y comités de Agua Potable Rural (APR) de las provincias de Linares y Cauquenes.
          </p>

          <div className="bg-[#f2f7f3] p-4 rounded-2xl border border-[#c2d6c7] text-xs text-gray-800 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-emerald-700 font-black">✓</span>
              <span><strong>Efecto Bolsillo:</strong> Explicamos cómo cada noticia impacta el dinero del hogar, los insumos de siembra y los precios en la feria.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-700 font-black">✓</span>
              <span><strong>Audio-Primer y Conectividad Rural:</strong> Todo hecho y reporte cuenta con cápsulas sonoras de 90 segundos optimizadas para redes 3G lentas.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-700 font-black">✓</span>
              <span><strong>Defensa del Territorio:</strong> Vigilancia ciudadana insobornable sobre el agua, las faenas de áridos y la soberanía comunitaria.</span>
            </div>
          </div>
        </div>

        {/* Visión */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900">
              <Sparkles size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                EL HORIZONTE QUE CONSTRUIMOS
              </span>
              <h3 className="text-xl font-black font-serif text-gray-950">
                Visión Editorial
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
            Consolidar la mayor red libre, descentralizada y autogestionada de comunicación en el centro-sur de Chile, donde cada rincón campesino tenga un corresponsal comunitario con voz y peso en la discusión pública.
          </p>

          <div className="bg-[#fffbf2] p-4 rounded-2xl border border-[#e8d2a6] text-xs text-gray-800 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-amber-700 font-black">★</span>
              <span><strong>Prensa Sin Patrones:</strong> Sin pauta editorial impuesta por grandes consorcios ni financiamiento condicionado por intereses extractivos.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-700 font-black">★</span>
              <span><strong>Rescate de Saberes Vivos:</strong> Difundir los oficios tradicionales (alfarería de Pilén, crin de Rari, viticultura de secano) como patrimonio inmaterial activo.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-700 font-black">★</span>
              <span><strong>Solidaridad y Ayuda Mutua:</strong> La información entendida no como mercancía, sino como herramienta de subsistencia, alivio y organización vecinal.</span>
            </div>
          </div>
        </div>

      </div>

        </div>
      )}

      {/* VISTA 2: CORRESPONSALES DEL MAULE SUR */}
      {editorialTab === 'corresponsales' && (
        <div className="space-y-6 animate-fadeIn">
          <Corresponsales onSelectArticle={onSelectArticle || (() => {})} />
        </div>
      )}

      {/* VISTA 3: REDES AMIGAS (RED DE MEDIOS COMUNITARIOS 6x2) */}
      {(editorialTab === 'redes_amigas' || editorialTab === 'editorial') && (
        <section id="redes-amigas" className="space-y-4 pt-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-gray-300 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-[#1c5274]" />
                <h3 className="text-lg font-black font-serif text-gray-950">
                  Red de Medios Amigos del Maule y Cono Sur
                </h3>
              </div>
              <p className="text-xs text-gray-700 font-medium mt-0.5">
                Cuadrícula colaborativa (6 columnas x 2 filas) de radios comunitarias, periódicos populares y colectivos de comunicación territorial.
              </p>
            </div>

            <span className="bg-[#1c5274] text-white text-xs font-black px-3 py-1 rounded-full self-start sm:self-auto shadow-xs">
              12 Medios en Red Activa
            </span>
          </div>

          {/* Cuadrícula 6x2 en Desktop, 3x4 en Tablet, 1 col en Móvil */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {FRIENDLY_MEDIAS.map((media) => (
              <div
                key={media.id}
                className="bg-white rounded-2xl p-3.5 border-2 border-gray-200 hover:border-[#1b4332] transition-all shadow-xs hover:shadow-md flex flex-col justify-between group text-left"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-300">
                      {media.badge}
                    </span>
                    <Radio size={13} className="text-[#1b4332] group-hover:scale-110 transition-transform" />
                  </div>

                  <h4 className="font-bold text-xs text-gray-950 leading-snug group-hover:text-[#1b4332] transition-colors line-clamp-2">
                    {media.name}
                  </h4>

                  <div className="text-[11px] font-black text-[#8c2d19] mt-1">
                    {media.dialOrFormat}
                  </div>

                  <p className="text-[10px] text-gray-600 mt-1.5 line-clamp-3 leading-relaxed font-medium">
                    {media.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 font-bold">
                  <span className="truncate">{media.territory}</span>
                  <span className="text-emerald-700 font-black">En red</span>
                </div>
              </div>
            ))}
          </div>

          {/* Llamado de integración a la Red */}
          <div className="bg-[#f7f3ea] p-5 rounded-2xl border border-[#d9cbb2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="font-bold text-gray-900 block">¿Perteneces a una radio comunitaria o medio popular del Maule?</span>
              <span className="text-gray-600">Compartimos despachos, cápsulas de audio y alertas de cortes sin costo alguno.</span>
            </div>
            <a
              href="https://wa.me/56984521199?text=Hola%20Red%20Maule%20Sur,%20queremos%20integrar%20nuestro%20medio%20comunitario%20a%20la%20red"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#1b4332] text-white font-bold text-xs hover:bg-[#143527] transition-all whitespace-nowrap shadow-sm"
            >
              Sumar Medio a la Red
            </a>
          </div>
        </section>
      )}

    </div>
  );
};
