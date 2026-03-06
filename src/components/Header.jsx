import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-jo-border/50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/src/public/logo-png.png" 
            alt="Juliana Ortiz Inmobiliaria" 
            className="h-16 w-auto object-contain hover:opacity-80 transition-opacity"
          />
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-jo-textMuted">
          <Link to="/" className="hover:text-jo-dark transition-colors">Inicio</Link>
          <a href="#propiedades" className="hover:text-jo-dark transition-colors">Propiedades</a>
          <a href="#contacto" className="hover:text-jo-dark transition-colors">Tasaciones</a>
        </nav>
        <a 
          href="#contacto" 
          className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-jo-dark rounded-full hover:bg-black transition-all"
        >
          Contactar
        </a>
      </div>
    </header>
  );
}
