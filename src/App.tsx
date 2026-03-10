import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import FloatingButtons from './components/FloatingButtons';
import Testimonials from './components/Testimonials';
import FaviconAnimator from './components/FaviconAnimator';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-metal-900 flex flex-col">
        <FaviconAnimator />
        <AnimatePresence mode="wait">
          {loading && <Preloader />}
        </AnimatePresence>
        
        {!loading && (
          <>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <Services />
                    <Gallery />
                    <Testimonials />
                    <Contact />
                  </>
                } />
                <Route path="/servicios" element={<Services />} />
                <Route path="/galeria" element={<Gallery />} />
                <Route path="/contacto" element={<Contact />} />
              </Routes>
            </main>
            <FloatingButtons />
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
