import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  LayoutGrid, 
  BookOpen, 
  Users, 
  Bell,
  History,
  Briefcase,
  GraduationCap,
  Building2,
  HeartHandshake,
  Landmark,
  Newspaper,
  HelpCircle,
  Search
} from 'lucide-react';

function HomePage() {
  const location = useLocation();

  const mainNavItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/eventos', label: 'Eventos', icon: Calendar },
    { href: '/directorio-apps', label: 'Directorio Apps', icon: LayoutGrid, highlight: true },
    { href: '/contenido', label: 'Contenido', icon: BookOpen },
    { href: '/comunidades', label: 'Comunidades', icon: Users },
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

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 overflow-y-auto z-40">
        {/* Logo */}
        <div className="p-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-largo.png" alt="Academia Inteligente" className="h-8" />
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="px-2 py-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1 ${
                isActive(item.href)
                  ? 'bg-[#a3e635] text-black'
                  : item.highlight
                  ? 'text-[#a3e635] hover:bg-gray-100'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-gray-200" />

        {/* Secondary Navigation */}
        <nav className="px-2 py-2">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1 text-gray-600 hover:bg-gray-100 ${
                isActive(item.href) ? 'bg-gray-100' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
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
        <div className="p-6">
          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-8 mb-8">
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">La Academia Inteligente</h1>
              <p className="text-lg mb-2">
                Te invita al <span className="text-[#a3e635] font-semibold">EVENTO GRATUITO</span> de Inteligencia Artificial{' '}
                <span className="text-[#a3e635] font-semibold">MÁS GRANDE</span> de México y Latinoamérica.
              </p>
              <p className="text-gray-300 mb-6">
                Aprende cómo aplicar IA, automatización y estrategias digitales para crecer profesionalmente en la nueva era.
              </p>
              <button className="px-6 py-3 bg-[#a3e635] text-black font-semibold rounded-full hover:bg-[#bef264] transition-colors">
                Únete Ahora
              </button>
            </div>
            {/* Background decoration */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
              <div className="absolute right-10 top-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
              <div className="absolute right-20 bottom-10 w-48 h-48 bg-indigo-500 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Formación real en Inteligencia Artificial</h3>
              <p className="text-gray-600 text-sm">
                Aprende a utilizar IA, automatización y herramientas digitales con un enfoque práctico. 
                Aquí no solo consumes contenido... desarrollas habilidades aplicables desde el primer día.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Marketing, ventas y sistemas en la era digital</h3>
              <p className="text-gray-600 text-sm">
                Descubre cómo integrar Inteligencia Artificial en marketing digital, ventas y procesos empresariales. 
                Construye sistemas que te permitan crecer más rápido con menos esfuerzo.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Eventos y experiencias para profesionales</h3>
              <p className="text-gray-600 text-sm">
                Accede a eventos, entrenamientos y sesiones en vivo diseñadas para quienes buscan evolucionar. 
                Aprende directamente lo que ya se está aplicando en la industria.
              </p>
            </div>
          </div>

          {/* Events Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Eventos</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#a3e635] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm text-center">15 de<br/>Abril</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Bootcamp Inteligencia Artificial X100</h3>
                  <p className="text-gray-600 text-sm mb-3">19:00 pm a 21:00 pm (hora de la CDMX)</p>
                  <button className="w-full py-3 bg-[#a3e635] text-black font-semibold rounded-lg hover:bg-[#bef264] transition-colors">
                    INICIAR REGISTRO
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              DISPONIBLE PRÓXIMAMENTE<br/>
              Estamos trabajando en más contenido para ti. ¡Vuelve pronto!
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-6 px-6 mt-8">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>© 2026 ACADEMIA INTELIGENTE. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <Link to="/privacidad" className="hover:text-gray-700">Privacidad</Link>
              <Link to="/terminos" className="hover:text-gray-700">Términos</Link>
              <Link to="/contacto" className="hover:text-gray-700">Contacto</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
