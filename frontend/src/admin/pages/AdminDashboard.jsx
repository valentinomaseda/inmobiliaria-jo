import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiDollarSign, FiEye } from 'react-icons/fi';
import { propiedadService } from '../../services/propiedadService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    venta: 0,
    alquiler: 0,
    disponibles: 0
  });
  const [propiedadesRecientes, setPropiedadesRecientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Cargar todas las propiedades (sin filtro de estado)
      const response = await propiedadService.getAll({});
      const propiedades = response.data || [];

      // Calcular estadísticas
      setStats({
        total: propiedades.length,
        venta: propiedades.filter(p => p.operacion === 'venta').length,
        alquiler: propiedades.filter(p => p.operacion === 'alquiler').length,
        disponibles: propiedades.filter(p => p.estado === 'disponible').length
      });

      // Tomar las 5 más recientes
      setPropiedadesRecientes(propiedades.slice(0, 5));
    } catch (error) {
      console.error('Error al cargar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Total Propiedades', 
      value: stats.total, 
      icon: FiHome, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'En Venta', 
      value: stats.venta, 
      icon: FiDollarSign, 
      color: 'bg-green-500' 
    },
    { 
      title: 'En Alquiler', 
      value: stats.alquiler, 
      icon: FiTrendingUp, 
      color: 'bg-yellow-500' 
    },
    { 
      title: 'Disponibles', 
      value: stats.disponibles, 
      icon: FiEye, 
      color: 'bg-jo-pink' 
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jo-pink"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-jo-darkText mb-2">
          Dashboard
        </h2>
        <p className="text-jo-darkTextMuted">
          Resumen general de la inmobiliaria
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-jo-darkSurface rounded-xl shadow-premium-dark p-6 border border-jo-darkBorder">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-jo-darkText mb-1">{stat.value}</p>
              <p className="text-sm text-jo-darkTextMuted">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Propiedades recientes */}
      <div className="bg-jo-darkSurface rounded-xl shadow-premium-dark p-6 border border-jo-darkBorder">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-display font-bold text-jo-darkText">
            Propiedades Recientes
          </h3>
          <Link 
            to="/admin/propiedades" 
            className="text-jo-pink hover:text-jo-pinkHover transition-colors font-medium"
          >
            Ver todas
          </Link>
        </div>

        {propiedadesRecientes.length === 0 ? (
          <div className="text-center py-12 text-jo-darkTextMuted">
            <FiHome size={48} className="mx-auto mb-4 opacity-30" />
            <p>No hay propiedades registradas</p>
            <Link 
              to="/admin/propiedades/nueva" 
              className="inline-block mt-4 bg-jo-pink hover:bg-jo-pinkHover text-white px-6 py-2 rounded-lg transition-colors"
            >
              Agregar primera propiedad
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-jo-darkBorder">
                  <th className="text-left py-3 px-4 text-jo-darkTextMuted font-medium text-sm">
                    Nombre
                  </th>
                  <th className="text-left py-3 px-4 text-jo-darkTextMuted font-medium text-sm">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-4 text-jo-darkTextMuted font-medium text-sm">
                    Operación
                  </th>
                  <th className="text-left py-3 px-4 text-jo-darkTextMuted font-medium text-sm">
                    Precio
                  </th>
                  <th className="text-left py-3 px-4 text-jo-darkTextMuted font-medium text-sm">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {propiedadesRecientes.map((propiedad) => (
                  <tr key={propiedad.idPropiedad} className="border-b border-jo-darkBorder hover:bg-jo-darkCard transition-colors">
                    <td className="py-3 px-4 font-medium text-jo-darkText">
                      {propiedad.nombre}
                    </td>
                    <td className="py-3 px-4 text-jo-darkTextMuted capitalize">
                      {propiedad.tipo}
                    </td>
                    <td className="py-3 px-4 text-jo-darkTextMuted capitalize">
                      {propiedad.operacion}
                    </td>
                    <td className="py-3 px-4 font-medium text-jo-darkText">
                      ${Number(propiedad.valor).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        propiedad.estado === 'disponible' 
                          ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                          : propiedad.estado === 'reservada'
                          ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50'
                          : 'bg-gray-700/30 text-gray-400 border border-gray-600/50'
                      }`}>
                        {propiedad.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
