import React, { useState } from 'react';
import { 
  Radio, 
  Sparkles, 
  Mic, 
  Users, 
  Bot, 
  ShieldAlert, 
  HeartHandshake, 
  Compass, 
  Share2, 
  Tv, 
  Drama, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  MessageSquare, 
  Lightbulb, 
  Award,
  Zap,
  Flame,
  ArrowRight
} from 'lucide-react';

export const ComunitariasPitchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'pitch' | 'radioteatro' | 'ia_critica' | 'laboratorio'>('pitch');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12161c] border-2 border-amber-500/40 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-gray-200">
        
        {/* Cabecera del Pitch */}
        <div className="bg-gradient-to-r from-[#1c242c] via-[#241a16] to-[#17201c] p-6 border-b border-gray-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-gradient-to-br from-amber-500 to-[#b84227] rounded-2xl text-white shadow-lg flex-shrink-0">
              <Radio size={28} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="bg-amber-400 text-gray-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                  Manifiesto & Estrategia 2026-2027
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Modelo Comunitario Vivo
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                Maule Red: El Pitch Territorial de las Radios Comunitarias
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-0.5 max-w-2xl">
                Cómo transformamos la radio rural y comunitaria en una red mutante, entretenida, indispensable para el bolsillo y lúcidamente potenciada con Inteligencia Artificial.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            ✕
          </button>
        </div>

        {/* Barra de Navegación del Pitch */}
        <div className="flex items-center gap-1.5 px-6 pt-3 pb-2 bg-[#161a22] border-b border-gray-800 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('pitch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pitch'
                ? 'bg-[#b84227] text-white shadow-md ring-1 ring-amber-400/50'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Compass size={15} />
            <span>1. El Gran Pitch Territorial</span>
          </button>

          <button
            onClick={() => setActiveTab('radioteatro')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'radioteatro'
                ? 'bg-[#b84227] text-white shadow-md ring-1 ring-amber-400/50'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Drama size={15} className="text-amber-400" />
            <span>2. Radioteatro & Ficción Popular</span>
          </button>

          <button
            onClick={() => setActiveTab('ia_critica')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ia_critica'
                ? 'bg-[#b84227] text-white shadow-md ring-1 ring-amber-400/50'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Bot size={15} className="text-sky-400" />
            <span>3. Inteligencia Artificial: Lúcida & Crítica</span>
          </button>

          <button
            onClick={() => setActiveTab('laboratorio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'laboratorio'
                ? 'bg-[#b84227] text-white shadow-md ring-1 ring-amber-400/50'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Zap size={15} className="text-emerald-400" />
            <span>4. Imanes de Comunidad & Fórmulas</span>
          </button>
        </div>

        {/* Cuerpo con Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
          
          {/* TAB 1: EL PITCH */}
          {activeTab === 'pitch' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Tesis Principal */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-500/30">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Flame size={14} /> La Tesis Fundamental
                </span>
                <h3 className="text-lg font-black font-serif text-white leading-snug">
                  "La radio comunitaria no compite con la televisión ni con el algoritmo de TikTok: compite contra la soledad rural, la desinformación centralista y la fragilidad del bolsillo."
                </h3>
                <p className="text-xs text-gray-300 mt-2">
                  Cuando se corta la luz en Longaví o se enturbia el agua del APR en Vara Gruesa, las redes sociales de Santiago son inútiles. La única antena que sigue transmitiendo con una batería de auto y un micrófono es la comunitaria. Pero para que la comunidad la escuche en la calma, no podemos sonar a aburrimiento ni a panfleto: tenemos que ser <strong className="text-amber-300">sabrosos, indispensables y comunitariamente vivos</strong>.
                </p>
              </div>

              {/* 3 Pilares del Pitch */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                    1
                  </div>
                  <h4 className="font-black text-white text-base">Efecto Bolsillo Inmediato</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Si la nota no le sirve a la abuela para no perder el bono, al feriante para saber a cuánto vender la papa o al vecino para reclamar por el motor quemado, se queda corta. Noticias en 3 bloques: <em>¿Qué pasó?</em>, <em>La causa en simple</em> y <em>La solución con teléfonos útiles</em>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                    2
                  </div>
                  <h4 className="font-black text-white text-base">Red Mutante de Cuencas</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    No somos una sola radio solitaria en un cerro: somos la confederación del Achibueno, el Perquilauquén, el Loncomilla y el Maule. El contenido se despacha en cápsulas de 90 segundos que circulan por WhatsApp y se retransmiten en cadena libre.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black">
                    3
                  </div>
                  <h4 className="font-black text-white text-base">Soberanía Tecnológica 3G</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Plataforma ultra-liviana pensada para teléfonos chinos con pantallas quebradas y planes prepago en faenas agrícolas. Sin dependencias de Silicon Valley: imágenes locales, audio liviano y acceso offline instantáneo.
                  </p>
                </div>
              </div>

              {/* ¿A quién le hablamos? */}
              <div className="bg-[#181d24] p-5 rounded-2xl border border-gray-800 space-y-3">
                <h4 className="font-black text-sm text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Users size={16} /> ¿Quiénes hacen viva esta red?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
                  <div className="flex items-start gap-2.5 bg-[#12161c] p-3 rounded-xl border border-gray-800/60">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">El Corresponsal de Huerto y Tractor:</strong>
                      Don Juan en Longaví o Mateo en Cauquenes. No estudiaron periodismo en Providencia; conocen el precio del abono, la helada negra y la maña del canal de regadío.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-[#12161c] p-3 rounded-xl border border-gray-800/60">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">La Dirigenta del Agua y la Olla:</strong>
                      Rosa en Vara Gruesa o Margarita en Rari. Monitorean la turbiedad de las copas de APR, cuidan la semilla nativa y defienden el oficio tradicional frente a la copia industrial.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: RADIOTEATRO Y FICCION POPULAR */}
          {activeTab === 'radioteatro' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-purple-950/20 to-transparent border border-amber-500/30">
                <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Drama size={16} /> El Poder Olvidado de la Ficción Sonora
                </span>
                <h3 className="text-lg font-black font-serif text-white">
                  "El Radioteatro: La puerta mágica para que los jóvenes y las familias vuelvan a sentarse alrededor del parlante"
                </h3>
                <p className="text-xs text-gray-300 mt-2">
                  La ficción radial campesina fue el pegamento cultural del campo chileno durante décadas. Hoy, con micrófonos caseros, librerías de foley comunitario (hojas secas, espuelas, agua de acequia) y guiones nacidos en asambleas, el radioteatro es la herramienta de atracción comunitaria más poderosa que tenemos.
                </p>
              </div>

              {/* Ideas de Formatos de Radioteatro */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2.5 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      Serie de Misterio & Leyenda Viva
                    </span>
                    <span className="text-xs text-gray-500 font-bold">Episodios de 7 min</span>
                  </div>
                  <h4 className="font-bold text-base text-white">
                    "El Cuero del Achibueno y los Guardadores de la Niebla"
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Ficción de suspenso ecológico: relatos orales de arrieros sobre criaturas míticas que defienden las nacientes cordilleranas contra retroexcavadoras furtivas. Grabado con voces de liceanos rurales de Colbún y efectos de sonido en vivo.
                  </p>
                  <div className="text-[11px] text-amber-200/80 bg-black/30 p-2 rounded-lg font-mono">
                    💡 Impacto: Escuchado en escuelas rurales, juntas de vecinos y subido a Spotify como podcast patrimonial.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2.5 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Sátira Social & Bolsillo
                    </span>
                    <span className="text-xs text-gray-500 font-bold">Micros de 3 min</span>
                  </div>
                  <h4 className="font-bold text-base text-white">
                    "Las Desventuras de Don Teófilo y la Boleta de la Luz"
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Comedia pícara campesina donde un abuelo y su nieta enfrentan las cartas de cobro abusivo, las líneas sulfatadas y descubren cómo organizarse en el comité comunal para exigir compensaciones legales de la SEC.
                  </p>
                  <div className="text-[11px] text-emerald-200/80 bg-black/30 p-2 rounded-lg font-mono">
                    💡 Impacto: Educar en derechos del consumidor rural a través de la carcajada y la empatía cotidiana.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2.5 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                      Memoria Histórica Campesina
                    </span>
                    <span className="text-xs text-gray-500 font-bold">Temporadas Temáticas</span>
                  </div>
                  <h4 className="font-bold text-base text-white">
                    "Tierra Brava: Cuando el Valle Despertó"
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Dramatización histórica de la Reforma Agraria en el Maule Sur (Linares, Parral y Longaví), narrada desde las cocinas campesinas: la entrega de títulos, los sindicatos de inquilinos y la dignidad recobrada.
                  </p>
                  <div className="text-[11px] text-purple-200/80 bg-black/30 p-2 rounded-lg font-mono">
                    💡 Impacto: Diálogo intergeneracional entre los abuelos que vivieron la faena y los jóvenes de hoy.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2.5 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                      Concurso Escolar de Microficción
                    </span>
                    <span className="text-xs text-gray-500 font-bold">Convocatoria Abierta</span>
                  </div>
                  <h4 className="font-bold text-base text-white">
                    "Maule en 100 Segundos: Tu historia en la radio"
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Los niños y jóvenes de postas y escuelas envían audios de WhatsApp relatando historias de sus abuelos o de sus mascotas del campo. La radio agrega música, foley y los premia emitiéndolos en horario estelar.
                  </p>
                  <div className="text-[11px] text-sky-200/80 bg-black/30 p-2 rounded-lg font-mono">
                    💡 Impacto: Vinculación territorial directa con las familias y fomento a la lectoescritura oral.
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: IA CRITICA PERO A FAVOR */}
          {activeTab === 'ia_critica' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/50 via-cyan-950/20 to-transparent border border-sky-500/30">
                <span className="text-[10px] font-black uppercase text-sky-300 tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Bot size={16} /> Nuestra Postura Tecnológica
                </span>
                <h3 className="text-lg font-black font-serif text-white">
                  "Uso Crítico de la Inteligencia Artificial: La máquina es secretaria de la comunidad, nunca el corazón ni el criterio."
                </h3>
                <p className="text-xs text-gray-300 mt-2">
                  Ni luditas que le temen a la máquina, ni tecnócratas ciegos que entregan la verdad a Silicon Valley. En las radios comunitarias del Maule Sur entendemos la IA como una <strong>palanca de multiplicación popular</strong>: permite a una radio campesina de tres personas competir en velocidad y rigor con los grandes consorcios mediáticos de Santiago, siempre bajo soberanía territorial.
                </p>
              </div>

              {/* Matriz Dialéctica: Peligros vs Potencias */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Lo que RECHAZAMOS (Postura Crítica) */}
                <div className="p-5 rounded-2xl bg-red-950/25 border border-red-900/40 space-y-3">
                  <h4 className="font-black text-sm text-red-300 uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert size={16} className="text-red-400" /> Los Peligros que Combatimos
                  </h4>
                  <ul className="space-y-2.5 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">✕</span>
                      <span><strong>Homogeneización cultural:</strong> Modelos entrenados en California que no distinguen un poroto tórtola de un poroto mantenedor, ni entienden qué significa un <em>Puelche</em> en la precordillera.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">✕</span>
                      <span><strong>Alucinaciones peligrosas:</strong> Inventar teléfonos de emergencia, dosis de fertilizante o resoluciones de subsidio que dañen a las familias.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">✕</span>
                      <span><strong>Periodismo vago y desalmado:</strong> Llenar la web con artículos robóticos genéricos para ganar clicks vacíos en Google, destruyendo la confianza popular.</span>
                    </li>
                  </ul>
                </div>

                {/* Lo que ABRAZAMOS (Potencia Popular) */}
                <div className="p-5 rounded-2xl bg-emerald-950/25 border border-emerald-900/40 space-y-3">
                  <h4 className="font-black text-sm text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" /> El Uso a Favor del Pueblo
                  </h4>
                  <ul className="space-y-2.5 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>Traductora de jerga burocrática:</strong> Tomar el Diario Oficial o un informe de la DOH de 80 páginas y transformarlo en 3 preguntas humanas: <em>¿Qué pasó?</em>, <em>¿Por qué?</em> y <em>¿Qué hacemos?</em></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>Asistente de transcripción y síntesis rápida:</strong> Convertir audios de WhatsApp enviados por vecinos desde el tractor en borradores estructurados listos para ser revisados por el editor humano.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>Guionaje sonoro y foley adaptativo:</strong> Ayudar a diseñar estructuras dramáticas para radioteatros comunitarios y escalar las cápsulas a redes sociales en segundos.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* El Regla de Oro */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-3">
                <AlertCircle size={24} className="text-amber-400 flex-shrink-0" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">La Regla de Oro Comunitaria:</strong>
                  <em>"Ningún texto ni cápsula sale al aire sin el ojo, la firma y la responsabilidad de un ser humano con los pies en la tierra del Maule."</em>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: LABORATORIO DE IMANES COMUNITARIOS */}
          {activeTab === 'laboratorio' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-teal-950/20 to-transparent border border-emerald-500/30">
                <span className="text-[10px] font-black uppercase text-emerald-300 tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Zap size={16} /> Imanes de Audiencia y Participación
                </span>
                <h3 className="text-lg font-black font-serif text-white">
                  "Otras posibilidades concretas para enganchar y multiplicar a la comunidad"
                </h3>
                <p className="text-xs text-gray-300 mt-2">
                  La comunicación comunitaria es un ecosistema de servicios mutuos. Si la radio le soluciona la vida diaria a la gente, la gente protege y financia a la radio.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2">
                  <div className="text-amber-400 font-black text-sm flex items-center gap-1.5">
                    <Share2 size={16} /> Trueque Radial & Mercado Libre Campesino
                  </div>
                  <p className="text-xs text-gray-400">
                    Microprograma diario donde no corre plata: sacos de guano por ganchos de higuera, una carretilla usada por un lechón. En la web y al aire simultáneamente.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2">
                  <div className="text-emerald-400 font-black text-sm flex items-center gap-1.5">
                    <Tv size={16} /> El Semáforo de Precios en Vivo
                  </div>
                  <p className="text-xs text-gray-400">
                    Despacho directo todos los miércoles y sábados desde las ferias de Linares y Parral a las 07:30 AM: precios de mayoreo para que los intermediarios no engañen al parcelero.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2">
                  <div className="text-sky-400 font-black text-sm flex items-center gap-1.5">
                    <Mic size={16} /> Asambleas Radiales Abiertas
                  </div>
                  <p className="text-xs text-gray-400">
                    Transmisión en directo de cabildos de agua y juntas vecinales. Si un dirigente no puede viajar por falta de locomoción, su voz se transmite por la red provincial.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2">
                  <div className="text-purple-400 font-black text-sm flex items-center gap-1.5">
                    <Award size={16} /> Saludos de Cumpleaños & Memorias
                  </div>
                  <p className="text-xs text-gray-400">
                    El alma tradicional de la radio AM/FM llevada a WhatsApp: los audios con saludos a la tía que vive en el callejón se emiten con música tradicional de fondo.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2">
                  <div className="text-rose-400 font-black text-sm flex items-center gap-1.5">
                    <HeartHandshake size={16} /> Cadena de Farmacia & Traslados
                  </div>
                  <p className="text-xs text-gray-400">
                    Bolsa de solidaridad para remedios escasos en postas y aviso de vecinos que bajan en camioneta vacía al hospital y tienen asientos libres.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#181d24] border border-gray-800 space-y-2">
                  <div className="text-yellow-400 font-black text-sm flex items-center gap-1.5">
                    <Lightbulb size={16} /> Spotify Podcast & Archivo Histórico
                  </div>
                  <p className="text-xs text-gray-400">
                    Curaduría de las mejores historias de vida campesina en Spotify y plataformas de podcast para que los maulinos migrantes en Santiago y el mundo no olviden su raíz.
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Pie de Acción */}
        <div className="bg-[#14171d] p-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
            <span>Documento Estratégico de Mesa Editorial • Maule Red</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const text = `Maule Red - Manifiesto y Pitch de Radios Comunitarias: Comunicación Popular, Ficción Sonora y Uso Crítico de IA en el Maule Sur.`;
                navigator.clipboard?.writeText(text);
                alert('¡Resumen del pitch copiado al portapapeles!');
              }}
              className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold transition-colors cursor-pointer"
            >
              Copiar Resumen
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#b84227] hover:bg-[#a0361e] text-white font-bold transition-all shadow-md cursor-pointer"
            >
              Entendido / Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
