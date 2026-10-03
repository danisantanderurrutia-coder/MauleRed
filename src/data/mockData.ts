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
  TerritoryCoordinates,
  CorrespondentProfile
} from '../types';

export const INITIAL_NAV_ITEMS: NavItemConfig[] = [
  { id: '1', key: 'noticias', label: 'Noticias', badge: 'En Vivo', iconName: 'Newspaper', visible: true },
  { id: '2', key: 'alerta', label: 'Alerta Maule', badge: 'Urgente', iconName: 'AlertTriangle', visible: true },
  { id: '3', key: 'campo', label: 'El Tiempo y el Campo', iconName: 'CloudSun', visible: true },
  { id: '4', key: 'mujer', label: 'Mujer Rural y Tradición', iconName: 'HeartHandshake', visible: true },
  { id: '5', key: 'comunidad', label: 'Calendario Comunidad', iconName: 'Calendar', visible: true },
  { id: '6', key: 'anuncios', label: 'Trueques', badge: 'Avisos', iconName: 'ClipboardList', visible: true },
  { id: '7', key: 'internacional', label: 'Internacional', iconName: 'Globe', visible: true },
  { id: '8', key: 'editorial', label: 'Editorial', badge: 'Desplegable', iconName: 'BookOpen', visible: true },
];

export const TERRITORY_COMMUNES: TerritoryCoordinates[] = [
  { name: 'Linares', cuenca: 'Río Achibueno', lat: -35.8454, lng: -71.5979, x: 50, y: 38 },
  { name: 'Colbún', cuenca: 'Río Maule', lat: -35.6989, lng: -71.4150, x: 62, y: 28 },
  { name: 'Panimávida', cuenca: 'Río Maule', lat: -35.7500, lng: -71.4333, x: 58, y: 32 },
  { name: 'Yerbas Buenas', cuenca: 'Río Maule', lat: -35.7481, lng: -71.5822, x: 48, y: 28 },
  { name: 'San Javier', cuenca: 'Río Loncomilla', lat: -35.5947, lng: -71.7336, x: 38, y: 22 },
  { name: 'Longaví', cuenca: 'Río Achibueno', lat: -35.9639, lng: -71.6842, x: 46, y: 52 },
  { name: 'Parral', cuenca: 'Río Perquilauquén', lat: -36.1428, lng: -71.8258, x: 40, y: 68 },
  { name: 'Retiro', cuenca: 'Río Perquilauquén', lat: -36.0506, lng: -71.7644, x: 42, y: 60 },
  { name: 'Cauquenes', cuenca: 'Río Loncomilla', lat: -35.9697, lng: -72.3150, x: 20, y: 50 },
  { name: 'Chanco', cuenca: 'Río Maule', lat: -35.7333, lng: -72.5333, x: 12, y: 35 },
  { name: 'Pelluhue', cuenca: 'Río Perquilauquén', lat: -35.8167, lng: -72.5667, x: 10, y: 44 }
];

export const INITIAL_CORRESPONDENTS: CorrespondentProfile[] = [
  {
    id: 'corr-1',
    name: 'Don Juan Sepúlveda',
    avatar: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=400&q=80',
    role: 'Corresponsal Agrícola y Faena Campesina',
    comuna: 'Longaví',
    cuenca: 'Río Achibueno',
    bio: 'Agricultor nacido en San Luis de Longaví. Reporta sobre ciclos de siembra, precios de insumos en ferias libres y derechos de los pequeños parceleros.',
    topics: ['Precios de Ferias', 'Subsidios INDAP', 'Forraje y Ganadería'],
    isVerified: true,
    contactPhone: '+56 9 8452 1199',
    articlesCount: 14,
    audioReportsCount: 22
  },
  {
    id: 'corr-2',
    name: 'Rosa Albornoz',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    role: 'Corresponsal Comunitaria y Defensora de APR',
    comuna: 'Linares',
    cuenca: 'Río Achibueno',
    bio: 'Vecina de Vara Gruesa y dirigenta social. Monitorea cortes de agua, fiscalización de extracción de áridos en el Achibueno y salud primaria rural.',
    topics: ['Agua Potable Rural (APR)', 'Defensa del Río', 'Juntas Vecinales'],
    isVerified: true,
    contactPhone: '+56 9 7120 4455',
    articlesCount: 19,
    audioReportsCount: 31
  },
  {
    id: 'corr-3',
    name: 'Margarita Baeza',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    role: 'Cronista de Saberes y Cultora en Crin',
    comuna: 'Colbún',
    cuenca: 'Río Maule',
    bio: 'Maestra artesana de la localidad de Rari. Documenta la memoria inmaterial, técnicas ancestrales de tejido y la soberanía de las mujeres campesinas.',
    topics: ['Artesanía en Crin', 'Soberanía Alimentaria', 'Memoria Campesina'],
    isVerified: true,
    contactPhone: '+56 9 9345 8821',
    articlesCount: 11,
    audioReportsCount: 18
  },
  {
    id: 'corr-4',
    name: 'Mateo Valenzuela',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    role: 'Corresponsal del Secano y Viñas Patrimoniales',
    comuna: 'Cauquenes',
    cuenca: 'Río Loncomilla',
    bio: 'Vitivinicultor agroecológico del secano interior. Reporta sobre cepas ancestrales (País, Carignan), estrés hídrico y empleo temporal de temporada.',
    topics: ['Secano Interior', 'Viñedos Campesinos', 'Trabajo Agrícola'],
    isVerified: true,
    contactPhone: '+56 9 9341 0022',
    articlesCount: 8,
    audioReportsCount: 12
  },
  {
    id: 'corr-5',
    name: 'Esteban Retamal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    role: 'Reportero de Servicios Básicos y Red Eléctrica',
    comuna: 'Retiro',
    cuenca: 'Río Perquilauquén',
    bio: 'Técnico electromecánico rural. Realiza seguimiento de cortes de luz CGE, indemnizaciones SEC por motores quemados y transporte rural en el Maule Sur.',
    topics: ['Cortes de Luz', 'Reclamos SEC', 'Transporte Rural'],
    isVerified: true,
    contactPhone: '+56 9 7654 3210',
    articlesCount: 16,
    audioReportsCount: 25
  },
  {
    id: 'corr-6',
    name: 'Marcela Fuentes',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    role: 'Corresponsal de Salud Rural y Cuidados',
    comuna: 'Panimávida',
    cuenca: 'Río Maule',
    bio: 'Promotora comunitaria de salud en postas rurales. Reporta sobre abastecimiento de remedios, traslados de urgencia y operativos odontológicos.',
    topics: ['Salud Rural', 'Postas Médicas', 'Adultos Mayores'],
    isVerified: true,
    contactPhone: '+56 9 8199 4433',
    articlesCount: 9,
    audioReportsCount: 15
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Por qué el fardo de alfalfa subió $1.800 en el Maule Sur y cómo postular hoy mismo al bono de forraje INDAP',
    subtitle: 'El frío tardío y la escasez hídrica dispararon el costo de alimentación del ganado en Longaví y Retiro.',
    section: 'campo',
    author: 'Don Juan Sepúlveda',
    authorRole: 'Corresponsal Agrícola y Faena Campesina',
    isVerifiedCorrespondent: true,
    date: '10 de Septiembre, 2026',
    comuna: 'Longaví',
    cuenca: 'Río Achibueno',
    status: 'publicado',
    isFeatured: true,
    coverImage: '/images/campo_alfalfa.jpg',
    gallery: [
      '/images/campo_alfalfa.jpg',
      '/images/campesino_faena.jpg'
    ],
    hasAudioCapsule: true,
    audioDuration: '01:28',
    audioUrl: 'https://actions.google.com/sounds/v1/weather/light_rain_on_leaves.ogg',
    block1WhatHappened: 'Durante esta semana, el precio del fardo de alfalfa y trébol en las parcelas de Longaví, Parral y Retiro alcanzó los $7.200 por unidad, cuando hace un mes se comercializaba en $5.400. Esto afecta directamente a las familias campesinas que necesitan alimentar animales en el final del invierno antes de los rebrotes primaverales.',
    block2TheCause: 'La causa directa responde a dos factores: la menor reserva de forraje por el estrés térmico de la temporada y el acaparamiento de grandes distribuidores que compraron en verde para revender a los predios lecheros del sur.',
    block3SolutionCall: 'El INDAP Maule abrió ventanilla de emergencia para entrega de vales de forraje de hasta $350.000 por usuario acreditado. La directiva campesina convoca a inscribirse en la agencia de área de Linares o comunicarse con los comités de pequeños agricultores antes del 22 de septiembre.',
    utilityCard: {
      title: 'Ficha de Utilidad Práctica: Bono de Forraje',
      dates: 'Postulaciones abiertas hasta el martes 22 de Septiembre a las 14:00 hrs.',
      phones: ['INDAP Linares: +56 73 263 3500', 'WhatsApp Orientación Campesina: +56 9 8452 1199'],
      locations: 'Oficina Área INDAP: Manuel Rodríguez #580, Linares (de 08:30 a 13:00)',
      responsibleAgency: 'INDAP Maule / Seremi de Agricultura',
      tips: [
        'Llevar fotocopia simple de cédula de identidad.',
        'Certificado de masa ganadera o rol de predio.',
        'No es requisito tener internet: la ficha se llena presencialmente.'
      ]
    }
  },
  {
    id: 'art-2',
    title: 'APR Vara Gruesa cumple 48 horas sin agua potable: Camiones aljibe no dan abasto y vecinos exigen fiscalización a areneras',
    subtitle: 'Más de 620 familias afectadas en el límite entre Linares y Colbún. Se organizan puntos de hidratación comunitaria.',
    section: 'alerta',
    author: 'Rosa Albornoz',
    authorRole: 'Corresponsal Comunitaria y Defensora de APR',
    isVerifiedCorrespondent: true,
    date: '10 de Septiembre, 2026',
    comuna: 'Linares',
    cuenca: 'Río Achibueno',
    status: 'publicado',
    isBreakingNews: true,
    coverImage: '/images/apr_vara_gruesa.jpg',
    gallery: [
      '/images/apr_vara_gruesa.jpg',
      '/images/achibueno_cajon.jpg'
    ],
    hasAudioCapsule: true,
    audioDuration: '01:30',
    audioUrl: 'https://actions.google.com/sounds/v1/weather/strong_wind_and_rain.ogg',
    block1WhatHappened: 'Desde el pasado lunes, el estanque acumulador del Comité de Agua Potable Rural (APR) Vara Gruesa registró niveles críticos con turbiedad extrema que obligó a cortar el suministro de agua para consumo humano a más de 2.500 personas.',
    block2TheCause: 'Las lluvias precordilleranas provocaron sedimentación severa en las napas freáticas, agravada por faenas de extracción de áridos no fiscalizadas en las inmediaciones del lecho del río, las cuales desviaron el caudal de amortiguación natural.',
    block3SolutionCall: 'La comunidad exige a la Dirección de Obras Hidráulicas (DOH) la habilitación de un pozo profundo de respaldo. Mientras tanto, se solicita a vecinos del radio urbano donar agua embotellada de 5L en la sede comunitaria.',
    utilityCard: {
      title: 'Ficha de Emergencia: Distribución de Agua en Vara Gruesa',
      dates: 'Camiones aljibe recorren el sector diariamente de 09:00 a 13:00 y de 16:00 a 20:00 hrs.',
      phones: ['Bomberos Linares: 132', 'Comité APR Emergencias: +56 9 7120 4455', 'DOH Maule: +56 71 220 9000'],
      locations: 'Puntos fijos de llenado: Frente a Escuela Vara Gruesa y Sede Comunitaria El Esfuerzo.',
      responsibleAgency: 'Municipalidad de Linares / DOH Maule',
      tips: [
        'Hervir el agua de camión aljibe por al menos 3 minutos antes del consumo infantil.',
        'Priorizar el uso del agua para hidratación y preparación de alimentos.',
        'Reportar cobros indebidos por llenado de bidones.'
      ]
    }
  },
  {
    id: 'art-int-1',
    title: 'Caída histórica en la cosecha de trigo en Argentina por sequía: Cómo impactará el precio de la harina y el pan en el Maule Sur',
    subtitle: 'El Cono Sur enfrenta un déficit del 24% en cereales. Molinos locales advierten reajustes en el quintal de harina hacia octubre.',
    section: 'internacional',
    author: 'Redacción Internacional Popular',
    authorRole: 'Enlace con Red de Medios del Cono Sur',
    isVerifiedCorrespondent: true,
    date: '10 de Septiembre, 2026',
    comuna: 'Linares',
    cuenca: 'Río Maule',
    status: 'publicado',
    coverImage: '/images/semillas_granos.jpg',
    gallery: [
      '/images/semillas_granos.jpg'
    ],
    hasAudioCapsule: true,
    audioDuration: '01:30',
    audioUrl: 'https://actions.google.com/sounds/v1/weather/wind_chimes_light_wind.ogg',
    block1WhatHappened: 'La Bolsa de Cereales de Buenos Aires confirmó una caída de más de 3.5 millones de toneladas de trigo panadero debido a la prolongada sequía que golpea las provincias pampeanas y de Santa Fe. Dado que Chile importa cerca del 45% del trigo que consume de Argentina, la cotización de importación ya experimentó un alza del 14% en puertos chilenos.',
    block2TheCause: 'El fenómeno climático extremo combinado con el encarecimiento de los fletes fluviales y la falta de reservas soberanas de granos en los países del Cono Sur traslada de inmediato las pérdidas al costo de molienda.',
    block3SolutionCall: 'Organizaciones campesinas chilenas llaman a potenciar la siembra de trigo candeal y harinero local en el valle central y secano, y exigen a las autoridades fijar bandas de protección para que las panaderías de barrio y familias no paguen el kilo de pan sobre los $2.500.',
    localImpactMaule: 'En las comunas de Linares, Parral y San Javier, las panaderías tradicionales estiman un alza de hasta $250 por kilo de pan corriente hacia finales de mes. Se recomienda a pequeños panaderos comprar harina en molinos locales de la provincia antes del reajuste internacional.',
    utilityCard: {
      title: 'Ficha de Impacto de Bolsillo: Harina y Panadería Local',
      dates: 'Reajuste proyectado en molinos: a partir del 01 de Octubre, 2026.',
      phones: ['Mesa de Panificadores del Maule: +56 9 7788 1234'],
      locations: 'Molinos con venta directa a familias: Molino Santa Elena (Linares) y Molino Parral.',
      responsibleAgency: 'Observatorio de Precios Agrícolas / ODEPA',
      tips: [
        'Preferir compra asociativa de sacos de harina de 25kg entre vecinos.',
        'Apoyar la compra de trigo sembrado por productores locales de Longaví y Retiro.'
      ]
    }
  },
  {
    id: 'art-int-2',
    title: 'Movimiento Campesino de Colombia frena ley que pretendía privatizar semillas nativas: El ejemplo que miran los huerteros del Maule',
    subtitle: 'La presión comunitaria de miles de pequeños agricultores logró archivar el proyecto que criminalizaba el libre intercambio de semillas.',
    section: 'internacional',
    author: 'Colectivo Guardadoras del Maule',
    authorRole: 'Corresponsales de Soberanía Alimentaria',
    isVerifiedCorrespondent: true,
    date: '09 de Septiembre, 2026',
    comuna: 'Yerbas Buenas',
    cuenca: 'Río Maule',
    status: 'publicado',
    coverImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
    ],
    hasAudioCapsule: true,
    audioDuration: '01:25',
    audioUrl: 'https://actions.google.com/sounds/v1/foley/nature_ambience.ogg',
    block1WhatHappened: 'Tras meses de movilización campesina en Boyacá, Nariño y Cundinamarca, el Congreso de Colombia archivó definitivamente la iniciativa legal que obligaba a los agricultores a utilizar únicamente semillas certificadas por transnacionales del agro, declarando el banco de semillas criollas como patrimonio inembargable.',
    block2TheCause: 'Tratados comerciales internacionales empujaban normativas similares al convenio UPOV 91, penalizando a quienes guarden parte de su cosecha para resembrar o intercambiar libremente en ferias locales.',
    block3SolutionCall: 'Las redes campesinas del Maule Sur celebraron el hito como una inspiración directa para blindar los Trafkintus y ferias de semillas en comunas como Yerbas Buenas, San Javier y Colbún frente a presiones similares en Chile.',
    localImpactMaule: 'Este triunfo fortalece la convocatoria del próximo Trafkintu de Yerbas Buenas, donde se busca consolidar el primer banco comunitario de semillas 100% libre de patentes comerciales en la provincia de Linares.',
    utilityCard: {
      title: 'Ficha Práctica: Protección de Semillas Campesinas',
      dates: 'Próximo intercambio regional: Sábado 19 de Septiembre en Yerbas Buenas.',
      phones: ['Red de Semillas Libres del Maule: +56 9 9123 7744'],
      locations: 'Plaza Histórica de Yerbas Buenas',
      responsibleAgency: 'Red de Soberanía Alimentaria del Maule Sur',
      tips: [
        'Aprender a limpiar y guardar semilla tradicional en frascos oscuros con ceniza cernida.',
        'Evitar el ingreso de semillas híbridas con patente en los trueques vecinales.'
      ]
    }
  },
  {
    id: 'art-3',
    title: 'Artesanas en Crin de Rari se organizan contra la copia industrial y lanzan sello territorial de autenticidad comunitaria',
    subtitle: 'La milenaria técnica de tejido en pelo de caballo busca proteger el trabajo de más de 80 maestras del Maule Sur.',
    section: 'mujer',
    author: 'Margarita Baeza',
    authorRole: 'Cronista de Saberes y Cultora en Crin',
    isVerifiedCorrespondent: true,
    date: '09 de Septiembre, 2026',
    comuna: 'Colbún',
    cuenca: 'Río Maule',
    status: 'publicado',
    coverImage: '/images/artesania_manos.jpg',
    gallery: [
      '/images/artesania_manos.jpg'
    ],
    hasAudioCapsule: true,
    audioDuration: '01:15',
    audioUrl: 'https://actions.google.com/sounds/v1/foley/paper_rustling.ogg',
    block1WhatHappened: 'Las cultoras del tejido en crin de la localidad de Rari conformaron una cooperativa para frenar la reventa de artesanías plásticas importadas que se hacían pasar por piezas tradicionales en ferias de Santiago y la costa.',
    block2TheCause: 'La falta de trazabilidad y el intermediario comercial pagaba apenas un 15% del valor real a las mujeres en el campo, obligando a muchas jóvenes a migrar a ciudades por falta de ingresos dignos.',
    block3SolutionCall: 'Cada pieza creada por la cooperativa contará con un hilo dorado trenzado y un código QR que enlaza directamente con la historia de la artesana y permite compra sin intermediarios.',
    utilityCard: {
      title: 'Ficha Práctica: Dónde Encontrar Crin Auténtico',
      dates: 'Venta directa en Rari todos los sábados y domingos de 10:00 a 19:00 hrs.',
      phones: ['Colectivo Rari Vivo: +56 9 9345 8821'],
      locations: 'Calle Los Ciruelos s/n, Rari (a 5 minutos de Panimávida)',
      responsibleAgency: 'Cooperativa de Mujeres Artesanas de Rari',
      tips: [
        'Exigir siempre el trenzado original con crin natural teñido con anilinas o vegetales locales.',
        'Talleres abiertos para niñas y jóvenes el primer sábado de cada mes.'
      ]
    }
  },
  {
    id: 'art-4',
    title: 'Comunidad del Cajón del Achibueno define plan de vigilancia ciudadana ante nueva solicitud de derechos de agua en altas cumbres',
    subtitle: 'Vecinos y arrieros de Pejerrey y Monte Oscuro ratifican que el Santuario de la Naturaleza no se toca.',
    section: 'alerta',
    author: 'Rosa Albornoz',
    authorRole: 'Corresponsal Comunitaria y Defensora de APR',
    isVerifiedCorrespondent: true,
    date: '08 de Septiembre, 2026',
    comuna: 'Linares',
    cuenca: 'Río Achibueno',
    status: 'publicado',
    coverImage: '/images/achibueno_cajon.jpg',
    gallery: [
      '/images/achibueno_cajon.jpg',
      '/images/cordillera_amanecer.jpg'
    ],
    hasAudioCapsule: true,
    audioDuration: '01:25',
    audioUrl: 'https://actions.google.com/sounds/v1/water/stream_water.ogg',
    block1WhatHappened: 'Más de 140 vecinos, arrieros y defensores ambientales se reunieron en la Escuela de Pejerrey para analizar el expediente presentado ante la Dirección General de Aguas (DGA) que pretende registrar derechos no consuntivos en las altas cumbres del río.',
    block2TheCause: 'Pese a la declaración de Santuario de la Naturaleza en 2015, vacíos legales en el Código de Aguas permiten a inversionistas particulares ingresar solicitudes que amenazan el caudal ecológico del Achibueno.',
    block3SolutionCall: 'La comunidad acordó presentar un recurso de oposición masivo firmado por juntas de vecinos y agricultores aguas abajo, además de organizar una marcha familiar en la Plaza de Armas de Linares el próximo mes.',
    utilityCard: {
      title: 'Ficha de Acción Ciudadana: Oposición Legal DGA',
      dates: 'Firma de libro de oposición disponible hasta el 30 de Septiembre.',
      phones: ['Mesa Territorial Achibueno: +56 9 6632 0011'],
      locations: 'Puntos de firma: Sede Pejerrey, Sede Vega de Salas y Centro Cultural Linares.',
      responsibleAgency: 'Comunidad Organizada del Cajón del Achibueno',
      tips: [
        'Solo se requiere ser mayor de 18 años y residir en la provincia de Linares.',
        'La firma no tiene costo alguno.'
      ]
    }
  },
  {
    id: 'art-5',
    title: 'Apagón de 14 horas en San Luis de Longaví quema motores de riego y pudre cosechas de frambuesa congelada',
    subtitle: 'Vecinos cuantifican pérdidas en más de 12 millones de pesos por corte intempestivo atribuido a falta de poda de CGE.',
    section: 'alerta',
    author: 'Esteban Retamal',
    authorRole: 'Reportero de Servicios Básicos y Red Eléctrica',
    isVerifiedCorrespondent: true,
    date: '07 de Septiembre, 2026',
    comuna: 'Longaví',
    cuenca: 'Río Achibueno',
    status: 'publicado',
    coverImage: '/images/apagon_tormenta.jpg',
    gallery: [
      '/images/apagon_tormenta.jpg'
    ],
    hasAudioCapsule: true,
    audioDuration: '01:10',
    audioUrl: 'https://actions.google.com/sounds/v1/weather/thunder_crack.ogg',
    block1WhatHappened: 'Un corte no programado dejó sin suministro a 420 parcelas del callejón Los Canelos y San Luis. Varios pequeños productores perdieron la cadena de frío de conservadoras y sufrieron la quema de bombas centrífugas de pozos.',
    block2TheCause: 'La caída de ramas secas sobre la línea de media tensión. La empresa distribuidora no realizó el despeje de fajas de servidumbre comprometido en mayo pasado.',
    block3SolutionCall: 'Se convoca a todos los afectados a presentar el formulario de reclamo ante la SEC (Superintendencia de Electricidad y Combustibles) con boletas y fotos de electrodomésticos quemados.',
    utilityCard: {
      title: 'Ficha Práctica: Reclamo SEC e Indemnización',
      dates: 'Plazo de reclamo de artefactos: hasta 30 días posteriores al corte.',
      phones: ['SEC Maule: 600 6000 732', 'CGE Emergencias: 800 800 767'],
      locations: 'Plataforma web: www.sec.cl o presencial en ChileAtiende Linares.',
      responsibleAgency: 'Superintendencia de Electricidad y Combustibles (SEC)',
      tips: [
        'Fotografiar el artefacto dañado y su placa técnica.',
        'Anotar el número de cliente que aparece en la boleta de luz.',
        'Pedir presupuesto de reparación a un técnico certificado.'
      ]
    }
  },
  {
    id: 'art-6',
    title: 'Gran Trafkintu e intercambio de semillas tradicionales en Yerbas Buenas: Rescate de poroto tórtola y ají cacho de cabra',
    subtitle: 'La Red de Semillas Libres del Maule invita a familias huerteras a intercambiar simientes sin dinero de por medio.',
    section: 'comunidad',
    author: 'Colectivo Guardadoras del Maule',
    authorRole: 'Curadoras de semillas campesinas',
    isVerifiedCorrespondent: true,
    date: '06 de Septiembre, 2026',
    comuna: 'Yerbas Buenas',
    cuenca: 'Río Maule',
    status: 'publicado',
    coverImage: '/images/semillas_granos.jpg',
    gallery: [
      '/images/semillas_granos.jpg'
    ],
    hasAudioCapsule: true,
    audioDuration: '01:20',
    audioUrl: 'https://actions.google.com/sounds/v1/foley/nature_ambience.ogg',
    block1WhatHappened: 'Este sábado 19 de septiembre se llevará a cabo el encuentro anual de intercambio campesino en la Plaza Histórica de Yerbas Buenas, convocando a huerteras de todo el valle central.',
    block2TheCause: 'La pérdida acelerada de variedades agrícolas tradicionales frente a las semillas híbridas y patentadas pone en riesgo la alimentación campesina y la soberanía del Maule.',
    block3SolutionCall: 'La participación es libre. No se vende nada: solo se intercambia semilla por semilla, plantines, ganchos o saberes agrícolas.',
    utilityCard: {
      title: 'Ficha Práctica: Encuentro de Semillas en Yerbas Buenas',
      dates: 'Sábado 19 de Septiembre, desde las 10:30 hasta las 17:00 hrs.',
      phones: ['Coordinación Semillas Libres: +56 9 9123 7744'],
      locations: 'Plaza de Armas de Yerbas Buenas (frente al Museo Histórico)',
      responsibleAgency: 'Red de Semillas Campesinas del Maule',
      tips: [
        'Llevar semillas limpias en bolsitas de papel o frascos rotulados con año y variedad.',
        'Llevar vaso o pocillo reutilizable para el mate comunitario.'
      ]
    }
  }
];

export const INITIAL_EMERGENCIES: EmergencyAlert[] = [
  {
    id: 'emg-1',
    type: 'apr',
    title: 'Falla en Bomba Principal APR Panimávida',
    sector: 'Sector Termas y Callejón El Álamo',
    comuna: 'Panimávida',
    cuenca: 'Río Maule',
    affectedCount: '420 familias',
    status: 'cuadrilla_en_camino',
    reportedAt: 'Hoy, 06:30 hrs',
    lastUpdate: 'Hace 25 minutos',
    notes: 'Bomba sumergible sufrió baja de tensión. Se gestiona generador de respaldo con Bomberos.',
    urgentNotice: 'Se habilitó punto de agua en la sede parroquial de Panimávida.'
  },
  {
    id: 'emg-2',
    type: 'luz',
    title: 'Corte de Luz en Ruta L-11 Linares a Colbún',
    sector: 'Cruce San Bartolo y La Granja',
    comuna: 'Colbún',
    cuenca: 'Río Maule',
    affectedCount: '890 clientes',
    status: 'en_curso',
    reportedAt: 'Hoy, 07:15 hrs',
    lastUpdate: 'Hace 40 minutos',
    notes: 'Choque de vehículo menor contra poste en km 12. Cuadrilla CGE en faena de reemplazo de poste.'
  },
  {
    id: 'emg-3',
    type: 'socioambiental',
    title: 'Alerta por Humos y Pastizales en Orilla Río Melado',
    sector: 'Puente Melado hacia la cordillera',
    comuna: 'Colbún',
    cuenca: 'Río Melado',
    affectedCount: 'Predios ganaderos colindantes',
    status: 'en_curso',
    reportedAt: 'Ayer, 18:40 hrs',
    lastUpdate: 'Hace 2 horas',
    notes: 'Viento Puelche reactiva focos de quema no autorizada en potrero forestal. Brigadas comunitarias en alerta.'
  },
  {
    id: 'emg-4',
    type: 'apr',
    title: 'Corte Parcial de Agua Potable Rural en Rabones',
    sector: 'Camino La Balsa',
    comuna: 'Parral',
    cuenca: 'Río Perquilauquén',
    affectedCount: '180 familias',
    status: 'resuelto',
    reportedAt: 'Ayer, 14:00 hrs',
    lastUpdate: 'Ayer, 21:30 hrs',
    notes: 'Rotura de matriz reparada por socios del comité. Presión normalizada en todo el callejón.'
  }
];

export const INITIAL_PIZARRA: PizarraItem[] = [
  {
    id: 'piz-1',
    category: 'trueque',
    title: 'Cambio 20 fardos de trébol rosado por saco de papas o herramientas de mano',
    description: 'Fardos de primera corte, bien guardados en galpón sin humedad. Me sirve trueque por papa de guarda o rastra.',
    priceOrBarter: 'Trueque o $5.500 c/u',
    contactName: 'Don René Castillo',
    contactPhone: '+56 9 7821 3499',
    comuna: 'Longaví',
    date: 'Hoy',
    status: 'aprobado'
  },
  {
    id: 'piz-2',
    category: 'venta_agricola',
    title: 'Venta de huevos de campo de gallina araucana y criolla',
    description: 'Huevos azules y de color, alimentación 100% con pastoreo y maíz. Entrego en Linares centro o retiro en fundo.',
    priceOrBarter: '$6.000 la bandeja de 30',
    contactName: 'Señora Carmen Gloria',
    contactPhone: '+56 9 8456 2211',
    comuna: 'Linares',
    date: 'Ayer',
    status: 'aprobado'
  },
  {
    id: 'piz-3',
    category: 'empleo',
    title: 'Se busca cuadrilla para poda de viña y arado con bueyes',
    description: 'Predio agroecológico en Cauquenes busca 3 trabajadores con experiencia en poda en vaso y viñedo patrimonial. Almuerzo campesino incluido.',
    priceOrBarter: '$32.000 la jornada diaria',
    contactName: 'Mateo Valenzuela',
    contactPhone: '+56 9 9341 0022',
    comuna: 'Cauquenes',
    date: '08 Septiembre',
    status: 'aprobado'
  },
  {
    id: 'piz-4',
    category: 'apero',
    title: 'Reparación de bombas de pozo profundo y tableros trifásicos',
    description: 'Técnico electromecánico del sector rural. Reparación a domicilio con garantía de faena.',
    priceOrBarter: 'Presupuesto sin costo en radio 25km',
    contactName: 'Luis Hernán Bravo',
    contactPhone: '+56 9 7112 5590',
    comuna: 'San Javier',
    date: '07 Septiembre',
    status: 'aprobado'
  }
];

export const INITIAL_CARPOOL: CarpoolRide[] = [
  {
    id: 'crp-1',
    driver: 'Don Pedro Morales (Camioneta Hilux)',
    origin: 'Pejerrey (Cajón Achibueno)',
    destination: 'Hospital Base de Linares',
    date: 'Viernes 12 Sept',
    time: '06:45 hrs',
    availableSeats: 3,
    contact: '+56 9 9234 1100',
    contribution: 'Cooperación bencina $2.000'
  },
  {
    id: 'crp-2',
    driver: 'Marcela Fuentes',
    origin: 'Plaza Panimávida',
    destination: 'Terminal Rodoviario Linares',
    date: 'Lunes a Viernes',
    time: '07:15 hrs',
    availableSeats: 2,
    contact: '+56 9 8199 4433',
    contribution: 'Aporte voluntario'
  },
  {
    id: 'crp-3',
    driver: 'Claudio Garrido',
    origin: 'Catillo (Parral rural)',
    destination: 'Centro Parral / Estación de Trenes',
    date: 'Sábado 13 Sept',
    time: '08:00 hrs',
    availableSeats: 4,
    contact: '+56 9 7654 3210',
    contribution: '$1.500 por asiento'
  }
];

export const INITIAL_BUS_SCHEDULES: RuralBusSchedule[] = [
  {
    id: 'bus-1',
    route: 'Linares — Colbún — Panimávida',
    operator: 'Buses Maule Sur / Cordillera',
    frequency: 'Cada 20 minutos',
    firstBus: '06:30 hrs',
    lastBus: '20:45 hrs',
    fareRegular: '$1.200',
    fareAdultoMayor: '$600',
    stops: 'Terminal Linares, Cruce Bobadilla, San Bartolo, Panimávida, Colbún Centro'
  },
  {
    id: 'bus-2',
    route: 'Linares — Pejerrey — Monte Oscuro (Cajón Achibueno)',
    operator: 'Micro Rural Achibueno',
    frequency: '3 salidas diarias (07:00, 12:30, 17:30)',
    firstBus: '07:00 hrs',
    lastBus: '17:30 hrs',
    fareRegular: '$2.000',
    fareAdultoMayor: '$1.000',
    stops: 'Llepo, El Peumo, Pejerrey, Los Hualles'
  },
  {
    id: 'bus-3',
    route: 'Parral — Catillo — San Manuel',
    operator: 'Transportes Cordillera Parral',
    frequency: 'Cada 45 minutos',
    firstBus: '07:00 hrs',
    lastBus: '19:15 hrs',
    fareRegular: '$1.400',
    fareAdultoMayor: '$700',
    stops: 'Terminal Parral, Remulcao, Termas Catillo, Villaseca'
  },
  {
    id: 'bus-4',
    route: 'Cauquenes — Chanco — Pelluhue',
    operator: 'Buses Costa Maule',
    frequency: 'Cada 30 minutos',
    firstBus: '06:45 hrs',
    lastBus: '20:00 hrs',
    fareRegular: '$1.800',
    fareAdultoMayor: '$900',
    stops: 'Terminal Cauquenes, Pahuil, Chanco Plaza, Curanipe, Pelluhue'
  }
];

export const INITIAL_FERIA_PRICES: FeriaPriceItem[] = [
  { id: 'fp-1', product: 'Papa Desirée / Asterix', variety: 'Primera selección', price: '$9.500', unit: 'Saco 25 kg', trend: 'baja', marketName: 'Feria Libre Linares', comuna: 'Linares' },
  { id: 'fp-2', product: 'Tomate Larga Vida', variety: 'Invernadero Colbún', price: '$800', unit: 'Kilo', trend: 'estable', marketName: 'Feria de Productores Colbún', comuna: 'Colbún' },
  { id: 'fp-3', product: 'Poroto Tórtola', variety: 'Cosecha local seca', price: '$2.400', unit: 'Kilo', trend: 'estable', marketName: 'Feria Campesina San Javier', comuna: 'San Javier' },
  { id: 'fp-4', product: 'Cebolla temprana', variety: 'Valenciana nueva', price: '$4.500', unit: 'Malla 15 kg', trend: 'alza', marketName: 'Feria Libre Parral', comuna: 'Parral' },
  { id: 'fp-5', product: 'Harina Tostada de Trigo', variety: 'Molino de piedra artesanal', price: '$1.800', unit: 'Bolsa 1 kg', trend: 'estable', marketName: 'Feria Campesina Yerbas Buenas', comuna: 'Yerbas Buenas' }
];

export const INITIAL_SUBSIDIES: SubsidyItem[] = [
  {
    id: 'sub-1',
    title: 'Fondo de Emergencia Hídrica y Forraje INDAP',
    institution: 'INDAP Maule',
    deadline: '22 de Septiembre, 2026',
    targetAudience: 'Pequeños ganaderos y usuarios acreditados de comunas bajo emergencia agrícola',
    amountOrBenefit: 'Bono directo de hasta $350.000 para forraje o mangueras de riego',
    howToApply: 'Presencial en Agencia INDAP de Linares, Parral o Cauquenes con fotocopia de carnet.'
  },
  {
    id: 'sub-2',
    title: 'Postulación a Mejoramiento de Pozos y Sistemas APR',
    institution: 'DOH / Gobierno Regional del Maule',
    deadline: '15 de Octubre, 2026',
    targetAudience: 'Comités de Agua Potable Rural constituidos con personalidad jurídica al día',
    amountOrBenefit: 'Financiamiento del 100% de bombas solares y clorinadores automáticos',
    howToApply: 'A través de la directiva del APR con carta de solicitud ingresada en SECPLA municipal.'
  },
  {
    id: 'sub-3',
    title: 'Bono Mujer Rural Emprendedora y Tradición',
    institution: 'FOSIS / Seremi de la Mujer',
    deadline: '05 de Octubre, 2026',
    targetAudience: 'Artesanas, hilanderas, hortaliceras y recolectoras del Secano y Precordillera',
    amountOrBenefit: '$550.000 en equipamiento y compra de materia prima comunitaria',
    howToApply: 'Inscripción en DIDECO de cada comuna o vía web www.fosis.gob.cl'
  }
];

export const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: 'ev-1',
    title: 'Gran Trafkintu e Intercambio de Semillas Libres',
    type: 'trafkintu',
    date: 'Sábado 19 Septiembre',
    time: '10:30 a 17:00 hrs',
    location: 'Plaza de Armas de Yerbas Buenas',
    comuna: 'Yerbas Buenas',
    description: 'Intercambio solidario de semillas ancestrales, plantines y saberes huerteros. Trae tu mate.',
    contact: '+56 9 9123 7744'
  },
  {
    id: 'ev-2',
    title: 'Bingo Vecinal a Beneficio de Don Segundo (Tratamiento Salud)',
    type: 'bingo',
    date: 'Domingo 14 Septiembre',
    time: '15:00 hrs',
    location: 'Sede Comunitaria San Luis de Longaví',
    comuna: 'Longaví',
    description: '10 bingos con premios de corderos, sacos de papas y electrodomésticos. Habrá sopaipillas con pebre y empanadas.',
    contact: '+56 9 8812 0033'
  },
  {
    id: 'ev-3',
    title: 'Asamblea Extraordinaria Unión Comunal de APRs Maule Sur',
    type: 'asamblea',
    date: 'Jueves 17 Septiembre',
    time: '18:00 hrs',
    location: 'Gimnasio Municipal de Colbún',
    comuna: 'Colbún',
    description: 'Análisis de la ley de tarifas eléctricas especiales para comités de agua potable campesina.',
    contact: 'Mesa APR Maule Sur'
  },
  {
    id: 'ev-4',
    title: 'Feria Costumbrista del Cordero y la Chicha Baya',
    type: 'feria',
    date: '26 y 27 de Septiembre',
    time: 'Desde las 11:00 hrs',
    location: 'Cancha Los Maitenes, Parral Rural',
    comuna: 'Parral',
    description: 'Gastronomía criolla, música folclórica en vivo y muestra de esquila tradicional de ovejas.',
    contact: 'Comité Crianceros Parral'
  }
];

export const INITIAL_MODERATION_ITEMS: ModerationItem[] = [
  {
    id: 'mod-1',
    source: 'whatsapp',
    title: 'Audio denunciando tala rasa no autorizada de robles en quebrada de Rabones',
    content: 'Hola compas de la radio, les mando este audio y foto. Desde ayer están con motosierras en la quebrada del estero botando bosque nativo. El agua de la vertiente bajó turbia y con aserrín. Por favor difundan para que vaya Conaf.',
    senderName: 'Marta Morales (Vecina de Rabones)',
    senderPhone: '+56 9 7712 9081',
    mediaUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/household/clock_ticking.ogg',
    comuna: 'Parral',
    timestamp: 'Hace 35 min',
    status: 'pendiente',
    targetSection: 'alerta'
  },
  {
    id: 'mod-2',
    source: 'avisador_cortes',
    title: 'Corte de luz sector Orilla de Maule por choque de camión de leña',
    content: 'Poste quebrado a 200 metros del cruce. No hay luz desde las 08:00 am y hay cables colgando en la calle.',
    senderName: 'Carlos Villalobos',
    senderPhone: '+56 9 6543 2198',
    comuna: 'San Javier',
    timestamp: 'Hace 1 hora',
    status: 'pendiente',
    targetSection: 'emergencias'
  },
  {
    id: 'mod-3',
    source: 'pizarra',
    title: 'Trueco 5 sacos de abono orgánico de corral por fardos o harina',
    description: 'Abono maduro de oveja y gallina para huerto o chacra. Estoy en sector Las Toscas.',
    content: 'Trueco 5 sacos de abono maduro por fardos para animales o harina de trigo.',
    senderName: 'Hernán Salgado',
    senderPhone: '+56 9 8234 5511',
    comuna: 'Linares',
    timestamp: 'Hace 2 horas',
    status: 'pendiente',
    targetSection: 'anuncios'
  }
];

export const INITIAL_AUTO_APPROVAL: AutoApprovalSettings = {
  enabled: false,
  autoApprovePizarra: true,
  autoApproveCortes: false,
  autoApproveWhatsApp: false,
};
