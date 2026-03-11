import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { propiedadService } from '../services/propiedadService';
import { imagenService } from '../services/imagenService';

export default function Catalogo() {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    loadPropiedades();
  }, []);

  const loadPropiedades = async () => {
    try {
      const response = await propiedadService.getAll({ estado: 'disponible' });
      // Transformar datos del API al formato esperado
      const propiedadesTransformadas = (response.data || []).map(prop => {
        const imagenPrincipal = prop.imagenes?.find(img => img.es_principal) || prop.imagenes?.[0];
        return {
          id: prop.idPropiedad,
          titulo: prop.nombre,
          ubicacion: `${prop.ciudad || ''}, ${prop.provincia || ''}`.trim().replace(/^,\s*/, ''),
          precio: `$${Number(prop.valor).toLocaleString()}`,
          tipo: prop.operacion === 'venta' ? 'Venta' : prop.operacion === 'alquiler' ? 'Alquiler' : 'Alquiler temporal',
          imagen: imagenPrincipal ? imagenService.getImageUrl(imagenPrincipal.url) : '/placeholder.jpg',
          ambientes: prop.ambientes || 0,
          banos: prop.banos || 0,
          metros: `${prop.superficie_total || 0} m²`,
          destacada: false
        };
      });
      setPropiedades(propiedadesTransformadas);
    } catch (error) {
      console.error('Error al cargar propiedades:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar propiedades
  const propiedadesFiltradas = propiedades.filter(prop => {
    const cumpleTipo = filtroTipo === 'Todos' || prop.tipo === filtroTipo;
    const cumpleBusqueda = busqueda === '' || 
      prop.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      prop.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleTipo && cumpleBusqueda;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-28 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jo-pink"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
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
          </div>
        </div>

        {/* Grid de Propiedades */}
        {propiedadesFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propiedadesFiltradas.map((propiedad) => (
              <PropertyCard key={propiedad.id} propiedad={propiedad} />
            ))}
          </div>
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
