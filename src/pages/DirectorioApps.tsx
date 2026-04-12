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
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { apps, categorias, getRelatedApps } from '@/data/appsData';
import type { App } from '@/data/appsData';
import { Link } from 'react-router-dom';

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

function AppCard({ app, onClick }: { app: App; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:shadow-lg hover:border-[#a3e635] transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <span className="text-white font-bold text-lg">{app.nombre.charAt(0)}</span>
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
        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
          {app.precio}
        </Badge>
        <span className="text-[#a3e635] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Ver detalles →
        </span>
      </div>
    </div>
  );
}

function AppModal({ app, isOpen, onClose }: { app: App | null; isOpen: boolean; onClose: () => void }) {
  if (!app) return null;
  
  const relatedApps = getRelatedApps(app.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">{app.nombre.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{app.nombre}</DialogTitle>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-[#a3e635] text-black">{app.categoria}</Badge>
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
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <p className="text-gray-700">{app.descripcionLarga}</p>
          
          <div>
            <h4 className="font-semibold mb-3">Características principales</h4>
            <div className="flex flex-wrap gap-2">
              {app.caracteristicas.map((feat, i) => (
                <Badge key={i} variant="outline" className="bg-gray-50">
                  {feat}
                </Badge>
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
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{related.nombre.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-medium">{related.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Button 
            className="w-full bg-[#a3e635] text-black hover:bg-[#bef264] font-semibold py-6"
            onClick={() => window.open(app.url, '_blank')}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Visitar sitio oficial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#a3e635] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Directorio de Apps</h1>
                  <p className="text-sm text-gray-500">Descubre las mejores herramientas de IA</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {appsFiltradas.length} apps encontradas
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar aplicaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 py-6 text-lg bg-white border-gray-200 rounded-xl"
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
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map(cat => {
            const Icon = iconMap[cat.icono] || LayoutGrid;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all ${
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {appsFiltradas.map(app => (
              <AppCard 
                key={app.id} 
                app={app} 
                onClick={() => handleAppClick(app)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron apps</h3>
            <p className="text-gray-500">Intenta con otra búsqueda o categoría</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AppModal 
        app={appSeleccionada} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}
