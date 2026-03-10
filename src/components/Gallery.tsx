import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', 'Residencial', 'Industrial', 'Artístico', 'Decoración'];

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1535976536586-b45391d4d380?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Portón Residencial',
      category: 'Residencial'
    },
    {
      url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Estructura Industrial',
      category: 'Industrial'
    },
    {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Soldadura de Precisión',
      category: 'Industrial'
    },
    {
      url: 'https://images.unsplash.com/photo-1567606400539-261563f45206?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Barandal Artístico',
      category: 'Artístico'
    },
    {
      url: 'https://images.unsplash.com/photo-1621252179027-94459d27d3ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Muebles de Forja',
      category: 'Artístico'
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Detalles Decorativos',
      category: 'Decoración'
    }
  ];

  const filteredImages = activeCategory === 'Todos' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <section className="py-20 bg-metal-900" id="galeria">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Galería de Proyectos</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded"></div>
          <p className="mt-4 text-xl text-gray-400">Una muestra de nuestro trabajo y dedicación</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/20'
                  : 'bg-metal-800 text-gray-400 hover:bg-metal-700 hover:text-white border border-metal-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.div 
                layout
                key={img.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group overflow-hidden rounded-lg aspect-video cursor-pointer bg-metal-800"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-xl font-bold text-white border-b-2 border-gold-500 pb-1 mb-2">{img.title}</h3>
                  <span className="text-sm text-gold-400 font-medium">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
