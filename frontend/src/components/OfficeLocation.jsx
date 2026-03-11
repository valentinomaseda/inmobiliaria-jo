import React from 'react';

export default function OfficeLocation() {
  const officeLocation = {
    lat: -34.062141,
    lng: -60.102214,
    address: 'Avenida Merlassino y San Martín, Arrecifes',
    name: 'Juliana Ortiz Propiedades'
  };

  // URL para Google Maps
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${officeLocation.lat},${officeLocation.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${officeLocation.lat},${officeLocation.lng}`;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Título */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-jo-dark mb-4">
            Visitá Nuestra Oficina
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Te esperamos en nuestra oficina para asesorarte personalmente en la búsqueda de tu propiedad ideal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Información de contacto */}
          <div className="space-y-6" data-aos="fade-right" data-aos-delay="100">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-display font-bold text-jo-dark mb-6">
                {officeLocation.name}
              </h3>

              {/* Dirección */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-jo-pink/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jo-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-jo-dark mb-1">Dirección</h4>
                  <p className="text-gray-600">{officeLocation.address}</p>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-jo-pink/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jo-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-jo-dark mb-1">Horarios</h4>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="text-gray-600">Sábados: 9:00 - 13:00</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-jo-pink/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jo-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-jo-dark mb-1">Teléfono</h4>
                  <p className="text-gray-600">Contactanos para más información</p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-jo-pink hover:bg-jo-pinkHover text-white font-semibold rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Cómo Llegar
                </a>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white border-2 border-jo-pink text-jo-pink hover:bg-jo-pink hover:text-white font-semibold rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-lg" data-aos="fade-left" data-aos-delay="200">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${officeLocation.lat},${officeLocation.lng}&zoom=16`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la oficina"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
