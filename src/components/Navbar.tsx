import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <nav className="bg-metal-900 text-gold-500 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="h-16 w-auto" />
            </Link>
          </div>
          
          <div className="desktop-only">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Inicio</Link>
              <Link to="/servicios" className="hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Servicios</Link>
              <Link to="/galeria" className="hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Galería</Link>
              <Link to="/contacto" className="hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contacto</Link>
            </div>
          </div>
          
          <div className="mobile-only">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gold-500 hover:text-white focus:outline-none border border-gold-500/20 bg-metal-900/70 backdrop-blur"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-only">
          <button
            type="button"
            onClick={closeMenu}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Cerrar menú"
          />
          <div
            id="mobile-nav"
            className="absolute left-0 top-full w-full bg-metal-900/95 backdrop-blur border-t border-metal-700 shadow-2xl shadow-black/40"
          >
            <div className="px-4 py-3 space-y-2">
              <Link
                to="/"
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-gold-500 bg-metal-800/50 border border-metal-700 hover:border-gold-500/40 hover:text-white transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/servicios"
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-gold-500 bg-metal-800/50 border border-metal-700 hover:border-gold-500/40 hover:text-white transition-colors"
              >
                Servicios
              </Link>
              <Link
                to="/galeria"
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-gold-500 bg-metal-800/50 border border-metal-700 hover:border-gold-500/40 hover:text-white transition-colors"
              >
                Galería
              </Link>
              <Link
                to="/contacto"
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-gold-500 bg-metal-800/50 border border-metal-700 hover:border-gold-500/40 hover:text-white transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
