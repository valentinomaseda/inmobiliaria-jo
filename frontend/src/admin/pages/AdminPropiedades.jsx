import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { propiedadService } from '../../services/propiedadService';
import { imagenService } from '../../services/imagenService';
import CustomSelect from '../components/CustomSelect';

export default function AdminPropiedades() {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    operacion: '',
    tipo: '',
    estado: ''
  });

  useEffect(() => {
    loadPropiedades();
  }, [filtros]);

  const loadPropiedades = async () => {
    try {
      const response = await propiedadService.getAll(filtros);
      setPropiedades(response.data || []);
    } catch (error) {
      console.error('Error al cargar propiedades:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta propiedad?')) {
      return;
    }

    try {
      await propiedadService.delete(id);
      loadPropiedades();
    } catch (error) {
      alert('Error al eliminar la propiedad');
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-jo-darkText mb-2">
            Propiedades
          </h2>
          <p className="text-sm sm:text-base text-jo-darkTextMuted">
            Gestiona todas las propiedades de la inmobiliaria
          </p>
        </div>
        <Link
          to="/admin/propiedades/nueva"
          className="flex items-center justify-center gap-2 bg-jo-pink hover:bg-jo-pinkHover text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
        >
          <FiPlus size={20} />
          <span className="hidden xs:inline">Nueva Propiedad</span>
          <span className="xs:hidden">Nueva</span>
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-jo-darkSurface rounded-xl shadow-premium-dark p-4 sm:p-6 mb-4 sm:mb-6 border border-jo-darkBorder">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-jo-darkText mb-2">
              Operación
            </label>
            <CustomSelect
              name="operacion"
              value={filtros.operacion}
              onChange={(e) => setFiltros({ ...filtros, operacion: e.target.value })}
              placeholder="Todas"
              options={[
                { value: '', label: 'Todas' },
                { value: 'venta', label: 'Venta' },
                { value: 'alquiler', label: 'Alquiler' },
                { value: 'alquiler_temporal', label: 'Alquiler Temporal' }
              ]}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-jo-darkText mb-2">
              Tipo
            </label>
            <CustomSelect
              name="tipo"
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              placeholder="Todos"
              options={[
                { value: '', label: 'Todos' },
                { value: 'casa', label: 'Casa' },
                { value: 'departamento', label: 'Departamento' },
                { value: 'terreno', label: 'Terreno' },
                { value: 'local', label: 'Local' },
                { value: 'oficina', label: 'Oficina' },
                { value: 'galpon', label: 'Galpón' },
                { value: 'quinta', label: 'Quinta' }
              ]}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-jo-darkText mb-2">
              Estado
            </label>
            <CustomSelect
              name="estado"
              value={filtros.estado}
              onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
              placeholder="Todos"
              options={[
                { value: '', label: 'Todos' },
                { value: 'disponible', label: 'Disponible' },
                { value: 'reservada', label: 'Reservada' },
                { value: 'vendida', label: 'Vendida' },
                { value: 'alquilada', label: 'Alquilada' },
                { value: 'inactiva', label: 'Inactiva' }
              ]}
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFiltros({ operacion: '', tipo: '', estado: '' })}
              className="w-full px-3 sm:px-4 py-2 border border-jo-darkBorder text-jo-darkText rounded-lg hover:bg-jo-darkCard transition-colors text-sm"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de propiedades */}
      <div className="bg-jo-darkSurface rounded-xl shadow-premium-dark overflow-hidden border border-jo-darkBorder">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jo-pink"></div>
          </div>
        ) : propiedades.length === 0 ? (
          <div className="text-center py-12 text-jo-darkTextMuted">
            <FiSearch size={48} className="mx-auto mb-4 opacity-30" />
            <p>No se encontraron propiedades</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-jo-darkCard">
                <tr>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-jo-darkText font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Imagen
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-jo-darkText font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Nombre
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-jo-darkText font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Tipo
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-jo-darkText font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Operación
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-jo-darkText font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Precio
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-jo-darkText font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Estado
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-jo-darkText font-semibold text-xs sm:text-sm whitespace-nowrap">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {propiedades.map((propiedad) => {
                  const imagenPrincipal = propiedad.imagenes?.find(img => img.es_principal) || propiedad.imagenes?.[0];
                  
                  return (
                    <tr key={propiedad.idPropiedad} className="border-b border-jo-darkBorder hover:bg-jo-darkCard transition-colors">
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        {imagenPrincipal ? (
                          <img
                            src={imagenService.getImageUrl(imagenPrincipal.url)}
                            alt={propiedad.nombre}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-jo-darkCard rounded-lg flex items-center justify-center text-jo-darkTextMuted">
                            <FiSearch size={20} />
                          </div>
                        )}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-jo-darkText text-sm whitespace-nowrap">
                        {propiedad.nombre}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-jo-darkTextMuted capitalize text-xs sm:text-sm whitespace-nowrap">
                        {propiedad.tipo}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-jo-darkTextMuted capitalize text-xs sm:text-sm whitespace-nowrap">
                        {propiedad.operacion}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-jo-darkText text-sm whitespace-nowrap">
                        ${Number(propiedad.valor).toLocaleString()}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          propiedad.estado === 'disponible' 
                            ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                            : propiedad.estado === 'reservada'
                            ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50'
                            : 'bg-gray-700/30 text-gray-400 border border-gray-600/50'
                        }`}>
                          {propiedad.estado}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex gap-1 sm:gap-2">
                          <Link
                            to={`/admin/propiedades/editar/${propiedad.idPropiedad}`}
                            className="p-1.5 sm:p-2 text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <FiEdit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </Link>
                          <button
                            onClick={() => handleDelete(propiedad.idPropiedad)}
                            className="p-1.5 sm:p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <FiTrash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
