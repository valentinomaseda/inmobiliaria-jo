import React from 'react';

const propiedades = [
  {
    id: 1,
    titulo: "Casa minimalista con piscina",
    ubicacion: "Barrio Santa Clara, Arrecifes",
    tipo: "Venta",
    precio: "U$D 120.000",
    ambientes: 4,
    banos: 2,
    metros: "180 m²",
    imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    titulo: "Departamento céntrico a estrenar",
    ubicacion: "Zona Centro, Arrecifes",
    tipo: "Alquiler",
    precio: "$ 180.000",
    ambientes: 2,
    banos: 1,
    metros: "65 m²",
    imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    titulo: "Quinta moderna con parque",
    ubicacion: "La Violeta",
    tipo: "Venta",
    precio: "U$D 85.000",
    ambientes: 3,
    banos: 2,
    metros: "450 m²",
    imagen: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-jo-surface selection:bg-jo-pink selection:text-white">
      {/* HEADER NAVBAR */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-jo-border/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img 
              src="/src/public/logo-png.png " 
              alt="Juliana Ortiz Inmobiliaria" 
              className="h-16 w-auto object-contain hover:opacity-80 transition-opacity"
            />
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-jo-textMuted">
            <a href="#" className="hover:text-jo-dark transition-colors">Inicio</a>
            <a href="#propiedades" className="hover:text-jo-dark transition-colors">Propiedades</a>
            <a href="#contacto" className="hover:text-jo-dark transition-colors">Tasaciones</a>
          </nav>
          <a href="#contacto" className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-jo-dark rounded-full hover:bg-black transition-all">
            Contactar
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay gradient mejorado para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/92 via-white/88 to-gray-50/85"></div>
        <div className="absolute inset-0 bg-white/40"></div>

        {/* Contenido */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 py-32">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
            <span className="text-gray-900 drop-shadow-sm">Tu próxima propiedad,</span>
            <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 drop-shadow-lg">
               respaldada por expertos.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
            Ventas, alquileres y tasaciones en Arrecifes y zona. Un servicio directo, profesional y enfocado en tus objetivos reales.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#propiedades" className="w-full sm:w-auto px-8 py-4 bg-jo-pink text-white rounded-full font-medium hover:bg-jo-pinkHover transition-colors shadow-lg shadow-pink-500/25">
              Ver Propiedades
            </a>
            <a href="https://wa.me/549XXXXXXXXX" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-jo-dark border border-jo-border rounded-full font-medium hover:border-jo-dark hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Flecha indicadora para scroll */}
        <a 
          href="#propiedades" 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-jo-pink hover:text-jo-pinkHover transition-colors z-10"
          aria-label="Scroll a propiedades"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      {/* PROPERTIES SECTION */}
      <main id="propiedades" className="flex-grow max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold text-jo-dark">Últimos Ingresos</h2>
            <p className="text-jo-textMuted mt-2">Propiedades destacadas en nuestra cartera.</p>
          </div>
          <button className="text-sm font-semibold text-jo-pink hover:text-jo-pinkHover flex items-center gap-1 group transition-colors">
            Ver catálogo completo 
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedades.map((prop) => (
            <article key={prop.id} className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 border border-jo-border/50 flex flex-col">
              
              {/* Imagen con Etiqueta */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-jo-dark shadow-sm">
                  {prop.tipo}
                </div>
                <img 
                  src={prop.imagen} 
                  alt={prop.titulo} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Contenido de Tarjeta */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-semibold text-jo-textMuted uppercase tracking-wider block mb-1">
                      {prop.ubicacion}
                    </span>
                    <h3 className="text-lg font-display font-bold text-jo-dark leading-tight line-clamp-2">
                      {prop.titulo}
                    </h3>
                  </div>
                </div>
                
                {/* Íconos simplificados */}
                <div className="flex items-center gap-4 text-sm text-jo-textMuted mb-6 pb-6 border-b border-jo-border/60">
                  <div className="flex items-center gap-1.5" title="Ambientes">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    <span className="font-medium">{prop.ambientes}</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Baños">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span className="font-medium">{prop.banos}</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Metros cuadrados">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                    <span className="font-medium">{prop.metros}</span>
                  </div>
                </div>

                {/* Precio y CTA */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-display font-bold text-jo-pink">{prop.precio}</span>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-jo-dark hover:bg-jo-pink hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer id="contacto" className="bg-jo-dark text-white py-20 mt-auto border-t-4 border-jo-pink">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center text-jo-pink font-display font-bold text-2xl">
            JO
          </div>
          <h2 className="text-3xl font-display font-bold">¿Listo para dar el siguiente paso?</h2>
          <p className="text-gray-400 font-light max-w-lg mx-auto">
            Comunicate para una tasación sin cargo o para encontrar la propiedad que se ajuste a tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
            <a href="mailto:info@julianaortiz.com" className="text-lg font-medium hover:text-jo-pink transition-colors">info@julianaortiz.com</a>
            <span className="hidden sm:block text-gray-600">|</span>
            <a href="#" className="text-lg font-medium hover:text-jo-pink transition-colors">Instagram @julianaortiz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}