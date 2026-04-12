export interface App {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  descripcionLarga: string;
  calificacion: number;
  usuarios: string;
  precio: string;
  caracteristicas: string[];
  pros: string[];
  contras: string[];
  url: string;
  etiquetas: string[];
}

export const apps: App[] = [
  {
    id: 'chatgpt',
    nombre: 'ChatGPT',
    categoria: 'texto',
    descripcion: 'Chatbot de IA conversacional más popular del mundo',
    descripcionLarga: 'ChatGPT es un modelo de lenguaje desarrollado por OpenAI que puede mantener conversaciones naturales, responder preguntas, ayudar con escritura, programación, análisis y mucho más. Es la herramienta de IA más utilizada globalmente.',
    calificacion: 4.9,
    usuarios: '180M+',
    precio: 'Freemium',
    caracteristicas: ['Conversaciones naturales', 'Generación de texto', 'Asistencia de código', 'Análisis de documentos', 'Integración con DALL-E'],
    pros: ['Interfaz intuitiva', 'Respuestas rápidas', 'Versión gratuita disponible', 'Constantemente actualizado'],
    contras: ['Puede alucinar información', 'Límite de mensajes en versión gratis', 'No tiene acceso a internet en tiempo real'],
    url: 'https://chat.openai.com',
    etiquetas: ['Chatbot', 'Texto', 'Productividad', 'Gratuito']
  },
  {
    id: 'claude',
    nombre: 'Claude',
    categoria: 'texto',
    descripcion: 'Asistente de IA de Anthropic con gran capacidad de razonamiento',
    descripcionLarga: 'Claude es un asistente de IA desarrollado por Anthropic, conocido por su capacidad de razonamiento avanzado, manejo de contexto largo y enfoque en seguridad y alineación.',
    calificacion: 4.8,
    usuarios: '5M+',
    precio: 'Freemium',
    caracteristicas: ['Razonamiento avanzado', 'Contexto de 200K tokens', 'Análisis de documentos', 'Programación', 'Escritura creativa'],
    pros: ['Excelente para tareas complejas', 'Manejo de contexto muy largo', 'Respuestas bien estructuradas', 'Enfoque en seguridad'],
    contras: ['Menos conocido que ChatGPT', 'Versión gratuita limitada', 'Sin acceso a internet'],
    url: 'https://claude.ai',
    etiquetas: ['Chatbot', 'Texto', 'Razonamiento', 'Gratuito']
  },
  {
    id: 'gemini',
    nombre: 'Google Gemini',
    categoria: 'texto',
    descripcion: 'Modelo de IA multimodal de Google con acceso a internet',
    descripcionLarga: 'Gemini es el modelo de IA más avanzado de Google, capaz de procesar texto, imágenes, audio y video. Tiene integración nativa con Google Search y otras herramientas de Google.',
    calificacion: 4.7,
    usuarios: '50M+',
    precio: 'Freemium',
    caracteristicas: ['Acceso a internet', 'Multimodal', 'Integración con Google', 'Generación de imágenes', 'Análisis de video'],
    pros: ['Acceso a información actualizada', 'Integración con Google Workspace', 'Capacidades multimodales', 'Versión gratuita generosa'],
    contras: ['Disponibilidad limitada en algunos países', 'Menos preciso que Claude en razonamiento', 'Interfaz menos pulida'],
    url: 'https://gemini.google.com',
    etiquetas: ['Chatbot', 'Multimodal', 'Google', 'Gratuito']
  },
  {
    id: 'midjourney',
    nombre: 'Midjourney',
    categoria: 'imagen',
    descripcion: 'Generador de imágenes artísticas de alta calidad',
    descripcionLarga: 'Midjourney es una herramienta de IA especializada en generar imágenes artísticas de alta calidad. Es conocida por su estilo visual único y detallado.',
    calificacion: 4.9,
    usuarios: '15M+',
    precio: 'Desde $10/mes',
    caracteristicas: ['Imágenes artísticas', 'Múltiples estilos', 'Upscale de imágenes', 'Generación por lotes', 'Comunidad activa'],
    pros: ['Calidad artística excepcional', 'Estilo único reconocible', 'Comunidad muy activa', 'Constantes mejoras'],
    contras: ['Solo disponible en Discord', 'No hay versión gratuita', 'Menos control que otras herramientas'],
    url: 'https://www.midjourney.com',
    etiquetas: ['Imágenes', 'Arte', 'Creatividad', 'Pago']
  },
  {
    id: 'dalle',
    nombre: 'DALL-E 3',
    categoria: 'imagen',
    descripcion: 'Generador de imágenes de OpenAI integrado con ChatGPT',
    descripcionLarga: 'DALL-E 3 es el generador de imágenes de OpenAI, integrado directamente en ChatGPT. Destaca por seguir instrucciones de texto con alta precisión.',
    calificacion: 4.7,
    usuarios: '50M+',
    precio: 'Incluido en ChatGPT Plus',
    caracteristicas: ['Integración con ChatGPT', 'Seguimiento preciso de prompts', 'Edición de imágenes', 'Diferentes estilos', 'Alta resolución'],
    pros: ['Integración perfecta con ChatGPT', 'Sigue instrucciones al pie de la letra', 'Fácil de usar', 'Buena calidad general'],
    contras: ['Requiere ChatGPT Plus', 'Menos artístico que Midjourney', 'Limitaciones en contenido'],
    url: 'https://chat.openai.com',
    etiquetas: ['Imágenes', 'OpenAI', 'ChatGPT', 'Pago']
  },
  {
    id: 'runway',
    nombre: 'Runway Gen-2',
    categoria: 'video',
    descripcion: 'Plataforma líder para generación y edición de video con IA',
    descripcionLarga: 'Runway es una plataforma completa para generación y edición de video con IA. Ofrece herramientas como text-to-video, image-to-video, y efectos especiales.',
    calificacion: 4.8,
    usuarios: '2M+',
    precio: 'Desde $12/mes',
    caracteristicas: ['Text-to-video', 'Image-to-video', 'Motion brush', 'Inpainting de video', 'Green screen automático'],
    pros: ['Calidad de video excepcional', 'Herramientas profesionales', 'Interfaz intuitiva', 'Usado en producciones de Hollywood'],
    contras: ['Créditos limitados', 'Precio elevado', 'Curva de aprendizaje'],
    url: 'https://runwayml.com',
    etiquetas: ['Video', 'Generación', 'Edición', 'Pago']
  },
  {
    id: 'pika',
    nombre: 'Pika Labs',
    categoria: 'video',
    descripcion: 'Generador de video con IA enfocado en efectos visuales',
    descripcionLarga: 'Pika es una herramienta de generación de video que permite crear videos cortos con efectos visuales impresionantes a partir de texto o imágenes.',
    calificacion: 4.6,
    usuarios: '1M+',
    precio: 'Freemium',
    caracteristicas: ['Text-to-video', 'Image-to-video', 'Video-to-video', 'Efectos especiales', 'Expand video'],
    pros: ['Efectos visuales creativos', 'Versión gratuita disponible', 'Interfaz simple', 'Buena comunidad'],
    contras: ['Videos cortos (3-4 segundos)', 'Calidad variable', 'En desarrollo constante'],
    url: 'https://pika.art',
    etiquetas: ['Video', 'Efectos', 'Creatividad', 'Gratuito']
  },
  {
    id: 'elevenlabs',
    nombre: 'ElevenLabs',
    categoria: 'audio',
    descripcion: 'Síntesis de voz con IA más realista del mercado',
    descripcionLarga: 'ElevenLabs ofrece la tecnología de texto a voz más avanzada, con voces extremadamente naturales y capacidad de clonación de voz.',
    calificacion: 4.9,
    usuarios: '3M+',
    precio: 'Freemium',
    caracteristicas: ['Texto a voz', 'Clonación de voz', 'Múltiples idiomas', 'Control de emociones', 'API disponible'],
    pros: ['Voces extremadamente realistas', 'Clonación de voz de alta calidad', 'Muchos idiomas', 'API robusta'],
    contras: ['Créditos limitados en gratis', 'Precio puede subir con uso', 'Restricciones éticas'],
    url: 'https://elevenlabs.io',
    etiquetas: ['Voz', 'Audio', 'Texto a voz', 'Gratuito']
  },
  {
    id: 'github-copilot',
    nombre: 'GitHub Copilot',
    categoria: 'codigo',
    descripcion: 'Asistente de programación con IA de GitHub y OpenAI',
    descripcionLarga: 'GitHub Copilot es un asistente de programación impulsado por IA que sugiere código en tiempo real mientras escribes. Soporta múltiples lenguajes y frameworks.',
    calificacion: 4.7,
    usuarios: '1M+',
    precio: 'Desde $10/mes',
    caracteristicas: ['Autocompletado de código', 'Generación de funciones', 'Comentarios a código', 'Múltiples lenguajes', 'Integración con IDEs'],
    pros: ['Aumenta productividad', 'Soporta muchos lenguajes', 'Integración nativa con VS Code', 'Mejora constante'],
    contras: ['Requiere suscripción', 'Puede sugerir código inseguro', 'A veces genera código obsoleto'],
    url: 'https://github.com/features/copilot',
    etiquetas: ['Código', 'Programación', 'Desarrollo', 'Pago']
  },
  {
    id: 'notion',
    nombre: 'Notion AI',
    categoria: 'productividad',
    descripcion: 'Asistente de IA integrado en el workspace de Notion',
    descripcionLarga: 'Notion AI es un asistente de escritura y organización integrado directamente en Notion. Ayuda a escribir, resumir, traducir y organizar información.',
    calificacion: 4.6,
    usuarios: '30M+',
    precio: 'Desde $8/mes',
    caracteristicas: ['Escritura asistida', 'Resumen de notas', 'Traducción', 'Generación de ideas', 'Organización automática'],
    pros: ['Integración perfecta con Notion', 'Mejora flujo de trabajo', 'Fácil de usar', 'Buen valor'],
    contras: ['Requiere suscripción a Notion', 'Créditos limitados', 'No tan potente como ChatGPT'],
    url: 'https://notion.so',
    etiquetas: ['Productividad', 'Notas', 'Organización', 'Pago']
  },
  {
    id: 'gamma',
    nombre: 'Gamma',
    categoria: 'presentaciones',
    descripcion: 'Crea presentaciones impresionantes con IA en minutos',
    descripcionLarga: 'Gamma es una herramienta que usa IA para crear presentaciones profesionales a partir de texto. Ofrece diseños modernos y colaboración en tiempo real.',
    calificacion: 4.7,
    usuarios: '2M+',
    precio: 'Freemium',
    caracteristicas: ['Generación de presentaciones', 'Diseños automáticos', 'Colaboración', 'Exportación a PDF/PPT', 'Plantillas profesionales'],
    pros: ['Presentaciones profesionales rápidas', 'Diseños modernos', 'Fácil colaboración', 'Versión gratuita útil'],
    contras: ['Marca de agua en gratis', 'Limitaciones de exportación', 'Menos flexible que PowerPoint'],
    url: 'https://gamma.app',
    etiquetas: ['Presentaciones', 'Diseño', 'Productividad', 'Gratuito']
  },
  {
    id: 'perplexity',
    nombre: 'Perplexity AI',
    categoria: 'texto',
    descripcion: 'Motor de búsqueda con respuestas impulsadas por IA',
    descripcionLarga: 'Perplexity es un motor de búsqueda que usa IA para proporcionar respuestas directas con fuentes citadas. Combina búsqueda web con modelos de lenguaje.',
    calificacion: 4.8,
    usuarios: '10M+',
    precio: 'Freemium',
    caracteristicas: ['Búsqueda con IA', 'Fuentes citadas', 'Acceso a internet', 'Múltiples modelos', 'App móvil'],
    pros: ['Respuestas con fuentes', 'Acceso a información actual', 'Interfaz limpia', 'Versión gratuita completa'],
    contras: ['A veces lento', 'Depende de fuentes externas', 'Limitaciones en versión gratis'],
    url: 'https://perplexity.ai',
    etiquetas: ['Búsqueda', 'Investigación', 'Texto', 'Gratuito']
  },
  {
    id: 'stable-diffusion',
    nombre: 'Stable Diffusion',
    categoria: 'imagen',
    descripcion: 'Modelo de generación de imágenes de código abierto',
    descripcionLarga: 'Stable Diffusion es un modelo de generación de imágenes de código abierto que puede ejecutarse localmente. Ofrece gran control y personalización.',
    calificacion: 4.6,
    usuarios: '10M+',
    precio: 'Gratis (autoalojado)',
    caracteristicas: ['Código abierto', 'Ejecutable local', 'Control total', 'Múltiples modelos', 'Comunidad activa'],
    pros: ['Gratis y open source', 'Control total del proceso', 'Sin límites de uso', 'Muy personalizable'],
    contras: ['Requiere hardware potente', 'Curva de aprendizaje pronunciada', 'Configuración compleja'],
    url: 'https://stability.ai',
    etiquetas: ['Imágenes', 'Open Source', 'Local', 'Gratuito']
  },
  {
    id: 'synthesia',
    nombre: 'Synthesia',
    categoria: 'video',
    descripcion: 'Crea videos con avatares de IA que hablan',
    descripcionLarga: 'Synthesia permite crear videos profesionales con avatares de IA que hablan tu texto. Ideal para capacitación, marketing y comunicaciones corporativas.',
    calificacion: 4.7,
    usuarios: '50K+',
    precio: 'Desde $22/mes',
    caracteristicas: ['Avatares de IA', 'Múltiples idiomas', 'Plantillas de video', 'Personalización de avatar', 'API disponible'],
    pros: ['Videos profesionales rápidos', 'Muchos idiomas', 'No necesitas cámara', 'Escalable'],
    contras: ['Precio elevado', 'Avatares pueden parecer robóticos', 'Créditos limitados'],
    url: 'https://synthesia.io',
    etiquetas: ['Video', 'Avatares', 'Marketing', 'Pago']
  },
  {
    id: 'cursor',
    nombre: 'Cursor',
    categoria: 'codigo',
    descripcion: 'Editor de código con IA integrada basado en VS Code',
    descripcionLarga: 'Cursor es un editor de código con IA integrada que permite escribir, editar y depurar código usando comandos en lenguaje natural.',
    calificacion: 4.8,
    usuarios: '500K+',
    precio: 'Freemium',
    caracteristicas: ['Editor completo', 'Chat integrado', 'Generación de código', 'Refactorización', 'Depuración con IA'],
    pros: ['Basado en VS Code', 'IA muy potente', 'Interfaz familiar', 'Versión gratuita generosa'],
    contras: ['Requiere aprender comandos', 'Puede ser lento', 'Dependencia de IA'],
    url: 'https://cursor.sh',
    etiquetas: ['Código', 'Editor', 'Desarrollo', 'Gratuito']
  }
];

export const categorias = [
  { id: 'todas', nombre: 'Todas', icono: 'LayoutGrid' },
  { id: 'texto', nombre: 'Texto y Chat', icono: 'MessageSquare' },
  { id: 'imagen', nombre: 'Imagen', icono: 'Image' },
  { id: 'video', nombre: 'Video', icono: 'Video' },
  { id: 'audio', nombre: 'Audio y Voz', icono: 'Mic' },
  { id: 'codigo', nombre: 'Código', icono: 'Code' },
  { id: 'productividad', nombre: 'Productividad', icono: 'Zap' },
  { id: 'presentaciones', nombre: 'Presentaciones', icono: 'Presentation' }
];

export function getAppsByCategoria(categoriaId: string): App[] {
  if (categoriaId === 'todas') return apps;
  return apps.filter(app => app.categoria === categoriaId);
}

export function searchApps(query: string): App[] {
  const lowerQuery = query.toLowerCase();
  return apps.filter(app => 
    app.nombre.toLowerCase().includes(lowerQuery) ||
    app.descripcion.toLowerCase().includes(lowerQuery) ||
    app.etiquetas.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedApps(appId: string, limit: number = 3): App[] {
  const app = apps.find(a => a.id === appId);
  if (!app) return [];
  
  return apps
    .filter(a => a.id !== appId && a.categoria === app.categoria)
    .slice(0, limit);
}
