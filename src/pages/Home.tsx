import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
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
  Search,
  Lock,
  Clock,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const countryCodes = [
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+1', country: 'Canadá', flag: '🇨🇦' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
  { code: '+53', country: 'Cuba', flag: '🇨🇺' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
  { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
  { code: '+504', country: 'Honduras', flag: '🇭🇳' },
  { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
  { code: '+507', country: 'Panamá', flag: '🇵🇦' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '+51', country: 'Perú', flag: '🇵🇪' },
  { code: '+1', country: 'Puerto Rico', flag: '🇵🇷' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+809', country: 'República Dominicana', flag: '🇩🇴' },
];

function HomePage() {
  const location = useLocation();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const mainNavItems = [
    { href: '/', label: 'Inicio', icon: HomeIcon },
    { href: '/eventos', label: 'Eventos', icon: Calendar },
    { href: '/directorio-apps', label: 'Directorio Apps', icon: LayoutGrid, highlight: true },
    { href: '/contenido', label: 'Contenido', icon: BookOpen, locked: true },
    { href: '/comunidades', label: 'Comunidades', icon: Users, locked: true },
  ];

  const secondaryNavItems = [
    { label: 'Novedades', icon: Bell },
    { label: 'Historias', icon: History },
    { label: 'Trabajo', icon: Briefcase },
    { label: 'Educación', icon: GraduationCap },
    { label: 'Pequeñas empresas', icon: Building2 },
    { label: 'Organizaciones sin fines de lucro', icon: HeartHandshake },
    { label: 'Gobierno', icon: Landmark },
    { label: 'Organizaciones de noticias', icon: Newspaper },
    { label: 'Ayuda', icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.country-dropdown')) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'registros_bootcamp'), {
        nombre: formData.nombre,
        email: formData.email,
        telefono: `${selectedCountry.code} ${formData.telefono}`,
        codigoPais: selectedCountry.code,
        pais: selectedCountry.country,
        fechaRegistro: new Date(),
        evento: 'Bootcamp IA X100 - 15 Abril 2026',
        eventoId: 'bootcamp-abril-2026',
        estado: 'registrado'
      });
      setSubmitSuccess(true);
      setFormData({ nombre: '', email: '', telefono: '' });
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un error al procesar tu registro. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 overflow-y-auto z-40 hidden lg:block">
        <div className="p-4">
          <Link to="/" className="flex items-center">
            <img src="/logo-largo.png" alt="ACADEMIA INTELIGENTE" className="h-10 w-auto" />
          </Link>
        </div>
        <nav className="px-2 py-2">
          {mainNavItems.map((item) => (
            <Link key={item.href} to={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${
                isActive(item.href) ? 'bg-[#a3e635] text-black' : item.highlight ? 'text-[#a3e635] hover:bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
              }`}>
              <div className="flex items-center gap-3"><item.icon className="w-5 h-5" />{item.label}</div>
              {item.locked && <Lock className="w-4 h-4 text-gray-400" />}
            </Link>
          ))}
        </nav>
        <div className="mx-4 my-2 border-t border-gray-200" />
        <nav className="px-2 py-2">
          {secondaryNavItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed">
              <div className="flex items-center gap-3"><item.icon className="w-5 h-5" />{item.label}</div>
              <Lock className="w-4 h-4 text-gray-300" />
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-50">
        <div className="flex-1 flex justify-start">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg"><Menu className="w-6 h-6" /></button>
        </div>
        <div className="flex-1 flex justify-center">
          <Link to="/" className="flex items-center"><img src="/logo-ai.png" alt="AI" className="h-10 w-auto" /></Link>
        </div>
        <div className="flex-1 flex justify-end">
          <button className="text-sm font-medium text-gray-700">INICIAR SESIÓN</button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-50 touch-none" onClick={() => setMobileMenuOpen(false)} />
          <div className="lg:hidden fixed left-0 top-0 h-screen w-80 bg-white z-50 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}><img src="/logo-ai.png" alt="AI" className="h-10 w-auto" /></Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-6 h-6" /></button>
            </div>
            <nav className="px-2 py-4">
              {mainNavItems.map((item) => (
                <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${
                    isActive(item.href) ? 'bg-[#a3e635] text-black' : item.highlight ? 'text-[#a3e635] hover:bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  <div className="flex items-center gap-3"><item.icon className="w-5 h-5" />{item.label}</div>
                  {item.locked && <Lock className="w-4 h-4 text-gray-400" />}
                </Link>
              ))}
            </nav>
            <div className="mx-4 my-2 border-t border-gray-200" />
            <nav className="px-2 py-2 pb-8">
              {secondaryNavItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed">
                  <div className="flex items-center gap-3"><item.icon className="w-5 h-5" />{item.label}</div>
                  <Lock className="w-4 h-4 text-gray-300" />
                </div>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <header className="hidden lg:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Buscar" className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]" />
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors">INICIAR SESIÓN</button>
        </header>

        <div className="p-4 lg:p-6">
          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden text-white p-6 lg:p-8 mb-8"
            style={{ backgroundImage: `linear-gradient(rgba(88, 28, 135, 0.85), rgba(67, 20, 102, 0.9)), url('/hero-portada.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-2xl lg:text-4xl font-bold mb-4">La Academia Inteligente</h1>
              <p className="text-base lg:text-lg mb-2">
                Te invita al <span className="text-[#a3e635] font-semibold">EVENTO GRATUITO</span> de Inteligencia Artificial{' '}
                <span className="text-[#a3e635] font-semibold">MÁS GRANDE</span> de México y Latinoamérica.
              </p>
              <p className="text-gray-200 text-sm lg:text-base mb-6">
                Aprende cómo aplicar IA, automatización y estrategias digitales para crecer profesionalmente en la nueva era.
              </p>
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="px-6 py-3 bg-[#a3e635] text-black font-semibold rounded-full hover:bg-[#bef264] transition-colors"
              >
                Únete Ahora
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-8">
            <div className="p-4 lg:p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base lg:text-lg font-semibold mb-2">Formación real en Inteligencia Artificial</h3>
              <p className="text-gray-600 text-xs lg:text-sm">Aprende a utilizar IA, automatización y herramientas digitales con un enfoque práctico.</p>
            </div>
            <div className="p-4 lg:p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base lg:text-lg font-semibold mb-2">Marketing, ventas y sistemas en la era digital</h3>
              <p className="text-gray-600 text-xs lg:text-sm">Descubre cómo integrar Inteligencia Artificial en marketing digital, ventas y procesos empresariales.</p>
            </div>
            <div className="p-4 lg:p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base lg:text-lg font-semibold mb-2">Eventos y experiencias para profesionales</h3>
              <p className="text-gray-600 text-xs lg:text-sm">Accede a eventos, entrenamientos y sesiones en vivo diseñadas para quienes buscan evolucionar.</p>
            </div>
          </div>

          {/* Events Section */}
          <div className="mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Eventos</h2>
            
            {/* Event Card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden max-w-2xl">
              <div className="relative">
                <img src="/bootcamp-portada-abril.png" alt="Bootcamp Inteligencia Artificial X100" className="w-full h-auto object-cover" />
                <div className="absolute top-4 left-4 bg-[#a3e635] text-black text-xs font-bold px-3 py-1.5 rounded-full">
                  15 de Abril
                </div>
              </div>
              <div className="p-4 lg:p-6">
                <h3 className="text-lg font-semibold mb-2">Bootcamp Inteligencia Artificial X100</h3>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                  <Clock className="w-4 h-4" />
                  <span>19:00 pm a 21:00 pm (hora de la CDMX)</span>
                </div>
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className="w-full py-3 bg-[#a3e635] text-black font-semibold rounded-lg hover:bg-[#bef264] transition-colors uppercase tracking-wide"
                >
                  INICIAR REGISTRO
                </button>
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="text-center py-12 lg:py-16">
            <div className="w-16 lg:w-20 h-16 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 uppercase tracking-wide">DISPONIBLE PRÓXIMAMENTE</h3>
            <p className="text-gray-500 text-sm lg:text-base">Estamos trabajando en más contenido para ti. ¡Vuelve pronto!</p>
          </div>
        </div>

        <footer className="border-t border-gray-200 py-4 lg:py-6 px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <img src="/logo-ai.png" alt="AI" className="h-6 w-auto" />
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

      {/* Register Modal - AMBOS BOTONES ABREN ESTE MISMO MODAL */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowRegisterModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Completa tu registro</h2>
              <button onClick={() => setShowRegisterModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><span className="text-2xl">&times;</span></button>
            </div>
            
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">¡Registro Exitoso!</h3>
                <p className="text-green-600 text-sm mb-4">Te hemos enviado un correo con los detalles del evento y el enlace de Zoom.</p>
                <button onClick={() => { setSubmitSuccess(false); setShowRegisterModal(false); }} className="text-green-700 font-medium hover:underline">Cerrar</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Nombre Completo</label>
                  <input type="text" required value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Ej: Juan Pérez García" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Correo Electrónico</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="tu@email.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">WhatsApp</label>
                  <div className="flex gap-2">
                    <div className="relative country-dropdown">
                      <button type="button" onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center gap-1 px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm hover:bg-gray-100 transition-colors min-w-[100px]">
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span className="text-gray-700">{selectedCountry.code}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                      </button>
                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                          {countryCodes.map((country, idx) => (
                            <button key={idx} type="button" onClick={() => { setSelectedCountry(country); setShowCountryDropdown(false); }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left">
                              <span className="text-lg">{country.flag}</span>
                              <span className="text-gray-600">{country.code}</span>
                              <span className="text-gray-800">{country.country}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input type="tel" required value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      placeholder="5512345678" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:border-transparent transition-all" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">Selecciona tu país y escribe tu número sin el código de país</p>
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#a3e635] text-black font-semibold rounded-lg hover:bg-[#bef264] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>Procesando...
                    </span>
                  ) : 'CONFIRMAR REGISTRO'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
