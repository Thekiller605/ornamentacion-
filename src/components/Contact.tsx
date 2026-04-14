import { useState } from 'react';
import { ArrowLeft, Clock, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Contact = () => {
  const { pathname } = useLocation();
  const showBackToHome = pathname !== '/';
  const locationLine1 = 'Manzana U Casa 7';
  const locationLine2 = 'Urbanización Nuevo Combeima 1 Etapa';
  const mapUrl = 'https://maps.app.goo.gl/VFR9fXMEzJxe6rEt7';
  const mapQuery = '4.4372168,-75.169342 (Taller de Ornamentación David Ortiz)';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const response = await fetch('https://formsubmit.co/ajax/ornamentaciondavidortiz@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "Nuevo mensaje de la página web",
          _template: "table"
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 6000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 6000);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 6000);
    }
  };

  return (
    <section className="py-20 bg-metal-800" id="contacto">
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

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Contáctanos</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded"></div>
          <p className="mt-4 text-xl text-gray-400">Estamos listos para hacer realidad tu proyecto</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-metal-900 p-3 rounded-lg border border-gold-500/30">
                <Phone className="h-6 w-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Teléfono</h3>
                <a
                  className="text-gray-400 mt-1 inline-block hover:text-white transition-colors"
                  href="https://wa.me/573142597959"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: 314 259 7959
                </a>
                <p className="text-gray-500 text-sm">Lunes a Sábado, 8am - 6pm</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-metal-900 p-3 rounded-lg border border-gold-500/30">
                <Mail className="h-6 w-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Correo Electrónico</h3>
                <a
                  className="text-gray-400 mt-1 inline-block hover:text-white transition-colors"
                  href="mailto:ornamentaciondavidortiz@gmail.com"
                >
                  ornamentaciondavidortiz@gmail.com
                </a>
                <p className="text-gray-500 text-sm">Respuesta en menos de 24 horas</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-metal-900 p-3 rounded-lg border border-gold-500/30">
                <MapPin className="h-6 w-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Ubicación</h3>
                <p className="text-gray-400 mt-1">{locationLine1}</p>
                <p className="text-gray-500 text-sm">{locationLine2}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-metal-900 p-3 rounded-lg border border-gold-500/30">
                <Clock className="h-6 w-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Horario de Atención</h3>
                <p className="text-gray-400 mt-1">Lun - Vie: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-400">Sáb: 8:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-metal-900 p-8 rounded-lg shadow-xl border border-metal-700">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-md bg-green-900/50 border border-green-500 flex items-start gap-3 text-green-400">
                <CheckCircle className="h-6 w-6 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">¡Tu información fue enviada con éxito! Nos pondremos en contacto contigo lo más pronto posible.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-md bg-red-900/50 border border-red-500 flex items-start gap-3 text-red-400">
                <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">Ocurrió un error al enviar tu mensaje. Por favor, revisa tu conexión o intenta contactarnos por WhatsApp.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full bg-metal-800 border-metal-700 rounded-md text-white shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm py-2 px-3"
                  placeholder="Tu Nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full bg-metal-800 border-metal-700 rounded-md text-white shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm py-2 px-3"
                  placeholder="tu correo electronico @ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="mt-1 block w-full bg-metal-800 border-metal-700 rounded-md text-white shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm py-2 px-3"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-metal-900 bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitStatus === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-metal-900" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Mensaje'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 bg-metal-900 rounded-lg border border-metal-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-metal-700 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Mapa y cómo llegar</h3>
              <p className="text-sm text-gray-400">Consulta la ruta en Google Maps</p>
            </div>
            <a
              className="text-sm font-semibold text-gold-500 hover:text-white transition-colors"
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir en Maps
            </a>
          </div>

          <div className="aspect-video">
            <iframe
              title="Ubicación en Google Maps"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=m&z=17&output=embed&iwloc=near`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
