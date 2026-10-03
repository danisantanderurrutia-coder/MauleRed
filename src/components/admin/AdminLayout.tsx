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
  AlertTriangle
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#0e1115] text-gray-200 font-sans flex flex-col">
      
      {/* Barra de Cabecera Superior del Santuario */}
      <header className="bg-[#14171d] border-b border-gray-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Identidad del Santuario */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b84227] flex items-center justify-center text-white shadow-md">
              <Flame size={20} className="text-[#e4a834]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold text-sm sm:text-base font-serif">
                  Santuario de Redacción
                </span>
                <span className="bg-[#b84227]/30 text-[#e86a38] text-[10px] font-black uppercase px-2 py-0.5 rounded border border-[#b84227]/40">
                  Maule Sur
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Panel de Administración • Gatekeeper Activo
              </p>
            </div>
          </div>

          {/* Usuario Activo y Acciones de Salida */}
          <div className="flex items-center gap-3">
            {/* Botón oculto de Administrador: Activar/Desactivar Paleta de Emergencia */}
            <button
              onClick={toggleEmergencyTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all border shadow-sm cursor-pointer ${
                isEmergencyThemeActive
                  ? 'bg-amber-600 text-white border-amber-400 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-gray-800/90 text-amber-300 border-amber-500/30 hover:bg-amber-950/40'
              }`}
              title="Activar/Desactivar Paleta de Emergencia Territorial (Opción C: Greda & Lira con Alerta Pública)"
            >
              <AlertTriangle size={14} className={isEmergencyThemeActive ? 'text-white' : 'text-amber-400'} />
              <span className="hidden md:inline">
                {isEmergencyThemeActive ? '🚨 Emergencia ACTIVA (Greda)' : '⚠️ Activar Paleta Emergencia'}
              </span>
            </button>

            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 bg-[#1b2026] px-3 py-1.5 rounded-xl border border-gray-700 text-xs">
                <div className="w-6 h-6 rounded-full bg-[#e4a834] text-[#14171a] font-black flex items-center justify-center text-[10px]">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-white block leading-none">{currentUser.name}</span>
                  <span className="text-[10px] font-semibold text-amber-400 uppercase leading-none">
                    Rol: {currentUser.role}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={onBackToFrontoffice}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-colors border border-gray-700"
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
              className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white transition-colors border border-red-900/40"
              title="Cerrar sesión segura"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Barra de Pestañas del Admin */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 overflow-x-auto border-t border-gray-800/80 py-1">
          <button
            onClick={() => {
              setActiveTab('contenidos');
              setIsCreatingNew(false);
              setEditingArticle(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'contenidos' && !isCreatingNew && !editingArticle
                ? 'bg-[#b84227] text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
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
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'multimedia'
                ? 'bg-[#b84227] text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
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
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'moderacion'
                ? 'bg-[#b84227] text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
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
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'navegacion'
                ? 'bg-[#b84227] text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
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
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'respaldo'
                ? 'bg-[#b84227] text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
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

      {/* Pie del Santuario */}
      <footer className="bg-[#12151a] border-t border-gray-800/80 py-4 px-6 text-center text-xs text-gray-500">
        Panel de Redacción Popular • Red de Noticias del Maule Sur • Todos los cambios son persistentes
      </footer>

    </div>
  );
};
