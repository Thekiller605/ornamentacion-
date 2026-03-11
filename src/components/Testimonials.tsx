import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Carlos Rodríguez",
    role: "Arquitecto",
    content: "Excelente trabajo en la estructura metálica para mi proyecto residencial. Cumplieron con los tiempos y la calidad es insuperable.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80&crop=faces"
  },
  {
    name: "Ana Martínez",
    role: "Propietaria de Negocio",
    content: "El diseño de las rejas para mi local quedó espectacular. David entendió perfectamente lo que buscaba y le dio un toque artístico único.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80&crop=faces"
  },
  {
    name: "Luis Fernández",
    role: "Constructor",
    content: "Llevo trabajando con ellos en varios proyectos y siempre entregan resultados profesionales. La soldadura es impecable.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&h=200&q=80&crop=faces"
  }
];

type AvatarProps = {
  name: string;
  src?: string;
};

const Avatar = ({ name, src }: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(src) && !imageError;

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gold-500 to-fire-600 flex items-center justify-center text-white font-bold text-lg mr-3 ring-1 ring-gold-500/30">
      {showImage ? (
        <img
          src={src}
          alt="Foto de cliente"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
        />
      ) : (
        name.charAt(0)
      )}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-metal-800 relative overflow-hidden" id="testimonios">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gold-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-fire-500 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Lo Que Dicen Nuestros Clientes
          </motion.h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded"></div>
          <p className="mt-4 text-xl text-gray-400">La satisfacción de nuestros clientes es nuestra mejor garantía</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-metal-900 p-8 rounded-lg border border-metal-700 hover:border-gold-500/50 transition-colors relative group"
            >
              <Quote className="absolute top-4 right-4 text-metal-700 group-hover:text-gold-500/20 w-12 h-12 transition-colors" />
              
              <div className="flex mb-4 text-gold-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" className="mr-1" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 italic relative z-10">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <Avatar name={testimonial.name} src={testimonial.avatarUrl} />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;