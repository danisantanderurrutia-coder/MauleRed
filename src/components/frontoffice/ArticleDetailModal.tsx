import React, { useState } from 'react';
import { Article } from '../../types';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { useAppData } from '../../context/AppDataContext';
import { WhatsAppCapsuleModal } from './WhatsAppCapsuleModal';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  MessageSquare, 
  Share2, 
  Phone, 
  Calendar, 
  MapPin, 
  Building, 
  Lightbulb, 
  ShieldCheck, 
  Sparkles,
  Type,
  User,
  Mail,
  Send,
  CheckCircle2
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ article, onClose }) => {
  const { articles, addArticleComment } = useAppData();
  const { activeCapsule, playCapsule, pauseCapsule } = useAudioPlayer();
  const [showWhatsAppCapsule, setShowWhatsAppCapsule] = useState(false);
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-base');

  // Estado del formulario de comentarios
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Obtener la versión reactiva más actualizada del artículo (con sus comentarios)
  const currentArticle = articles.find(a => a.id === article.id) || article;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !commentText.trim()) return;

    addArticleComment(article.id, {
      userName,
      userEmail,
      content: commentText
    });

    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => {
      setCommentSuccess(false);
    }, 4000);
  };

  const isPlayingThisCapsule = activeCapsule?.id === article.id && activeCapsule.isPlaying;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-[#fcfaf7] rounded-3xl max-w-3xl w-full my-auto shadow-2xl border border-[#e2dcd2] overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Barra Superior con Controles y Cierre */}
        <div className="bg-[#1e242b] text-white px-5 py-3 flex items-center justify-between border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-[#b84227] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
              Receta Editorial Maule Sur
            </span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-amber-400 font-medium hidden sm:inline">
              Periodismo de Utilidad para el Hogar
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Control de tamaño de letra para personas mayores */}
            <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-lg text-xs">
              <Type size={14} className="text-gray-400" />
              <button
                onClick={() => setFontSizeClass('text-base')}
                className={`px-1 rounded ${fontSizeClass === 'text-base' ? 'font-bold text-amber-400' : 'text-gray-400'}`}
                title="Texto normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeClass('text-lg')}
                className={`px-1 rounded ${fontSizeClass === 'text-lg' ? 'font-bold text-amber-400' : 'text-gray-400'}`}
                title="Texto mediano"
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeClass('text-xl')}
                className={`px-1 rounded ${fontSizeClass === 'text-xl' ? 'font-bold text-amber-400' : 'text-gray-400'}`}
                title="Texto grande"
              >
                A++
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Cerrar artículo"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Contenido Desplazable del Artículo */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Metadata territorial */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1 font-bold text-[#b84227] bg-[#b84227]/10 px-2.5 py-1 rounded-full">
              <MapPin size={13} /> {article.comuna}
            </span>
            <span className="text-gray-600 bg-gray-200/60 px-2.5 py-1 rounded-full font-medium">
              Cuenca: {article.cuenca}
            </span>
            <span className="text-gray-500 ml-auto">
              {article.date}
            </span>
          </div>

          {/* Titular Efecto Bolsillo / Hogar */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#14171a] leading-tight">
              {article.title}
            </h2>
            <p className="text-sm sm:text-base text-[#793822] font-medium mt-2 leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          {/* Autoría Comunitaria */}
          <div className="flex items-center gap-3 p-3 bg-[#f3ede1] rounded-2xl border border-[#ded4c3] text-xs">
            <div className="w-9 h-9 rounded-full bg-[#b84227] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-gray-900">
                <span>{article.author}</span>
                {article.isVerifiedCorrespondent && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                    <ShieldCheck size={11} /> Corresponsal Verificado
                  </span>
                )}
              </div>
              <span className="text-gray-600">{article.authorRole || 'Voz del Territorio'}</span>
            </div>
          </div>

          {/* Módulo Audio-Primer: Cápsula de 90 segundos */}
          <div className="p-4 bg-gradient-to-r from-[#1e242b] to-[#2b3542] text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  if (isPlayingThisCapsule) {
                    pauseCapsule();
                  } else {
                    playCapsule(article.id, article.title, article.author, article.audioUrl || '');
                  }
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-transform active:scale-95 ${
                  isPlayingThisCapsule
                    ? 'bg-[#b84227] text-white ring-4 ring-amber-400'
                    : 'bg-[#e4a834] text-[#14171a] hover:bg-[#e4a834]/90'
                }`}
                aria-label={isPlayingThisCapsule ? 'Pausar audio cápsula' : 'Escuchar audio cápsula'}
              >
                {isPlayingThisCapsule ? <Pause size={22} className="fill-current" /> : <Play size={22} className="fill-current ml-0.5" />}
              </button>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#e4a834] flex items-center gap-1">
                  <Volume2 size={13} /> Cápsula de Audio (90s)
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {isPlayingThisCapsule ? 'Reproduciendo cápsula radial...' : 'Escuchar resumen sonoro'}
                </h4>
                <p className="text-[11px] text-gray-300">
                  Ideal para escuchar en faena agrícola o sin tiempo de leer.
                </p>
              </div>
            </div>

            {/* Botón WhatsApp de Acción Destacada */}
            <button
              onClick={() => setShowWhatsAppCapsule(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#1ebc59] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 flex-shrink-0"
            >
              <MessageSquare size={16} className="fill-current" />
              <span>Generar Cápsula de WhatsApp</span>
            </button>
          </div>

          {/* Imagen de Portada (si no está en modo 3G agresivo) */}
          {article.coverImage && (
            <div className="rounded-2xl overflow-hidden max-h-80 w-full bg-gray-200 border border-gray-300">
              <img
                src={article.coverImage}
                alt={article.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './images/campo_alfalfa.jpg';
                }}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* ESTRUCTURA EDITORIAL EN 3 BLOQUES */}
          <div className={`space-y-6 ${fontSizeClass} text-[#22292f] leading-relaxed`}>
            
            {/* Bloque 1: ¿Qué pasó? */}
            <div className="bg-white p-5 rounded-2xl border-l-4 border-[#b84227] shadow-2xs">
              <h3 className="text-base font-black text-[#b84227] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#b84227] text-white text-xs flex items-center justify-center font-black">1</span>
                ¿Qué pasó?
              </h3>
              <p className="text-gray-800 leading-relaxed font-serif">
                {article.block1WhatHappened}
              </p>
            </div>

            {/* Bloque 2: La causa en lenguaje sencillo */}
            <div className="bg-white p-5 rounded-2xl border-l-4 border-[#e4a834] shadow-2xs">
              <h3 className="text-base font-black text-[#92400e] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#e4a834] text-[#14171a] text-xs flex items-center justify-center font-black">2</span>
                La causa en lenguaje sencillo
              </h3>
              <p className="text-gray-800 leading-relaxed font-serif">
                {article.block2TheCause}
              </p>
            </div>

            {/* Bloque 3: La solución o llamado vecinal */}
            <div className="bg-white p-5 rounded-2xl border-l-4 border-[#1b6ca8] shadow-2xs">
              <h3 className="text-base font-black text-[#1b6ca8] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#1b6ca8] text-white text-xs flex items-center justify-center font-black">3</span>
                La solución o llamado vecinal
              </h3>
              <p className="text-gray-800 leading-relaxed font-serif">
                {article.block3SolutionCall}
              </p>
            </div>

          </div>

          {/* RECUADRO DESTACADO: FICHA DE UTILIDAD PRÁCTICA */}
          <div className="bg-[#fffbeb] border-2 border-[#e4a834] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#78350f]">
              <Sparkles size={22} className="text-[#e4a834]" />
              <h3 className="text-lg font-black tracking-tight">
                {article.utilityCard.title || 'Ficha de Utilidad Práctica para el Vecino'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {article.utilityCard.dates && (
                <div className="bg-white p-3 rounded-xl border border-amber-200">
                  <span className="font-extrabold text-amber-900 flex items-center gap-1 mb-1">
                    <Calendar size={13} /> Fechas Clave / Plazos
                  </span>
                  <p className="text-gray-700">{article.utilityCard.dates}</p>
                </div>
              )}

              {article.utilityCard.locations && (
                <div className="bg-white p-3 rounded-xl border border-amber-200">
                  <span className="font-extrabold text-amber-900 flex items-center gap-1 mb-1">
                    <MapPin size={13} /> Dónde acudir o inscribirse
                  </span>
                  <p className="text-gray-700">{article.utilityCard.locations}</p>
                </div>
              )}

              {article.utilityCard.responsibleAgency && (
                <div className="bg-white p-3 rounded-xl border border-amber-200">
                  <span className="font-extrabold text-amber-900 flex items-center gap-1 mb-1">
                    <Building size={13} /> Entidad Responsable
                  </span>
                  <p className="text-gray-700">{article.utilityCard.responsibleAgency}</p>
                </div>
              )}

              {article.utilityCard.phones && article.utilityCard.phones.length > 0 && (
                <div className="bg-white p-3 rounded-xl border border-amber-200">
                  <span className="font-extrabold text-amber-900 flex items-center gap-1 mb-1">
                    <Phone size={13} /> Teléfonos de Contacto Directo
                  </span>
                  <div className="space-y-1">
                    {article.utilityCard.phones.map((p, idx) => (
                      <p key={idx} className="font-bold text-[#b84227]">{p}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {article.utilityCard.tips && article.utilityCard.tips.length > 0 && (
              <div className="bg-white p-3.5 rounded-xl border border-amber-200 text-xs text-gray-700">
                <span className="font-extrabold text-amber-900 flex items-center gap-1 mb-1.5">
                  <Lightbulb size={14} className="text-amber-600" /> Consejos prácticos de los vecinos:
                </span>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {article.utilityCard.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Galería de Fotos Adicionales */}
          {article.gallery && article.gallery.length > 1 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Galería de Fotos del Territorio
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {article.gallery.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`Foto ${i + 1}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = './images/campo_alfalfa.jpg';
                    }}
                    className="h-28 w-full object-cover rounded-xl border border-gray-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sección de Comentarios Ciudadanos */}
          <div className="pt-6 border-t-2 border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#1b4332] text-white">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-950 font-serif">
                    Voz del Pueblo & Comentarios Ciudadanos
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    Deja tu opinión, aporte o datos sobre este hecho. Se requiere nombre y correo.
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold bg-gray-200 text-gray-800 px-2.5 py-0.5 rounded-full">
                {(currentArticle?.comments?.length || 0)} aportes
              </span>
            </div>

            {/* Formulario para comentar */}
            <form onSubmit={handleCommentSubmit} className="bg-white p-4 rounded-2xl border border-gray-300 shadow-xs space-y-3">
              {commentSuccess && (
                <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                  <span>¡Tu comentario ha sido publicado en la noticia comunitaria!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1">
                    <User size={13} className="text-gray-500" />
                    Nombre o Usuario: <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Rosa de Vara Gruesa"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1b4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1">
                    <Mail size={13} className="text-gray-500" />
                    Correo Electrónico: <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu.correo@ejemplo.cl"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1b4332]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Tu Comentario o Información: <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Escribe tu mensaje, testimonio o rectificación vecinal aquí..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#1b4332]"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-gray-500 italic">
                  Tu correo no será divulgado públicamente.
                </span>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-[#143527] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Send size={13} />
                  <span>Publicar Comentario</span>
                </button>
              </div>
            </form>

            {/* Lista de comentarios existentes */}
            <div className="space-y-2.5 pt-2">
              {currentArticle?.comments && currentArticle.comments.length > 0 ? (
                currentArticle.comments.map((comm) => (
                  <div key={comm.id} className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-950 flex items-center gap-1">
                        <User size={12} className="text-[#1c5274]" /> {comm.userName}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {comm.createdAt}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed pt-0.5">
                      {comm.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-gray-100/70 p-3.5 rounded-xl text-center text-xs text-gray-600">
                  Aún no hay comentarios en esta nota. ¡Sé el primero en dejar tu testimonio!
                </div>
              )}
            </div>
          </div>

          {/* Pie de Artículo con Acción Final de WhatsApp */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-gray-500">
              ¿Tienes antecedentes o quieres actualizar esta noticia? Comunícate con la redacción.
            </div>

            <button
              onClick={() => setShowWhatsAppCapsule(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#1ebc59] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Share2 size={15} />
              <span>Generar Cápsula de WhatsApp</span>
            </button>
          </div>

        </div>

      </div>

      {/* Modal de Cápsula de WhatsApp */}
      {showWhatsAppCapsule && (
        <WhatsAppCapsuleModal
          article={article}
          onClose={() => setShowWhatsAppCapsule(false)}
        />
      )}
    </div>
  );
};
