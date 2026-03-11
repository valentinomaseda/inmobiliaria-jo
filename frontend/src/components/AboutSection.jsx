import React from 'react';

export default function AboutSection() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: 'Asesoramiento legal y técnico'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Tasaciones reales de mercado'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      text: 'Acompañamiento en todo el proceso'
    }
  ];

  return (
    <section className="bg-jo-surface py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda - Imagen */}
          <div 
            className="relative"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Placeholder de foto profesional */}
              <div className="absolute inset-0 bg-gradient-to-br from-jo-pink/20 to-orange-500/20 rounded-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Juliana Ortiz - Agente Inmobiliaria"
                className="relative w-full h-full object-cover rounded-3xl shadow-premium"
              />
              
              {/* Badge decorativo */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-premium p-6">
                <div className="text-center">
                  <p className="text-4xl font-display font-bold text-jo-pink">+10</p>
                  <p className="text-sm font-medium text-jo-textMuted mt-1">Años de<br/>experiencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Contenido */}
          <div 
            className="space-y-6"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            {/* Etiqueta */}
            <div className="inline-block">
              <span className="text-xs font-bold text-jo-pink uppercase tracking-wider bg-jo-pink/10 px-4 py-2 rounded-full">
                Trayectoria y Confianza
              </span>
            </div>

            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-display font-bold text-jo-dark leading-tight">
              Conocemos Arrecifes porque somos de acá.
            </h2>

            {/* Descripción */}
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Si estás buscando comprar, vender o alquilar, sabés que no es solo una transacción: 
                <strong className="text-jo-dark"> es tu proyecto de vida, tu patrimonio, tu inversión.</strong>
              </p>
              <p>
                Por eso, en <strong className="text-jo-dark font-display">Juliana Ortiz Negocios Inmobiliarios</strong> trabajamos 
                con transparencia, compromiso real y un servicio 100% personalizado. Cuidamos cada detalle porque entendemos 
                que detrás de cada propiedad hay historias, sueños y decisiones importantes.
              </p>
              <p className="text-base text-jo-textMuted italic">
                Te acompañamos de principio a fin, con ética profesional y conocimiento del mercado local.
              </p>
            </div>

            {/* Features con checkmarks */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-jo-pink/10 rounded-full flex items-center justify-center text-jo-pink">
                    {feature.icon}
                  </div>
                  <p className="font-medium text-jo-dark">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
