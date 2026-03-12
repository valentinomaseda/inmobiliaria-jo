import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { propiedadService } from '../services/propiedadService';
import { imagenService } from '../services/imagenService';

export default function Catalogo() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const PROPIEDADES_POR_PAGINA = 10;

  // Obtener filtros de la URL
  const filtrosURL = {
    operacion: searchParams.get('operacion') || '',
    ubicacion: searchParams.get('ubicacion') || '',
    tipo: searchParams.get('tipo') || ''
  };

  // Función para eliminar un filtro específico
  const eliminarFiltro = (filtroKey) => {
    const params = new URLSearchParams(searchParams);
    params.delete(filtroKey);
    navigate(`/catalogo${params.toString() ? '?' + params.toString() : ''}`);
  };

  useEffect(() => {
    loadPropiedades();
    setPaginaActual(1); // Resetear a página 1 cuando cambien los filtros de URL
  }, [searchParams]);

  const loadPropiedades = async () => {
    try {
      // Construir parámetros para la API
      const params = { estado: 'disponible' };
      if (filtrosURL.operacion) params.operacion = filtrosURL.operacion;
      if (filtrosURL.tipo) params.tipo = filtrosURL.tipo;
      
      const response = await propiedadService.getAll(params);
      // Transformar datos del API al formato esperado
      const propiedadesTransformadas = (response.data || []).map(prop => {
        const imagenPrincipal = prop.imagenes?.find(img => img.es_principal) || prop.imagenes?.[0];
        
        // Formatear precio con moneda
        const simboloMoneda = prop.moneda === 'USD' ? 'USD ' : prop.moneda === 'ARS' ? 'ARS ' : prop.moneda === 'EUR' ? 'EUR ' : '';
        const precioFormateado = `${simboloMoneda}$${Number(prop.valor).toLocaleString('es-AR')}`;
        
        return {
          id: prop.idPropiedad,
          titulo: prop.nombre,
          ubicacion: `${prop.ciudad || ''}, ${prop.provincia || ''}`.trim().replace(/^,\s*/, ''),
          precio: precioFormateado,
          tipo: prop.operacion === 'venta' ? 'Venta' : prop.operacion === 'alquiler' ? 'Alquiler' : 'Alquiler temporal',
          imagen: imagenPrincipal ? imagenService.getImageUrl(imagenPrincipal.url) : '/placeholder.jpg',
          ambientes: prop.cantAmbientes || 0,
          banos: prop.banos || 0,
          metros: `${prop.metCuad || 0} m²`,
          destacada: !!prop.destacada,
          // Datos adicionales para filtros locales
          ciudad: prop.ciudad,
          tipoPropiedad: prop.tipo
        };
      });
      setPropiedades(propiedadesTransformadas);
    } catch (error) {
      console.error('Error al cargar propiedades:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar propiedades localmente (para búsqueda por texto y filtro adicional)
  const propiedadesFiltradas = propiedades.filter(prop => {
    const cumpleTipo = filtroTipo === 'Todos' || prop.tipo === filtroTipo;
    const cumpleBusqueda = busqueda === '' || 
      prop.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      prop.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
      (prop.ciudad && prop.ciudad.toLowerCase().includes(busqueda.toLowerCase()));
    
    // Filtrar por ubicación si viene de la URL
    const cumpleUbicacion = !filtrosURL.ubicacion || 
      (prop.ciudad && prop.ciudad.toLowerCase().includes(filtrosURL.ubicacion.toLowerCase()));
    
    return cumpleTipo && cumpleBusqueda && cumpleUbicacion;
  });

  // Calcular paginación
  const totalPaginas = Math.ceil(propiedadesFiltradas.length / PROPIEDADES_POR_PAGINA);
  const indiceInicio = (paginaActual - 1) * PROPIEDADES_POR_PAGINA;
  const indiceFin = indiceInicio + PROPIEDADES_POR_PAGINA;
  const propiedadesPaginadas = propiedadesFiltradas.slice(indiceInicio, indiceFin);

  // Resetear a página 1 cuando cambien los filtros locales
  useEffect(() => {
    setPaginaActual(1);
  }, [filtroTipo, busqueda]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-28 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jo-pink"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header de Catálogo */}
        <div className="mb-12" data-aos="fade-down">
          <Link 
            to="/" 
            className="inline-flex items-center text-jo-pink hover:text-jo-pinkHover transition-colors mb-6 group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-jo-dark mb-4">
            Catálogo Completo
          </h1>
          <p className="text-lg text-jo-textMuted">
            Explora todas nuestras propiedades disponibles
          </p>
          
          {/* Mostrar filtros activos */}
          {(filtrosURL.operacion || filtrosURL.ubicacion || filtrosURL.tipo) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {filtrosURL.operacion && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-jo-pink/10 text-jo-pink rounded-full text-sm font-medium">
                  {filtrosURL.operacion === 'venta' ? 'Venta' : 'Alquiler'}
                  <button onClick={() => eliminarFiltro('operacion')} className="hover:text-jo-pinkHover">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {filtrosURL.ubicacion && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-jo-pink/10 text-jo-pink rounded-full text-sm font-medium capitalize">
                  {filtrosURL.ubicacion}
                  <button onClick={() => eliminarFiltro('ubicacion')} className="hover:text-jo-pinkHover">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {filtrosURL.tipo && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-jo-pink/10 text-jo-pink rounded-full text-sm font-medium capitalize">
                  {filtrosURL.tipo}
                  <button onClick={() => eliminarFiltro('tipo')} className="hover:text-jo-pinkHover">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Filtros y Búsqueda */}
        <div 
          className="bg-gray-50 rounded-2xl p-6 mb-10 space-y-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Buscador */}
            <div className="relative">
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por ubicación o tipo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-jo-pink focus:ring-2 focus:ring-jo-pink/20 outline-none transition-all"
              />
            </div>

            {/* Filtro por tipo */}
            <div className="flex gap-2 flex-wrap">
              {['Todos', 'Venta', 'Alquiler'].map(tipo => (
                <button
                  key={tipo}
                  onClick={() => setFiltroTipo(tipo)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    filtroTipo === tipo 
                      ? 'bg-jo-pink text-white shadow-lg' 
                      : 'bg-white text-jo-dark hover:bg-gray-100'
                  }`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="text-sm text-jo-textMuted">
            {propiedadesFiltradas.length} {propiedadesFiltradas.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
            {totalPaginas > 1 && (
              <span className="ml-2">
                • Mostrando {indiceInicio + 1}-{Math.min(indiceFin, propiedadesFiltradas.length)} de {propiedadesFiltradas.length}
              </span>
            )}
          </div>
        </div>

        {/* Grid de Propiedades */}
        {propiedadesPaginadas.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {propiedadesPaginadas.map((propiedad) => (
                <PropertyCard key={propiedad.id} propiedad={propiedad} />
              ))}
            </div>

            {/* Paginación */}
            {totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {/* Botón anterior */}
                <button
                  onClick={() => {
                    setPaginaActual(prev => Math.max(1, prev - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={paginaActual === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    paginaActual === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-jo-dark hover:bg-jo-pink hover:text-white border border-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Números de página */}
                <div className="flex gap-2">
                  {[...Array(totalPaginas)].map((_, index) => {
                    const numeroPagina = index + 1;
                    
                    // Mostrar solo páginas cercanas (max 7 botones)
                    if (
                      numeroPagina === 1 ||
                      numeroPagina === totalPaginas ||
                      (numeroPagina >= paginaActual - 2 && numeroPagina <= paginaActual + 2)
                    ) {
                      return (
                        <button
                          key={numeroPagina}
                          onClick={() => {
                            setPaginaActual(numeroPagina);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-10 h-10 rounded-lg font-medium transition-all ${
                            paginaActual === numeroPagina
                              ? 'bg-jo-pink text-white shadow-lg'
                              : 'bg-white text-jo-dark hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {numeroPagina}
                        </button>
                      );
                    } else if (
                      numeroPagina === paginaActual - 3 ||
                      numeroPagina === paginaActual + 3
                    ) {
                      return <span key={numeroPagina} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                {/* Botón siguiente */}
                <button
                  onClick={() => {
                    setPaginaActual(prev => Math.min(totalPaginas, prev + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={paginaActual === totalPaginas}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    paginaActual === totalPaginas
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-jo-dark hover:bg-jo-pink hover:text-white border border-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No se encontraron propiedades</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
