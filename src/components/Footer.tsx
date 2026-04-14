import { Facebook, Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-metal-950 text-white pt-12 pb-8 border-t border-metal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="h-20 w-auto" />
            </div>
            <p className="text-gray-400 text-sm">
              Transformamos el metal en arte. Calidad, durabilidad y diseño en cada proyecto.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-500">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="/servicios" className="hover:text-white transition-colors">Servicios</a></li>
              <li><a href="/galeria" className="hover:text-white transition-colors">Galería</a></li>
              <li><a href="/contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-500">Servicios</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Herrería Residencial</li>
              <li>Estructuras Metálicas</li>
              <li>Forja Artística</li>
              <li>Mantenimiento</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-500">Síguenos</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61570717554696" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E4405F] transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-metal-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()}  Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
