import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { propiedadService } from '../../services/propiedadService';
import { imagenService } from '../../services/imagenService';

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-jo-dark mb-2">
            Propiedades
          </h2>
          <p className="text-jo-textMuted">
            Gestiona todas las propiedades de la inmobiliaria
          </p>
        </div>
        <Link
          to="/admin/propiedades/nueva"
          className="flex items-center gap-2 bg-jo-pink hover:bg-jo-pinkHover text-white px-6 py-3 rounded-lg transition-colors font-medium"
        >
          <FiPlus size={20} />
          Nueva Propiedad
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-premium p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-jo-dark mb-2">
              Operación
            </label>
            <select
              value={filtros.operacion}
              onChange={(e) => setFiltros({ ...filtros, operacion: e.target.value })}
              className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
            >
              <option value="">Todas</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
              <option value="alquiler_temporal">Alquiler Temporal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-jo-dark mb-2">
              Tipo
            </label>
            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
            >
              <option value="">Todos</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="terreno">Terreno</option>
              <option value="local">Local</option>
              <option value="oficina">Oficina</option>
              <option value="galpon">Galpón</option>
              <option value="quinta">Quinta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-jo-dark mb-2">
              Estado
            </label>
            <select
              value={filtros.estado}
              onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
              className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
            >
              <option value="">Todos</option>
              <option value="disponible">Disponible</option>
              <option value="reservada">Reservada</option>
              <option value="vendida">Vendida</option>
              <option value="alquilada">Alquilada</option>
              <option value="inactiva">Inactiva</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFiltros({ operacion: '', tipo: '', estado: '' })}
              className="w-full px-4 py-2 border border-jo-border rounded-lg hover:bg-jo-surface transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de propiedades */}
      <div className="bg-white rounded-xl shadow-premium overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jo-pink"></div>
          </div>
        ) : propiedades.length === 0 ? (
          <div className="text-center py-12 text-jo-textMuted">
            <FiSearch size={48} className="mx-auto mb-4 opacity-30" />
            <p>No se encontraron propiedades</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-jo-surface">
                <tr>
                  <th className="text-left py-4 px-6 text-jo-dark font-semibold text-sm">
                    Imagen
                  </th>
                  <th className="text-left py-4 px-6 text-jo-dark font-semibold text-sm">
                    Nombre
                  </th>
                  <th className="text-left py-4 px-6 text-jo-dark font-semibold text-sm">
                    Tipo
                  </th>
                  <th className="text-left py-4 px-6 text-jo-dark font-semibold text-sm">
                    Operación
                  </th>
                  <th className="text-left py-4 px-6 text-jo-dark font-semibold text-sm">
                    Precio
                  </th>
                  <th className="text-left py-4 px-6 text-jo-dark font-semibold text-sm">
                    Estado
                  </th>
                  <th className="text-left py-4 px-6 text-jo-dark font-semibold text-sm">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {propiedades.map((propiedad) => {
                  const imagenPrincipal = propiedad.imagenes?.find(img => img.es_principal) || propiedad.imagenes?.[0];
                  
                  return (
                    <tr key={propiedad.idPropiedad} className="border-b border-jo-border hover:bg-jo-surface/50 transition-colors">
                      <td className="py-4 px-6">
                        {imagenPrincipal ? (
                          <img
                            src={imagenService.getImageUrl(imagenPrincipal.url)}
                            alt={propiedad.nombre}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-jo-surface rounded-lg flex items-center justify-center text-jo-textMuted">
                            <FiSearch size={24} />
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 font-medium text-jo-dark">
                        {propiedad.nombre}
                      </td>
                      <td className="py-4 px-6 text-jo-textMuted capitalize">
                        {propiedad.tipo}
                      </td>
                      <td className="py-4 px-6 text-jo-textMuted capitalize">
                        {propiedad.operacion}
                      </td>
                      <td className="py-4 px-6 font-medium text-jo-dark">
                        ${Number(propiedad.valor).toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          propiedad.estado === 'disponible' 
                            ? 'bg-green-100 text-green-700'
                            : propiedad.estado === 'reservada'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {propiedad.estado}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/propiedades/editar/${propiedad.idPropiedad}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(propiedad.idPropiedad)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <FiTrash2 size={18} />
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
