import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section className="py-20 bg-metal-800" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <p className="text-gray-400 mt-1">+57 300 123 4567</p>
                <p className="text-gray-500 text-sm">Lunes a Sábado, 8am - 6pm</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-metal-900 p-3 rounded-lg border border-gold-500/30">
                <Mail className="h-6 w-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Correo Electrónico</h3>
                <p className="text-gray-400 mt-1">contacto@hierroyfuego.com</p>
                <p className="text-gray-500 text-sm">Respuesta en menos de 24 horas</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-metal-900 p-3 rounded-lg border border-gold-500/30">
                <MapPin className="h-6 w-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Ubicación</h3>
                <p className="text-gray-400 mt-1">Av. Principal #123-45</p>
                <p className="text-gray-500 text-sm">Bogotá, Colombia</p>
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
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full bg-metal-800 border-metal-700 rounded-md text-white shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm py-2 px-3"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full bg-metal-800 border-metal-700 rounded-md text-white shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm py-2 px-3"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Mensaje</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full bg-metal-800 border-metal-700 rounded-md text-white shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm py-2 px-3"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-metal-900 bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
