import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleInicioClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // Si no estamos en home, navegar primero
      navigate('/');
      // Esperar un momento para que cargue y luego hacer scroll al tope
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // Si estamos en home, solo hacer scroll al tope
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const handlePropiedadesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // Si no estamos en home, navegar primero
      navigate('/');
      // Esperar un momento para que cargue y luego hacer scroll
      setTimeout(() => {
        document.getElementById('propiedades')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Si estamos en home, solo hacer scroll
      document.getElementById('propiedades')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-jo-border/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
        <Link to="/" onClick={handleInicioClick} className="flex items-center">
          <img 
            src="/src/public/logo-png.png" 
            alt="Juliana Ortiz Inmobiliaria" 
            className="h-12 sm:h-16 w-auto object-contain hover:opacity-80 transition-opacity"
          />
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-jo-textMuted">
          <Link to="/" onClick={handleInicioClick} className="hover:text-jo-dark transition-colors">Inicio</Link>
          <a href="#propiedades" onClick={handlePropiedadesClick} className="hover:text-jo-dark transition-colors">Propiedades</a>
          <a href="#contacto" onClick={handleContactoClick} className="hover:text-jo-dark transition-colors">Tasaciones</a>
        </nav>
        <a 
          href="#contacto" 
          onClick={handleContactoClick}
          className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-jo-dark rounded-full hover:bg-black transition-all"
        >
          Contactar
        </a>
      </div>
    </header>
  );
}
