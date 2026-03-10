import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            <span className="block text-gold-500">David Ortiz</span>
            <span className="block">Ornamentador</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Especialistas en herrería artística, estructuras metálicas y forja tradicional. 
            Transformamos el metal en obras duraderas y elegantes para su hogar o negocio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/servicios"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-metal-900 bg-gold-500 hover:bg-gold-400 transition-colors md:text-lg"
            >
              Nuestros Servicios
            </Link>
            <Link 
              to="/contacto"
              className="inline-flex items-center justify-center px-8 py-3 border border-gold-500 text-base font-medium rounded-md text-gold-500 hover:bg-gold-500 hover:text-metal-900 transition-colors md:text-lg"
            >
              Cotizar Proyecto <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
