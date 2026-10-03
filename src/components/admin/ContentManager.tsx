import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Article, ComunaMaule, CuencaMaule, SectionType } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Volume2, 
  Eye, 
  CheckCircle, 
  FileText, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

interface ContentManagerProps {
  onNewArticle: () => void;
  onEditArticle: (article: Article) => void;
}

export const ContentManager: React.FC<ContentManagerProps> = ({ 
  onNewArticle, 
  onEditArticle 
}) => {
  const { articles, updateArticle, deleteArticle } = useAppData();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'publicado' | 'borrador'>('todos');
  const [filterSection, setFilterSection] = useState<string>('todas');
  const [filterComuna, setFilterComuna] = useState<string>('todas');
  const [filterCuenca, setFilterCuenca] = useState<string>('todas');

  const filteredArticles = articles.filter(art => {
    if (filterStatus !== 'todos' && art.status !== filterStatus) return false;
    if (filterSection !== 'todas' && art.section !== filterSection) return false;
    if (filterComuna !== 'todas' && art.comuna !== filterComuna) return false;
    if (filterCuenca !== 'todas' && art.cuenca !== filterCuenca) return false;
    if (search && !art.title.toLowerCase().includes(search.toLowerCase()) && !art.author.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleToggleStatus = (article: Article) => {
    const nextStatus = article.status === 'publicado' ? 'borrador' : 'publicado';
    updateArticle(article.id, { status: nextStatus });
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el artículo "${title}"?`)) {
      deleteArticle(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Barra de Encabezado y Acción */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181c22] p-5 rounded-2xl border border-gray-800">
        <div>
          <span className="text-[10px] font-black uppercase text-[#e4a834] tracking-wider">
            Gestión Territorial de Prensa
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Gestor de Contenidos & Artículos ({articles.length})
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Publicación, edición de los 3 bloques editoriales y control de cápsulas de audio de 90s.
          </p>
        </div>

        <button
          onClick={onNewArticle}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#b84227] hover:bg-[#a0361e] text-white font-bold text-xs shadow-lg transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Nueva Noticia / Crónica</span>
        </button>
      </div>

      {/* Barra de Filtros Multifactor */}
      <div className="bg-[#181c22] p-4 rounded-2xl border border-gray-800 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Buscador */}
          <div className="flex items-center bg-[#222831] px-3 py-2 rounded-xl border border-gray-700 flex-1 min-w-[220px]">
            <Search size={15} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar por titular, palabra clave o autor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs bg-transparent text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* Filtro Estado */}
          <div className="flex items-center bg-[#222831] px-2.5 py-1.5 rounded-xl border border-gray-700 text-xs text-gray-300">
            <span className="font-semibold text-gray-400 mr-1.5">Estado:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="todos" className="bg-[#181c22]">Todos</option>
              <option value="publicado" className="bg-[#181c22]">Publicados</option>
              <option value="borrador" className="bg-[#181c22]">Borradores</option>
            </select>
          </div>

          {/* Filtro Sección */}
          <div className="flex items-center bg-[#222831] px-2.5 py-1.5 rounded-xl border border-gray-700 text-xs text-gray-300">
            <span className="font-semibold text-gray-400 mr-1.5">Sección:</span>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="todas" className="bg-[#181c22]">Todas</option>
              <option value="noticias" className="bg-[#181c22]">Portada Noticias</option>
              <option value="alerta" className="bg-[#181c22]">Alerta Maule</option>
              <option value="campo" className="bg-[#181c22]">El Tiempo y el Campo</option>
              <option value="internacional" className="bg-[#181c22]">Internacional</option>
              <option value="mujer" className="bg-[#181c22]">Mujer Rural</option>
              <option value="comunidad" className="bg-[#181c22]">Calendario</option>
              <option value="anuncios" className="bg-[#181c22]">Anuncios</option>
            </select>
          </div>

          {/* Filtro Comuna */}
          <div className="flex items-center bg-[#222831] px-2.5 py-1.5 rounded-xl border border-gray-700 text-xs text-gray-300">
            <span className="font-semibold text-gray-400 mr-1.5">Comuna:</span>
            <select
              value={filterComuna}
              onChange={(e) => setFilterComuna(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="todas" className="bg-[#181c22]">Todas</option>
              <option value="Linares" className="bg-[#181c22]">Linares</option>
              <option value="Colbún" className="bg-[#181c22]">Colbún</option>
              <option value="Panimávida" className="bg-[#181c22]">Panimávida</option>
              <option value="Longaví" className="bg-[#181c22]">Longaví</option>
              <option value="Parral" className="bg-[#181c22]">Parral</option>
              <option value="Retiro" className="bg-[#181c22]">Retiro</option>
              <option value="San Javier" className="bg-[#181c22]">San Javier</option>
              <option value="Yerbas Buenas" className="bg-[#181c22]">Yerbas Buenas</option>
              <option value="Cauquenes" className="bg-[#181c22]">Cauquenes</option>
            </select>
          </div>

          {/* Filtro Cuenca */}
          <div className="flex items-center bg-[#222831] px-2.5 py-1.5 rounded-xl border border-gray-700 text-xs text-gray-300">
            <span className="font-semibold text-gray-400 mr-1.5">Cuenca:</span>
            <select
              value={filterCuenca}
              onChange={(e) => setFilterCuenca(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="todas" className="bg-[#181c22]">Todas</option>
              <option value="Río Achibueno" className="bg-[#181c22]">Río Achibueno</option>
              <option value="Río Maule" className="bg-[#181c22]">Río Maule</option>
              <option value="Río Melado" className="bg-[#181c22]">Río Melado</option>
              <option value="Río Loncomilla" className="bg-[#181c22]">Río Loncomilla</option>
              <option value="Río Perquilauquén" className="bg-[#181c22]">Río Perquilauquén</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista Visual de Artículos */}
      {filteredArticles.length === 0 ? (
        <div className="bg-[#181c22] p-8 rounded-2xl border border-gray-800 text-center text-gray-400 text-xs">
          No se encontraron artículos con los filtros aplicados.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-[#181c22] hover:bg-[#1e232b] p-4 rounded-2xl border border-gray-800 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                {/* Miniatura de portada */}
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-700 flex-shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-extrabold text-[10px] uppercase px-2 py-0.5 rounded bg-[#b84227]/20 text-[#e86a38] border border-[#b84227]/30">
                      {art.section}
                    </span>
                    <span className="text-gray-400 font-medium flex items-center gap-1 text-[11px]">
                      <MapPin size={11} className="text-[#b84227]" /> {art.comuna} ({art.cuenca})
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 text-[11px]">{art.date}</span>

                    {/* Badge Estado */}
                    <button
                      onClick={() => handleToggleStatus(art)}
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors ${
                        art.status === 'publicado'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                          : 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                      }`}
                      title="Clic para alternar estado"
                    >
                      {art.status === 'publicado' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      <span>{art.status === 'publicado' ? 'Publicado' : 'Borrador'}</span>
                    </button>

                    {/* Badge Audio */}
                    {art.hasAudioCapsule && (
                      <span className="bg-[#1b6ca8]/20 text-sky-400 border border-sky-800/40 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Volume2 size={10} /> Audio 90s
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-white line-clamp-1">
                    {art.title}
                  </h3>

                  <p className="text-gray-400 text-[11px] line-clamp-1 mt-0.5">
                    {art.subtitle}
                  </p>

                  <div className="text-gray-500 text-[10px] mt-1">
                    Por: <strong className="text-gray-300">{art.author}</strong> ({art.authorRole || 'Corresponsal'})
                  </div>
                </div>
              </div>

              {/* Acciones del Artículo */}
              <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                <button
                  onClick={() => onEditArticle(art)}
                  className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs flex items-center gap-1.5 transition-colors border border-gray-700"
                >
                  <Edit size={13} />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => handleDelete(art.id, art.title)}
                  className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white transition-colors border border-red-900/50"
                  title="Eliminar artículo"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
