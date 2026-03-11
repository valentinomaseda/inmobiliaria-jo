import React from 'react';

export default function ValuationBanner() {
  return (
    <section className="bg-jo-dark py-20 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-jo-pink rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div 
          className="space-y-8"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          {/* Ícono decorativo */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-jo-pink/20 rounded-full">
            <svg className="w-8 h-8 text-jo-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Título */}
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
            ¿Estás pensando en vender<br className="hidden sm:block"/> o alquilar tu propiedad?
          </h2>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Solicitá una <strong className="text-white">tasación profesional sin cargo</strong>. 
            Te decimos el valor real de mercado de tu inmueble para que tomes la mejor decisión 
            con toda la información que necesitás.
          </p>

          {/* Lista de beneficios */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300 pt-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-jo-pink" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sin cargo</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-jo-pink" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-jo-pink" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Respuesta rápida</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="https://wa.me/549XXXXXXXXX?text=Hola! Quiero solicitar una tasación de mi propiedad"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-jo-pink hover:bg-jo-pinkHover text-white text-lg font-semibold rounded-full transition-all shadow-2xl shadow-jo-pink/30 hover:shadow-jo-pink/50 hover:scale-105 group"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span>Solicitar Tasación por WhatsApp</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Nota adicional */}
          <p className="text-sm text-gray-400 italic">
            Respondemos en minutos. También podés escribirnos por mail o llamarnos directamente.
          </p>
        </div>
      </div>
    </section>
  );
}
