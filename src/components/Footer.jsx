import React from "react";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-jo-dark text-white py-20 mt-auto border-t-4 border-jo-pink"
    >
      <div 
        className="max-w-4xl mx-auto px-6 text-center space-y-8"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <img
          src="/src/public/logo-png.png"
          alt="Juliana Ortiz Inmobiliaria"
          className="h-16 w-auto object-contain hover:opacity-80 transition-opacity"
        />
        <h2 className="text-3xl font-display font-bold">
          ¿Listo para dar el siguiente paso?
        </h2>
        <p className="text-gray-400 font-light max-w-lg mx-auto">
          Comunicate para una tasación sin cargo o para encontrar la propiedad
          que se ajuste a tus necesidades.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
          <a
            href="mailto:info@julianaortiz.com"
            className="text-lg font-medium hover:text-jo-pink transition-colors"
          >
            info@julianaortiz.com
          </a>
          <span className="hidden sm:block text-gray-600">|</span>
          <a
            href="#"
            className="text-lg font-medium hover:text-jo-pink transition-colors"
          >
            Instagram @julianaortiz
          </a>
        </div>
      </div>
    </footer>
  );
}
