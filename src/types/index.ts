export type ComunaMaule = 
  | 'Linares'
  | 'Colbún'
  | 'Panimávida'
  | 'Longaví'
  | 'Parral'
  | 'Retiro'
  | 'San Javier'
  | 'Yerbas Buenas'
  | 'Cauquenes'
  | 'Chanco'
  | 'Pelluhue';

export type CuencaMaule =
  | 'Río Maule'
  | 'Río Melado'
  | 'Río Achibueno'
  | 'Río Loncomilla'
  | 'Río Perquilauquén';

export type SectionType = 
  | 'noticias'
  | 'alerta'
  | 'campo'
  | 'internacional'
  | 'corresponsales'
  | 'mujer'
  | 'comunidad'
  | 'anuncios'
  | 'mapa'
  | 'editorial'
  | 'logos';

export type EditorialTab = 'editorial' | 'corresponsales' | 'redes_amigas';

export interface UtilityCardData {
  title: string;
  dates?: string;
  phones?: string[];
  locations?: string;
  responsibleAgency?: string;
  tips?: string[];
}

export interface ArticleComment {
  id: string;
  userName: string;
  userEmail: string;
  content: string;
  createdAt: string;
  location?: string;
}

export interface Article {
  id: string;
  title: string;          // Enfocado en Efecto Bolsillo / Hogar
  subtitle: string;
  section: SectionType;
  author: string;         // Corresponsal o vecina
  authorRole?: string;
  authorId?: string;
  isVerifiedCorrespondent?: boolean;
  date: string;
  comuna: ComunaMaule;
  cuenca: CuencaMaule;
  status: 'publicado' | 'borrador';
  coverImage: string;
  gallery: string[];
  hasAudioCapsule: boolean;
  audioUrl?: string;
  audioDuration?: string;
  isBreakingNews?: boolean;
  isFeatured?: boolean;
  // Receta Editorial en 3 bloques
  block1WhatHappened: string;    // ¿Qué pasó?
  block2TheCause: string;        // La causa en lenguaje sencillo
  block3SolutionCall: string;    // La solución o llamado vecinal
  // Ficha de Utilidad Práctica
  utilityCard: UtilityCardData;
  // Impacto local para noticias internacionales
  localImpactMaule?: string;
  // Comentarios ciudadanos
  comments?: ArticleComment[];
}

export interface CorrespondentProfile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  comuna: ComunaMaule;
  cuenca: CuencaMaule;
  bio: string;
  topics: string[];
  isVerified: boolean;
  contactPhone?: string;
  articlesCount: number;
  audioReportsCount: number;
}

export interface EmergencyAlert {
  id: string;
  type: 'apr' | 'luz' | 'incendio' | 'socioambiental';
  title: string;
  sector: string;
  comuna: ComunaMaule;
  cuenca?: CuencaMaule;
  affectedCount?: string;
  status: 'en_curso' | 'cuadrilla_en_camino' | 'resuelto';
  reportedAt: string;
  lastUpdate: string;
  notes: string;
  urgentNotice?: string;
}

export interface PizarraItem {
  id: string;
  category: 'trueque' | 'venta_agricola' | 'empleo' | 'servicios' | 'apero';
  title: string;
  description: string;
  priceOrBarter: string;
  contactName: string;
  contactPhone: string;
  comuna: ComunaMaule;
  date: string;
  status: 'aprobado' | 'pendiente';
}

export interface CarpoolRide {
  id: string;
  driver: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  availableSeats: number;
  contact: string;
  contribution: string;
}

export interface RuralBusSchedule {
  id: string;
  route: string;
  operator: string;
  frequency: string;
  firstBus: string;
  lastBus: string;
  fareRegular: string;
  fareAdultoMayor: string;
  stops: string;
}

export interface FeriaPriceItem {
  id: string;
  product: string;
  variety?: string;
  price: string;
  unit: string;
  trend: 'baja' | 'estable' | 'alza';
  marketName: string;
  comuna: ComunaMaule;
}

export interface SubsidyItem {
  id: string;
  title: string;
  institution: string; // INDAP, SAG, DOH, FOSIS
  deadline: string;
  targetAudience: string;
  amountOrBenefit: string;
  howToApply: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  type: 'trafkintu' | 'feria' | 'bingo' | 'asamblea' | 'cultural';
  date: string;
  time: string;
  location: string;
  comuna: ComunaMaule;
  description: string;
  contact?: string;
}

export interface ModerationItem {
  id: string;
  source: 'whatsapp' | 'avisador_cortes' | 'pizarra';
  title: string;
  content: string;
  description?: string;
  senderName: string;
  senderPhone: string;
  mediaUrl?: string;
  audioUrl?: string;
  comuna: ComunaMaule;
  timestamp: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  targetSection: SectionType | 'emergencias';
}

export interface AutoApprovalSettings {
  enabled: boolean;
  autoApprovePizarra: boolean;
  autoApproveCortes: boolean;
  autoApproveWhatsApp: boolean;
}

export type UserRole = 'admin' | 'editor' | 'corresponsal';

export interface AuthUser {
  username: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface NavItemConfig {
  id: string;
  key: SectionType;
  label: string;
  badge?: string;
  iconName: string;
  visible: boolean;
}

export interface TerritoryCoordinates {
  name: ComunaMaule;
  cuenca: CuencaMaule;
  lat: number;
  lng: number;
  x: number; // Porcentaje relativo para mapa SVG
  y: number;
}
