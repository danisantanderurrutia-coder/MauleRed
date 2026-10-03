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
  ExternalLink,
  Layers
} from 'lucide-react';

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
        const updatedGallery = [base64, ...currentArticle.gallery];
        updateArticle(currentArticle.id, {
          gallery: updatedGallery,
          coverImage: base64
        });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAddUrl = () => {
    if (!newUrl.trim() || !currentArticle) return;
    const updatedGallery = [...currentArticle.gallery, newUrl.trim()];
    updateArticle(currentArticle.id, { gallery: updatedGallery });
    setNewUrl('');
  };

  const handleSetCover = (imgUrl: string) => {
    if (!currentArticle) return;
    updateArticle(currentArticle.id, { coverImage: imgUrl });
  };

  const handleRemoveImage = (imgUrl: string) => {
    if (!currentArticle) return;
    const updatedGallery = currentArticle.gallery.filter(img => img !== imgUrl);
    const newCover = currentArticle.coverImage === imgUrl ? updatedGallery[0] || '' : currentArticle.coverImage;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181c22] p-5 rounded-2xl border border-gray-800">
        <div>
          <span className="text-[10px] font-black uppercase text-[#e4a834] tracking-wider">
            Biblioteca Fotográfica Territorial
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Gestor Multimedia & Portadas
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Carga de fotografías locales vía FileReader en Base64 o URLs directas, asignación de portadas y grilla de galería.
          </p>
        </div>

        {/* Selector de Artículo a gestionar */}
        <div className="flex items-center gap-2 bg-[#222831] p-2 rounded-xl border border-gray-700 text-xs">
          <span className="font-semibold text-gray-400">Artículo:</span>
          <select
            value={selectedArticleId}
            onChange={(e) => setSelectedArticleId(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer max-w-xs truncate"
          >
            {articles.map(art => (
              <option key={art.id} value={art.id} className="bg-[#181c22] text-white">
                {art.title.slice(0, 45)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentArticle ? (
        <div className="bg-[#181c22] p-6 rounded-3xl border border-gray-800 space-y-6">
          
          <div className="border-b border-gray-800 pb-4">
            <span className="text-[10px] font-bold text-[#b84227] uppercase tracking-wider block">
              {currentArticle.section} • {currentArticle.comuna}
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              {currentArticle.title}
            </h3>
          </div>

          {/* Acciones de Carga */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-[#b84227] hover:bg-[#a0361e] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Upload size={15} /> Subir Imagen desde el Teléfono/PC (FileReader Base64)
            </button>

            <div className="flex items-center gap-2 flex-1 min-w-[260px]">
              <input
                type="text"
                placeholder="O ingresar enlace directo (https://...)..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1 text-xs bg-[#222831] border border-gray-700 rounded-xl p-2.5 text-white focus:outline-none"
              />
              <button
                onClick={handleAddUrl}
                className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold transition-colors"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Grilla de Fotos */}
          <div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
              <span className="font-bold uppercase tracking-wider text-gray-300">
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
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all bg-[#121519] group ${
                      isCover ? 'border-[#e4a834] ring-4 ring-[#e4a834]/30' : 'border-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-40 object-cover"
                    />

                    {isCover && (
                      <div className="absolute top-2 left-2 bg-[#e4a834] text-[#14171a] text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-md">
                        Portada Actual
                      </div>
                    )}

                    {/* Acciones flotantes */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!isCover && (
                        <button
                          onClick={() => handleSetCover(imgUrl)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#e4a834] text-[#14171a] font-bold text-xs flex items-center gap-1 hover:bg-[#d49726] shadow"
                          title="Establecer como Portada"
                        >
                          <Star size={13} /> Fijar
                        </button>
                      )}

                      <button
                        onClick={() => handleCopy(imgUrl)}
                        className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
                        title="Copiar URL o base64"
                      >
                        {copiedUrl === imgUrl ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>

                      <button
                        onClick={() => handleRemoveImage(imgUrl)}
                        className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
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
        <div className="bg-[#181c22] p-8 rounded-2xl border border-gray-800 text-center text-gray-400 text-xs">
          Selecciona o crea un artículo para administrar su multimedia.
        </div>
      )}

    </div>
  );
};
