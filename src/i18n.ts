import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enGB = {
  tour: {
    welcomeTitle: 'Welcome to Inmobi',
    welcomeMessage: 'Let us show you around our platform to help you find your dream property!',
    completedTitle: 'Tour Completed',
    completedMessage: 'You can restart the tour anytime from the help menu',
    back: 'Back',
    close: 'Close',
    finish: 'Finish',
    next: 'Next',
    skip: 'Skip',
  },
  common: {
    help: 'Help',
    startTour: 'Start Guided Tour',
    faq: 'FAQ',
    contactSupport: 'Contact Support',
    home: 'Home',
    advanced: 'Advanced',
    properties: 'Properties',
    services: 'Services',
    buying: 'Buying',
    selling: 'Selling',
    investing: 'Investing',
    about: 'About',
    contact: 'Contact',
    login: 'Sign In',
    register: 'Join Now',
    logout: 'Log out',
    dashboard: 'Dashboard',
    search: 'Search',
    priceRange: 'Price Range',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    propertyType: 'Property Type',
    filters: 'Filters',
    sort: 'Sort',
    noResults: 'No results found',
    favorites: 'Favorites',
    messages: 'Messages',
    profile: 'Profile',
    subscription: 'Subscription',
    viewDetails: 'View Details',
    contactAgent: 'Contact Agent',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    selectLanguage: 'Select Language',
    shareListing: 'Share Listing',
    printListing: 'Print Listing',
    copy: 'Copy',
    copied: 'Copied',
    linkCopied: 'Link copied to clipboard',
    copyFailed: 'Failed to copy link',
    close: 'Close',
    shareOnSocial: 'Share on social media',
    similarProperties: 'Similar Properties',
    propertyFeatures: 'Property Features',
    neighborhood: 'Neighborhood',
    propertyDetails: 'Property Details',
    location: 'Location',
    requestTour: 'Request a Tour',
    applyNow: 'Apply Now',
    save: 'Save',
    cancel: 'Cancel',
    update: 'Update',
    delete: 'Delete',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    apply: 'Apply',
    clear: 'Clear',
    submit: 'Submit',
    required: 'Required',
    optional: 'Optional',
    showMore: 'Show More',
    showLess: 'Show Less',
    searchProperties: 'Search Properties',
    whereToLook: 'Where to look?',
    findYourDreamProperty: 'Find Your Dream Property',
    beds: 'Beds',
    baths: 'Baths',
    any: 'Any',
    moreFilters: 'More Filters',
    squareFootage: 'Square Footage',
    min: 'Min',
    max: 'Max',
    features: {
      title: 'Features',
      pool: 'Pool',
      garage: 'Garage',
      waterfront: 'Waterfront',
      fireplace: 'Fireplace'
    },
    saveThisSearch: 'Save this search',
    propertiesFound: '{{count}} properties found',
    view: 'View',
    searchPlaceholder: 'Enter city, zip or address, buy or sell'
  },
  property: {
    house: 'House',
    condo: 'Condo',
    apartment: 'Apartment',
    townhouse: 'Townhouse',
    land: 'Land',
    price: 'Price',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    sqft: 'Sq.Ft.',
    yearBuilt: 'Year Built',
    lotSize: 'Lot Size',
    garageSpaces: 'Garage Spaces',
    propertyType: 'Property Type',
    built: 'Built',
    taxes: 'Taxes',
    status: 'Status',
    description: 'Description',
    features: 'Features',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'Zip Code',
    country: 'Country',
    shareTitle: 'Share this property',
    shareDescription: 'Share this property with friends and family, or save it for future reference. You can share via social media, email, or by copying the link.'
  },
  subscription: {
    plan: 'Plan',
    price: 'Price',
    period: 'Period',
    features: 'Features',
    description: 'Description',
    free: 'Free',
    premium: 'Premium',
    enterprise: 'Enterprise',
    currentPlan: 'Current Plan',
    upgradePlan: 'Upgrade Plan',
    managePlan: 'Manage Plan',
    billingInfo: 'Billing Information',
    paymentMethod: 'Payment Method',
    billingHistory: 'Billing History',
    nextBilling: 'Next Billing',
    perMonth: 'per month',
    perYear: 'per year',
    unlimited: 'Unlimited'
  },
  bulkUpload: {
    title: 'Bulk Upload',
    description: 'Upload multiple properties at once using CSV or Excel files',
    csvUploadInfo: 'Upload a CSV file with property data',
    excelUploadInfo: 'Upload an Excel file with property data',
    dragAndDrop: 'Drag and drop file here or click to browse',
    selectCSVFile: 'Select CSV File',
    selectExcelFile: 'Select Excel File',
    selectedFile: 'Selected File',
    parseFile: 'Parse File',
    importData: 'Import Data',
    processing: 'Processing your file...',
    preview: 'Data Preview',
    importResults: 'Import Results',
    successfulUploads: 'Successful Uploads',
    failedUploads: 'Failed Uploads',
    errors: 'Errors',
    createdProperties: 'Created Properties',
    uploadHelp: 'Help & Guidelines',
    csvHelpText: 'Your CSV file should include columns for property details such as title, price, address, etc. Use the template below for reference.',
    requiredFields: 'Required Fields',
    downloadTemplate: 'Download Template CSV',
    backToDashboard: 'Back to Dashboard',
    uploadComplete: 'Upload Complete',
    propertiesUploaded: '{{count}} properties successfully uploaded',
    error: 'Error',
    errorParsingFile: 'Error parsing file. Please check the format.',
    errorImportingData: 'Error importing data. Please try again.',
    premiumFeature: 'Premium Feature',
    premiumFeatureDescription: 'Bulk Upload is available only for Premium and Enterprise subscribers.',
    bulkUploadPremiumRequired: 'Premium Subscription Required',
    bulkUploadPremiumRequiredDescription: 'Upgrade to Premium or Enterprise to access the bulk upload feature.',
    upgradeToPremium: 'Upgrade to Premium'
  },
  user: {
    fullName: 'Full Name',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phoneNumber: 'Phone Number',
    bio: 'Bio',
    role: 'Role',
    agent: 'Agent',
    admin: 'Admin',
    user: 'User',
    settings: 'Settings',
    personalInfo: 'Personal Information',
    accountSettings: 'Account Settings',
    notifications: 'Notifications',
    privacy: 'Privacy',
    security: 'Security',
    twoFactorAuth: 'Two-factor Authentication',
    changePassword: 'Change Password',
    deleteAccount: 'Delete Account',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    accountCreated: 'Account Created'
  },
  auth: {
    signin: 'Sign In',
    signup: 'Sign Up',
    emailPlaceholder: 'Email address',
    passwordPlaceholder: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: 'Don\'t have an account?',
    hasAccount: 'Already have an account?',
    createAccount: 'Create Account',
    continueWith: 'Or continue with',
    loginSuccess: 'Logged in successfully',
    loginFailed: 'Invalid username or password',
    registerSuccess: 'Account created successfully',
    registerFailed: 'Registration failed',
    logoutSuccess: 'Logged out successfully',
    passwordResetSent: 'Password reset link sent',
    passwordResetFailed: 'Failed to send password reset',
    passwordChanged: 'Password changed successfully',
    passwordChangeFailed: 'Password change failed',
    requiredField: 'This field is required',
    invalidEmail: 'Invalid email address',
    passwordsMustMatch: 'Passwords must match',
    passwordTooShort: 'Password must be at least 8 characters',
    usernameExists: 'Username already exists',
    emailExists: 'Email already exists'
  },
  messages: {
    inbox: 'Inbox',
    sent: 'Sent',
    archived: 'Archived',
    compose: 'Compose',
    subject: 'Subject',
    message: 'Message',
    from: 'From',
    to: 'To',
    date: 'Date',
    read: 'Read',
    unread: 'Unread',
    reply: 'Reply',
    forward: 'Forward',
    archive: 'Archive',
    delete: 'Delete',
    send: 'Send',
    messageSent: 'Message sent',
    messageNotSent: 'Message not sent',
    noMessages: 'No messages',
    selectRecipient: 'Select recipient',
    writeMessage: 'Write a message',
    propertyInquiry: 'Property Inquiry',
    regarding: 'Regarding'
  },
  notifications: {
    title: 'Notifications',
    toggle: 'Toggle notifications',
    clearAll: 'Clear all notifications',
    empty: 'No notifications yet',
    newProperty: 'New property listed',
    updatedProperty: 'Property updated',
    status: {
      connecting: 'Connecting',
      connected: 'Connected',
      disconnected: 'Disconnected',
      error: 'Connection error'
    }
  }
};

// Spanish translations
const esMX = {
  tour: {
    welcomeTitle: 'Bienvenido a Inmobi',
    welcomeMessage: '¡Permítanos mostrarle nuestra plataforma para ayudarlo a encontrar su propiedad ideal!',
    completedTitle: 'Recorrido Completado',
    completedMessage: 'Puede reiniciar el recorrido en cualquier momento desde el menú de ayuda',
    back: 'Atrás',
    close: 'Cerrar',
    finish: 'Finalizar',
    next: 'Siguiente',
    skip: 'Omitir',
  },
  common: {
    help: 'Ayuda',
    startTour: 'Iniciar Recorrido Guiado',
    faq: 'Preguntas Frecuentes',
    contactSupport: 'Contactar Soporte',
    home: 'Inicio',
    advanced: 'Avanzado',
    properties: 'Propiedades',
    services: 'Servicios',
    buying: 'Compra',
    selling: 'Venta',
    investing: 'Inversión',
    about: 'Acerca de',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    register: 'Unirse',
    logout: 'Cerrar Sesión',
    dashboard: 'Panel',
    search: 'Buscar',
    priceRange: 'Rango de Precio',
    bedrooms: 'Habitaciones',
    bathrooms: 'Baños',
    propertyType: 'Tipo de Propiedad',
    filters: 'Filtros',
    sort: 'Ordenar',
    noResults: 'No se encontraron resultados',
    favorites: 'Favoritos',
    messages: 'Mensajes',
    profile: 'Perfil',
    subscription: 'Suscripción',
    viewDetails: 'Ver Detalles',
    contactAgent: 'Contactar Agente',
    addToFavorites: 'Añadir a Favoritos',
    removeFromFavorites: 'Eliminar de Favoritos',
    selectLanguage: 'Seleccionar Idioma',
    shareListing: 'Compartir Listado',
    printListing: 'Imprimir Listado',
    copy: 'Copiar',
    copied: 'Copiado',
    linkCopied: 'Enlace copiado al portapapeles',
    copyFailed: 'Error al copiar enlace',
    close: 'Cerrar',
    shareOnSocial: 'Compartir en redes sociales',
    similarProperties: 'Propiedades Similares',
    propertyFeatures: 'Características de la Propiedad',
    neighborhood: 'Vecindario',
    propertyDetails: 'Detalles de la Propiedad',
    location: 'Ubicación',
    requestTour: 'Solicitar una Visita',
    applyNow: 'Aplicar Ahora',
    save: 'Guardar',
    cancel: 'Cancelar',
    update: 'Actualizar',
    delete: 'Eliminar',
    loading: 'Cargando...',
    error: 'Ocurrió un error',
    success: 'Éxito',
    apply: 'Aplicar',
    clear: 'Limpiar',
    submit: 'Enviar',
    required: 'Obligatorio',
    optional: 'Opcional',
    showMore: 'Mostrar Más',
    showLess: 'Mostrar Menos',
    searchProperties: 'Buscar Propiedades',
    whereToLook: '¿Dónde buscar?',
    findYourDreamProperty: 'Encuentra Tu Propiedad Soñada',
    beds: 'Habitaciones',
    baths: 'Baños',
    any: 'Cualquiera',
    moreFilters: 'Más Filtros',
    squareFootage: 'Metros Cuadrados',
    min: 'Mínimo',
    max: 'Máximo',
    features: {
      title: 'Características',
      pool: 'Piscina',
      garage: 'Garaje',
      waterfront: 'Frente al Agua',
      fireplace: 'Chimenea'
    },
    saveThisSearch: 'Guardar Esta Búsqueda',
    propertiesFound: '{{count}} propiedades encontradas',
    view: 'Ver',
    searchPlaceholder: 'Ingresa ciudad, código postal o dirección, compra o venta',
    featured: 'Destacado',
    text: 'Texto',
    image: 'Imagen',
    voice: 'Voz',
    advancedSearch: 'Búsqueda Avanzada',
    unlockingSmartCapital: 'Liberando Capital Inteligente Para Inversores Basados en Datos',
    viewAllProperties: 'Ver Todas las Propiedades',
    exclusiveListings: 'Listados exclusivos con potencial premium',
    listedBy: 'Listado por',
    details: 'Detalles',
    recommendationsWork: 'Cómo funcionan las recomendaciones',
    aiRecommendations: 'Recomendaciones con IA',
    recommendationsExplanation: 'Nuestro sistema de IA analiza tu historial de búsqueda, propiedades favoritas y patrones de navegación para sugerir propiedades que coincidan con tus preferencias.',
    exploreProperties: 'Explorar Propiedades',
    featuredProperties: 'Propiedades Destacadas',
    agent: 'Agente',
    compare: 'Comparar',
    rent: 'Alquilar',
    sell: 'Vender',
    premium: 'Premium',
    dataInsights: 'Información Basada en Datos',
    marketTrends: 'Tendencias del Mercado',
    medianPrice: 'Precio Medio',
    inventory: 'Inventario',
    daysOnMarket: 'Días en Mercado',
    neighborhoodInsights: 'Información del Vecindario',
    noNeighborhoodData: 'No hay datos del vecindario disponibles',
    roiCalculator: 'Calculadora de ROI',
    purchasePrice: 'Precio de Compra',
    downPayment: 'Pago Inicial',
    interestRate: 'Tasa de Interés',
    monthlyRent: 'Renta Mensual',
    monthlyPayment: 'Pago Mensual',
    cashFlow: 'Flujo de Caja',
    annualROI: 'ROI Anual',
    breakEven: 'Punto de Equilibrio',
    getFullAnalysis: 'Obtener Análisis Completo',
    chooseInvestmentPath: 'Elige Tu Camino de Inversión',
    unlockPremiumFeatures: 'Desbloquea funciones premium y datos para tomar decisiones de inversión inmobiliaria más inteligentes.',
    free: 'Gratis',
    perMonth: 'al mes',
    essentialTools: 'Herramientas esenciales para iniciar tu camino inmobiliario.',
    basicPropertySearch: 'Búsqueda básica de propiedades',
    saveFavorites: 'Guarda hasta 5 propiedades favoritas',
    standardMarketInsights: 'Información estándar del mercado',
    basicROICalculator: 'Calculadora básica de ROI',
    advancedAnalytics: 'Análisis avanzado',
    investmentOpportunityAlerts: 'Alertas de oportunidades de inversión',
    signUpFree: 'Registrarse Gratis',
    mostPopular: 'MÁS POPULAR',
    advancedTools: 'Herramientas avanzadas para inversores serios.',
    everythingInFree: 'Todo lo de la versión gratuita',
    unlimitedSavedProperties: 'Propiedades guardadas ilimitadas',
    advancedMarketAnalytics: 'Análisis avanzado del mercado',
    comprehensiveROICalculator: 'Calculadora completa de ROI',
    priorityAccessToNewListings: 'Acceso prioritario a nuevos listados',
    startPremium: 'Iniciar Premium',
    enterprise: 'Empresa',
    completeSolution: 'Solución completa para inversores profesionales.',
    everythingInPremium: 'Todo lo de la versión Premium',
    apiAccess: 'Acceso a API de datos',
    portfolioPerformanceDashboard: 'Panel de rendimiento de cartera',
    customReporting: 'Informes personalizados',
    dedicatedAccountManager: 'Gerente de cuenta dedicado',
    strategicInvestmentConsulting: 'Consultoría estratégica de inversiones',
    contactSales: 'Contactar con Ventas',
    whatClientsSay: 'Lo Que Dicen Nuestros Clientes',
    clientsTransformedStrategy: 'Escuche de inversores que han transformado su estrategia inmobiliaria con nuestra plataforma basada en datos.',
    readyToTransform: '¿Listo para Transformar tu Estrategia de Inversión?',
    joinThousands: 'Únete a miles de inversores tomando decisiones inmobiliarias más inteligentes.',
    getStartedNow: 'Comenzar Ahora',
    requestDemo: 'Solicitar Demo',
    openingMoreDoors: 'Abriendo más puertas a propiedades inmobiliarias premium en todo el mundo.',
    quickLinks: 'Enlaces Rápidos',
    resources: 'Recursos',
    blog: 'Blog',
    buyingGuides: 'Guías de Compra',
    privacyPolicy: 'Política de Privacidad',
    cookiePolicy: 'Política de Cookies',
    termsOfService: 'Términos de Servicio'
  },
  property: {
    house: 'Casa',
    condo: 'Condominio',
    apartment: 'Apartamento',
    townhouse: 'Casa Adosada',
    land: 'Terreno',
    price: 'Precio',
    bedrooms: 'Habitaciones',
    bathrooms: 'Baños',
    sqft: 'Mts²',
    yearBuilt: 'Año de Construcción',
    lotSize: 'Tamaño del Lote',
    garageSpaces: 'Espacios de Garaje',
    propertyType: 'Tipo de Propiedad',
    built: 'Construido',
    taxes: 'Impuestos',
    status: 'Estado',
    description: 'Descripción',
    features: 'Características',
    address: 'Dirección',
    city: 'Ciudad',
    state: 'Estado',
    zipCode: 'Código Postal',
    country: 'País',
    shareTitle: 'Compartir esta propiedad',
    shareDescription: 'Comparte esta propiedad con amigos y familiares, o guárdala para futuras consultas. Puedes compartir a través de redes sociales, correo electrónico o copiando el enlace.'
  },
  subscription: {
    plan: 'Plan',
    price: 'Precio',
    period: 'Periodo',
    features: 'Características',
    description: 'Descripción',
    free: 'Gratis',
    premium: 'Premium',
    enterprise: 'Empresarial',
    currentPlan: 'Plan Actual',
    upgradePlan: 'Actualizar Plan',
    managePlan: 'Administrar Plan',
    billingInfo: 'Información de Facturación',
    paymentMethod: 'Método de Pago',
    billingHistory: 'Historial de Facturación',
    nextBilling: 'Próxima Facturación',
    perMonth: 'al mes',
    perYear: 'al año',
    unlimited: 'Ilimitado'
  },
  bulkUpload: {
    title: 'Carga Masiva',
    description: 'Sube múltiples propiedades a la vez usando archivos CSV o Excel',
    csvUploadInfo: 'Sube un archivo CSV con datos de propiedades',
    excelUploadInfo: 'Sube un archivo Excel con datos de propiedades',
    dragAndDrop: 'Arrastra y suelta el archivo aquí o haz clic para navegar',
    selectCSVFile: 'Seleccionar Archivo CSV',
    selectExcelFile: 'Seleccionar Archivo Excel',
    selectedFile: 'Archivo Seleccionado',
    parseFile: 'Analizar Archivo',
    importData: 'Importar Datos',
    processing: 'Procesando tu archivo...',
    preview: 'Vista Previa de Datos',
    importResults: 'Resultados de Importación',
    successfulUploads: 'Cargas Exitosas',
    failedUploads: 'Cargas Fallidas',
    errors: 'Errores',
    createdProperties: 'Propiedades Creadas',
    uploadHelp: 'Ayuda y Guías',
    csvHelpText: 'Tu archivo CSV debe incluir columnas para detalles de propiedad como título, precio, dirección, etc. Usa la plantilla a continuación como referencia.',
    requiredFields: 'Campos Requeridos',
    downloadTemplate: 'Descargar Plantilla CSV',
    backToDashboard: 'Volver al Panel',
    uploadComplete: 'Carga Completa',
    propertiesUploaded: '{{count}} propiedades cargadas exitosamente',
    error: 'Error',
    errorParsingFile: 'Error al analizar el archivo. Por favor verifica el formato.',
    errorImportingData: 'Error al importar datos. Por favor intenta de nuevo.',
    premiumFeature: 'Función Premium',
    premiumFeatureDescription: 'La carga masiva solo está disponible para suscriptores Premium y Empresariales.',
    bulkUploadPremiumRequired: 'Se Requiere Suscripción Premium',
    bulkUploadPremiumRequiredDescription: 'Actualiza a Premium o Empresarial para acceder a la función de carga masiva.',
    upgradeToPremium: 'Actualizar a Premium'
  },
  user: {
    fullName: 'Nombre Completo',
    username: 'Nombre de Usuario',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    phoneNumber: 'Número de Teléfono',
    bio: 'Biografía',
    role: 'Rol',
    agent: 'Agente',
    admin: 'Administrador',
    user: 'Usuario',
    settings: 'Configuración',
    personalInfo: 'Información Personal',
    accountSettings: 'Configuración de la Cuenta',
    notifications: 'Notificaciones',
    privacy: 'Privacidad',
    security: 'Seguridad',
    twoFactorAuth: 'Autenticación de Dos Factores',
    changePassword: 'Cambiar Contraseña',
    deleteAccount: 'Eliminar Cuenta',
    currentPassword: 'Contraseña Actual',
    newPassword: 'Nueva Contraseña',
    accountCreated: 'Cuenta Creada'
  },
  auth: {
    signin: 'Iniciar Sesión',
    signup: 'Registrarse',
    emailPlaceholder: 'Dirección de correo',
    passwordPlaceholder: 'Contraseña',
    rememberMe: 'Recordarme',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tienes una cuenta?',
    hasAccount: '¿Ya tienes una cuenta?',
    createAccount: 'Crear Cuenta',
    continueWith: 'O continúa con',
    loginSuccess: 'Sesión iniciada correctamente',
    loginFailed: 'Nombre de usuario o contraseña inválidos',
    registerSuccess: 'Cuenta creada correctamente',
    registerFailed: 'Error en el registro',
    logoutSuccess: 'Sesión cerrada correctamente',
    passwordResetSent: 'Enlace de restablecimiento de contraseña enviado',
    passwordResetFailed: 'Error al enviar el restablecimiento de contraseña',
    passwordChanged: 'Contraseña cambiada correctamente',
    passwordChangeFailed: 'Error al cambiar la contraseña',
    requiredField: 'Este campo es obligatorio',
    invalidEmail: 'Dirección de correo inválida',
    passwordsMustMatch: 'Las contraseñas deben coincidir',
    passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
    usernameExists: 'El nombre de usuario ya existe',
    emailExists: 'El correo ya existe'
  },
  messages: {
    inbox: 'Bandeja de entrada',
    sent: 'Enviados',
    archived: 'Archivados',
    compose: 'Redactar',
    subject: 'Asunto',
    message: 'Mensaje',
    from: 'De',
    to: 'Para',
    date: 'Fecha',
    read: 'Leído',
    unread: 'No leído',
    reply: 'Responder',
    forward: 'Reenviar',
    archive: 'Archivar',
    delete: 'Eliminar',
    send: 'Enviar',
    messageSent: 'Mensaje enviado',
    messageNotSent: 'Mensaje no enviado',
    noMessages: 'No hay mensajes',
    selectRecipient: 'Seleccionar destinatario',
    writeMessage: 'Escribe un mensaje',
    propertyInquiry: 'Consulta de Propiedad',
    regarding: 'Referente a'
  },
  notifications: {
    title: 'Notificaciones',
    toggle: 'Activar/desactivar notificaciones',
    clearAll: 'Borrar todas las notificaciones',
    empty: 'No hay notificaciones todavía',
    newProperty: 'Nueva propiedad listada',
    updatedProperty: 'Propiedad actualizada',
    status: {
      connecting: 'Connectando',
      connected: 'Connectado',
      disconnected: 'Desconnectado',
      error: 'Error de conexión'
    }
  }
};

// Catalan translations
const caES = {
  tour: {
    welcomeTitle: 'Benvingut a Inmobi',
    welcomeMessage: 'Deixa\'ns mostrar-te la nostra plataforma per ajudar-te a trobar la teva propietat de somni!',
    completedTitle: 'Recorregut Completat',
    completedMessage: 'Pots reiniciar el recorregut en qualsevol moment des del menú d\'ajuda',
    back: 'Enrere',
    close: 'Tancar',
    finish: 'Finalitzar',
    next: 'Següent',
    skip: 'Ometre',
  },
  common: {
    help: 'Ajuda',
    startTour: 'Iniciar Recorregut Guiat',
    faq: 'Preguntes Freqüents',
    contactSupport: 'Contactar Suport',
    home: 'Inici',
    advanced: 'Avançat',
    properties: 'Propietats',
    services: 'Serveis',
    buying: 'Compra',
    selling: 'Venda',
    investing: 'Inversió',
    about: 'Sobre nosaltres',
    contact: 'Contacte',
    login: 'Iniciar Sessió',
    register: 'Unir-se',
    logout: 'Tancar Sessió',
    dashboard: 'Tauler',
    search: 'Cercar',
    priceRange: 'Rang de Preu',
    bedrooms: 'Habitacions',
    bathrooms: 'Banys',
    propertyType: 'Tipus de Propietat',
    filters: 'Filtres',
    sort: 'Ordenar',
    noResults: 'No s\'han trobat resultats',
    favorites: 'Preferits',
    messages: 'Missatges',
    profile: 'Perfil',
    subscription: 'Subscripció',
    viewDetails: 'Veure Detalls',
    contactAgent: 'Contactar Agent',
    addToFavorites: 'Afegir a Preferits',
    removeFromFavorites: 'Eliminar de Preferits',
    selectLanguage: 'Seleccionar Idioma',
    shareListing: 'Compartir Llistat',
    printListing: 'Imprimir Llistat',
    copy: 'Copiar',
    copied: 'Copiat',
    linkCopied: 'Enllaç copiat al portapapers',
    copyFailed: 'Error en copiar l\'enllaç',
    close: 'Tancar',
    shareOnSocial: 'Compartir a xarxes socials',
    similarProperties: 'Propietats Similars',
    propertyFeatures: 'Característiques de la Propietat',
    neighborhood: 'Barri',
    propertyDetails: 'Detalls de la Propietat',
    location: 'Ubicació',
    requestTour: 'Sol·licitar una Visita',
    applyNow: 'Aplicar Ara',
    save: 'Desar',
    cancel: 'Cancel·lar',
    update: 'Actualitzar',
    delete: 'Eliminar',
    loading: 'Carregant...',
    error: 'Ha ocorregut un error',
    success: 'Èxit',
    apply: 'Aplicar',
    clear: 'Netejar',
    submit: 'Enviar',
    required: 'Obligatori',
    optional: 'Opcional',
    showMore: 'Mostrar Més',
    showLess: 'Mostrar Menys',
    searchProperties: 'Cercar Propietats',
    whereToLook: 'On vols buscar?',
    findYourDreamProperty: 'Troba la Teva Propietat de Somni',
    beds: 'Habitacions',
    baths: 'Banys',
    any: 'Qualsevol',
    moreFilters: 'Més Filtres',
    squareFootage: 'Metres Quadrats',
    min: 'Mínim',
    max: 'Màxim',
    features: {
      title: 'Característiques',
      pool: 'Piscina',
      garage: 'Garatge',
      waterfront: 'Davant de l\'Aigua',
      fireplace: 'Xemeneia'
    },
    saveThisSearch: 'Desar aquesta cerca',
    propertiesFound: '{{count}} propietats trobades',
    view: 'Veure'
  },
  property: {
    house: 'Casa',
    condo: 'Condomini',
    apartment: 'Apartament',
    townhouse: 'Casa Adossada',
    land: 'Terreny',
    price: 'Preu',
    bedrooms: 'Habitacions',
    bathrooms: 'Banys',
    sqft: 'M²',
    yearBuilt: 'Any de Construcció',
    lotSize: 'Mida del Terreny',
    garageSpaces: 'Places de Garatge',
    propertyType: 'Tipus de Propietat',
    built: 'Construït',
    taxes: 'Impostos',
    status: 'Estat',
    description: 'Descripció',
    features: 'Característiques',
    address: 'Adreça',
    city: 'Ciutat',
    state: 'Província',
    zipCode: 'Codi Postal',
    country: 'País',
    shareTitle: 'Compartir aquesta propietat',
    shareDescription: 'Comparteix aquesta propietat amb amics i familiars, o desa-la per a consultes futures.'
  },
  subscription: {
    plan: 'Pla',
    price: 'Preu',
    period: 'Període',
    features: 'Característiques',
    description: 'Descripció',
    free: 'Gratuït',
    premium: 'Premium',
    enterprise: 'Empresarial',
    currentPlan: 'Pla Actual',
    upgradePlan: 'Actualitzar Pla',
    managePlan: 'Gestionar Pla',
    billingInfo: 'Informació de Facturació',
    paymentMethod: 'Mètode de Pagament',
    billingHistory: 'Historial de Facturació',
    nextBilling: 'Pròxima Facturació',
    perMonth: 'al mes',
    perYear: 'a l\'any',
    unlimited: 'Il·limitat'
  },
  auth: {
    signin: 'Iniciar Sessió',
    signup: 'Registrar-se',
    emailPlaceholder: 'Adreça de correu',
    passwordPlaceholder: 'Contrasenya',
    rememberMe: 'Recordar-me',
    forgotPassword: 'Has oblidat la contrasenya?',
    noAccount: 'No tens un compte?',
    hasAccount: 'Ja tens un compte?',
    createAccount: 'Crear Compte',
    continueWith: 'O continua amb',
    loginSuccess: 'Sessió iniciada correctament',
    loginFailed: 'Nom d\'usuari o contrasenya invàlids',
    registerSuccess: 'Compte creat correctament',
    registerFailed: 'Error en el registre',
    logoutSuccess: 'Sessió tancada correctament',
    passwordResetSent: 'Enllaç de reinici de contrasenya enviat',
    passwordResetFailed: 'Error en enviar el reinici de contrasenya',
    passwordChanged: 'Contrasenya canviada correctament',
    passwordChangeFailed: 'Error en canviar la contrasenya',
    requiredField: 'Aquest camp és obligatori',
    invalidEmail: 'Adreça de correu invàlida',
    passwordsMustMatch: 'Les contrasenyes han de coincidir',
    passwordTooShort: 'La contrasenya ha de tenir almenys 8 caràcters',
    usernameExists: 'El nom d\'usuari ja existeix',
    emailExists: 'El correu ja existeix'
  },
  messages: {
    inbox: 'Safata d\'entrada',
    sent: 'Enviats',
    archived: 'Arxivats',
    compose: 'Redactar',
    subject: 'Assumpte',
    message: 'Missatge',
    from: 'De',
    to: 'Per a',
    date: 'Data',
    read: 'Llegit',
    unread: 'No llegit',
    reply: 'Respondre',
    forward: 'Reenviar',
    archive: 'Arxivar',
    delete: 'Eliminar',
    send: 'Enviar',
    messageSent: 'Missatge enviat',
    messageNotSent: 'Missatge no enviat',
    noMessages: 'No hi ha missatges',
    selectRecipient: 'Seleccionar destinatari',
    writeMessage: 'Escriu un missatge',
    propertyInquiry: 'Consulta de Propietat',
    regarding: 'Referent a'
  },
  notifications: {
    title: 'Notificacions',
    toggle: 'Activar/desactivar notificacions',
    clearAll: 'Esborrar totes les notificacions',
    empty: 'No hi ha notificacions encara',
    newProperty: 'Nova propietat llistada',
    updatedProperty: 'Propietat actualitzada',
    status: {
      connecting: 'Connectant',
      connected: 'Connectat',
      disconnected: 'Desconnectat',
      error: 'Error de connexió'
    }
  }
};

// French translations (basic set)
const frFR = {
  common: {
    selectLanguage: 'Choisir la langue',
    home: 'Accueil',
    advanced: 'Avancé',
    properties: 'Propriétés',
    services: 'Services',
    buying: 'Achat',
    selling: 'Vente',
    investing: 'Investissement',
    about: 'À propos',
    contact: 'Contact',
    login: 'Connexion',
    register: 'S\'inscrire',
    logout: 'Se déconnecter',
    dashboard: 'Tableau de bord',
    search: 'Rechercher',
    filters: 'Filtres',
    viewDetails: 'Voir les détails',
    addToFavorites: 'Ajouter aux favoris',
    removeFromFavorites: 'Retirer des favoris',
    shareListing: 'Partager l\'annonce',
    copy: 'Copier',
    copied: 'Copié',
    close: 'Fermer',
  },
  property: {
    house: 'Maison',
    apartment: 'Appartement',
    condo: 'Condominium',
    townhouse: 'Maison de ville',
    land: 'Terrain',
    price: 'Prix',
    bedrooms: 'Chambres',
    bathrooms: 'Salles de bain',
    shareTitle: 'Partager cette propriété',
    shareDescription: 'Partagez cette propriété avec vos amis et votre famille, ou enregistrez-la pour référence future.'
  }
};

// Italian translations (basic set)
const itIT = {
  common: {
    selectLanguage: 'Seleziona lingua',
    home: 'Home',
    advanced: 'Avanzato',
    properties: 'Proprietà',
    services: 'Servizi',
    buying: 'Acquisto',
    selling: 'Vendita',
    investing: 'Investimento',
    about: 'Chi siamo',
    contact: 'Contatti',
    login: 'Accedi',
    register: 'Registrati',
    logout: 'Esci',
    dashboard: 'Pannello di controllo',
    search: 'Cerca',
    filters: 'Filtri',
    viewDetails: 'Vedi dettagli',
    addToFavorites: 'Aggiungi ai preferiti',
    removeFromFavorites: 'Rimuovi dai preferiti',
    shareListing: 'Condividi annuncio',
    copy: 'Copia',
    copied: 'Copiato',
    close: 'Chiudi',
    priceRange: 'Fascia di prezzo',
    bedrooms: 'Camere da letto',
    bathrooms: 'Bagni',
    propertyType: 'Tipo di proprietà',
    sort: 'Ordina',
    noResults: 'Nessun risultato trovato',
    favorites: 'Preferiti',
    messages: 'Messaggi',
    profile: 'Profilo',
    subscription: 'Abbonamento',
    contactAgent: 'Contatta agente',
    findYourDreamProperty: 'Trova la tua proprietà dei sogni',
  },
  property: {
    house: 'Casa',
    apartment: 'Appartamento',
    condo: 'Condominio',
    townhouse: 'Casa a schiera',
    land: 'Terreno',
    price: 'Prezzo',
    bedrooms: 'Camere da letto',
    bathrooms: 'Bagni',
    sqft: 'Mq',
    yearBuilt: 'Anno di costruzione',
    lotSize: 'Dimensione del lotto',
    garageSpaces: 'Posti auto',
    propertyType: 'Tipo di proprietà',
    built: 'Costruito',
    taxes: 'Tasse',
    status: 'Stato',
    description: 'Descrizione',
    features: 'Caratteristiche',
    address: 'Indirizzo',
    city: 'Città',
    state: 'Regione',
    zipCode: 'CAP',
    country: 'Paese',
    shareTitle: 'Condividi questa proprietà',
    shareDescription: 'Condividi questa proprietà con amici e familiari, o salvala per riferimento futuro.'
  }
};

// German translations (basic set)
const deDE = {
  common: {
    selectLanguage: 'Sprache auswählen',
    home: 'Startseite',
    advanced: 'Erweitert',
    properties: 'Immobilien',
    services: 'Dienstleistungen',
    buying: 'Kaufen',
    selling: 'Verkaufen',
    investing: 'Investieren',
    about: 'Über uns',
    contact: 'Kontakt',
    login: 'Anmelden',
    register: 'Registrieren',
    logout: 'Abmelden',
    dashboard: 'Dashboard',
    search: 'Suchen',
    filters: 'Filter',
    viewDetails: 'Details anzeigen',
    addToFavorites: 'Zu Favoriten hinzufügen',
    removeFromFavorites: 'Aus Favoriten entfernen',
    shareListing: 'Angebot teilen',
    copy: 'Kopieren',
    copied: 'Kopiert',
    close: 'Schließen',
  },
  property: {
    house: 'Haus',
    apartment: 'Wohnung',
    condo: 'Eigentumswohnung',
    townhouse: 'Reihenhaus',
    land: 'Grundstück',
    price: 'Preis',
    bedrooms: 'Schlafzimmer',
    bathrooms: 'Badezimmer',
    shareTitle: 'Diese Immobilie teilen',
    shareDescription: 'Teilen Sie diese Immobilie mit Freunden und Familie oder speichern Sie sie für zukünftige Referenz.'
  }
};

// Chinese translations (basic set)
const zhCN = {
  common: {
    selectLanguage: '选择语言',
    home: '首页',
    advanced: '高级',
    properties: '房产',
    services: '服务',
    buying: '购买',
    selling: '出售',
    investing: '投资',
    about: '关于我们',
    contact: '联系我们',
    login: '登录',
    register: '注册',
    logout: '登出',
    dashboard: '控制面板',
    search: '搜索',
    filters: '筛选条件',
    viewDetails: '查看详情',
    addToFavorites: '添加到收藏',
    removeFromFavorites: '从收藏中移除',
    shareListing: '分享房源',
    copy: '复制',
    copied: '已复制',
    close: '关闭',
  },
  property: {
    house: '独栋房',
    apartment: '公寓',
    condo: '共管公寓',
    townhouse: '联排别墅',
    land: '土地',
    price: '价格',
    bedrooms: '卧室',
    bathrooms: '浴室',
    shareTitle: '分享这套房产',
    shareDescription: '与朋友和家人分享这套房产，或保存以便将来参考。'
  }
};

// Japanese translations (basic set)
const jaJP = {
  common: {
    selectLanguage: '言語を選択',
    home: 'ホーム',
    advanced: '詳細',
    properties: '物件',
    services: 'サービス',
    buying: '買う',
    selling: '売る',
    investing: '投資',
    about: '会社概要',
    contact: 'お問い合わせ',
    login: 'ログイン',
    register: '登録',
    logout: 'ログアウト',
    dashboard: 'ダッシュボード',
    search: '検索',
    filters: 'フィルター',
    viewDetails: '詳細を見る',
    addToFavorites: 'お気に入りに追加',
    removeFromFavorites: 'お気に入りから削除',
    shareListing: '物件を共有',
    copy: 'コピー',
    copied: 'コピーしました',
    close: '閉じる',
  },
  property: {
    house: '一戸建て',
    apartment: 'アパート',
    condo: '分譲マンション',
    townhouse: 'タウンハウス',
    land: '土地',
    price: '価格',
    bedrooms: '寝室',
    bathrooms: '浴室',
    shareTitle: 'この物件を共有',
    shareDescription: 'この物件を友人や家族と共有したり、将来の参考のために保存したりできます。'
  }
};

// Arabic translations (basic set with RTL support)
const arSA = {
  common: {
    selectLanguage: 'اختر اللغة',
    home: 'الرئيسية',
    advanced: 'متقدم',
    properties: 'العقارات',
    services: 'الخدمات',
    buying: 'شراء',
    selling: 'بيع',
    investing: 'استثمار',
    about: 'من نحن',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    register: 'تسجيل جديد',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    search: 'بحث',
    filters: 'الفلاتر',
    viewDetails: 'عرض التفاصيل',
    addToFavorites: 'إضافة للمفضلة',
    removeFromFavorites: 'إزالة من المفضلة',
    shareListing: 'مشاركة القائمة',
    copy: 'نسخ',
    copied: 'تم النسخ',
    close: 'إغلاق',
  },
  property: {
    house: 'منزل',
    apartment: 'شقة',
    condo: 'كوندو',
    townhouse: 'تاون هاوس',
    land: 'أرض',
    price: 'السعر',
    bedrooms: 'غرف النوم',
    bathrooms: 'الحمامات',
    shareTitle: 'مشاركة هذا العقار',
    shareDescription: 'شارك هذا العقار مع الأصدقاء والعائلة، أو احفظه للرجوع إليه في المستقبل.'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-GB': {
        translation: enGB
      },
      'en-US': {
        translation: enGB  // Reuse UK English for US English
      },
      'en-ES': {
        translation: esMX  // Use Spanish-MX for UK-Spanish 
      },
      'es-MX': {
        translation: esMX
      },
      'es-ES': {
        translation: esMX  // Reuse Mexican Spanish for Spain Spanish
      },
      'ca-ES': {
        translation: caES
      },
      'fr-FR': {
        translation: frFR
      },
      'de-DE': {
        translation: deDE
      },
      'de-AT': {
        translation: deDE  // Use German for Austrian German
      },
      'it-IT': {
        translation: itIT
      }
    },
    fallbackLng: 'en-GB',
    debug: import.meta.env.DEV, // Enable debug in development mode
    interpolation: {
      escapeValue: false, // React escapes by default
    },
    returnObjects: true,
    detection: {
      order: ['path', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'],
      cookieMinutes: 10,
      cookieDomain: '',
      htmlTag: document.documentElement,
      cookieOptions: { path: '/', sameSite: 'strict' }
    },
  });

export default i18n;