import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, Sparkles, Calendar, LayoutGrid, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Home from './pages/Home';
import DirectorioApps from './pages/DirectorioApps';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio', icon: Sparkles },
    { href: '/eventos', label: 'Eventos', icon: Calendar },
    { href: '/directorio-apps', label: 'Directorio Apps', icon: LayoutGrid, highlight: true },
    { href: '/contenido', label: 'Contenido', icon: BookOpen },
    { href: '/comunidades', label: 'Comunidades', icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/'
          ? 'bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#a3e635] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
            </div>
            <span className="text-white font-semibold text-lg lg:text-xl tracking-tight">
              ACADEMIA INTELIGENTE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#a3e635]'
                    : link.highlight
                    ? 'text-[#a3e635] hover:text-[#bef264]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <Button className="bg-[#a3e635] text-black hover:bg-[#bef264] font-medium px-6">
              Comenzar Ahora
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#1a1a1a] border-white/10 w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 text-lg font-medium transition-colors py-2 ${
                      isActive(link.href)
                        ? 'text-[#a3e635]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                <Button className="bg-[#a3e635] text-black hover:bg-[#bef264] font-medium w-full mt-4">
                  Comenzar Ahora
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directorio-apps" element={<DirectorioApps />} />
          <Route path="/eventos" element={<Home />} />
          <Route path="/contenido" element={<Home />} />
          <Route path="/comunidades" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
