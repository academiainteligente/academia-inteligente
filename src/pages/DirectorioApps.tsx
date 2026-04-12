import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, X, ExternalLink, Star, ArrowLeft, Layers, MessageSquare, Image, Video, Mic, Code, BarChart3, Zap, FileText, CheckCircle, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { appsData, type App } from '../data/appsData';

// Categorías con iconos
const categorias = [
  { id: 'todas', nombre: 'Todas', icono: Layers },
  { id: 'texto', nombre: 'Texto y Chat', icono: MessageSquare },
  { id: 'imagen', nombre: 'Imagen', icono: Image },
  { id: 'video', nombre: 'Video', icono: Video },
  { id: 'audio', nombre: 'Audio y Voz', icono: Mic },
  { id: 'codigo', nombre: 'Código', icono: Code },
  { id: 'datos', nombre: 'Datos y Análisis', icono: BarChart3 },
  { id: 'productividad', nombre: 'Productividad', icono: Zap },
  { id: 'presentaciones', nombre: 'Presentaciones', icono: FileText },
];

// Componente para mostrar el logo de la app con fallback
function AppLogo({ src, nombre, className = '' }: { src: string; nombre: string; className?: string }) {
  const [error, setError] = useState(false);
  const iniciales = nombre.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white font-bold ${className}`}>
        {iniciales}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={nombre}
      className={`object-contain ${className}`}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}

// Componente del Modal de App
function AppModal({ app, isOpen, onClose, relatedApps }: { app: App | null; isOpen: boolean; onClose: () => void; relatedApps: App[] }) {
  if (!app || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
            <AppLogo src={app.icono} nombre={app.nombre} className="w-16 h-16" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 bg-[#a3e635] text-black text-sm font-medium rounded-full">
                {categorias.find(c => c.id === app.categoria)?.nombre}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {app.precio}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" />
                <span className="text-sm font-medium">{app.calificacion}</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{app.nombre}</h2>
            <p className="text-gray-500 text-sm">{app.usuarios} usuarios</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <p className="text-gray-600 mb-6">{app.descripcion}</p>

          {/* Características */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#a3e635]" />
              Características principales
            </h4>
            <div className="flex flex-wrap gap-2">
              {app.caracteristicas.map((caracteristica, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg"
                >
                  {caracteristica}
                </span>
              ))}
            </div>
          </div>

          {/* Pros y Contras */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                Pros
              </h4>
              <ul className="space-y-2">
                {app.pros.map((pro, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                <ThumbsDown className="w-4 h-4" />
                Contras
              </h4>
              <ul className="space-y-2">
                {app.contras.map((contra, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    {contra}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Apps relacionadas */}
          {relatedApps.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Apps relacionadas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedApps.slice(0, 3).map((relatedApp) => (
                  <div
                    key={relatedApp.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => window.open(relatedApp.url, '_blank')}
                  >
                    <AppLogo src={relatedApp.icono} nombre={relatedApp.nombre} className="w-10 h-10 rounded-lg" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{relatedApp.nombre}</p>
                      <p className="text-xs text-gray-500">{relatedApp.calificacion} ★</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <button
            className="w-full bg-[#a3e635] text-black font-semibold py-3 rounded-xl hover:bg-[#bef264] transition-colors flex items-center justify-center gap-2"
            onClick={() => window.open(app.url, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            Visitar sitio oficial
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente principal
function DirectorioApps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar apps
  const filteredApps = useMemo(() => {
    return appsData.filter((app) => {
      const matchesSearch =
        app.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'todas' || app.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Apps relacionadas
  const relatedApps = useMemo(() => {
    if (!selectedApp) return [];
    return appsData.filter(
      (app) => app.categoria === selectedApp.categoria && app.id !== selectedApp.id
    );
  }, [selectedApp]);

  const openAppModal = (app: App) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#a3e635] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Directorio de <span className="text-[#a3e635]">Apps de IA</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Descubre las mejores herramientas de inteligencia artificial organizadas por categoría.
            Encuentra la app perfecta para tu proyecto.
          </p>
        </div>
      </header>

      {/* Barra de búsqueda y filtros */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar apps de IA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#a3e635] rounded-xl outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filtros de categoría */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categorias.map((categoria) => {
              const Icon = categoria.icono;
              const isSelected = selectedCategory === categoria.id;
              return (
                <button
                  key={categoria.id}
                  onClick={() => setSelectedCategory(categoria.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#a3e635] text-black font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {categoria.nombre}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid de apps */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Contador de resultados */}
          <div className="mb-6">
            <p className="text-gray-500 text-sm">
              Mostrando <span className="text-gray-900 font-medium">{filteredApps.length}</span> apps
              {selectedCategory !== 'todas' && (
                <span>
                  {' '}en <span className="text-[#a3e635]">{categorias.find((c) => c.id === selectedCategory)?.nombre}</span>
                </span>
              )}
            </p>
          </div>

          {filteredApps.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron apps</h3>
              <p className="text-gray-500">Intenta con otra búsqueda o categoría</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 hover:border-[#a3e635] hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => openAppModal(app)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                      <AppLogo src={app.icono} nombre={app.nombre} className="w-10 h-10" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#a3e635] transition-colors">
                        {app.nombre}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-3 h-3 fill-yellow-500" />
                          <span className="text-xs">{app.calificacion}</span>
                        </div>
                        <span className="text-gray-400 text-xs">{app.usuarios}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">{app.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      app.precio === 'Gratis' || app.precio === 'Freemium'
                        ? 'bg-green-100 text-green-700'
                        : app.precio === 'Próximamente'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {app.precio}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#a3e635] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <AppModal
        app={selectedApp}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        relatedApps={relatedApps}
      />

      {/* Footer simple */}
      <footer className="border-t border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Academia Inteligente. Directorio de Apps de IA.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default DirectorioApps;
