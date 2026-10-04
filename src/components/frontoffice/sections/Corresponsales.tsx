import React, { useState } from 'react';
import { useAppData } from '../../../context/AppDataContext';
import { 
  Users, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  Volume2, 
  Phone, 
  PlusCircle, 
  Search, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ComunaMaule } from '../../../types';

interface CorresponsalesProps {
  onSelectArticle: (articleId: string) => void;
}

export const Corresponsales: React.FC<CorresponsalesProps> = ({ onSelectArticle }) => {
  const { correspondents, articles, selectedComuna } = useAppData();
  const [filterComuna, setFilterComuna] = useState<string>('todas');
  const [search, setSearch] = useState('');

  const filteredCorrespondents = correspondents.filter(c => {
    if (filterComuna !== 'todas' && c.comuna !== filterComuna) return false;
    if (selectedComuna !== 'todas' && c.comuna !== selectedComuna) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.bio.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-[#181c22] to-[#252c36] text-white p-6 rounded-3xl shadow-sm border border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#b84227] text-white rounded-2xl shadow-md">
              <Users size={28} />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-[#e4a834] tracking-wider block">
                Prensa Popular & Reportería Campesina
              </span>
              <h2 className="text-2xl font-black font-serif text-white">
                Corresponsales del Maule Sur
              </h2>
              <p className="text-xs text-gray-300 mt-0.5">
                Las vecinas, agricultores, artesanas y técnicos que reportan en terreno desde las comunas y cuencas del territorio.
              </p>
            </div>
          </div>

          <div className="bg-black/30 px-3.5 py-2 rounded-xl text-xs font-semibold self-start md:self-auto flex items-center gap-2 border border-gray-700">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Red Territorial Autogestionada</span>
          </div>
        </div>
      </div>

      {/* Buscador y Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
        <div className="flex items-center bg-gray-50 px-3 py-2 rounded-xl border border-gray-300 flex-1 max-w-md text-xs">
          <Search size={15} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar corresponsal por nombre o tema..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-gray-900 focus:outline-none placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-gray-600">Filtrar Comuna:</span>
          <select
            value={filterComuna}
            onChange={(e) => setFilterComuna(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-xl px-2.5 py-1.5 font-medium text-gray-800 focus:outline-none cursor-pointer"
          >
            <option value="todas">Todas las comunas</option>
            <option value="Linares">Linares</option>
            <option value="Colbún">Colbún</option>
            <option value="Panimávida">Panimávida</option>
            <option value="Longaví">Longaví</option>
            <option value="Parral">Parral</option>
            <option value="Retiro">Retiro</option>
            <option value="San Javier">San Javier</option>
            <option value="Yerbas Buenas">Yerbas Buenas</option>
            <option value="Cauquenes">Cauquenes</option>
          </select>
        </div>
      </div>

      {/* Directorio de Corresponsales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCorrespondents.map((corr) => {
          // Obtener los artículos de este autor
          const authorArticles = articles.filter(a => a.author.toLowerCase().includes(corr.name.toLowerCase()));

          return (
            <div
              key={corr.id}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs hover:border-[#b84227] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-4">
                  <img
                    src={corr.avatar}
                    alt={corr.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = './images/corr_juan.jpg';
                    }}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-300 shadow-sm flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-black text-base text-gray-950 leading-tight">
                        {corr.name}
                      </h3>
                      {corr.isVerified && (
                        <span title="Verificado Oficial">
                          <ShieldCheck size={16} className="text-emerald-700" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#8c2d19] block mt-0.5">
                      {corr.role}
                    </span>
                    <span className="text-[11px] text-gray-700 flex items-center gap-1 mt-1 font-bold">
                      <MapPin size={11} className="text-[#1c5274]" /> {corr.comuna} • {corr.cuenca}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-800 font-medium leading-relaxed mb-4">
                  {corr.bio}
                </p>

                {/* Temas que cubre */}
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-wider block">
                    Cobertura habitual:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {corr.topics.map((t, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-900 border border-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Estadísticas de despachos */}
                <div className="grid grid-cols-2 gap-2 bg-[#f4ede2] p-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 mb-4 font-bold">
                  <div className="flex items-center gap-1.5">
                    <FileText size={13} className="text-[#8c2d19]" />
                    <span><strong>{corr.articlesCount}</strong> notas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Volume2 size={13} className="text-[#b37d14]" />
                    <span><strong>{corr.audioReportsCount}</strong> audios</span>
                  </div>
                </div>
              </div>

              {/* Notas del autor */}
              <div className="pt-3 border-t border-gray-100">
                {authorArticles.length > 0 ? (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-gray-700 block">
                      Última publicación:
                    </span>
                    <button
                      onClick={() => onSelectArticle(authorArticles[0].id)}
                      className="text-left text-xs font-semibold text-[#145582] hover:text-[#b84227] hover:underline line-clamp-1 flex items-center gap-1"
                    >
                      <span>{authorArticles[0].title}</span>
                      <ArrowRight size={11} className="flex-shrink-0" />
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] text-gray-400 italic">
                    Despachos en vivo por FM 104.5
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tarjeta de Convocatoria a Nuevos Corresponsales */}
      <div className="bg-gradient-to-r from-[#b84227] to-[#793822] text-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Sparkles size={18} className="text-amber-300" />
            <h4 className="text-base font-bold">¿Quieres reportar desde tu sector o junta de vecinos?</h4>
          </div>
          <p className="text-xs text-amber-100 max-w-xl">
            La redacción es comunitaria y abierta. Si vives en el campo del Maule Sur y quieres reportar cortes de agua, faenas o actividades vecinales, únete a la red.
          </p>
        </div>

        <a
          href="https://wa.me/56984521199?text=Hola%20Radio%20Maule%20Sur,%20quiero%20postular%20como%20corresponsal%20comunitario"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-white text-[#b84227] hover:bg-gray-100 font-bold text-xs shadow-md transition-all whitespace-nowrap active:scale-95"
        >
          Postular como Corresponsal
        </a>
      </div>

    </div>
  );
};
