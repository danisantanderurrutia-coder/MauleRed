import React from 'react';
import { useAppData } from '../../../context/AppDataContext';
import { HeartHandshake, Sparkles, MapPin, Eye, Flower2 } from 'lucide-react';

interface MujerRuralProps {
  onSelectArticle: (articleId: string) => void;
}

export const MujerRural: React.FC<MujerRuralProps> = ({ onSelectArticle }) => {
  const { articles, selectedComuna, selectedCuenca, isDataSaverActive } = useAppData();

  const mujerArticles = articles.filter(a => {
    if (a.section !== 'mujer') return false;
    if (selectedComuna !== 'todas' && a.comuna !== selectedComuna) return false;
    if (selectedCuenca !== 'todas' && a.cuenca !== selectedCuenca) return false;
    return a.status === 'publicado';
  });

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-[#793822] to-[#b84227] text-white p-5 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl">
              <Flower2 size={28} className="text-[#e4a834]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#e4a834] uppercase tracking-wider">
                Saberes Ancestrales, Oficios y Soberanía
              </span>
              <h2 className="text-2xl font-black font-serif">Mujer Rural y Tradición</h2>
              <p className="text-xs text-gray-200 mt-0.5">
                Crónicas, entrevistas y memoria viva de las tejedoras en crin de Rari, alfareras de Pilén, huerteras y dirigentas del Maule Sur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-xl text-xs font-semibold self-start md:self-auto">
            <Sparkles size={15} className="text-[#e4a834]" />
            <span>Patrimonio Vivo Inmaterial</span>
          </div>
        </div>
      </div>

      {/* Grid de Crónicas y Entrevistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mujerArticles.map((art) => (
          <article
            key={art.id}
            className="bg-white rounded-2xl border border-amber-200 hover:border-[#b84227] transition-all overflow-hidden shadow-2xs flex flex-col justify-between group"
          >
            <div>
              {!isDataSaverActive && (
                <div 
                  onClick={() => onSelectArticle(art.id)}
                  className="h-48 w-full overflow-hidden bg-gray-100 relative cursor-pointer"
                  title="Haz clic para leer la crónica de Mujer Rural"
                >
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#e4a834] text-[#14171a] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                    Crónica Campesina
                  </div>
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1 font-bold text-[#793822]">
                    <MapPin size={13} /> {art.comuna}
                  </span>
                  <span>{art.date}</span>
                </div>

                <h3
                  onClick={() => onSelectArticle(art.id)}
                  className="text-lg font-bold text-gray-900 group-hover:text-[#b84227] leading-snug cursor-pointer transition-colors"
                >
                  {art.title}
                </h3>

                <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                  {art.subtitle}
                </p>

                {/* Cita o llamado */}
                <div className="mt-3 bg-[#fff8eb] p-3 rounded-xl border border-amber-100 text-xs text-[#793822] italic">
                  "{art.block1WhatHappened.slice(0, 140)}..."
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#fdfbf7] border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-700">Relato: {art.author}</span>
              <button
                onClick={() => onSelectArticle(art.id)}
                className="flex items-center gap-1 text-[#b84227] font-bold hover:underline"
              >
                <Eye size={13} /> Leer crónica y datos
              </button>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
