import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Sparkles, 
  Mic, 
  Users, 
  Bot, 
  ShieldAlert, 
  HeartHandshake, 
  Compass, 
  Drama, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  MessageSquare, 
  Lightbulb, 
  Zap, 
  Share2, 
  Volume2, 
  Clock, 
  Leaf, 
  ArrowRight,
  Sliders,
  Flame,
  Check
} from 'lucide-react';

interface SlideData {
  id: number;
  category: string;
  categoryIcon: React.ReactNode;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  keyTakeaway: string;
  points: {
    title: string;
    description: string;
    badge?: string;
  }[];
  quote?: {
    text: string;
    author: string;
  };
}

const PITCH_SLIDES: SlideData[] = [
  // SLIDE 1: El Manifiesto Territorial
  {
    id: 1,
    category: 'El Manifiesto Territorial',
    categoryIcon: <Compass size={15} className="text-emerald-400" />,
    title: 'La Radio Comunitaria como Antídoto a la Soledad Rural',
    subtitle: 'Nuestra competencia no es la televisión metropolitana ni las redes sociales: es el aislamiento geográfico y la fragilidad del bolsillo campesino.',
    image: './images/maule_campo_cielo.jpg',
    imageAlt: 'Campo del Maule con colinas verdes y cielo majestuoso',
    imageCaption: 'Valle Central del Maule: soberanía informativa desde las cuencas.',
    keyTakeaway: 'La radio no es solo un transmisor: es el tejido vivo que conecta a las comunidades antes de que la noticia deba pasar por Santiago.',
    points: [
      {
        title: 'El Criterio del Bolsillo',
        description: 'Información con valor monetario y de supervivencia: insumos agrícolas, turnos de riego, subsidios públicos explicados sin trámites engorrosos y alertas agroclimáticas oportunas.',
        badge: 'Impacto Real'
      },
      {
        title: 'Enfoque de Cuencas Vivas',
        description: 'Los ríos (Achibueno, Melado, Loncomilla, Perquilauquén) definen la identidad de nuestros pueblos, no las divisiones administrativas de oficina central.',
        badge: 'Territorial'
      },
      {
        title: 'Soberanía Sonora 3G & Offline',
        description: 'Formatos en audio comprimido que se descargan con un segundo de cobertura y suenan en la cabina del tractor o en una radio a pilas durante temporales.',
        badge: 'Resiliencia'
      }
    ],
    quote: {
      text: 'Cuando se corta la fibra óptica en un invierno cordillerano, la radio popular y el audio vecinal son lo único que mantiene encendida la comunidad.',
      author: 'Principios de Redacción Territorial'
    }
  },

  // SLIDE 2: Corresponsalías de Raíz
  {
    id: 2,
    category: 'El Manifiesto Territorial',
    categoryIcon: <Users size={15} className="text-emerald-400" />,
    title: 'Corresponsales de Raíz: El Saber que Brota del Surco',
    subtitle: 'La credibilidad no se compra con micrófonos caros; se construye con personas que viven y trabajan en el mismo suelo.',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cosecha agrícola y manos en la tierra rural',
    imageCaption: 'Cronistas de territorio: agricultores, dirigentas vecinales y docentes rurales.',
    keyTakeaway: 'Un mensaje de audio de 90 segundos grabado en el camino vecinal vale más que un despacho de estudio central.',
    points: [
      {
        title: 'La Dirigenta de Agua Potable (APR)',
        description: 'Conoce cada filtración de matriz, las fechas de corte y la verdad sobre los aforos de los pozos. Su testimonio genera confianza inmediata.',
        badge: 'Gestión Local'
      },
      {
        title: 'El Productor y la Faena Agrícola',
        description: 'Sabe cuánto pagan el fardo en la feria, cuándo pega la helada negra y qué insumos están escaseando en los almacenes rurales.',
        badge: 'Voz Productiva'
      },
      {
        title: 'El Educador Rural y de Salud',
        description: 'El termómetro de las familias en las postas rurales y escuelas unidocentes. Comunican necesidades de traslado y campañas de salud.',
        badge: 'Tejido Social'
      }
    ],
    quote: {
      text: 'No pedimos títulos de periodismo de oficina: pedimos honestidad comunitaria, afecto por el valle y conocimiento del territorio.',
      author: 'Criterio de Redacción de Cuenca'
    }
  },

  // SLIDE 3: Radioteatro & Ficción Sonora (Matrices Creativas)
  {
    id: 3,
    category: 'Radioteatro & Ficción Sonora',
    categoryIcon: <Drama size={15} className="text-emerald-400" />,
    title: 'Matrices de Ficción Sonora: Reencantar la Imaginación',
    subtitle: 'El radioteatro no es nostalgia del pasado; es el formato de mayor retención porque despierta la imaginación y reúne a toda la familia frente al parlante.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Estudio de grabación de sonido y audífonos',
    imageCaption: 'Laboratorio de audio: estimulando la creatividad local sin corsés impuestos.',
    keyTakeaway: 'No imponemos guiones cerrados: entregamos marcos conceptuales para que cada comunidad descubra y narre sus propias historias.',
    points: [
      {
        title: 'Matriz 1: Memoria Viva y Raíz de la Cuenca',
        description: 'Arquetipo para rescatar las vivencias de la transformación del campo, los relatos de antiguos oficios, los recuerdos de temporales y la historia oral no documentada.',
        badge: 'Memoria Histórica'
      },
      {
        title: 'Matriz 2: Geografía Sagrada y Misterio del Monte',
        description: 'Arquetipo para explorar la relación poética y enigmática con la naturaleza: los espíritus del bosque nativo, los rumores del río de noche y los enigmas cordilleranos.',
        badge: 'Mitología Local'
      },
      {
        title: 'Efectos Sonoros Orgánicos (Foley Popular)',
        description: 'Aprovechar los sonidos del propio entorno: ramas secas, acequias, viento en los álamos y el fogón como instrumentos de dramatización.',
        badge: 'Arte Sonoro'
      }
    ]
  },

  // SLIDE 4: Radioteatro & Participación Juvenil
  {
    id: 4,
    category: 'Radioteatro & Ficción Sonora',
    categoryIcon: <Sparkles size={15} className="text-emerald-400" />,
    title: 'Sátira Cotidiana y Microficción Escolar',
    subtitle: 'El humor popular y los lenguajes juveniles como imanes para que las nuevas generaciones se apropien de la frecuencia comunitaria.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Jóvenes compartiendo al aire libre en comunidad',
    imageCaption: 'Creación comunitaria: liceos rurales y vecinos produciendo cápsulas de 60 segundos.',
    keyTakeaway: 'Reírse de las peripecias diarias humaniza los problemas y activa la creatividad de los jóvenes creadores.',
    points: [
      {
        title: 'Matriz 3: Sátira Costumbrista y Pedagogía',
        description: 'El humor como vehículo educativo: pequeñas dramatizaciones sobre el enredo de las boletas eléctricas, los trámites absurdos de ventanilla y la astucia campesina.',
        badge: 'Humor Crítico'
      },
      {
        title: 'Matriz 4: Laboratorios de Microficción Escolar',
        description: 'Convocatorias abiertas donde talleres de colegios rurales crean relatos de 60 a 90 segundos grabados con sus teléfonos móviles y musicalizados por la radio.',
        badge: 'Apertura Juvenil'
      },
      {
        title: 'Distribución Transmedia',
        description: 'El radioteatro sale al aire en FM, pero se comparte en TikTok, Reels y Spotify como piezas sonoras virales que enorgullecen al territorio.',
        badge: 'Multiplataforma'
      }
    ]
  },

  // SLIDE 5: Inteligencia Artificial Crítica
  {
    id: 5,
    category: 'IA Lúcida y Comunitaria',
    categoryIcon: <ShieldAlert size={15} className="text-emerald-400" />,
    title: 'Mirada Crítica: Los Riesgos de la Homogeneización',
    subtitle: 'Ni tecnofobia retrógrada ni deslumbramiento ingenuo: entendemos con claridad qué peligros encierra la IA para la cultura local.',
    image: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Claroscuro y reflexión ética tecnológica',
    imageCaption: 'Vigilancia ética: proteger el dialecto campesino y la veracidad territorial.',
    keyTakeaway: 'Un modelo de lenguaje entrenado en servidores de Silicon Valley no sabe cuánto calienta un mate en el invierno de la precordillera.',
    points: [
      {
        title: 'El Freno a la Homogeneización Cultural',
        description: 'La IA tiende a borrar modismos, ritmos y entonaciones locales para estandarizar el lenguaje en un tono periodístico neutro y frío. Eso lo combatimos frontalmente.',
        badge: 'Alerta Cultural'
      },
      {
        title: 'Riesgo de Alucinación en Datos Sensibles',
        description: 'En materias delicadas (derechos de agua, deudas agrícolas, subsidios, emergencias climáticas), jamás se publica una sola coma generada sin verificación humana.',
        badge: 'Rigor Territorial'
      },
      {
        title: 'Rechazo al Periodismo Perezoso',
        description: 'No aceptamos notas autogeneradas de oficina que reemplacen el trabajo de caminar, observar la cosecha o escuchar las quejas vecinales cara a cara.',
        badge: 'Ética Informativa'
      }
    ]
  },

  // SLIDE 6: Inteligencia Artificial a Favor
  {
    id: 6,
    category: 'IA Lúcida y Comunitaria',
    categoryIcon: <Zap size={15} className="text-emerald-400" />,
    title: 'La IA como Secretaria Técnica Popular',
    subtitle: 'A favor de la IA cuando democratiza el tiempo, derrumba barreras burocráticas y potencia las manos de los equipos comunitarios.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Ondas digitales etéreas en tonalidades verdes orgánicas',
    imageCaption: 'Multiplicación de capacidades: la tecnología al servicio de la voz popular.',
    keyTakeaway: '«La IA es secretaria de redacción; nunca el corazón, ni el criterio, ni el afecto de la radio».',
    points: [
      {
        title: 'Traductora de Jerga Burocrática',
        description: 'Procesa decretos de 40 páginas, leyes de riego o reglamentos de subsidios y los traduce a las 3 preguntas clave: ¿A quién beneficia? ¿Cuánto cubre? ¿Qué documento llevo el lunes?',
        badge: 'Utilidad Directa'
      },
      {
        title: 'Desgrabación Rápida de Audios de Faena',
        description: 'Un corresponsal envía un audio de WhatsApp de 5 minutos mientras maneja el tractor o riega; la IA extrae los hechos centrales y genera el borrador para que el editor pula.',
        badge: 'Eficiencia'
      },
      {
        title: 'Asistente de Escaletas y Foley Sonoro',
        description: 'Sugiere estructuras de guiones, orden dramático y listas de efectos sonoros para facilitar el montaje de radioteatros en comunidades pequeñas.',
        badge: 'Soporte Creativo'
      }
    ]
  },

  // SLIDE 7: Imanes de Comunidad
  {
    id: 7,
    category: 'Imanes de Comunidad',
    categoryIcon: <HeartHandshake size={15} className="text-emerald-400" />,
    title: 'Fórmulas Vivas de Participación y Encuentro',
    subtitle: 'Si la radio no soluciona problemas ni genera comunidad real, se convierte en un simple monólogo que la gente apaga.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Micrófono de transmisión comunitaria vintage',
    imageCaption: 'Plaza pública sonora: donde el vecino es protagonista y no simple espectador.',
    keyTakeaway: 'La radio popular funciona cuando la gente siente que el micrófono es de su propiedad.',
    points: [
      {
        title: 'Bolsa de Trueque Campesino',
        description: 'Espacio al aire y en la web para intercambiar sin dinero: guano por forraje, plantines de tomate por leña seca, herramientas por ayuda de faena.',
        badge: 'Economía Solidaria'
      },
      {
        title: 'Semáforo de Precios de Ferias',
        description: 'Publicación de precios reales de hortalizas, papas y ganado para evitar que los intermediarios abusen castigando al pequeño agricultor.',
        badge: 'Bolsillo'
      },
      {
        title: 'Asambleas Radiales Abiertas',
        description: 'Conexión en directo con autoridades locales y encargados de servicios para responder dudas vecinales al aire sin filtro partidista.',
        badge: 'Democracia Local'
      }
    ]
  },

  // SLIDE 8: Ecosistema Híbrido
  {
    id: 8,
    category: 'Ecosistema Híbrido',
    categoryIcon: <Radio size={15} className="text-emerald-400" />,
    title: 'El Puente Técnico: Del Dial FM a la Red 3G',
    subtitle: 'Una arquitectura accesible que combina la onda hertziana analógica con cápsulas digitales para no dejar a nadie atrás.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Campos y colinas doradas bajo el sol del atardecer',
    imageCaption: 'Sinergia tecnológica: lo análogo resiste temporales, lo digital amplifica redes.',
    keyTakeaway: 'Construimos una red mutante: firme en el territorio físico y ligera en los canales digitales.',
    points: [
      {
        title: 'Onda Sonora Hertziana (FM)',
        description: 'La única señal que entra a los rincones profundos de la precordillera donde no llega la fibra ni la antena de telefonía celular.',
        badge: 'Cobertura Universal'
      },
      {
        title: 'Cápsulas de WhatsApp (60 a 90s)',
        description: 'Archivos ultra ligeros de menos de 1 MB que circulan de mano en mano entre comités vecinales y familias campesinas sin gastar saldo.',
        badge: 'Bajo Consumo'
      },
      {
        title: 'Plataforma Web & Archivo Comunitario',
        description: 'Un repositorio centralizado donde los artículos, las fichas de utilidad y los podcasts quedan guardados como patrimonio territorial vivo.',
        badge: 'Memoria Digital'
      }
    ],
    quote: {
      text: 'La verdadera modernidad no es copiar las modas de la capital, sino dotar a las comunidades rurales de las mejores herramientas para contar su propia verdad.',
      author: 'Manifiesto Maule Red'
    }
  }
];

export const ComunitariasPitchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlideIndex((prev) => (prev < PITCH_SLIDES.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slide = PITCH_SLIDES[currentSlideIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Contenedor Principal con Fondo del Paisaje del Maule */}
      <div 
        className="relative bg-[#0c1218] border border-emerald-500/40 rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-gray-100"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10, 18, 15, 0.94), rgba(12, 18, 24, 0.96)), url('./images/maule_campo_cielo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        
        {/* Cabecera Superior: Contexto y Navegación de Categorías */}
        <div className="bg-[#0f191f]/90 backdrop-blur-md px-5 py-4 border-b border-emerald-950/80 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 flex-shrink-0">
              <Radio size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Pitch & Manifiesto Estratégico
                </span>
                <span className="text-gray-400 text-xs hidden sm:inline">•</span>
                <span className="text-gray-300 text-xs font-semibold hidden sm:inline">
                  Red de Radios Populares del Maule
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
                Maule Red: Soberanía Sonora, Radioteatro e IA Lúcida
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Contador de Slides */}
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-gray-900/80 text-emerald-400 border border-emerald-900/50">
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(PITCH_SLIDES.length).padStart(2, '0')}
            </span>

            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-gray-700/60"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Barra de progreso / Píldoras de Diapositivas */}
        <div className="bg-[#0b1216]/95 border-b border-emerald-950/60 px-5 py-2.5 flex items-center gap-1.5 overflow-x-auto">
          {PITCH_SLIDES.map((s, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400'
                    : 'bg-gray-900/60 text-gray-400 hover:text-gray-200 hover:bg-gray-800/80 border border-gray-800/50'
                }`}
              >
                <span>{s.categoryIcon}</span>
                <span className="text-[11px]">{idx + 1}. {s.category}</span>
              </button>
            );
          })}
        </div>

        {/* Cuerpo del Slide */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Encabezado del Slide Actual */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                {slide.categoryIcon}
                <span>{slide.category}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight leading-snug">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/80 mt-1 max-w-3xl leading-relaxed">
              {slide.subtitle}
            </p>
          </div>

          {/* Grilla Visual: Imagen Destacada + Puntos Conceptuales */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Columna Izquierda: Imagen y Takeaway (5 cols) */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-xl group">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3.5">
                  <span className="text-[11px] text-gray-200 font-medium">
                    {slide.imageCaption}
                  </span>
                </div>
              </div>

              {/* Tesis / Takeaway Destacado */}
              <div className="bg-emerald-950/40 border border-emerald-800/40 p-4 rounded-2xl text-xs sm:text-sm text-emerald-200 leading-relaxed shadow-sm">
                <div className="flex items-center gap-2 font-bold text-emerald-300 text-xs mb-1">
                  <Lightbulb size={15} />
                  <span>Idea Fuerza</span>
                </div>
                {slide.keyTakeaway}
              </div>

              {/* Cita si existe */}
              {slide.quote && (
                <div className="bg-gray-900/60 border border-gray-800 p-4 rounded-2xl text-xs text-gray-300 italic">
                  <p>«{slide.quote.text}»</p>
                  <p className="text-right text-[10px] text-emerald-400 font-bold not-italic mt-2">
                    — {slide.quote.author}
                  </p>
                </div>
              )}
            </div>

            {/* Columna Derecha: Tarjetas Conceptuales Claras y Digestibles (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5">
              {slide.points.map((pt, i) => (
                <div
                  key={i}
                  className="bg-[#141b22]/90 hover:bg-[#18232c] border border-emerald-900/40 hover:border-emerald-600/50 p-4 sm:p-5 rounded-2xl transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-950 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center border border-emerald-800/60">
                        {i + 1}
                      </span>
                      <span>{pt.title}</span>
                    </h3>
                    {pt.badge && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex-shrink-0">
                        {pt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-8">
                    {pt.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Barra Inferior de Navegación de Diapositivas */}
        <div className="bg-[#0b1216]/95 border-t border-emerald-950/80 px-6 py-4 flex items-center justify-between gap-4">
          
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentSlideIndex === 0
                ? 'opacity-40 cursor-not-allowed text-gray-500 bg-gray-900'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Anterior</span>
          </button>

          {/* Dots Indicator */}
          <div className="hidden sm:flex items-center gap-1.5">
            {PITCH_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentSlideIndex(dotIdx)}
                className={`transition-all rounded-full cursor-pointer ${
                  dotIdx === currentSlideIndex
                    ? 'w-6 h-2 bg-emerald-400'
                    : 'w-2 h-2 bg-gray-700 hover:bg-gray-500'
                }`}
                aria-label={`Ir al slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.min(PITCH_SLIDES.length - 1, prev + 1))}
            disabled={currentSlideIndex === PITCH_SLIDES.length - 1}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentSlideIndex === PITCH_SLIDES.length - 1
                ? 'opacity-40 cursor-not-allowed text-gray-500 bg-gray-900'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/60 ring-1 ring-emerald-400'
            }`}
          >
            <span>Siguiente</span>
            <ChevronRight size={16} />
          </button>

        </div>

      </div>
    </div>
  );
};
