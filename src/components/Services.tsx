import { motion } from 'framer-motion';

type ServiceIconProps = {
  className?: string;
};

const baseIconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
};

const IconIronGate = ({ className = 'h-12 w-12' }: ServiceIconProps) => (
  <svg viewBox="0 0 64 64" className={className} {...baseIconProps}>
    <path d="M14 52h36" />
    <path d="M18 52V22" />
    <path d="M46 52V22" />
    <path d="M18 22c0-7 6-12 14-12s14 5 14 12" />
    <path d="M24 50V26" />
    <path d="M30 50V24" />
    <path d="M34 50V24" />
    <path d="M40 50V26" />
    <path d="M24 36c0 3-2 5-5 5" />
    <path d="M40 36c0 3 2 5 5 5" />
    <path d="M30 32c0-2 1.6-3.6 3.6-3.6S37.2 30 37.2 32" />
  </svg>
);

const IconIBeam = ({ className = 'h-12 w-12' }: ServiceIconProps) => (
  <svg viewBox="0 0 64 64" className={className} {...baseIconProps}>
    <path d="M14 18h36" />
    <path d="M14 46h36" />
    <path d="M24 18v28" />
    <path d="M40 18v28" />
    <path d="M24 32h16" />
    <circle cx="22" cy="22" r="1.6" />
    <circle cx="32" cy="22" r="1.6" />
    <circle cx="42" cy="22" r="1.6" />
    <circle cx="22" cy="42" r="1.6" />
    <circle cx="32" cy="42" r="1.6" />
    <circle cx="42" cy="42" r="1.6" />
  </svg>
);

const IconAnvilSpark = ({ className = 'h-12 w-12' }: ServiceIconProps) => (
  <svg viewBox="0 0 64 64" className={className} {...baseIconProps}>
    <path d="M16 30h32l-6-6H22l-6 6Z" />
    <path d="M20 30h24l-5 8H25l-5-8Z" />
    <path d="M28 38v10h8V38" />
    <path d="M44 20l4-4" />
    <path d="M48 24h6" />
    <path d="M46 26l4 4" />
    <path d="M18 18l10 10" />
    <path d="M26 20l-4 4" />
  </svg>
);

const IconWeldRepair = ({ className = 'h-12 w-12' }: ServiceIconProps) => (
  <svg viewBox="0 0 64 64" className={className} {...baseIconProps}>
    <path d="M18 16h16c4 0 8 4 8 8v14c0 10-7 18-16 18s-16-8-16-18V24c0-4 4-8 8-8Z" />
    <path d="M18 26h18v10H18z" />
    <path d="M42 38l10-10" />
    <path d="M38 42l6-6" />
    <path d="M50 16l2-4" />
    <path d="M54 20l4-2" />
    <path d="M52 22l2 4" />
  </svg>
);

const services = [
  {
    icon: <IconIronGate className="h-12 w-12 text-gold-500" />,
    title: 'Herrería Residencial',
    description: 'Puertas, portones, barandales y protecciones diseñadas a medida para la seguridad y estética de su hogar.'
  },
  {
    icon: <IconIBeam className="h-12 w-12 text-gold-500" />,
    title: 'Estructuras Metálicas',
    description: 'Diseño y montaje de estructuras para techos, naves industriales y ampliaciones con los más altos estándares.'
  },
  {
    icon: <IconAnvilSpark className="h-12 w-12 text-gold-500" />,
    title: 'Forja Artística',
    description: 'Piezas únicas forjadas a mano, desde muebles hasta elementos decorativos que añaden distinción.'
  },
  {
    icon: <IconWeldRepair className="h-12 w-12 text-gold-500" />,
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
