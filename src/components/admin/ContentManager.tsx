import React, { useState, useRef } from 'react';
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
  Clock, 
  Sparkles,
  LayoutGrid,
  List,
  Radio,
  Play,
  Pause,
  AlertCircle,
  Users,
  Compass
} from 'lucide-react';
import { ComunitariasPitchModal } from './ComunitariasPitchModal';
import { DEFAULT_UNSPLASH_FALLBACK } from '../../context/AppDataContext';

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
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'publicado' | 'borrador'>('todos');
  const [filterSection, setFilterSection] = useState<string>('todas');
  const [filterCuenca, setFilterCuenca] = useState<string>('todas');

  // Mini reproductor de audio en tarjeta
  const [playingArticleId, setPlayingArticleId] = useState<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = (article: Article) => {
    if (!article.audioUrl) return;

    if (playingArticleId === article.id) {
      audioPlayerRef.current?.pause();
      setPlayingArticleId(null);
    } else {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      const audio = new Audio(article.audioUrl);
      audioPlayerRef.current = audio;
      audio.play().catch(e => console.warn('Audio play error:', e));
      setPlayingArticleId(article.id);
      audio.onended = () => setPlayingArticleId(null);
    }
  };

  const filteredArticles = articles.filter(art => {
    if (filterStatus !== 'todos' && art.status !== filterStatus) return false;
    if (filterSection !== 'todas' && art.section !== filterSection) return false;
    if (filterCuenca !== 'todas' && art.cuenca !== filterCuenca) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSubtitle = art.subtitle?.toLowerCase().includes(q);
      const matchAuthor = art.author.toLowerCase().includes(q);
      const matchComuna = art.comuna.toLowerCase().includes(q);
      if (!matchTitle && !matchSubtitle && !matchAuthor && !matchComuna) return false;
    }
    return true;
  });

  const handleToggleStatus = (article: Article) => {
    const nextStatus = article.status === 'publicado' ? 'borrador' : 'publicado';
    updateArticle(article.id, { status: nextStatus });
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el artículo "${title}"?`)) {
      if (playingArticleId === id) {
        audioPlayerRef.current?.pause();
        setPlayingArticleId(null);
      }
      deleteArticle(id);
    }
  };

  // Métricas para el Dashboard
  const publishedCount = articles.filter(a => a.status === 'publicado').length;
  const draftCount = articles.filter(a => a.status === 'borrador').length;
  const audioCount = articles.filter(a => a.hasAudioCapsule).length;
  const cuencasSet = new Set(articles.map(a => a.cuenca));

  return (
    <div className="space-y-6">
      
      {/* 1. KPIs & Métricas Editoriales del Territorio (Tema Claro Glassmorphic) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Artículos */}
        <div className="bg-white/90 backdrop-blur-md border border-emerald-200/80 hover:border-emerald-400 p-4 rounded-2xl shadow-xs transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Artículos</span>
            <FileText size={18} className="text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-slate-900">{articles.length}</div>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 font-medium">
            <span className="text-emerald-700 font-bold">{publishedCount} publicados</span>
            <span>•</span>
            <span className="text-amber-700 font-bold">{draftCount} borradores</span>
          </div>
        </div>

        {/* Cobertura Sonora */}
        <div className="bg-white/90 backdrop-blur-md border border-emerald-200/80 hover:border-emerald-400 p-4 rounded-2xl shadow-xs transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Cápsulas de Audio</span>
            <Radio size={18} className="text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-slate-900">{audioCount}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            {Math.round((audioCount / (articles.length || 1)) * 100)}% con cápsula de 90s
          </div>
        </div>

        {/* Cuencas Vivas */}
        <div className="bg-white/90 backdrop-blur-md border border-emerald-200/80 hover:border-emerald-400 p-4 rounded-2xl shadow-xs transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Cuencas Cubiertas</span>
            <Compass size={18} className="text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-slate-900">{cuencasSet.size}</div>
          <div className="text-[11px] text-slate-600 font-medium mt-1 truncate">
            Achibueno, Maule, Melado y más
          </div>
        </div>

        {/* Red Comunitaria */}
        <div className="bg-white/90 backdrop-blur-md border border-emerald-200/80 hover:border-emerald-400 p-4 rounded-2xl shadow-xs transition-all group">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Voz Territorial</span>
            <Users size={18} className="text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-slate-900">100%</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Verificación comunitaria directa
          </div>
        </div>

      </div>

      {/* 2. Barra de Encabezado y Acciones Principales */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
            Redacción & Edición Territorial
          </span>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Gestión de Contenidos & Prensa ({filteredArticles.length})
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Publicación, edición en 3 bloques territoriales y control de cápsulas sonoras.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
          {/* Botón Pitch Comunitarias */}
          <button
            onClick={() => setShowPitchModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
            title="Abrir el Pitch de Radios Comunitarias, Radioteatro e IA Lúcida"
          >
            <Sparkles size={15} className="text-emerald-200 animate-pulse" />
            <span>Pitch Comunitarias</span>
          </button>

          {/* Botón Nuevo Artículo */}
          <button
            onClick={onNewArticle}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            <span>Nueva Crónica / Noticia</span>
          </button>
        </div>
      </div>

      {/* 3. Barra de Búsqueda, Filtros y Switch de Vista */}
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3 flex-wrap justify-between">
          
          {/* Buscador */}
          <div className="flex items-center bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 flex-1 min-w-[240px]">
            <Search size={15} className="text-emerald-600 mr-2.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Buscar por titular, cuenca, comuna o autor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="text-xs text-slate-400 hover:text-slate-700 ml-2 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Switch de Modo Vista (Grid / List) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista de Tarjetas Visuales"
            >
              <LayoutGrid size={15} />
              <span className="text-[11px] hidden sm:inline">Tarjetas</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista de Lista Compacta"
            >
              <List size={15} />
              <span className="text-[11px] hidden sm:inline">Lista</span>
            </button>
          </div>

        </div>

        {/* Filtros Rápidos (Estado, Sección, Cuenca) */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 text-xs text-slate-700">
          
          {/* Píldoras de Estado */}
          <div className="flex items-center gap-1">
            {(['todos', 'publicado', 'borrador'] as const).map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {st} {st === 'todos' ? `(${articles.length})` : st === 'publicado' ? `(${publishedCount})` : `(${draftCount})`}
              </button>
            ))}
          </div>

          <span className="text-slate-300 hidden sm:inline">•</span>

          {/* Filtro Cuenca */}
          <div className="flex items-center bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 text-xs">
            <span className="text-slate-500 mr-1.5 font-medium">Cuenca:</span>
            <select
              value={filterCuenca}
              onChange={(e) => setFilterCuenca(e.target.value)}
              className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="todas">Todas las Cuencas</option>
              <option value="Río Achibueno">Río Achibueno</option>
              <option value="Río Maule">Río Maule</option>
              <option value="Río Melado">Río Melado</option>
              <option value="Río Loncomilla">Río Loncomilla</option>
              <option value="Río Perquilauquén">Río Perquilauquén</option>
            </select>
          </div>

          {/* Filtro Sección */}
          <div className="flex items-center bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 text-xs">
            <span className="text-slate-500 mr-1.5 font-medium">Sección:</span>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="todas">Todas las Secciones</option>
              <option value="alerta">Alerta Maule</option>
              <option value="campo">Campo & Riego</option>
              <option value="comunidad">Comunidad & Voces</option>
              <option value="mujer">Mujer Rural</option>
              <option value="internacional">Mundo Popular</option>
            </select>
          </div>

          {(filterStatus !== 'todos' || filterSection !== 'todas' || filterCuenca !== 'todas' || search) && (
            <button
              onClick={() => {
                setFilterStatus('todos');
                setFilterSection('todas');
                setFilterCuenca('todas');
                setSearch('');
              }}
              className="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold ml-auto cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}

        </div>
      </div>

      {/* 4. Contenido: Visual Grid o Lista Compacta */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-md p-12 rounded-3xl border border-slate-200 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileText size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-900">No se encontraron artículos</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Prueba ajustando los filtros de búsqueda o crea una nueva crónica para este territorio.
          </p>
          <button
            onClick={onNewArticle}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus size={14} />
            <span>Crear Noticia</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* 4.A VISTA DE TARJETAS VISUALES (GRID) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArticles.map((art) => {
            const isPlayingThis = playingArticleId === art.id;
            return (
              <div
                key={art.id}
                className="bg-white/95 backdrop-blur-md hover:bg-white rounded-3xl border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all flex flex-col overflow-hidden shadow-xs group"
              >
                {/* Portada Fotográfica de Unsplash con Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_UNSPLASH_FALLBACK;
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Gradiente de contraste */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

                  {/* Badges superiores */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="font-black text-[10px] uppercase px-2.5 py-1 rounded-full bg-white/90 text-emerald-800 border border-emerald-200 backdrop-blur-md shadow-2xs">
                      {art.section}
                    </span>

                    {/* Badge Estado */}
                    <button
                      onClick={() => handleToggleStatus(art)}
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md transition-all shadow-xs cursor-pointer ${
                        art.status === 'publicado'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                      title="Clic para alternar estado"
                    >
                      {art.status === 'publicado' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                      <span>{art.status === 'publicado' ? 'Publicado' : 'Borrador'}</span>
                    </button>
                  </div>

                  {/* Cuenca y Comuna en la base de la imagen */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-semibold text-[11px] bg-black/60 px-2 py-0.5 rounded-lg backdrop-blur-xs">
                      <MapPin size={11} className="text-emerald-400" />
                      {art.comuna} ({art.cuenca})
                    </span>

                    {art.hasAudioCapsule && (
                      <button
                        onClick={() => handlePlayAudio(art)}
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition-all shadow-xs cursor-pointer ${
                          isPlayingThis
                            ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-200'
                            : 'bg-black/70 text-emerald-300 border border-emerald-400/40 hover:bg-emerald-600 hover:text-white'
                        }`}
                        title="Escuchar cápsula de 90s"
                      >
                        {isPlayingThis ? <Pause size={10} /> : <Play size={10} />}
                        <span>Audio {art.audioDuration || '90s'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                      {art.title}
                    </h3>
                    
                    <p className="text-slate-600 text-xs line-clamp-2 mt-1 leading-relaxed">
                      {art.subtitle || art.block1WhatHappened}
                    </p>
                  </div>

                  {/* Información Editorial */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                    <div className="text-slate-600 truncate">
                      Por: <strong className="text-slate-800">{art.author}</strong>
                    </div>
                    <span className="text-slate-400 flex-shrink-0">{art.date}</span>
                  </div>

                  {/* Acciones de la Tarjeta */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onEditArticle(art)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-200 cursor-pointer"
                    >
                      <Edit size={13} />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => handleDelete(art.id, art.title)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors border border-red-200 cursor-pointer"
                      title="Eliminar artículo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      ) : (

        /* 4.B VISTA DE LISTA COMPACTA EJECUTIVA */
        <div className="space-y-3">
          {filteredArticles.map((art) => {
            const isPlayingThis = playingArticleId === art.id;
            return (
              <div
                key={art.id}
                className="bg-white/95 hover:bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs group shadow-2xs"
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {/* Miniatura de Unsplash */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_UNSPLASH_FALLBACK;
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                    />
                    {art.hasAudioCapsule && (
                      <button
                        onClick={() => handlePlayAudio(art)}
                        className="absolute bottom-1 right-1 p-1 rounded-md bg-black/70 text-emerald-300 hover:text-white"
                        title="Reproducir audio"
                      >
                        {isPlayingThis ? <Pause size={10} /> : <Play size={10} />}
                      </button>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-extrabold text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {art.section}
                      </span>
                      <span className="text-slate-600 font-medium flex items-center gap-1 text-[11px]">
                        <MapPin size={11} className="text-emerald-600" /> {art.comuna} ({art.cuenca})
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 text-[11px]">{art.date}</span>

                      {/* Badge Estado */}
                      <button
                        onClick={() => handleToggleStatus(art)}
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer ${
                          art.status === 'publicado'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                        title="Clic para alternar estado"
                      >
                        {art.status === 'publicado' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                        <span>{art.status === 'publicado' ? 'Publicado' : 'Borrador'}</span>
                      </button>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {art.title}
                    </h3>

                    <p className="text-slate-600 text-[11px] line-clamp-1 mt-0.5">
                      {art.subtitle || art.block1WhatHappened}
                    </p>

                    <div className="text-slate-500 text-[10px] mt-1">
                      Por: <strong className="text-slate-700">{art.author}</strong> ({art.authorRole || 'Corresponsal'})
                    </div>
                  </div>
                </div>

                {/* Acciones del Artículo */}
                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                  <button
                    onClick={() => onEditArticle(art)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-200 cursor-pointer"
                  >
                    <Edit size={13} />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => handleDelete(art.id, art.title)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors border border-red-200 cursor-pointer"
                    title="Eliminar artículo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Manifiesto & Pitch de Radios Comunitarias */}
      <ComunitariasPitchModal
        isOpen={showPitchModal}
        onClose={() => setShowPitchModal(false)}
      />

    </div>
  );
};
