import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Article } from '../../types';
import { ContentManager } from './ContentManager';
import { ArticleEditorForm } from './ArticleEditorForm';
import { MediaManager } from './MediaManager';
import { ModerationDashboard } from './ModerationDashboard';
import { NavigationManager } from './NavigationManager';
import { JsonBackupManager } from './JsonBackupManager';
import { 
  FileText, 
  Image as ImageIcon, 
  Sliders, 
  Navigation, 
  HardDrive, 
  ArrowLeft, 
  LogOut, 
  ShieldCheck, 
  Flame, 
  Droplet,
  Radio,
  AlertTriangle,
  Sparkles,
  Lock
} from 'lucide-react';
import { ComunitariasPitchModal } from './ComunitariasPitchModal';

interface AdminLayoutProps {
  onBackToFrontoffice: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToFrontoffice }) => {
  const { 
    currentUser, 
    logoutUser, 
    moderationItems, 
    addArticle, 
    updateArticle,
    isEmergencyThemeActive,
    toggleEmergencyTheme
  } = useAppData();

  const [activeTab, setActiveTab] = useState<'contenidos' | 'multimedia' | 'moderacion' | 'navegacion' | 'respaldo'>('contenidos');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showPitchModal, setShowPitchModal] = useState(false);

  const pendingModerationCount = moderationItems.filter(m => m.status === 'pendiente').length;

  const handleSaveArticle = (articleData: Omit<Article, 'id'>) => {
    if (editingArticle) {
      updateArticle(editingArticle.id, articleData);
    } else {
      addArticle(articleData);
    }
    setEditingArticle(null);
    setIsCreatingNew(false);
    setActiveTab('contenidos');
  };

  const handleCancelEditor = () => {
    setEditingArticle(null);
    setIsCreatingNew(false);
  };

  return (
    <div 
      className="min-h-screen text-slate-800 font-sans flex flex-col relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(248, 250, 252, 0.88), rgba(241, 245, 249, 0.94)), url('./images/maule_campo_cielo.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      
      {/* Barra de Cabecera Superior del Panel de Administrador */}
      <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Identidad del Panel de Administrador */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Lock size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-slate-900 font-extrabold text-sm sm:text-base font-serif">
                  Panel de Administrador
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-emerald-200">
                  Maule Sur
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Gestión Territorial • Moderación Comunitaria
              </p>
            </div>
          </div>

          {/* Usuario Activo y Acciones de Salida */}
          <div className="flex items-center gap-3">
            {/* Botón Administrador: Activar/Desactivar Paleta de Emergencia */}
            <button
              onClick={toggleEmergencyTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all border shadow-xs cursor-pointer ${
                isEmergencyThemeActive
                  ? 'bg-amber-600 text-white border-amber-400 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
              title="Activar/Desactivar Paleta de Emergencia Territorial (Opción C: Greda & Lira con Alerta Pública)"
            >
              <AlertTriangle size={14} className={isEmergencyThemeActive ? 'text-white' : 'text-amber-600'} />
              <span className="hidden md:inline">
                {isEmergencyThemeActive ? '🚨 Emergencia ACTIVA (Greda)' : '⚠️ Activar Paleta Emergencia'}
              </span>
            </button>

            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-[10px]">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-800 block leading-none">{currentUser.name}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 uppercase leading-none">
                    Rol: {currentUser.role}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowPitchModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-black transition-all shadow-sm cursor-pointer"
              title="Abrir Manifiesto & Pitch de Radios Comunitarias"
            >
              <Sparkles size={13} className="text-emerald-200" />
              <span>Pitch Comunitarias</span>
            </button>

            <button
              onClick={onBackToFrontoffice}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors border border-slate-200 shadow-xs cursor-pointer"
              title="Volver a la vista pública de la web"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Ver Sitio Público</span>
            </button>

            <button
              onClick={() => {
                logoutUser();
                onBackToFrontoffice();
              }}
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200 cursor-pointer"
              title="Cerrar sesión segura"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Barra de Pestañas del Admin */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 overflow-x-auto border-t border-slate-100 py-1.5">
          <button
            onClick={() => {
              setActiveTab('contenidos');
              setIsCreatingNew(false);
              setEditingArticle(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'contenidos' && !isCreatingNew && !editingArticle
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/80'
            }`}
          >
            <FileText size={14} />
            <span>Gestor de Contenidos</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('multimedia');
              setIsCreatingNew(false);
              setEditingArticle(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'multimedia'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/80'
            }`}
          >
            <ImageIcon size={14} />
            <span>Gestor Multimedia</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('moderacion');
              setIsCreatingNew(false);
              setEditingArticle(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'moderacion'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/80'
            }`}
          >
            <Sliders size={14} />
            <span>Moderación Ciudadana</span>
            {pendingModerationCount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {pendingModerationCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('navegacion');
              setIsCreatingNew(false);
              setEditingArticle(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'navegacion'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/80'
            }`}
          >
            <Navigation size={14} />
            <span>Navegación Dinámica</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('respaldo');
              setIsCreatingNew(false);
              setEditingArticle(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'respaldo'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/80'
            }`}
          >
            <HardDrive size={14} />
            <span>Respaldo JSON</span>
          </button>
        </div>
      </header>

      {/* Contenedor Central de Contenido */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Editor (cuando se crea nueva noticia o se edita una existente) */}
        {isCreatingNew || editingArticle ? (
          <ArticleEditorForm
            initialArticle={editingArticle}
            onSave={handleSaveArticle}
            onCancel={handleCancelEditor}
          />
        ) : (
          <>
            {activeTab === 'contenidos' && (
              <ContentManager
                onNewArticle={() => setIsCreatingNew(true)}
                onEditArticle={(art) => setEditingArticle(art)}
              />
            )}

            {activeTab === 'multimedia' && <MediaManager />}

            {activeTab === 'moderacion' && <ModerationDashboard />}

            {activeTab === 'navegacion' && <NavigationManager />}

            {activeTab === 'respaldo' && <JsonBackupManager />}
          </>
        )}
      </main>

      {/* Pie del Panel de Administrador */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200/80 py-4 px-6 text-center text-xs text-slate-500 font-medium">
        Panel de Administración Territorial • Red de Noticias del Maule Sur • Todos los cambios son persistentes
      </footer>

      {/* Modal de Manifiesto & Pitch de Radios Comunitarias */}
      <ComunitariasPitchModal
        isOpen={showPitchModal}
        onClose={() => setShowPitchModal(false)}
      />

    </div>
  );
};
