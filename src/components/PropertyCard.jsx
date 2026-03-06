import React from 'react';

export default function PropertyCard({ propiedad }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 border border-jo-border/50 flex flex-col">
      {/* Imagen con Etiqueta */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-jo-dark shadow-sm">
          {propiedad.tipo}
        </div>
        <img 
          src={propiedad.imagen} 
          alt={propiedad.titulo} 
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Contenido de Tarjeta */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-semibold text-jo-textMuted uppercase tracking-wider block mb-1">
              {propiedad.ubicacion}
            </span>
            <h3 className="text-lg font-display font-bold text-jo-dark leading-tight line-clamp-2">
              {propiedad.titulo}
            </h3>
          </div>
        </div>
        
        {/* Íconos características */}
        <div className="flex items-center gap-4 text-sm text-jo-textMuted mb-6 pb-6 border-b border-jo-border/60">
          {propiedad.ambientes > 0 && (
            <div className="flex items-center gap-1.5" title="Ambientes">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">{propiedad.ambientes}</span>
            </div>
          )}
          {propiedad.banos > 0 && (
            <div className="flex items-center gap-1.5" title="Baños">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{propiedad.banos}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5" title="Metros cuadrados">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="font-medium">{propiedad.metros}</span>
          </div>
        </div>

        {/* Precio y CTA */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-display font-bold text-jo-pink">{propiedad.precio}</span>
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-jo-dark hover:bg-jo-pink hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
