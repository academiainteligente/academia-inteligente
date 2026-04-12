import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Calendar, 
  LayoutGrid, 
  BookOpen, 
  Users, 
  Sparkles,
  Bell,
  History,
  Briefcase,
  GraduationCap,
  Building2,
  HeartHandshake,
  Landmark,
  Newspaper,
  HelpCircle,
  Search,
  Lock,
  Clock
} from 'lucide-react';
import { useState } from 'react';

function HomePage() {
  const location = useLocation();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const mainNavItems = [
    { href: '/', label: 'Inicio', icon: HomeIcon },
    { href: '/eventos', label: 'Eventos', icon: Calendar },
    { href: '/directorio-apps', label: 'Directorio Apps', icon: LayoutGrid, highlight: true },
    { href: '/contenido', label: 'Contenido', icon: BookOpen, locked: true },
    { href: '/comunidades', label: 'Comunidades', icon: Users, locked: true },
  ];

  const secondaryNavItems = [
    { href: '/novedades', label: 'Novedades', icon: Bell },
    { href: '/historias', label: 'Historias', icon: History },
    { href: '/trabajo', label: 'Trabajo', icon: Briefcase },
    { href: '/educacion', label: 'Educación', icon: GraduationCap },
    { href: '/pequenas-empresas', label: 'Pequeñas empresas', icon: Building2 },
    { href: '/organizaciones-sin-fines', label: 'Organizaciones sin fines de lucro', icon: HeartHandshake },
    { href: '/gobierno', label: 'Gobierno', icon: Landmark },
    { href: '/organizaciones-noticias', label: 'Organizaciones de noticias', icon: Newspaper },
    { href: '/ayuda', label: 'Ayuda', icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleJoinClick = () => {
    setShowJoinModal(true);
  };

  return (
    <div className="min-h-screen bg-white flex">
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
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden items-center gap-2">
              <div className="w-10 h-10 bg-[#a3e635] rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
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
                isActive(item.href)
                  ? 'bg-[#a3e635] text-black'
                  : item.highlight
                  ? 'text-[#a3e635] hover:bg-gray-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
              {item.locked && <Lock className="w-4 h-4 text-gray-400" />}
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#a3e635] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold">AI</span>
          </div>
        </div>
        <button className="text-sm font-medium text-gray-700">
          INICIAR SESIÓN
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-6 sticky top-0 z-30">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors">
              INICIAR SESIÓN
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-6 lg:p-8 mb-8">
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-2xl lg:text-4xl font-bold mb-4">La Academia Inteligente</h1>
              <p className="text-base lg:text-lg mb-2">
                Te invita al <span className="text-[#a3e635] font-semibold">EVENTO GRATUITO</span> de Inteligencia Artificial{' '}
                <span className="text-[#a3e635] font-semibold">MÁS GRANDE</span> de México y Latinoamérica.
              </p>
              <p className="text-gray-300 text-sm lg:text-base mb-6">
                Aprende cómo aplicar IA, automatización y estrategias digitales para crecer profesionalmente en la nueva era.
              </p>
              <button 
                onClick={handleJoinClick}
                className="px-6 py-3 bg-[#a3e635] text-black font-semibold rounded-full hover:bg-[#bef264] transition-colors"
              >
                Únete Ahora
              </button>
            </div>
            {/* Background decoration */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="absolute right-10 top-10 w-48 lg:w-64 h-48 lg:h-64 bg-purple-500 rounded-full blur-3xl" />
              <div className="absolute right-20 bottom-10 w-32 lg:w-48 h-32 lg:h-48 bg-indigo-500 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-8">
            <div className="p-4 lg:p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base lg:text-lg font-semibold mb-2">Formación real en Inteligencia Artificial</h3>
              <p className="text-gray-600 text-xs lg:text-sm">
                Aprende a utilizar IA, automatización y herramientas digitales con un enfoque práctico. 
                Aquí no solo consumes contenido... desarrollas habilidades aplicables desde el primer día.
              </p>
            </div>
            <div className="p-4 lg:p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base lg:text-lg font-semibold mb-2">Marketing, ventas y sistemas en la era digital</h3>
              <p className="text-gray-600 text-xs lg:text-sm">
                Descubre cómo integrar Inteligencia Artificial en marketing digital, ventas y procesos empresariales. 
                Construye sistemas que te permitan crecer más rápido con menos esfuerzo.
              </p>
            </div>
            <div className="p-4 lg:p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base lg:text-lg font-semibold mb-2">Eventos y experiencias para profesionales</h3>
              <p className="text-gray-600 text-xs lg:text-sm">
                Accede a eventos, entrenamientos y sesiones en vivo diseñadas para quienes buscan evolucionar. 
                Aprende directamente lo que ya se está aplicando en la industria.
              </p>
            </div>
          </div>

          {/* Events Section */}
          <div className="mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Eventos</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-16 h-16 bg-[#a3e635] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm text-center leading-tight">15 de<br/>Abril</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base lg:text-lg font-semibold mb-1">Bootcamp Inteligencia Artificial X100</h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <Clock className="w-4 h-4" />
                    19:00 pm a 21:00 pm (hora de la CDMX)
                  </div>
                  <button 
                    onClick={handleRegisterClick}
                    className="w-full py-3 bg-[#a3e635] text-black font-semibold rounded-lg hover:bg-[#bef264] transition-colors uppercase tracking-wide"
                  >
                    INICIAR REGISTRO
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="text-center py-12 lg:py-16">
            <div className="w-16 lg:w-20 h-16 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 uppercase tracking-wide">DISPONIBLE PRÓXIMAMENTE</h3>
            <p className="text-gray-500 text-sm lg:text-base">
              Estamos trabajando en más contenido para ti. ¡Vuelve pronto!
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-4 lg:py-6 px-4 lg:px-6">
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

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowRegisterModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Registro al Bootcamp</h2>
              <button onClick={() => setShowRegisterModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635]" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635]" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635]" placeholder="+52 123 456 7890" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#a3e635] text-black font-semibold rounded-lg hover:bg-[#bef264] transition-colors">
                REGISTRARME
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowJoinModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Únete a la Academia Inteligente</h2>
              <button onClick={() => setShowJoinModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635]" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3e635]" placeholder="tu@email.com" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#a3e635] text-black font-semibold rounded-lg hover:bg-[#bef264] transition-colors">
                UNIRME AHORA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
