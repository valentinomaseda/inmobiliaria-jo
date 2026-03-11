import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { propiedadService } from '../services/propiedadService';
import { imagenService } from '../services/imagenService';

export default function PropiedadDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenActual, setImagenActual] = useState(0);
  const [lightboxAbierto, setLightboxAbierto] = useState(false);
  const [propiedadesRelacionadas, setPropiedadesRelacionadas] = useState([]);

  useEffect(() => {
    const loadPropiedad = async () => {
      try {
        const response = await propiedadService.getById(id);
        const prop = response.data;
        
        // Transformar al formato esperado
        const propTransformada = {
          id: prop.idPropiedad,
          titulo: prop.nombre,
          ubicacion: `${prop.ciudad || ''}, ${prop.provincia || ''}`.trim().replace(/^,\s*/, ''),
          direccion: prop.direccion,
          precio: `$${Number(prop.valor).toLocaleString()}`,
          tipo: prop.operacion === 'venta' ? 'Venta' : prop.operacion === 'alquiler' ? 'Alquiler' : 'Alquiler temporal',
          operacion: prop.operacion,
          ambientes: prop.ambientes || 0,
          banos: prop.banos || 0,
          metros: `${prop.superficie_total || 0} m²`,
          descripcion: prop.descripcion,
          imagenes: (prop.imagenes || []).map(img => imagenService.getImageUrl(img.url)),
          caracteristicas: (prop.caracteristicas || []).map(c => c.nombre)
        };
        
        setPropiedad(propTransformada);

        // Cargar propiedades relacionadas (misma operación)
        const relacionadasResponse = await propiedadService.getAll({ 
          operacion: prop.operacion,
          estado: 'disponible'
        });
        
        const relacionadas = (relacionadasResponse.data || [])
          .filter(p => p.idPropiedad !== prop.idPropiedad)
          .slice(0, 3)
          .map(p => {
            const imagenPrincipal = p.imagenes?.find(img => img.es_principal) || p.imagenes?.[0];
            return {
              id: p.idPropiedad,
              titulo: p.nombre,
              ubicacion: `${p.ciudad || ''}, ${p.provincia || ''}`.trim().replace(/^,\s*/, ''),
              precio: `$${Number(p.valor).toLocaleString()}`,
              tipo: p.operacion === 'venta' ? 'Venta' : p.operacion === 'alquiler' ? 'Alquiler' : 'Alquiler temporal',
              imagen: imagenPrincipal ? imagenService.getImageUrl(imagenPrincipal.url) : '/placeholder.jpg'
            };
          });
        
        setPropiedadesRelacionadas(relacionadas);
      } catch (error) {
        console.error('Error al cargar propiedad:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPropiedad();
  }, [id]);

  const imagenes = propiedad?.imagenes || [];

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const abrirLightbox = (index) => {
    setImagenActual(index);
    setLightboxAbierto(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-28 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jo-pink"></div>
      </div>
    );
  }

  if (!propiedad) {
    return (
      <div className="min-h-screen bg-white pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h2>
          <Link to="/" className="text-jo-pink hover:text-jo-pinkHover">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Botón Volver */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-jo-pink hover:text-jo-pinkHover transition-colors mb-6 group"
          data-aos="fade-down"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de Imágenes */}
          <div className="space-y-4" data-aos="fade-right" data-aos-duration="600">
            {/* Imagen Principal */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl group cursor-pointer">
              <div className="absolute top-6 left-6 z-10 bg-white px-6 py-2 rounded-full text-sm font-bold tracking-wide text-jo-dark shadow-lg">
                {propiedad.tipo}
              </div>
              
              {/* Botón Ver en Grande */}
              <button 
                onClick={() => abrirLightbox(imagenActual)}
                className="absolute top-6 right-6 z-10 bg-white/90 hover:bg-white px-4 py-2 rounded-full text-sm font-semibold text-jo-dark shadow-lg transition-all"
              >
                <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                Ver en grande
              </button>

              <img 
                src={imagenes[imagenActual]} 
                alt={`${propiedad.titulo} - ${imagenActual + 1}`} 
                className="object-cover w-full h-full"
                onClick={() => abrirLightbox(imagenActual)}
              />

              {/* Controles de navegación si hay múltiples imágenes */}
              {imagenes.length > 1 && (
                <>
                  <button 
                    onClick={imagenAnterior}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-6 h-6 text-jo-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={siguienteImagen}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-6 h-6 text-jo-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Contador de imágenes */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {imagenActual + 1} / {imagenes.length}
                  </div>
                </>
              )}
            </div>

            {/* Miniaturas */}
            {imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {imagenes.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenActual(index)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg transition-all ${
                      imagenActual === index 
                        ? 'ring-4 ring-jo-pink shadow-lg' 
                        : 'ring-2 ring-transparent hover:ring-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Miniatura ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-500 italic">
              Las imágenes son ilustrativas. Consultá por fotos reales de la propiedad.
            </p>
          </div>

          {/* Información */}
          <div className="space-y-8" data-aos="fade-left" data-aos-duration="600" data-aos-delay="100">
            {/* Encabezado */}
            <div>
              <p className="text-sm font-semibold text-jo-pink uppercase tracking-wider mb-2">
                {propiedad.ubicacion}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-jo-dark mb-4 leading-tight">
                {propiedad.titulo}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {propiedad.descripcion}
              </p>
            </div>

            {/* Precio */}
            <div 
              className="bg-gradient-to-br from-jo-pink to-orange-500 text-white p-8 rounded-2xl shadow-xl"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-90">
                Precio
              </p>
              <p className="text-4xl md:text-5xl font-bold">
                {propiedad.precio}
              </p>
            </div>

            {/* Características Principales */}
            <div 
              className="grid grid-cols-3 gap-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {propiedad.ambientes > 0 && (
                <div className="text-center p-6 bg-gray-50 rounded-2xl">
                  <svg className="w-10 h-10 mx-auto mb-3 text-jo-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <p className="text-3xl font-bold text-jo-dark">{propiedad.ambientes}</p>
                  <p className="text-sm text-gray-600 mt-1">Ambientes</p>
                </div>
              )}
              
              {propiedad.banos > 0 && (
                <div className="text-center p-6 bg-gray-50 rounded-2xl">
                  <svg className="w-10 h-10 mx-auto mb-3 text-jo-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-3xl font-bold text-jo-dark">{propiedad.banos}</p>
                  <p className="text-sm text-gray-600 mt-1">Baños</p>
                </div>
              )}
              
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <svg className="w-10 h-10 mx-auto mb-3 text-jo-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <p className="text-3xl font-bold text-jo-dark">{propiedad.metros}</p>
                <p className="text-sm text-gray-600 mt-1">Totales</p>
              </div>
            </div>

            {/* Características Adicionales */}
            {propiedad.caracteristicas && propiedad.caracteristicas.length > 0 && (
              <div data-aos="fade-up" data-aos-delay="400">
                <h2 className="text-2xl font-bold text-jo-dark mb-4">Características</h2>
                <div className="grid grid-cols-2 gap-3">
                  {propiedad.caracteristicas.map((caracteristica, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <svg className="w-5 h-5 text-jo-pink flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 font-medium">{caracteristica}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de Contacto */}
            <div 
              className="space-y-4 pt-6 border-t border-gray-200"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <a 
                href="https://wa.me/549XXXXXXXXX?text=Hola, estoy interesado en la propiedad: " 
                target="_blank" 
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Consultar por WhatsApp
              </a>
              
              <a 
                href="#contacto"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-jo-pink hover:bg-jo-pinkHover text-white rounded-full font-semibold transition-colors shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Solicitar más información
              </a>
            </div>
          </div>
        </div>

        {/* Propiedades Relacionadas */}
        {propiedadesRelacionadas.length > 0 && (
          <div className="mt-20" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-jo-dark mb-8">Propiedades similares</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {propiedadesRelacionadas.map(p => (
                <Link 
                  key={p.id} 
                  to={`/propiedad/${p.id}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={p.imagen} 
                      alt={p.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{p.ubicacion}</p>
                    <h3 className="font-bold text-jo-dark mb-2 line-clamp-2">{p.titulo}</h3>
                    <p className="text-lg font-bold text-jo-pink">{p.precio}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxAbierto && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxAbierto(false)}
        >
          <button 
            onClick={() => setLightboxAbierto(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-7xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={imagenes[imagenActual]} 
              alt={`${propiedad.titulo} - ${imagenActual + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Controles en Lightbox */}
            {imagenes.length > 1 && (
              <>
                <button 
                  onClick={imagenAnterior}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all"
                >
                  <svg className="w-8 h-8 text-jo-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={siguienteImagen}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all"
                >
                  <svg className="w-8 h-8 text-jo-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Contador en Lightbox */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 text-jo-dark px-6 py-3 rounded-full text-lg font-semibold shadow-xl">
                  {imagenActual + 1} / {imagenes.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
