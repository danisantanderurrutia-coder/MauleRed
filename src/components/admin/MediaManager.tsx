import React, { useState, useRef } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  Trash2, 
  Star, 
  Check, 
  Copy, 
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';
import { DEFAULT_UNSPLASH_FALLBACK } from '../../context/AppDataContext';

const UNSPLASH_PRESETS = [
  { label: '🌾 Campo & Cosecha', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80' },
  { label: '💧 Río & Precordillera', url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80' },
  { label: '🚰 Agua Potable Rural', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80' },
  { label: '🌱 Semillas & Hortalizas', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80' },
  { label: '🏺 Artesanía Campesina', url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80' },
  { label: '⛈️ Clima & Temporales', url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=1200&q=80' }
];

export const MediaManager: React.FC = () => {
  const { articles, updateArticle } = useAppData();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedArticleId, setSelectedArticleId] = useState<string>(articles[0]?.id || '');
  const [newUrl, setNewUrl] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const currentArticle = articles.find(a => a.id === selectedArticleId) || articles[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !currentArticle) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        const updatedGallery = [base64, ...(currentArticle.gallery || [])];
        updateArticle(currentArticle.id, {
          gallery: updatedGallery,
          coverImage: base64
        });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAddUrl = (urlToAdd?: string) => {
    const targetUrl = (urlToAdd || newUrl).trim();
    if (!targetUrl || !currentArticle) return;
    const existing = currentArticle.gallery || [];
    if (!existing.includes(targetUrl)) {
      const updatedGallery = [...existing, targetUrl];
      updateArticle(currentArticle.id, { gallery: updatedGallery });
    }
    if (!urlToAdd) setNewUrl('');
  };

  const handleSetCover = (imgUrl: string) => {
    if (!currentArticle) return;
    updateArticle(currentArticle.id, { coverImage: imgUrl });
  };

  const handleRemoveImage = (imgUrl: string) => {
    if (!currentArticle) return;
    const existing = currentArticle.gallery || [];
    const updatedGallery = existing.filter(img => img !== imgUrl);
    const newCover = currentArticle.coverImage === imgUrl ? updatedGallery[0] || DEFAULT_UNSPLASH_FALLBACK : currentArticle.coverImage;
    updateArticle(currentArticle.id, {
      gallery: updatedGallery,
      coverImage: newCover
    });
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
            Biblioteca Fotográfica Territorial
          </span>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Gestor Multimedia & Portadas
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Gestión de imágenes de Unsplash, fotografías locales en Base64 y selección de portada principal.
          </p>
        </div>

        {/* Selector de Artículo a gestionar */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
          <span className="font-semibold text-slate-500">Artículo:</span>
          <select
            value={selectedArticleId}
            onChange={(e) => setSelectedArticleId(e.target.value)}
            className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer max-w-xs truncate"
          >
            {articles.map(art => (
              <option key={art.id} value={art.id}>
                {art.title.slice(0, 45)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentArticle ? (
        <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              {currentArticle.section} • {currentArticle.comuna} ({currentArticle.cuenca})
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {currentArticle.title}
            </h3>
          </div>

          {/* Presets Rápidos de Unsplash */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-600" />
              <span>Añadir fotografías temáticas recomendadas de Unsplash:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {UNSPLASH_PRESETS.map((preset, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleAddUrl(preset.url)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Acciones de Carga */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Upload size={15} /> Subir Imagen desde el Teléfono / PC
            </button>

            <div className="flex items-center gap-2 flex-1 min-w-[260px]">
              <input
                type="text"
                placeholder="O ingresar enlace directo (https://images.unsplash.com/...)..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none"
              />
              <button
                onClick={() => handleAddUrl()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Grilla de Fotos */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span className="font-bold uppercase tracking-wider text-slate-700">
                Fotos de la Galería ({currentArticle.gallery?.length || 0})
              </span>
              <span>Haz clic en la estrella para fijar como portada principal</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentArticle.gallery?.map((imgUrl, idx) => {
                const isCover = currentArticle.coverImage === imgUrl;

                return (
                  <div
                    key={idx}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all bg-slate-100 group shadow-xs ${
                      isCover ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Foto ${idx + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_UNSPLASH_FALLBACK;
                      }}
                      className="w-full h-40 object-cover"
                    />

                    {isCover && (
                      <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                        Portada Actual
                      </div>
                    )}

                    {/* Acciones flotantes */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!isCover && (
                        <button
                          onClick={() => handleSetCover(imgUrl)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-emerald-400 shadow-xs cursor-pointer"
                          title="Establecer como Portada"
                        >
                          <Star size={13} /> Fijar
                        </button>
                      )}

                      <button
                        onClick={() => handleCopy(imgUrl)}
                        className="p-2 rounded-lg bg-white text-slate-800 hover:bg-slate-100 cursor-pointer"
                        title="Copiar URL o base64"
                      >
                        {copiedUrl === imgUrl ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      </button>

                      <button
                        onClick={() => handleRemoveImage(imgUrl)}
                        className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        title="Eliminar foto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white/90 p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
          Selecciona o crea un artículo para administrar su multimedia.
        </div>
      )}

    </div>
  );
};
