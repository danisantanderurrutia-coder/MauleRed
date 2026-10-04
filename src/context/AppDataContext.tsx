import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Article, 
  EmergencyAlert, 
  PizarraItem, 
  CarpoolRide, 
  RuralBusSchedule, 
  FeriaPriceItem, 
  SubsidyItem, 
  CommunityEvent, 
  ModerationItem,
  AutoApprovalSettings,
  NavItemConfig,
  ComunaMaule,
  CuencaMaule,
  AuthUser,
  CorrespondentProfile,
  EditorialTab
} from '../types';
import {
  INITIAL_ARTICLES,
  INITIAL_EMERGENCIES,
  INITIAL_PIZARRA,
  INITIAL_CARPOOL,
  INITIAL_BUS_SCHEDULES,
  INITIAL_FERIA_PRICES,
  INITIAL_SUBSIDIES,
  INITIAL_EVENTS,
  INITIAL_MODERATION_ITEMS,
  INITIAL_AUTO_APPROVAL,
  INITIAL_NAV_ITEMS,
  INITIAL_CORRESPONDENTS
} from '../data/mockData';

const STORAGE_KEY = 'MAULE_SUR_PLATFORM_V5';
const AUTH_STORAGE_KEY = 'MAULE_SUR_AUTH_USER';
const DATA_SAVER_KEY = 'MAULE_SUR_DATA_SAVER_3G';

// Helper to normalize image paths for both relative base, root domain, and GitHub Pages
export const getCleanImageUrl = (url: string | undefined, fallback = '/images/campo_alfalfa.jpg'): string => {
  if (!url) return fallback;
  // If user has old unsplash URLs cached in localStorage, replace with local assets
  if (url.includes('unsplash.com')) {
    if (url.includes('1544717302') || url.includes('sepulveda')) return '/images/corr_juan.jpg';
    if (url.includes('1573496359') || url.includes('albornoz')) return '/images/corr_rosa.jpg';
    if (url.includes('1567532939') || url.includes('baeza')) return '/images/corr_margarita.jpg';
    if (url.includes('1507003211') || url.includes('mateo')) return '/images/corr_mateo.jpg';
    if (url.includes('1500648767') || url.includes('esteban')) return '/images/corr_esteban.jpg';
    if (url.includes('1544005313') || url.includes('marcela')) return '/images/corr_marcela.jpg';
    if (url.includes('1585320806')) return '/images/noticia_semillas.jpg';
    if (url.includes('1542601906')) return '/images/moderacion_default.jpg';
    return fallback;
  }
  return url;
};

interface AppDataContextType {
  // Datos
  articles: Article[];
  emergencies: EmergencyAlert[];
  pizarra: PizarraItem[];
  carpool: CarpoolRide[];
  busSchedules: RuralBusSchedule[];
  feriaPrices: FeriaPriceItem[];
  subsidies: SubsidyItem[];
  events: CommunityEvent[];
  moderationItems: ModerationItem[];
  autoApproval: AutoApprovalSettings;
  navItems: NavItemConfig[];
  correspondents: CorrespondentProfile[];
  
  // Pestaña activa dentro de Editorial
  editorialTab: EditorialTab;
  setEditorialTab: (tab: EditorialTab) => void;
  
  // Filtros territoriales globales
  selectedComuna: ComunaMaule | 'todas';
  setSelectedComuna: (comuna: ComunaMaule | 'todas') => void;
  selectedCuenca: CuencaMaule | 'todas';
  setSelectedCuenca: (cuenca: CuencaMaule | 'todas') => void;
  
  // Modo Ahorro de Datos 3G
  isDataSaverActive: boolean;
  toggleDataSaver: () => void;

  // Estilo Territorial (Opción A vs Opción C)
  themeStyle: 'opcionA' | 'opcionC';
  setThemeStyle: (theme: 'opcionA' | 'opcionC') => void;
  isEmergencyThemeActive: boolean;
  toggleEmergencyTheme: () => void;

  // Logotipo Seleccionado (id numérico o clave string)
  selectedLogo: string;
  selectedLogoSrc: string;
  setSelectedLogo: (id: string | number) => void;

  // Sesión y Auth
  currentUser: AuthUser | null;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;

  // Acciones de Artículos
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  addArticleComment: (articleId: string, comment: { userName: string; userEmail: string; content: string }) => void;

  // Acciones de Emergencias
  addEmergency: (emergency: Omit<EmergencyAlert, 'id' | 'reportedAt' | 'lastUpdate'>) => void;
  updateEmergencyStatus: (id: string, status: EmergencyAlert['status']) => void;
  deleteEmergency: (id: string) => void;

  // Acciones de Pizarra
  addPizarraItem: (item: Omit<PizarraItem, 'id' | 'date' | 'status'>) => void;
  deletePizarraItem: (id: string) => void;

  // Moderación
  addModerationItem: (item: Omit<ModerationItem, 'id' | 'timestamp' | 'status'>) => void;
  approveModerationItem: (id: string, editedData?: Partial<ModerationItem>) => void;
  rejectModerationItem: (id: string) => void;
  updateAutoApproval: (settings: Partial<AutoApprovalSettings>) => void;

  // Navegación Dinámica
  updateNavItems: (items: NavItemConfig[]) => void;

  // Respaldo JSON
  exportBackupJson: () => void;
  importBackupJson: (jsonString: string) => { success: boolean; message: string };
  resetToDefaults: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicialización desde localStorage o mockData
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_ARTICLES`);
      const list: Article[] = saved ? JSON.parse(saved) : INITIAL_ARTICLES;
      return list.map(a => ({
        ...a,
        coverImage: getCleanImageUrl(a.coverImage),
        gallery: a.gallery ? a.gallery.map(g => getCleanImageUrl(g)) : []
      }));
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  const [emergencies, setEmergencies] = useState<EmergencyAlert[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_EMERGENCIES`);
      return saved ? JSON.parse(saved) : INITIAL_EMERGENCIES;
    } catch {
      return INITIAL_EMERGENCIES;
    }
  });

  const [pizarra, setPizarra] = useState<PizarraItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_PIZARRA`);
      return saved ? JSON.parse(saved) : INITIAL_PIZARRA;
    } catch {
      return INITIAL_PIZARRA;
    }
  });

  const [carpool] = useState<CarpoolRide[]>(INITIAL_CARPOOL);
  const [busSchedules] = useState<RuralBusSchedule[]>(INITIAL_BUS_SCHEDULES);
  const [feriaPrices] = useState<FeriaPriceItem[]>(INITIAL_FERIA_PRICES);
  const [subsidies] = useState<SubsidyItem[]>(INITIAL_SUBSIDIES);
  const [events] = useState<CommunityEvent[]>(INITIAL_EVENTS);
  const [correspondents] = useState<CorrespondentProfile[]>(INITIAL_CORRESPONDENTS);

  const [moderationItems, setModerationItems] = useState<ModerationItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_MODERATION`);
      return saved ? JSON.parse(saved) : INITIAL_MODERATION_ITEMS;
    } catch {
      return INITIAL_MODERATION_ITEMS;
    }
  });

  const [autoApproval, setAutoApproval] = useState<AutoApprovalSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_AUTO_APPROVAL`);
      return saved ? JSON.parse(saved) : INITIAL_AUTO_APPROVAL;
    } catch {
      return INITIAL_AUTO_APPROVAL;
    }
  });

  const [editorialTab, setEditorialTab] = useState<EditorialTab>('editorial');

  const [navItems, setNavItems] = useState<NavItemConfig[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_NAV_ITEMS`);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validar si tiene la estructura simplificada nueva con Trueques y Alerta Maule
        const hasTrueques = parsed.some((item: any) => item.label === 'Trueques');
        const hasAlertaMaule = parsed.some((item: any) => item.label === 'Alerta Maule');
        if (hasTrueques && hasAlertaMaule) {
          return parsed;
        }
        return INITIAL_NAV_ITEMS;
      }
      return INITIAL_NAV_ITEMS;
    } catch {
      return INITIAL_NAV_ITEMS;
    }
  });

  // Filtros territoriales
  const [selectedComuna, setSelectedComuna] = useState<ComunaMaule | 'todas'>('todas');
  const [selectedCuenca, setSelectedCuenca] = useState<CuencaMaule | 'todas'>('todas');

  // Modo Ahorro 3G
  const [isDataSaverActive, setIsDataSaverActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DATA_SAVER_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Estilo Territorial (Opción A: Roble & Río por defecto. En emergencia conmuta a Opción C: Greda & Lira)
  const [isEmergencyThemeActive, setIsEmergencyThemeActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem('MAULE_SUR_EMERGENCY_THEME') === 'true';
    } catch {
      return false;
    }
  });

  const [themeStyle, setThemeStyleState] = useState<'opcionA' | 'opcionC'>(() => {
    try {
      const isEmg = localStorage.getItem('MAULE_SUR_EMERGENCY_THEME') === 'true';
      if (isEmg) return 'opcionC';
      const saved = localStorage.getItem('MAULE_SUR_THEME_STYLE');
      return (saved === 'opcionC' || saved === 'opcionA') ? saved : 'opcionA';
    } catch {
      return 'opcionA';
    }
  });

  const [selectedLogo, setSelectedLogoState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('MAULE_SUR_SELECTED_LOGO');
      return saved || 'v2_20'; // Opción 20: El Pájaro Chucao del bosque nativo
    } catch {
      return 'v2_20';
    }
  });

  const setSelectedLogo = (id: string | number) => {
    const strId = id.toString();
    setSelectedLogoState(strId);
    try {
      localStorage.setItem('MAULE_SUR_SELECTED_LOGO', strId);
    } catch {
      // Ignorar en entornos sin storage
    }
  };

  const selectedLogoSrc = (selectedLogo === 'v2_20' || selectedLogo === 'v2_23' || selectedLogo === '20')
    ? './images/logo_chucao_andes.png'
    : selectedLogo.startsWith('v2_')
      ? `./images/logo_v2_${selectedLogo.replace('v2_', '')}_clean.png`
      : `./images/logo_opcion_${selectedLogo}_clean.png`;

  const setThemeStyle = (theme: 'opcionA' | 'opcionC') => {
    setThemeStyleState(theme);
    try {
      localStorage.setItem('MAULE_SUR_THEME_STYLE', theme);
    } catch {
      // ignore
    }
  };

  const toggleEmergencyTheme = () => {
    setIsEmergencyThemeActive(prev => {
      const next = !prev;
      try {
        localStorage.setItem('MAULE_SUR_EMERGENCY_THEME', String(next));
      } catch {
        // ignore
      }
      if (next) {
        setThemeStyle('opcionC');
      } else {
        setThemeStyle('opcionA');
      }
      return next;
    });
  };

  // Auth User
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sincronización automática a localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_ARTICLES`, JSON.stringify(articles));
      localStorage.setItem(`${STORAGE_KEY}_EMERGENCIES`, JSON.stringify(emergencies));
      localStorage.setItem(`${STORAGE_KEY}_PIZARRA`, JSON.stringify(pizarra));
      localStorage.setItem(`${STORAGE_KEY}_MODERATION`, JSON.stringify(moderationItems));
      localStorage.setItem(`${STORAGE_KEY}_AUTO_APPROVAL`, JSON.stringify(autoApproval));
      localStorage.setItem(`${STORAGE_KEY}_NAV_ITEMS`, JSON.stringify(navItems));
      localStorage.setItem(DATA_SAVER_KEY, String(isDataSaverActive));
      localStorage.setItem('MAULE_SUR_THEME_STYLE', themeStyle);
    } catch (e) {
      console.warn('Error guardando en localStorage:', e);
    }
  }, [articles, emergencies, pizarra, moderationItems, autoApproval, navItems, isDataSaverActive, themeStyle]);

  const toggleDataSaver = () => {
    setIsDataSaverActive(prev => !prev);
  };

  const loginUser = (user: AuthUser) => {
    setCurrentUser(user);
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  // Artículos
  const addArticle = (articleData: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      ...articleData,
      id: `art-${Date.now()}`
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, updatedFields: Partial<Article>) => {
    setArticles(prev => prev.map(art => art.id === id ? { ...art, ...updatedFields } : art));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(art => art.id !== id));
  };

  const addArticleComment = (articleId: string, commentData: { userName: string; userEmail: string; content: string }) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      userName: commentData.userName.trim(),
      userEmail: commentData.userEmail.trim(),
      content: commentData.content.trim(),
      createdAt: 'Hace un momento'
    };

    setArticles(prev => prev.map(art => {
      if (art.id === articleId) {
        return {
          ...art,
          comments: [newComment, ...(art.comments || [])]
        };
      }
      return art;
    }));
  };

  // Emergencias
  const addEmergency = (emergencyData: Omit<EmergencyAlert, 'id' | 'reportedAt' | 'lastUpdate'>) => {
    const newAlert: EmergencyAlert = {
      ...emergencyData,
      id: `emg-${Date.now()}`,
      reportedAt: 'Justo ahora',
      lastUpdate: 'Hace instantes'
    };

    if (autoApproval.enabled && autoApproval.autoApproveCortes) {
      setEmergencies(prev => [newAlert, ...prev]);
    } else {
      addModerationItem({
        source: 'avisador_cortes',
        title: `Reporte de Corte/Falla: ${emergencyData.title}`,
        content: `Sector: ${emergencyData.sector}, Comuna: ${emergencyData.comuna}. Notas: ${emergencyData.notes}`,
        senderName: 'Vecino del Maule Sur',
        senderPhone: '+56 9 (Reporte anónimo)',
        comuna: emergencyData.comuna,
        targetSection: 'emergencias'
      });
      setEmergencies(prev => [newAlert, ...prev]);
    }
  };

  const updateEmergencyStatus = (id: string, status: EmergencyAlert['status']) => {
    setEmergencies(prev => prev.map(emg => emg.id === id ? { ...emg, status, lastUpdate: 'Hace instantes' } : emg));
  };

  const deleteEmergency = (id: string) => {
    setEmergencies(prev => prev.filter(emg => emg.id !== id));
  };

  // Pizarra Vecinal
  const addPizarraItem = (itemData: Omit<PizarraItem, 'id' | 'date' | 'status'>) => {
    const isAutoApproved = autoApproval.enabled && autoApproval.autoApprovePizarra;
    const newItem: PizarraItem = {
      ...itemData,
      id: `piz-${Date.now()}`,
      date: 'Hoy',
      status: isAutoApproved ? 'aprobado' : 'pendiente'
    };

    if (isAutoApproved) {
      setPizarra(prev => [newItem, ...prev]);
    } else {
      setPizarra(prev => [newItem, ...prev]);
      addModerationItem({
        source: 'pizarra',
        title: `Aviso Pizarra: ${itemData.title}`,
        content: `${itemData.description} - Precio/Trueque: ${itemData.priceOrBarter}`,
        senderName: itemData.contactName,
        senderPhone: itemData.contactPhone,
        comuna: itemData.comuna,
        targetSection: 'anuncios'
      });
    }
  };

  const deletePizarraItem = (id: string) => {
    setPizarra(prev => prev.filter(item => item.id !== id));
  };

  // Moderación
  const addModerationItem = (itemData: Omit<ModerationItem, 'id' | 'timestamp' | 'status'>) => {
    const newItem: ModerationItem = {
      ...itemData,
      id: `mod-${Date.now()}`,
      timestamp: 'Hace instantes',
      status: 'pendiente'
    };
    setModerationItems(prev => [newItem, ...prev]);
  };

  const approveModerationItem = (id: string, editedData?: Partial<ModerationItem>) => {
    const item = moderationItems.find(m => m.id === id);
    if (!item) return;

    const finalItem = { ...item, ...editedData, status: 'aprobado' as const };

    if (finalItem.source === 'whatsapp') {
      const newArt: Article = {
        id: `art-wa-${Date.now()}`,
        title: finalItem.title,
        subtitle: `Reporte ciudadano recibido vía WhatsApp Comunitario`,
        section: (finalItem.targetSection as any) === 'emergencias' ? 'alerta' : (finalItem.targetSection as any) || 'alerta',
        author: finalItem.senderName || 'Corresponsal WhatsApp',
        authorRole: 'Lectora-Auditora del Maule Sur',
        isVerifiedCorrespondent: false,
        date: 'Hoy',
        comuna: finalItem.comuna,
        cuenca: 'Río Maule',
        status: 'publicado',
        coverImage: finalItem.mediaUrl || '/images/moderacion_default.jpg',
        gallery: finalItem.mediaUrl ? [finalItem.mediaUrl] : [],
        hasAudioCapsule: Boolean(finalItem.audioUrl),
        audioUrl: finalItem.audioUrl,
        audioDuration: '01:00',
        block1WhatHappened: finalItem.content,
        block2TheCause: 'Información verificada por el equipo de redacción ciudadana.',
        block3SolutionCall: 'La comunidad solicita intervención de las autoridades locales.',
        utilityCard: {
          title: `Ficha Comunitaria: ${finalItem.comuna}`,
          phones: [finalItem.senderPhone],
          tips: ['Seguimiento abierto por la mesa de redacción territorial.']
        }
      };
      setArticles(prev => [newArt, ...prev]);
    } else if (finalItem.source === 'pizarra') {
      setPizarra(prev => prev.map(p => p.title === finalItem.title ? { ...p, status: 'aprobado' } : p));
    }

    setModerationItems(prev => prev.map(m => m.id === id ? finalItem : m));
  };

  const rejectModerationItem = (id: string) => {
    setModerationItems(prev => prev.map(m => m.id === id ? { ...m, status: 'rechazado' } : m));
  };

  const updateAutoApproval = (settings: Partial<AutoApprovalSettings>) => {
    setAutoApproval(prev => ({ ...prev, ...settings }));
  };

  const updateNavItems = (items: NavItemConfig[]) => {
    setNavItems(items);
  };

  // Exportar Respaldo JSON
  const exportBackupJson = () => {
    const backupData = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      platform: 'Red de Noticias y Comunicación Popular del Maule Sur',
      data: {
        articles,
        emergencies,
        pizarra,
        moderationItems,
        autoApproval,
        navItems
      }
    };

    const jsonBlob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `respaldo-maule-sur-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Importar Respaldo JSON
  const importBackupJson = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.data) {
        return { success: false, message: 'Estructura JSON inválida: falta el nodo principal "data".' };
      }

      const { data } = parsed;
      if (Array.isArray(data.articles)) setArticles(data.articles);
      if (Array.isArray(data.emergencies)) setEmergencies(data.emergencies);
      if (Array.isArray(data.pizarra)) setPizarra(data.pizarra);
      if (Array.isArray(data.moderationItems)) setModerationItems(data.moderationItems);
      if (data.autoApproval) setAutoApproval(data.autoApproval);
      if (Array.isArray(data.navItems)) setNavItems(data.navItems);

      return { success: true, message: 'Respaldo importado y restaurado exitosamente.' };
    } catch {
      return { success: false, message: 'Error de sintaxis al procesar el archivo JSON.' };
    }
  };

  const resetToDefaults = () => {
    setArticles(INITIAL_ARTICLES);
    setEmergencies(INITIAL_EMERGENCIES);
    setPizarra(INITIAL_PIZARRA);
    setModerationItems(INITIAL_MODERATION_ITEMS);
    setAutoApproval(INITIAL_AUTO_APPROVAL);
    setNavItems(INITIAL_NAV_ITEMS);
    localStorage.clear();
  };

  return (
    <AppDataContext.Provider
      value={{
        articles,
        emergencies,
        pizarra,
        carpool,
        busSchedules,
        feriaPrices,
        subsidies,
        events,
        moderationItems,
        autoApproval,
        navItems,
        correspondents,
        editorialTab,
        setEditorialTab,
        selectedComuna,
        setSelectedComuna,
        selectedCuenca,
        setSelectedCuenca,
        isDataSaverActive,
        toggleDataSaver,
        themeStyle,
        setThemeStyle,
        isEmergencyThemeActive,
        toggleEmergencyTheme,
        selectedLogo,
        selectedLogoSrc,
        setSelectedLogo,
        currentUser,
        loginUser,
        logoutUser,
        addArticle,
        updateArticle,
        deleteArticle,
        addArticleComment,
        addEmergency,
        updateEmergencyStatus,
        deleteEmergency,
        addPizarraItem,
        deletePizarraItem,
        addModerationItem,
        approveModerationItem,
        rejectModerationItem,
        updateAutoApproval,
        updateNavItems,
        exportBackupJson,
        importBackupJson,
        resetToDefaults,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData debe usarse dentro de AppDataProvider');
  }
  return context;
};
