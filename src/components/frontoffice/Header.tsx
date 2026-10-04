import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { 
  CloudSun, 
  Wifi, 
  WifiOff, 
  Lock, 
  Radio, 
  HeartHandshake, 
  Calendar, 
  ClipboardList, 
  AlertTriangle, 
  Newspaper, 
  Globe, 
  Users, 
  Map, 
  Menu, 
  X, 
  BookOpen, 
  Palette, 
  ChevronDown 
} from 'lucide-react';
import { SectionType } from '../../types';

interface HeaderProps {
  activeSection: SectionType;
  setActiveSection: (sec: SectionType) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  setActiveSection, 
  onOpenAdmin 
}) => {
  const { 
    navItems, 
    isDataSaverActive, 
    toggleDataSaver,
    currentUser,
    themeStyle,
    setThemeStyle,
    selectedLogo,
    selectedLogoSrc,
    editorialTab,
    setEditorialTab
  } = useAppData();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [editorialDropdownOpen, setEditorialDropdownOpen] = React.useState(false);

  // Mapeo dinámico de iconos enriquecido
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Newspaper': return <Newspaper size={17} className="text-theme-primary" />;
      case 'AlertTriangle': return <AlertTriangle size={17} className="text-amber-600" />;
      case 'CloudSun': return <CloudSun size={17} className="text-theme-accent" />;
      case 'Globe': return <Globe size={17} className="text-sky-600" />;
      case 'Users': return <Users size={17} className="text-theme-secondary" />;
      case 'HeartHandshake': return <HeartHandshake size={17} className="text-pink-600" />;
      case 'Calendar': return <Calendar size={17} className="text-purple-600" />;
      case 'ClipboardList': return <ClipboardList size={17} className="text-amber-700" />;
      case 'Map': return <Map size={17} className="text-teal-700" />;
      case 'BookOpen': return <BookOpen size={17} className="text-emerald-700" />;
      case 'Palette': return <Palette size={17} className="text-amber-600" />;
      default: return <Radio size={17} />;
    }
  };

  const handleNavClick = (sectionKey: SectionType) => {
    setActiveSection(sectionKey);
    setMobileMenuOpen(false);

    // Scroll suave hacia el contenedor de contenidos para que el cambio sea inmediatamente visible
    const targetElement = document.getElementById('main-content-anchor');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`w-full border-b transition-colors duration-300 shadow-sm ${
      themeStyle === 'opcionC'
        ? 'bg-[#f7f0e4] border-[#d8c7b0]'
        : 'bg-[#f2f6f3] border-[#c2d6c7]'
    }`}>
      {/* 1. Barra Superior Territorial de Servicio - Alto Contraste */}
      <div className={`text-xs py-2 px-4 border-b transition-colors duration-300 ${
        themeStyle === 'opcionC'
          ? 'bg-[#381c15] text-amber-100 border-[#4d271e]'
          : 'bg-[#11261d] text-emerald-100 border-[#1c3f30]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-extrabold flex items-center gap-1.5 drop-shadow-xs">
              <CloudSun size={15} /> Maule Sur: 13°C
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-gray-200 font-medium">
              Viento Puelche suave en precordillera • Riego sugerido temprano
            </span>
          </div>

          <div className="flex items-center gap-2.5 ml-auto flex-wrap">
            {/* Toggle Modo Ahorro de Datos 3G */}
            <button
              type="button"
              onClick={toggleDataSaver}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                isDataSaverActive
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 shadow-md'
                  : 'bg-white/15 text-gray-200 hover:bg-white/25 hover:text-white border border-white/20'
              }`}
              title="Activa el modo liviano para conexiones lentas 3G rurales"
            >
              {isDataSaverActive ? <WifiOff size={13} className="text-white" /> : <Wifi size={13} />}
              <span className="hidden sm:inline">{isDataSaverActive ? '3G Ahorro Activo' : 'Modo 3G'}</span>
            </button>

            {/* Acceso a Sala de Redacción / Santuario */}
            <button
              type="button"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 text-white hover:bg-white/25 transition-colors border border-white/30 text-xs font-bold shadow-xs cursor-pointer"
              title="Panel de redacción y moderación comunitaria"
            >
              <Lock size={12} />
              <span>{currentUser ? `Santuario (${currentUser.name})` : 'Redacción'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Cabecera Principal y Marca Comunitaria */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div 
            onClick={() => handleNavClick('noticias')}
            className="flex items-center sm:items-start gap-4 cursor-pointer group select-none"
          >
            {/* Logo Oficial de Alto Impacto: Medallón Circular con Andes Nevados */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img 
                src={selectedLogoSrc} 
                alt="Logo Oficial Red de Noticias y Comunicación Popular del Maule Sur" 
                className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-300 group-hover:rotate-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/logo_chucao_andes.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-[11px] font-black tracking-widest uppercase flex items-center gap-1.5 ${
                  themeStyle === 'opcionC' ? 'text-[#6e3b2e]' : 'text-[#1b4332]'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                  COMUNICACIÓN LIBRE Y POPULAR
                </span>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs tracking-wider ${
                  themeStyle === 'opcionC' ? 'bg-[#b8860b] text-white' : 'bg-[#c68b28] text-white'
                }`}>
                  PERIODISMO DE UTILIDAD COTIDIANA
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-serif text-theme-textMain tracking-tight leading-tight group-hover:text-theme-primary transition-colors">
                Red de Noticias y Comunicación Popular del Maule Sur
              </h1>
              <p className="text-xs sm:text-sm text-theme-textMuted font-medium mt-1">
                Voces vivas desde las cuencas del Achibueno, Melado, Loncomilla, Perquilauquén y Maule
              </p>
            </div>
          </div>

          {/* Frecuencias Comunitarias */}
          <div className={`hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl border text-xs shadow-xs ${
            themeStyle === 'opcionC' 
              ? 'bg-[#fdfbf7] border-[#d8c7b0]' 
              : 'bg-white border-[#c2d6c7]'
          }`}>
            <Radio size={22} className={`flex-shrink-0 ${themeStyle === 'opcionC' ? 'text-[#6e3b2e]' : 'text-[#1b4332]'}`} />
            <div>
              <span className="font-extrabold text-[#0f172a] block">Sintonía Popular Maule Sur:</span>
              <span className="text-[#334155] font-semibold text-[11px]">Linares 104.5 • Colbún 98.3 • Parral 101.1 • Costa 95.7</span>
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex justify-end">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-xl bg-gray-800 text-white hover:bg-black font-bold"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Barra de Navegación Reactiva por Secciones - Alto Contraste Garantizado */}
      <div className={`border-t md:sticky md:top-[50px] z-30 shadow-md transition-colors duration-300 ${
        themeStyle === 'opcionC' 
          ? 'bg-[#fdfaf4] border-[#d8c7b0]' 
          : 'bg-white border-[#c2d6c7]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className={`md:flex items-center gap-1.5 py-2 overflow-x-auto ${mobileMenuOpen ? 'flex flex-col py-3' : 'hidden md:flex'}`}>
            {navItems.filter(item => item.visible).map((item) => {
              const isActive = activeSection === item.key;
              const isEditorial = item.key === 'editorial';

              if (isEditorial) {
                return (
                  <div
                    key={item.id}
                    className="relative w-full md:w-auto"
                    onMouseEnter={() => setEditorialDropdownOpen(true)}
                    onMouseLeave={() => setEditorialDropdownOpen(false)}
                  >
                    {/* Botón Principal Editorial */}
                    <button
                      type="button"
                      onClick={() => {
                        handleNavClick('editorial');
                        setEditorialDropdownOpen(prev => !prev);
                      }}
                      className={`w-full md:w-auto flex items-center justify-between md:justify-start gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer shadow-xs ${
                        isActive
                          ? themeStyle === 'opcionC'
                            ? 'bg-[#6e3b2e] text-white shadow-md ring-2 ring-[#b8860b] scale-102'
                            : 'bg-[#1b4332] text-white shadow-md ring-2 ring-[#c68b28] scale-102'
                          : themeStyle === 'opcionC'
                            ? 'text-[#2b1712] hover:bg-[#ede1ce] hover:text-[#6e3b2e]'
                            : 'text-[#11261d] hover:bg-[#d8e6db] hover:text-[#1b4332]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={isActive ? 'text-white' : ''}>
                          {renderIcon(item.iconName)}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-200 ${editorialDropdownOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    {/* Menú Desplegable Flotante en Desktop */}
                    {editorialDropdownOpen && (
                      <div className="hidden md:block absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 py-2 z-50 animate-fadeIn text-left">
                        <button
                          type="button"
                          onClick={() => {
                            setEditorialTab('editorial');
                            handleNavClick('editorial');
                            setEditorialDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold hover:bg-[#f0f7f2] hover:text-[#1b4332] transition-colors border-b border-gray-100 cursor-pointer ${
                            isActive && editorialTab === 'editorial' ? 'bg-[#f0f7f2] text-[#1b4332] font-black' : 'text-gray-800'
                          }`}
                        >
                          <BookOpen size={15} className="text-[#1b4332]" />
                          <div>
                            <span className="block font-black">1. Editorial</span>
                            <span className="text-[10px] text-gray-500 font-normal">Misión, Visión y Principios</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditorialTab('corresponsales');
                            handleNavClick('editorial');
                            setEditorialDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold hover:bg-[#f0f7f2] hover:text-[#1b4332] transition-colors border-b border-gray-100 cursor-pointer ${
                            isActive && editorialTab === 'corresponsales' ? 'bg-[#f0f7f2] text-[#1b4332] font-black' : 'text-gray-800'
                          }`}
                        >
                          <Users size={15} className="text-[#1c5274]" />
                          <div>
                            <span className="block font-black">2. Corresponsales</span>
                            <span className="text-[10px] text-gray-500 font-normal">Red de reportería del Maule Sur</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditorialTab('redes_amigas');
                            handleNavClick('editorial');
                            setEditorialDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold hover:bg-[#f0f7f2] hover:text-[#1b4332] transition-colors cursor-pointer ${
                            isActive && editorialTab === 'redes_amigas' ? 'bg-[#f0f7f2] text-[#1b4332] font-black' : 'text-gray-800'
                          }`}
                        >
                          <Share2 size={15} className="text-[#c68b28]" />
                          <div>
                            <span className="block font-black">3. Redes amigas</span>
                            <span className="text-[10px] text-gray-500 font-normal">Medios comunitarios (Grilla 6x2)</span>
                          </div>
                        </button>
                      </div>
                    )}

                    {/* Sub-opciones Desplegadas en Móvil */}
                    {mobileMenuOpen && (
                      <div className="md:hidden pl-4 pr-1 py-1 space-y-1 bg-gray-50/80 rounded-xl mt-1 border border-gray-200">
                        <button
                          type="button"
                          onClick={() => {
                            setEditorialTab('editorial');
                            handleNavClick('editorial');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                        >
                          <BookOpen size={14} className="text-[#1b4332]" />
                          <span>1. Editorial (Misión & Visión)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditorialTab('corresponsales');
                            handleNavClick('editorial');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                        >
                          <Users size={14} className="text-[#1c5274]" />
                          <span>2. Corresponsales</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditorialTab('redes_amigas');
                            handleNavClick('editorial');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                        >
                          <Share2 size={14} className="text-[#c68b28]" />
                          <span>3. Redes amigas (Red 6x2)</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.key)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer shadow-xs w-full md:w-auto ${
                    isActive
                      ? themeStyle === 'opcionC'
                        ? 'bg-[#6e3b2e] text-white shadow-md ring-2 ring-[#b8860b] scale-102'
                        : 'bg-[#1b4332] text-white shadow-md ring-2 ring-[#c68b28] scale-102'
                      : themeStyle === 'opcionC'
                        ? 'text-[#2b1712] hover:bg-[#ede1ce] hover:text-[#6e3b2e]'
                        : 'text-[#11261d] hover:bg-[#d8e6db] hover:text-[#1b4332]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : ''}>
                    {renderIcon(item.iconName)}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-white/30 text-white' 
                        : themeStyle === 'opcionC'
                          ? 'bg-[#b8860b] text-white'
                          : 'bg-[#c68b28] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
