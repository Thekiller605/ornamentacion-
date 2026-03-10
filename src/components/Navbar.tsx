import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-metal-900 text-gold-500 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="h-16 w-auto" />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Inicio</Link>
              <Link to="/servicios" className="hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Servicios</Link>
              <Link to="/galeria" className="hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Galería</Link>
              <Link to="/contacto" className="hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contacto</Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gold-500 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-metal-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={toggleMenu} className="block hover:text-white px-3 py-2 rounded-md text-base font-medium">Inicio</Link>
            <Link to="/servicios" onClick={toggleMenu} className="block hover:text-white px-3 py-2 rounded-md text-base font-medium">Servicios</Link>
            <Link to="/galeria" onClick={toggleMenu} className="block hover:text-white px-3 py-2 rounded-md text-base font-medium">Galería</Link>
            <Link to="/contacto" onClick={toggleMenu} className="block hover:text-white px-3 py-2 rounded-md text-base font-medium">Contacto</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
