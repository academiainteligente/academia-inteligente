import { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  ExternalLink, 
  Star, 
  Users, 
  Check, 
  X as XIcon,
  LayoutGrid,
  MessageSquare,
  Image,
  Video,
  Mic,
  Code,
  Zap,
  Presentation,
  ArrowLeft,
  Home as HomeIcon, 
  Calendar, 
  BookOpen, 
  Users as UsersIcon,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { apps, categorias, getRelatedApps } from '../data/appsData';
import type { App } from '../data/appsData';

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  MessageSquare,
  Image,
  Video,
  Mic,
  Code,
  Zap,
  Presentation
};

// Lista de apps con logos locales disponibles
const localLogos: Record<string, string> = {
  'chatgpt': '/logos/chatgpt.png',
  'claude': '/logos/claude.png',
  'gemini': '/logos/gemini.png',
  'midjourney': '/logos/midjourney.png',
  'dalle': '/logos/dalle.png',
  'runway': '/logos/runway.png',
  'pika': '/logos/pika.png',
  'elevenlabs': '/logos/elevenlabs.png',
  'github-copilot': '/logos/github-copilot.png',
  'notion': '/logos/notion.png',
  'gamma': '/logos/gamma.png',
  'perplexity': '/logos/perplexity.png',
  'stable-diffusion': '/logos/stable-diffusion.png',
  'synthesia': '/logos/synthesia.png',
  'cursor': '/logos/cursor.png',
  'canva': '/logos/canva.png',
  'heygen': '/logos/heygen.png',
  'leonardo-ai': '/logos/leonardo-ai.png',
  'descript': '/logos/descript.png',
  'removebg': '/logos/removebg.png',
  'adobe-podcast': '/logos/adobe-podcast.png',
  'beautiful': '/logos/beautiful.png',
  'otter': '/logos/otter.png',
  'semrush': '/logos/semrush.png',
  'copyleaks': '/logos/copyleaks.png',
  'speechify': '/logos/speechify.png',
  'krea': '/logos/krea.png',
  'whispert': '/logos/whispert.png',
  'blackbox': '/logos/blackbox.png',
  'browse-ai': '/logos/browse-ai.png',
  'lovable': '/logos/lovable.png',
  'remini': '/logos/remini.png',
  'mythicx': '/logos/mythicx.png',
  'character-ai': '/logos/character-ai.png',
};

// Función para obtener el dominio de una URL
function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return '';
  }
}

// Componente para mostrar el logo de la app
function AppLogo({ app, size = 'md' }: { app: App; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };
  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };
  
  // Verificar si hay logo local
  const localLogo = localLogos[app.id];
  
  // Si no hay logo local, usar favicon de Google
  const domain = getDomainFromUrl(app.url);
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=256` : '';
  
  // Colores para fallback
  const colors = [
    'from-purple-500 to-blue-500',
    'from-pink-500 to-rose-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-amber-500',
    'from-cyan-500 to-blue-500',
    'from-indigo-500 to-violet-500'
  ];
  const colorIndex = app.id.length % colors.length;
  
  const [hasError, setHasError] = useState(false);
  
  // Si hay logo local, usarlo
  if (localLogo) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-200 flex items-center justify-center`}>
        <img 
          src={localLogo}
          alt={app.nombre}
          className="w-full h-full object-contain p-1"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }
  
  // Si no hay logo local pero hay favicon, intentar usarlo
  if (faviconUrl && !hasError) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-200 flex items-center justify-center`}>
        <img 
          src={faviconUrl}
          alt={app.nombre}
          className="w-full h-full object-contain p-1"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }
  
  // Fallback: mostrar inicial con color
  return (
    <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center flex-shrink-0`}>
      <span className={`text-white font-bold ${textSizes[size]}`}>{app.nombre.charAt(0)}</span>
    </div>
  );
}

function AppCard({ app, onClick }: { app: App; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:shadow-lg hover:border-[#a3e635] transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="group-hover:scale-105 transition-transform">
          <AppLogo app={app} size="md" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{app.nombre}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-gray-600">{app.calificacion}</span>
            <span className="text-gray-300">|</span>
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{app.usuarios}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm mt-3 line-clamp-2">{app.descripcion}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{app.precio}</span>
        <span className="text-[#a3e635] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Ver detalles →
        </span>
      </div>
    </div>
  );
}

function AppModal({ app, isOpen, onClose }: { app: App | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !app) return null;
  
  const relatedApps = getRelatedApps(app.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-start gap-4 mb-4">
          <AppLogo app={app} size="lg" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{app.nombre}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2 py-1 bg-[#a3e635] text-black text-xs rounded-full">{app.categoria}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">{app.calificacion}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{app.usuarios}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          <p className="text-gray-700">{app.descripcionLarga}</p>
          
          <div>
            <h4 className="font-semibold mb-3">Características principales</h4>
            <div className="flex flex-wrap gap-2">
              {app.caracteristicas.map((feat, i) => (
                <span key={i} className="px-2 py-1 border border-gray-200 rounded-full text-sm">{feat}</span>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Check className="w-5 h-5" /> Pros
              </h4>
              <ul className="space-y-2">
                {app.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <XIcon className="w-5 h-5" /> Contras
              </h4>
              <ul className="space-y-2">
                {app.contras.map((contra, i) => (
                  <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">×</span> {contra}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {relatedApps.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Apps relacionadas</h4>
              <div className="flex gap-3">
                {relatedApps.map(related => (
                  <div key={related.id} className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                    <AppLogo app={related} size="sm" />
                    <span className="text-sm font-medium">{related.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button 
            className="w-full bg-[#a3e635] text-black font-semibold py-3 rounded-lg hover:bg-[#bef264] transition-colors flex items-center justify-center"
            onClick={() => window.open(app.url, '_blank')}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Visitar sitio oficial
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DirectorioApps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [appSeleccionada, setAppSeleccionada] = useState<App | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const appsFiltradas = useMemo(() => {
    let filtered = apps;
    
    if (categoriaActiva !== 'todas') {
      filtered = filtered.filter(app => app.categoria === categoriaActiva);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.nombre.toLowerCase().includes(query) ||
        app.descripcion.toLowerCase().includes(query) ||
        app.etiquetas.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [searchQuery, categoriaActiva]);

  const handleAppClick = (app: App) => {
    setAppSeleccionada(app);
    setModalOpen(true);
  };

  const mainNavItems = [
    { href: '/', label: 'Inicio', icon: HomeIcon },
    { href: '/eventos', label: 'Eventos', icon: Calendar },
    { href: '/directorio-apps', label: 'Directorio Apps', icon: LayoutGrid, active: true },
    { href: '/contenido', label: 'Contenido', icon: BookOpen, locked: true },
    { href: '/comunidades', label: 'Comunidades', icon: UsersIcon, locked: true },
  ];

  const secondaryNavItems = [
    { href: '/novedades', label: 'Novedades', icon: Lock },
    { href: '/historias', label: 'Historias', icon: Lock },
    { href: '/trabajo', label: 'Trabajo', icon: Lock },
    { href: '/educacion', label: 'Educación', icon: Lock },
    { href: '/pequenas-empresas', label: 'Pequeñas empresas', icon: Lock },
    { href: '/organizaciones-sin-fines', label: 'Organizaciones sin fines de lucro', icon: Lock },
    { href: '/gobierno', label: 'Gobierno', icon: Lock },
    { href: '/organizaciones-noticias', label: 'Organizaciones de noticias', icon: Lock },
    { href: '/ayuda', label: 'Ayuda', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 overflow-y-auto z-40 hidden lg:block">
        {/* Logo */}
        <div className="p-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo-largo.png" 
              alt="ACADEMIA INTELIGENTE" 
              className="h-8"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden items-center gap-2">
              <div className="w-10 h-10 bg-[#a3e635] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">AI</span>
              </div>
              <span className="font-bold text-sm tracking-tight">ACADEMIA<br/>INTELIGENTE</span>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="px-2 py-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${
                item.active
                  ? 'bg-[#a3e635] text-black'
                  : item.locked
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
              {item.locked && <Lock className="w-4 h-4 text-gray-300" />}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-gray-200" />

        {/* Secondary Navigation */}
        <nav className="px-2 py-2">
          {secondaryNavItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5" />
                {item.label}
              </div>
              <Lock className="w-4 h-4 text-gray-300" />
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo-ai-mobile.png" 
            alt="AI" 
            className="w-8 h-8 object-cover"
          />
        </Link>
        <button className="text-sm font-medium text-gray-700">
          INICIAR SESIÓN
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Link to="/">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <img 
                src="/logo-ai-mobile.png" 
                alt="AI" 
                className="w-10 h-10 object-cover"
              />
              <div>
                <h1 className="text-xl font-bold">Directorio de Apps</h1>
                <p className="text-sm text-gray-500">Descubre las mejores herramientas de IA</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {appsFiltradas.length} apps encontradas
          </div>
        </header>

        {/* Mobile Header for Directorio */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <Link to="/">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-lg font-bold">Directorio de Apps</h1>
            <p className="text-xs text-gray-500">{appsFiltradas.length} apps</p>
          </div>
        </div>

        <div className="p-4 lg:p-6">
          {/* Search */}
          <div className="relative mb-6 lg:mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar aplicaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 lg:py-4 text-base lg:text-lg bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
            {categorias.map(cat => {
              const Icon = iconMap[cat.icono] || LayoutGrid;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaActiva(cat.id)}
                  className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full font-medium transition-all text-sm ${
                    categoriaActiva === cat.id
                      ? 'bg-[#a3e635] text-black'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.nombre}
                </button>
              );
            })}
          </div>

          {/* Apps Grid */}
          {appsFiltradas.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {appsFiltradas.map(app => (
                <AppCard 
                  key={app.id} 
                  app={app} 
                  onClick={() => handleAppClick(app)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 lg:py-16">
              <div className="w-16 lg:w-20 h-16 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 lg:w-10 h-8 lg:h-10 text-gray-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-2">No se encontraron apps</h3>
              <p className="text-gray-500 text-sm lg:text-base">Intenta con otra búsqueda o categoría</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-4 lg:py-6 px-4 lg:px-6 mt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
              <p>© 2026 ACADEMIA INTELIGENTE. Todos los derechos reservados.</p>
            </div>
            <div className="flex gap-4 lg:gap-6">
              <Link to="/privacidad" className="hover:text-gray-700">Privacidad</Link>
              <Link to="/terminos" className="hover:text-gray-700">Términos</Link>
              <Link to="/contacto" className="hover:text-gray-700">Contacto</Link>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal */}
      {modalOpen && (
        <AppModal 
          app={appSeleccionada} 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </div>
  );
}
