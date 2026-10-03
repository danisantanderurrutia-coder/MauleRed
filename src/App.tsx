import React, { useState } from 'react';
import { AppDataProvider, useAppData } from './context/AppDataContext';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { Header } from './components/frontoffice/Header';
import { EmergencyTicker } from './components/frontoffice/EmergencyTicker';
import { TerritoryMap } from './components/frontoffice/TerritoryMap';
import { PortadaNoticias } from './components/frontoffice/sections/PortadaNoticias';
import { CampoClima } from './components/frontoffice/sections/CampoClima';
import { AlertaMaule } from './components/frontoffice/sections/AlertaMaule';
import { Internacional } from './components/frontoffice/sections/Internacional';
import { Corresponsales } from './components/frontoffice/sections/Corresponsales';
import { MujerRural } from './components/frontoffice/sections/MujerRural';
import { Calendario } from './components/frontoffice/sections/Calendario';
import { Anuncios } from './components/frontoffice/sections/Anuncios';
import { Editorial } from './components/frontoffice/sections/Editorial';
import { LogosGallery } from './components/frontoffice/sections/LogosGallery';
import { ArticleDetailModal } from './components/frontoffice/ArticleDetailModal';
import { WhatsAppFloatingBtn } from './components/frontoffice/WhatsAppFloatingBtn';
import { ThemeSwitcherFloating } from './components/frontoffice/ThemeSwitcherFloating';
import { Footer } from './components/frontoffice/Footer';
import { AdminLayout } from './components/admin/AdminLayout';
import { GatekeeperLogin } from './components/admin/GatekeeperLogin';
import { SectionType, Article } from './types';

const THEME_VARIABLES: Record<'opcionA' | 'opcionC', Record<string, string>> = {
  opcionA: {
    '--color-topbar-bg': '#11261d',
    '--color-radio-bg': '#0c1f17',
    '--color-header-bg': '#f5f7f4',
    '--color-nav-bg': '#ffffff',
    '--color-primary': '#1b4332',
    '--color-primary-hover': '#143527',
    '--color-secondary': '#1c5274',
    '--color-secondary-hover': '#153e58',
    '--color-accent': '#c68b28',
    '--color-accent-bg': '#f0f7f2',
    '--color-accent-border': '#bfd6c6',
    '--color-accent-text': '#1b4332',
    '--color-alert': '#8c2d19',
    '--color-bg': '#eef3ed',
    '--color-surface': '#ffffff',
    '--color-surface-soft': '#e3ede4',
    '--color-border': '#cdd9cf',
    '--color-text-main': '#0f1c15',
    '--color-text-muted': '#495a50',
  },
  opcionC: {
    '--color-topbar-bg': '#3d2119',
    '--color-radio-bg': '#27130e',
    '--color-header-bg': '#f5eedf',
    '--color-nav-bg': '#fbf8f2',
    '--color-primary': '#7a3a29',
    '--color-primary-hover': '#632d1f',
    '--color-secondary': '#3e5239',
    '--color-secondary-hover': '#2d3d2a',
    '--color-accent': '#b37d14',
    '--color-accent-bg': '#faf3e6',
    '--color-accent-border': '#dfcfaf',
    '--color-accent-text': '#704707',
    '--color-alert': '#7d2222',
    '--color-bg': '#e8d7be',
    '--color-surface': '#fdfbf7',
    '--color-surface-soft': '#dfceb5',
    '--color-border': '#cfbc9e',
    '--color-text-main': '#241913',
    '--color-text-muted': '#5e4d41',
  }
};

const MainContent: React.FC = () => {
  const { articles, isDataSaverActive, currentUser, themeStyle } = useAppData();
  
  const [viewMode, setViewMode] = useState<'frontoffice' | 'admin'>('frontoffice');
  const [showGatekeeper, setShowGatekeeper] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>('noticias'); // Portada predeterminada
  const [selectedArticleModal, setSelectedArticleModal] = useState<Article | null>(null);

  // Inyección reactiva forzada directa en document.documentElement para cambio visual garantizado
  React.useEffect(() => {
    const vars = THEME_VARIABLES[themeStyle];
    if (vars) {
      for (const [key, value] of Object.entries(vars)) {
        document.documentElement.style.setProperty(key, value);
      }
    }
    if (themeStyle === 'opcionC') {
      document.documentElement.classList.add('theme-greda');
      document.documentElement.classList.remove('theme-roble');
    } else {
      document.documentElement.classList.add('theme-roble');
      document.documentElement.classList.remove('theme-greda');
    }
  }, [themeStyle]);

  const handleOpenAdmin = () => {
    if (currentUser) {
      setViewMode('admin');
    } else {
      setShowGatekeeper(true);
    }
  };

  const handleOpenArticle = (articleId: string) => {
    const art = articles.find(a => a.id === articleId);
    if (art) {
      setSelectedArticleModal(art);
    }
  };

  // Si estamos en la vista del Administrador Santuario
  if (viewMode === 'admin') {
    return (
      <AdminLayout onBackToFrontoffice={() => setViewMode('frontoffice')} />
    );
  }

  // Vista Pública (Frontoffice)
  return (
    <div 
      style={THEME_VARIABLES[themeStyle] as React.CSSProperties}
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        themeStyle === 'opcionC' ? 'theme-greda' : 'theme-roble'
      } bg-theme-bg text-theme-textMain ${isDataSaverActive ? 'data-saver-mode' : ''}`}
    >
      
      {/* Cabecera, Clima Rápido y Radio en Vivo Permanente */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Avisador de Cortes APR, Luz CGE y Emergencias */}
      <EmergencyTicker />

      {/* Contenedor Principal de Contenido con Anclaje para Navegación Inmediata */}
      <main id="main-content-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full scroll-mt-28">
        
        {/* Vistas Dinámicas Reactivas según la Sección Seleccionada */}
        <div>
          {activeSection === 'noticias' && (
            <PortadaNoticias 
              onSelectArticle={handleOpenArticle} 
              onNavigateSection={setActiveSection} 
            />
          )}

          {activeSection === 'alerta' && (
            <AlertaMaule onSelectArticle={handleOpenArticle} />
          )}

          {activeSection === 'campo' && (
            <CampoClima onSelectArticle={handleOpenArticle} />
          )}

          {activeSection === 'internacional' && (
            <Internacional onSelectArticle={handleOpenArticle} />
          )}

          {activeSection === 'corresponsales' && (
            <Corresponsales onSelectArticle={handleOpenArticle} />
          )}

          {activeSection === 'mujer' && (
            <MujerRural onSelectArticle={handleOpenArticle} />
          )}

          {activeSection === 'comunidad' && (
            <Calendario />
          )}

          {activeSection === 'anuncios' && (
            <Anuncios />
          )}

          {activeSection === 'editorial' && (
            <Editorial onSelectArticle={handleOpenArticle} />
          )}

          {activeSection === 'logos' && (
            <LogosGallery />
          )}

          {activeSection === 'mapa' && (
            <TerritoryMap onSelectArticlePreview={handleOpenArticle} />
          )}
        </div>

      </main>

      {/* Botón Flotante Permanente de WhatsApp */}
      <WhatsAppFloatingBtn />

      {/* Pie de Página con Diales FM */}
      <Footer 
        onOpenAdmin={handleOpenAdmin} 
        onNavigateSection={setActiveSection}
      />

      {/* Modal de Detalle de Artículo (Receta Editorial de 3 bloques + Ficha Práctica) */}
      {selectedArticleModal && (
        <ArticleDetailModal
          article={selectedArticleModal}
          onClose={() => setSelectedArticleModal(null)}
        />
      )}

      {/* Modal de Autenticación Gatekeeper para entrar al Santuario */}
      {showGatekeeper && (
        <GatekeeperLogin
          onSuccess={() => {
            setShowGatekeeper(false);
            setViewMode('admin');
          }}
          onCancel={() => setShowGatekeeper(false)}
        />
      )}

    </div>
  );
};

export function App() {
  return (
    <AppDataProvider>
      <AudioPlayerProvider>
        <MainContent />
      </AudioPlayerProvider>
    </AppDataProvider>
  );
}

export default App;
