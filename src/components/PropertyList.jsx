import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';

export default function PropertyList({ propiedades, destacadas = false }) {
  const propiedadesAMostrar = destacadas ? propiedades.slice(0, 3) : propiedades;

  return (
    <main id="propiedades" className="flex-grow max-w-7xl mx-auto px-6 py-20 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-jo-dark">
            {destacadas ? 'Últimos Ingresos' : 'Catálogo Completo'}
          </h2>
          <p className="text-jo-textMuted mt-2">
            {destacadas 
              ? 'Propiedades destacadas en nuestra cartera.' 
              : `${propiedades.length} propiedades disponibles`}
          </p>
        </div>
        {destacadas && (
          <Link 
            to="/catalogo" 
            className="text-sm font-semibold text-jo-pink hover:text-jo-pinkHover flex items-center gap-1 group transition-colors"
          >
            Ver catálogo completo 
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {propiedadesAMostrar.map((propiedad) => (
          <PropertyCard key={propiedad.id} propiedad={propiedad} />
        ))}
      </div>
    </main>
  );
}
