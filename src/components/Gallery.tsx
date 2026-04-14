import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Gallery = () => {
  const { pathname } = useLocation();
  const showBackToHome = pathname !== '/';
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', 'Residencial', 'Industrial', 'Artístico', 'Decoración'];

  const localAssetUrl = useCallback((fileName: string) => `/imagen/${encodeURIComponent(fileName)}`, []);

  type PhotoItem = {
    type: 'image';
    url: string;
    title: string;
    category: string;
  };

  type VideoItem = {
    type: 'video';
    url: string;
    title: string;
    category: string;
    posterUrl?: string;
  };

  const photos: PhotoItem[] = useMemo(() => {
    return [
      {
        type: 'image',
        url: localAssetUrl('diseño_puerta_negra.jpeg'),
        title: 'Puerta metálica en perfilería (acabado negro)',
        category: 'Residencial'
      },
      {
        type: 'image',
        url: localAssetUrl('diseño_puerta_metal_blanco.jpeg'),
        title: 'Puerta metálica en perfilería (acabado blanco)',
        category: 'Residencial'
      },
      {
        type: 'image',
        url: localAssetUrl('diseño ventanal mas puerta en gris.jpeg'),
        title: 'Ventanal + puerta metálica (acabado gris)',
        category: 'Residencial'
      },
      {
        type: 'image',
        url: localAssetUrl('estructura_metalica_techo.jpeg'),
        title: 'Estructura metálica para cubierta',
        category: 'Industrial'
      },
      {
        type: 'image',
        url: localAssetUrl('estructura_techo_grande_vereda.jpeg'),
        title: 'Estructura para cubierta a gran luz',
        category: 'Industrial'
      },
      {
        type: 'image',
        url: localAssetUrl('estructura_cerchas_azules.jpeg'),
        title: 'Cerchas metálicas (pintura azul)',
        category: 'Industrial'
      },
      {
        type: 'image',
        url: localAssetUrl('baranda_escalera_hierro.jpeg'),
        title: 'Baranda de escalera en hierro',
        category: 'Artístico'
      },
      {
        type: 'image',
        url: localAssetUrl('diseño_vetanal.jpeg'),
        title: 'Diseño de ventanal metálico',
        category: 'Artístico'
      },
      {
        type: 'image',
        url: localAssetUrl('diseño de techo  piscina.jpeg'),
        title: 'Cubierta para zona de piscina',
        category: 'Decoración'
      },
      {
        type: 'image',
        url: localAssetUrl('Terminado_dieño_interiror_techo.jpeg'),
        title: 'Acabados interiores de cubierta',
        category: 'Decoración'
      }
    ];
  }, [localAssetUrl]);

  const videos: VideoItem[] = useMemo(() => {
    return [
      {
        type: 'video',
        url: localAssetUrl('obra_techo_rojo.mp4'),
        title: 'Montaje de cubierta techo ',
        category: 'Industrial',
        posterUrl: localAssetUrl('toma de terminado techo rojo.jpeg')
      },
      {
        type: 'video',
        url: localAssetUrl('techo rojo.mp4'),
        title: 'Proceso de cubierta ',
        category: 'Decoración',
        posterUrl: localAssetUrl('techo rojo .jpeg')
      }
    ];
  }, [localAssetUrl]);

  const filteredPhotos = activeCategory === 'Todos' 
    ? photos 
    : photos.filter(img => img.category === activeCategory);

  const filteredVideos = activeCategory === 'Todos' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  const featuredSlides = useMemo(() => {
    const topPhotos = photos.slice(0, 6);
    const topVideos = videos.slice(0, 2);
    return { topPhotos, topVideos };
  }, [photos, videos]);

  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const featuredTotal = featuredSlides.topPhotos.length;

  useEffect(() => {
    if (featuredTotal <= 1) return;
    const id = window.setInterval(() => {
      setActiveFeaturedIndex((prev) => (prev + 1) % featuredTotal);
    }, 4500);
    return () => window.clearInterval(id);
  }, [featuredTotal]);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const videosToPlay = filteredVideos;

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videosToPlay.length);
  }, [videosToPlay.length]);

  useEffect(() => {
    if (videosToPlay.length === 0) return;
    const current = videoRefs.current[activeVideoIndex];
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx !== activeVideoIndex) {
        v.pause();
        v.currentTime = 0;
      }
    });

    if (!current) return;
    current.muted = true;
    current.playsInline = true;
    current.currentTime = 0;
    const playPromise = current.play();
    if (playPromise) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [activeVideoIndex, videosToPlay]);

  const goNextVideo = () => {
    if (videosToPlay.length === 0) return;
    setActiveVideoIndex((prev) => (prev + 1) % videosToPlay.length);
  };

  const goPrevVideo = () => {
    if (videosToPlay.length === 0) return;
    setActiveVideoIndex((prev) => (prev - 1 + videosToPlay.length) % videosToPlay.length);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const current = videoRefs.current[activeVideoIndex];
    if (!current) return;
    if (current.paused) {
      current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-20 bg-metal-900" id="galeria">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showBackToHome && (
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors"
              aria-label="Volver al inicio"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-semibold">Volver al inicio</span>
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Portafolio de Obras</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded"></div>
          <p className="mt-4 text-xl text-gray-400">Evidencia de fabricación, montaje y acabados en estructuras metálicas</p>
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

        <div className="bg-metal-800/40 border border-metal-700 rounded-2xl overflow-hidden mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 sm:p-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Estructuras metálicas a medida</h3>
              <p className="mt-3 text-gray-300 leading-relaxed">
                Diseño, fabricación y montaje con enfoque en seguridad estructural, terminaciones y durabilidad. Trabajamos cubiertas, cerchas, portones, barandas y cerramientos.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/573142597959?text=Hola,%20me%20interesa%20una%20cotizaci%C3%B3n%20para%20un%20proyecto%20de%20estructura%20met%C3%A1lica."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-gold-500 text-metal-900 font-semibold hover:bg-gold-400 transition-colors"
                >
                  Cotizar por WhatsApp
                </a>
                <a
                  href="#contacto"
                  className="px-5 py-3 rounded-full border border-gold-500/40 text-gold-500 font-semibold hover:bg-gold-500 hover:text-metal-900 transition-colors"
                >
                  Ver contacto
                </a>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-metal-900/60 border border-metal-700 rounded-xl px-4 py-3">
                  <div className="text-white font-semibold">Medición en obra</div>
                  <div className="text-gray-400">Toma de medidas y propuesta</div>
                </div>
                <div className="bg-metal-900/60 border border-metal-700 rounded-xl px-4 py-3">
                  <div className="text-white font-semibold">Fabricación</div>
                  <div className="text-gray-400">Corte, armado y soldadura</div>
                </div>
                <div className="bg-metal-900/60 border border-metal-700 rounded-xl px-4 py-3">
                  <div className="text-white font-semibold">Montaje</div>
                  <div className="text-gray-400">Instalación y acabados</div>
                </div>
              </div>
            </div>

            <div className="relative bg-metal-900">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gold-500 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-44 h-44 rounded-full bg-fire-500 blur-3xl"></div>
              </div>

              <div className="relative aspect-video lg:aspect-auto lg:h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredSlides.topPhotos[activeFeaturedIndex]?.url ?? 'featured'}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={featuredSlides.topPhotos[activeFeaturedIndex]?.url}
                      alt={featuredSlides.topPhotos[activeFeaturedIndex]?.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute left-5 right-5 bottom-5">
                      <div className="text-white font-bold text-lg">{featuredSlides.topPhotos[activeFeaturedIndex]?.title}</div>
                      <div className="text-sm text-gold-400">{featuredSlides.topPhotos[activeFeaturedIndex]?.category}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute right-4 bottom-4 flex items-center gap-2">
                  {featuredSlides.topPhotos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFeaturedIndex(idx)}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        idx === activeFeaturedIndex ? 'bg-gold-500' : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Ir a la imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Fotografías</h3>
          <span className="text-sm text-gray-400">{filteredPhotos.length} elementos</span>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((img) => (
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
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-xl font-bold text-white border-b-2 border-gold-500 pb-1 mb-2">{img.title}</h3>
                  <span className="text-sm text-gold-400 font-medium">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center justify-between mt-14 mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Videos </h3>
          <span className="text-sm text-gray-400">{filteredVideos.length} elementos</span>
        </div>

        {videosToPlay.length === 0 ? (
          <div className="text-gray-400 text-sm bg-metal-800/40 border border-metal-700 rounded-lg p-6">
            No hay videos en esta categoría.
          </div>
        ) : (
          <div className="bg-metal-800 border border-metal-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video group bg-black cursor-pointer" onClick={togglePlay}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={videosToPlay[activeVideoIndex]?.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[activeVideoIndex] = el;
                    }}
                    className="w-full h-full object-cover"
                    src={videosToPlay[activeVideoIndex]?.url}
                    poster={videosToPlay[activeVideoIndex]?.posterUrl}
                    muted
                    playsInline
                    autoPlay
                    onEnded={goNextVideo}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    preload="metadata"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40"></div>
                </motion.div>
              </AnimatePresence>

              {/* Text Info Overlay */}
              <div className="pointer-events-none absolute left-4 right-4 bottom-4 lg:left-8 lg:bottom-8 z-10">
                <motion.div 
                  initial={{ y: 10, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  key={`text-${activeVideoIndex}`}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-3 py-1 bg-gold-500/20 border border-gold-500/50 text-gold-400 text-xs font-semibold rounded-full mb-2 sm:mb-3 uppercase tracking-wider">
                    {videosToPlay[activeVideoIndex]?.category}
                  </span>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg leading-tight">
                    {videosToPlay[activeVideoIndex]?.title}
                  </h4>
                </motion.div>
              </div>

              {/* Play/Pause Center Button */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <button 
                  className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-sm hover:bg-gold-500 hover:text-metal-900 hover:border-gold-500 transition-all transform hover:scale-105"
                  onClick={(e) => { e.stopPropagation(); togglePlay(e); }}
                >
                  {isPlaying ? <Pause className="w-6 h-6 sm:w-10 sm:h-10" fill="currentColor" /> : <Play className="w-6 h-6 sm:w-10 sm:h-10 ml-1" fill="currentColor" />}
                </button>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute inset-y-0 left-0 flex items-center px-2 sm:px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={(e) => { e.stopPropagation(); goPrevVideo(); }}
                  className="p-2 sm:p-3 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-sm hover:bg-gold-500 hover:text-metal-900 transition-all"
                  aria-label="Video anterior"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 sm:px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={(e) => { e.stopPropagation(); goNextVideo(); }}
                  className="p-2 sm:p-3 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-sm hover:bg-gold-500 hover:text-metal-900 transition-all"
                  aria-label="Video siguiente"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Thumbnails list at bottom */}
            <div className="bg-metal-900/80 border-t border-metal-700 p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar scroll-smooth">
                {videosToPlay.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveVideoIndex(idx)}
                    className={`relative shrink-0 w-28 sm:w-40 aspect-video rounded-lg overflow-hidden snap-center transition-all duration-300 border-2 ${
                      idx === activeVideoIndex ? 'border-gold-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={v.posterUrl || v.url} 
                      alt={v.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                    />
                    <div className={`absolute inset-0 bg-black/40 ${idx === activeVideoIndex ? 'hidden' : 'block'}`}></div>
                    {idx === activeVideoIndex && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" fill="currentColor" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
