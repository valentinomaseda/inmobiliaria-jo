import React from "react";
import { HiMail } from "react-icons/hi";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-jo-dark text-white py-20 mt-auto border-t-4 border-jo-pink"
    >
      <div 
        className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-10"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {/* Logo centrado */}
        <div className="flex justify-center mb-8">
          <img
            src="/src/public/logo-png.png"
            alt="Juliana Ortiz Inmobiliaria"
            className="h-20 w-auto object-contain hover:opacity-80 transition-opacity"
          />
        </div>

        {/* Título y descripción */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto text-lg leading-relaxed">
            Comunicate para una tasación sin cargo o para encontrar la propiedad
            que se ajuste a tus necesidades.
          </p>
        </div>

        {/* Información de contacto con íconos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Email */}
          <a
            href="mailto:info@julianaortiz.com"
            className="flex flex-col items-center gap-3 p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group"
          >
            <div className="w-14 h-14 bg-jo-pink/20 rounded-full flex items-center justify-center group-hover:bg-jo-pink/30 transition-colors">
              <HiMail className="w-7 h-7 text-jo-pink" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Email</p>
              <p className="text-white font-medium group-hover:text-jo-pink transition-colors">
                info@julianaortiz.com
              </p>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/julianaortiz"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group"
          >
            <div className="w-14 h-14 bg-jo-pink/20 rounded-full flex items-center justify-center group-hover:bg-jo-pink/30 transition-colors">
              <FaInstagram className="w-6 h-6 text-jo-pink" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Instagram</p>
              <p className="text-white font-medium group-hover:text-jo-pink transition-colors">
                @julianaortiz
              </p>
            </div>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/julianaortiz"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group"
          >
            <div className="w-14 h-14 bg-jo-pink/20 rounded-full flex items-center justify-center group-hover:bg-jo-pink/30 transition-colors">
              <FaFacebookF className="w-6 h-6 text-jo-pink" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Facebook</p>
              <p className="text-white font-medium group-hover:text-jo-pink transition-colors">
                Juliana Ortiz
              </p>
            </div>
          </a>
        </div>

        {/* Copyright y línea divisoria */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Juliana Ortiz Negocios Inmobiliarios. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}