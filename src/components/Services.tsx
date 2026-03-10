import { Hammer, Wrench, Shield, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Home className="h-12 w-12 text-gold-500" />,
    title: 'Herrería Residencial',
    description: 'Puertas, portones, barandales y protecciones diseñadas a medida para la seguridad y estética de su hogar.'
  },
  {
    icon: <Wrench className="h-12 w-12 text-gold-500" />,
    title: 'Estructuras Metálicas',
    description: 'Diseño y montaje de estructuras para techos, naves industriales y ampliaciones con los más altos estándares.'
  },
  {
    icon: <Hammer className="h-12 w-12 text-gold-500" />,
    title: 'Forja Artística',
    description: 'Piezas únicas forjadas a mano, desde muebles hasta elementos decorativos que añaden distinción.'
  },
  {
    icon: <Shield className="h-12 w-12 text-gold-500" />,
    title: 'Mantenimiento y Reparación',
    description: 'Servicio de reparación de soldadura, pintura y mantenimiento preventivo para estructuras existentes.'
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-metal-800" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nuestros Servicios</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded"></div>
          <p className="mt-4 text-xl text-gray-400">Soluciones integrales en metalmecánica y soldadura</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-metal-900 p-8 rounded-lg shadow-xl hover:shadow-gold-500/10 transition-shadow border border-metal-700 hover:border-gold-500/50 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
