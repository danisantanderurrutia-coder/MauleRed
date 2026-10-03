import React, { useState, useRef } from 'react';
import { Article, ComunaMaule, CuencaMaule, SectionType } from '../../types';
import { 
  Save, 
  X, 
  Upload, 
  Image as ImageIcon, 
  Music, 
  Play, 
  Pause, 
  Trash2, 
  Star, 
  MapPin, 
  Plus, 
  Sparkles,
  Check
} from 'lucide-react';

interface ArticleEditorFormProps {
  initialArticle?: Article | null;
  onSave: (articleData: Omit<Article, 'id'>) => void;
  onCancel: () => void;
}

export const ArticleEditorForm: React.FC<ArticleEditorFormProps> = ({ 
  initialArticle, 
  onSave, 
  onCancel 
}) => {
  // Campos del formulario
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [subtitle, setSubtitle] = useState(initialArticle?.subtitle || '');
  const [section, setSection] = useState<SectionType>(initialArticle?.section || 'alerta');
  const [author, setAuthor] = useState(initialArticle?.author || 'Mariana Gómez');
  const [authorRole, setAuthorRole] = useState(initialArticle?.authorRole || 'Editora de Redacción Popular');
  const [isVerified, setIsVerified] = useState(initialArticle?.isVerifiedCorrespondent ?? true);
  const [date, setDate] = useState(initialArticle?.date || '10 de Septiembre, 2026');
  const [comuna, setComuna] = useState<ComunaMaule>(initialArticle?.comuna || 'Linares');
  const [cuenca, setCuenca] = useState<CuencaMaule>(initialArticle?.cuenca || 'Río Achibueno');
  const [status, setStatus] = useState<'publicado' | 'borrador'>(initialArticle?.status || 'publicado');

  // Receta Editorial en 3 Bloques
  const [block1WhatHappened, setBlock1WhatHappened] = useState(initialArticle?.block1WhatHappened || '');
  const [block2TheCause, setBlock2TheCause] = useState(initialArticle?.block2TheCause || '');
  const [block3SolutionCall, setBlock3SolutionCall] = useState(initialArticle?.block3SolutionCall || '');

  // Ficha de Utilidad Práctica
  const [utilityTitle, setUtilityTitle] = useState(initialArticle?.utilityCard?.title || 'Ficha de Utilidad Práctica');
  const [utilityDates, setUtilityDates] = useState(initialArticle?.utilityCard?.dates || '');
  const [utilityLocations, setUtilityLocations] = useState(initialArticle?.utilityCard?.locations || '');
  const [utilityAgency, setUtilityAgency] = useState(initialArticle?.utilityCard?.responsibleAgency || '');
  const [utilityPhonesStr, setUtilityPhonesStr] = useState(initialArticle?.utilityCard?.phones?.join(', ') || '');
  const [utilityTipsStr, setUtilityTipsStr] = useState(initialArticle?.utilityCard?.tips?.join('\n') || '');

  // Módulo Audio-Primer
  const [hasAudioCapsule, setHasAudioCapsule] = useState(initialArticle?.hasAudioCapsule ?? true);
  const [audioUrl, setAudioUrl] = useState(initialArticle?.audioUrl || 'https://actions.google.com/sounds/v1/weather/light_rain_on_leaves.ogg');
  const [audioDuration, setAudioDuration] = useState(initialArticle?.audioDuration || '01:30');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Gestor Multimedia (Fotos y Galería)
  const [coverImage, setCoverImage] = useState(initialArticle?.coverImage || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80');
  const [gallery, setGallery] = useState<string[]>(initialArticle?.gallery || [initialArticle?.coverImage || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80']);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Subida de imagen mediante FileReader base64
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        // Fijar como portada y agregar a la galería
        setCoverImage(base64);
        if (!gallery.includes(base64)) {
          setGallery(prev => [base64, ...prev]);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setGallery(prev => [...prev, newImageUrl.trim()]);
    if (!coverImage) {
      setCoverImage(newImageUrl.trim());
    }
    setNewImageUrl('');
  };

  const handleSetAsCover = (imgUrl: string) => {
    setCoverImage(imgUrl);
  };

  const handleRemoveImage = (imgUrl: string) => {
    const updated = gallery.filter(img => img !== imgUrl);
    setGallery(updated);
    if (coverImage === imgUrl) {
      setCoverImage(updated[0] || '');
    }
  };

  const togglePreviewAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !block1WhatHappened.trim()) return;

    // Procesar teléfonos y tips
    const phones = utilityPhonesStr.split(',').map(s => s.trim()).filter(Boolean);
    const tips = utilityTipsStr.split('\n').map(s => s.trim()).filter(Boolean);

    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      section,
      author: author.trim(),
      authorRole: authorRole.trim(),
      isVerifiedCorrespondent: isVerified,
      date,
      comuna,
      cuenca,
      status,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      gallery: gallery.length > 0 ? gallery : [coverImage],
      hasAudioCapsule,
      audioUrl: hasAudioCapsule ? audioUrl : undefined,
      audioDuration: hasAudioCapsule ? audioDuration : undefined,
      block1WhatHappened: block1WhatHappened.trim(),
      block2TheCause: block2TheCause.trim(),
      block3SolutionCall: block3SolutionCall.trim(),
      utilityCard: {
        title: utilityTitle.trim(),
        dates: utilityDates.trim() || undefined,
        locations: utilityLocations.trim() || undefined,
        responsibleAgency: utilityAgency.trim() || undefined,
        phones: phones.length > 0 ? phones : undefined,
        tips: tips.length > 0 ? tips : undefined,
      }
    });
  };

  return (
    <div className="bg-[#181c22] rounded-3xl border border-gray-800 p-6 shadow-2xl text-gray-200">
      
      {/* Barra de Título del Editor */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
        <div>
          <span className="text-[10px] font-black uppercase text-[#e4a834] tracking-wider block">
            Editor Estructurado de Redacción
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {initialArticle ? 'Editar Noticia / Crónica' : 'Nueva Noticia Territorial'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#b84227] hover:bg-[#a0361e] shadow-lg flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Save size={15} /> Guardar Noticia
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Datos Clave y Efecto Bolsillo */}
        <div className="space-y-3 bg-[#202630] p-4 rounded-2xl border border-gray-700">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            1. Titular Enfocado en "Efecto Bolsillo/Hogar" & Subtítulo
          </h3>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Titular con Efecto Bolsillo (¿Cómo impacta a la familia campesina o vecina?)
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Por qué el fardo subió $1.800 y cómo postular hoy al forraje de emergencia"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm bg-[#181c22] border border-gray-700 rounded-xl p-3 text-white font-serif font-bold focus:ring-2 focus:ring-[#b84227] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Subtítulo explicativo
            </label>
            <input
              type="text"
              placeholder="Ej: Más de 400 parcelas afectadas por corte no programado en el callejón Los Canelos."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-gray-200 focus:ring-2 focus:ring-[#b84227] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Sección
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value as SectionType)}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none cursor-pointer"
              >
                <option value="noticias">Portada Noticias</option>
                <option value="alerta">Alerta Maule Sur</option>
                <option value="campo">El Tiempo y el Campo</option>
                <option value="internacional">Internacional</option>
                <option value="mujer">Mujer Rural y Tradición</option>
                <option value="comunidad">Comunidad (Calendario)</option>
                <option value="anuncios">Anuncios y Pizarra</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Comuna (Ubicación en Mapa)
              </label>
              <select
                value={comuna}
                onChange={(e) => setComuna(e.target.value as ComunaMaule)}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none cursor-pointer"
              >
                <option value="Linares">Linares</option>
                <option value="Colbún">Colbún</option>
                <option value="Panimávida">Panimávida</option>
                <option value="Longaví">Longaví</option>
                <option value="Parral">Parral</option>
                <option value="Retiro">Retiro</option>
                <option value="San Javier">San Javier</option>
                <option value="Yerbas Buenas">Yerbas Buenas</option>
                <option value="Cauquenes">Cauquenes</option>
                <option value="Chanco">Chanco</option>
                <option value="Pelluhue">Pelluhue</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Cuenca Hidrográfica
              </label>
              <select
                value={cuenca}
                onChange={(e) => setCuenca(e.target.value as CuencaMaule)}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none cursor-pointer"
              >
                <option value="Río Achibueno">Río Achibueno</option>
                <option value="Río Maule">Río Maule</option>
                <option value="Río Melado">Río Melado</option>
                <option value="Río Loncomilla">Río Loncomilla</option>
                <option value="Río Perquilauquén">Río Perquilauquén</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Estado
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'publicado' | 'borrador')}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none font-bold"
              >
                <option value="publicado">Publicado Inmediato</option>
                <option value="borrador">Borrador</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Autor/a, Corresponsal o Asamblea
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Rol o Territorio
              </label>
              <input
                type="text"
                placeholder="Ej: Corresponsal campesino San Luis"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Receta Editorial en 3 Bloques */}
        <div className="space-y-4 bg-[#202630] p-4 rounded-2xl border border-gray-700">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <span>2. Receta Editorial Estructurada en 3 Bloques</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-[#b84227] mb-1">
              Bloque 1: ¿Qué pasó? (Hechos directos, claros y sin jerga técnica)
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe con precisión qué ocurrió, la hora, el lugar exacto y a cuántas familias afecta..."
              value={block1WhatHappened}
              onChange={(e) => setBlock1WhatHappened(e.target.value)}
              className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-[#b84227] focus:outline-none leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#e4a834] mb-1">
              Bloque 2: La causa en lenguaje sencillo (Explicación transparente para la comunidad)
            </label>
            <textarea
              rows={2}
              required
              placeholder="Explica qué falló, si fue falta de mantención de la empresa eléctrica, turbiedad por lluvia o acaparamiento..."
              value={block2TheCause}
              onChange={(e) => setBlock2TheCause(e.target.value)}
              className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-[#e4a834] focus:outline-none leading-relaxed"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-sky-400 mb-1">
              Bloque 3: La solución o el llamado vecinal (Pasos a seguir, reclamos o asamblea)
            </label>
            <textarea
              rows={2}
              required
              placeholder="Indica las acciones acordadas: reclamo formal ante SEC o DOH, reunión vecinal, donaciones o inscripción..."
              value={block3SolutionCall}
              onChange={(e) => setBlock3SolutionCall(e.target.value)}
              className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none leading-relaxed"
            ></textarea>
          </div>
        </div>

        {/* 3. Ficha de Utilidad Práctica */}
        <div className="space-y-3 bg-[#202630] p-4 rounded-2xl border border-gray-700">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} /> 3. Ficha de Utilidad Práctica para el Vecino
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Título de la Ficha
              </label>
              <input
                type="text"
                value={utilityTitle}
                onChange={(e) => setUtilityTitle(e.target.value)}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Fechas / Plazos Límite
              </label>
              <input
                type="text"
                placeholder="Ej: Inscripciones hasta el 22 de Septiembre"
                value={utilityDates}
                onChange={(e) => setUtilityDates(e.target.value)}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Lugar de atención o trámite
              </label>
              <input
                type="text"
                placeholder="Ej: Oficina INDAP Linares, Manuel Rodríguez #580"
                value={utilityLocations}
                onChange={(e) => setUtilityLocations(e.target.value)}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Entidad Responsable
              </label>
              <input
                type="text"
                placeholder="Ej: DOH Maule / Municipalidad"
                value={utilityAgency}
                onChange={(e) => setUtilityAgency(e.target.value)}
                className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Teléfonos de Ayuda / Cuadrilla (separados por coma)
            </label>
            <input
              type="text"
              placeholder="Ej: +56 73 263 3500, +56 9 8452 1199"
              value={utilityPhonesStr}
              onChange={(e) => setUtilityPhonesStr(e.target.value)}
              className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Consejos útiles (un consejo por línea)
            </label>
            <textarea
              rows={2}
              placeholder="Llevar fotocopia simple de carnet&#10;No es requisito tener internet"
              value={utilityTipsStr}
              onChange={(e) => setUtilityTipsStr(e.target.value)}
              className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
            ></textarea>
          </div>
        </div>

        {/* 4. Módulo Audio-Primer (MP3 Cápsula de 90s) */}
        <div className="space-y-3 bg-[#202630] p-4 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Music size={14} /> 4. Módulo Audio-Primer (Cápsula Sonora de 90s)
            </h3>
            <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hasAudioCapsule}
                onChange={(e) => setHasAudioCapsule(e.target.checked)}
                className="rounded accent-[#b84227]"
              />
              <span>Habilitar cápsula de audio</span>
            </label>
          </div>

          {hasAudioCapsule && (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    URL del archivo MP3/OGG (Audio comprimido)
                  </label>
                  <input
                    type="text"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Duración Estimada
                  </label>
                  <input
                    type="text"
                    value={audioDuration}
                    onChange={(e) => setAudioDuration(e.target.value)}
                    className="w-full text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Previsualizador de audio */}
              <div className="bg-[#181c22] p-3 rounded-xl border border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePreviewAudio}
                    className="w-9 h-9 rounded-full bg-[#b84227] text-white flex items-center justify-center hover:bg-[#a0361e] shadow"
                  >
                    {isPlayingAudio ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>
                  <div className="text-xs">
                    <span className="font-bold text-white block">Previsualizador de Cápsula</span>
                    <span className="text-gray-400 text-[11px]">{audioDuration} • Web Audio Player</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-400 font-bold uppercase bg-amber-950/40 px-2 py-1 rounded border border-amber-800">
                  Listo para emisión 104.5 FM
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 5. Gestor Multimedia (Fotos y Galería con FileReader base64) */}
        <div className="space-y-4 bg-[#202630] p-4 rounded-2xl border border-gray-700">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon size={14} /> 5. Gestor Multimedia & Galería Fotográfica
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            {/* Botón Cargar Archivo Local (FileReader base64) */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
            >
              <Upload size={14} /> Subir Imagen desde el Teléfono/PC (Base64)
            </button>

            {/* Agregar por URL */}
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="O pegar URL directa de imagen..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 text-xs bg-[#181c22] border border-gray-700 rounded-xl p-2 text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-3 py-2 rounded-xl bg-gray-700 text-white text-xs font-bold hover:bg-gray-600"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Grilla de Galería con Reordenar, Fijar Portada y Eliminar */}
          {gallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {gallery.map((imgUrl, idx) => {
                const isCover = coverImage === imgUrl;

                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all group bg-black/40 ${
                      isCover ? 'border-[#e4a834] ring-2 ring-[#e4a834]/40' : 'border-gray-700'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-28 object-cover"
                    />

                    {/* Badge Portada */}
                    {isCover && (
                      <div className="absolute top-1.5 left-1.5 bg-[#e4a834] text-[#14171a] text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Foto Portada
                      </div>
                    )}

                    {/* Acciones de la foto */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!isCover && (
                        <button
                          type="button"
                          onClick={() => handleSetAsCover(imgUrl)}
                          className="p-1.5 rounded-lg bg-[#e4a834] text-[#14171a] font-bold text-[10px] flex items-center gap-1 hover:bg-[#d89725]"
                          title="Fijar como Foto de Portada"
                        >
                          <Star size={12} /> Portada
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(imgUrl)}
                        className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        title="Eliminar de la galería"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Botones Finales */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#b84227] hover:bg-[#a0361e] shadow-lg flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Save size={15} /> Guardar Noticia
          </button>
        </div>

      </form>

    </div>
  );
};
