import { motion } from 'framer-motion';
import Logo from './Logo';

const Preloader = () => {
  const rand = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-metal-900 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Spark Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => {
          const x = `${rand(i * 12.9898 + 78.233) * 100}%`;
          const y = `${rand(i * 93.9898 + 67.345) * 100}%`;
          const width = rand(i * 45.332 + 12.345) * 4;
          const height = rand(i * 17.123 + 98.765) * 4;
          const duration = 1 + rand(i * 0.123 + 4.567) * 2;
          const repeatDelay = rand(i * 0.456 + 8.901) * 2;

          return (
            <motion.div
              key={i}
              className="absolute bg-fire-500 rounded-full"
              initial={{ 
                x: "50%", 
                y: "50%", 
                width: 0, 
                height: 0, 
                opacity: 1 
              }}
              animate={{ 
                x, 
                y, 
                width, 
                height, 
                opacity: 0 
              }}
              transition={{ 
                duration, 
                repeat: Infinity, 
                repeatDelay,
                ease: "easeOut" 
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Glowing Effect behind Logo */}
          <motion.div
            className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          <Logo className="h-32 w-auto md:h-48" variant="gold" />
        </motion.div>

        {/* Loading Bar - Molten Metal Style */}
        <div className="mt-12 w-64 h-1 bg-metal-800 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-fire-600 via-gold-500 to-fire-600"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          className="mt-4 text-gold-500 font-medium tracking-widest text-sm uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Forjando Arte...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;
