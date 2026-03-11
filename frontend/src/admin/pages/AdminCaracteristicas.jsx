import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiTag } from 'react-icons/fi';
import { caracteristicaService } from '../../services/caracteristicaService';

export default function AdminCaracteristicas() {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    loadCaracteristicas();
  }, []);

  const loadCaracteristicas = async () => {
    try {
      const response = await caracteristicaService.getAll();
      setCaracteristicas(response.data || []);
    } catch (error) {
      console.error('Error al cargar características:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await caracteristicaService.update(editingId, formData);
      } else {
        await caracteristicaService.create(formData);
      }
      
      setShowModal(false);
      setFormData({ nombre: '', descripcion: '' });
      setEditingId(null);
      loadCaracteristicas();
    } catch (error) {
      alert('Error al guardar característica');
      console.error(error);
    }
  };

  const handleEdit = (caracteristica) => {
    setEditingId(caracteristica.idCaracteristica);
    setFormData({
      nombre: caracteristica.nombre,
      descripcion: caracteristica.descripcion || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta característica?')) {
      return;
    }

    try {
      await caracteristicaService.delete(id);
      loadCaracteristicas();
    } catch (error) {
      alert('Error al eliminar característica. Puede que esté vinculada a propiedades.');
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ nombre: '', descripcion: '' });
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-jo-darkText mb-2">
            Características
          </h2>
          <p className="text-jo-darkTextMuted">
            Gestiona las características que pueden tener las propiedades
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-jo-pink hover:bg-jo-pinkHover text-white px-6 py-3 rounded-lg transition-colors font-medium"
        >
          <FiPlus size={20} />
          Nueva Característica
        </button>
      </div>

      {/* Lista de características */}
      <div className="bg-jo-darkSurface rounded-xl shadow-premium-dark overflow-hidden border border-jo-darkBorder">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jo-pink"></div>
          </div>
        ) : caracteristicas.length === 0 ? (
          <div className="text-center py-12 text-jo-darkTextMuted">
            <FiTag size={48} className="mx-auto mb-4 opacity-30" />
            <p>No hay características registradas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {caracteristicas.map((caracteristica) => (
              <div
                key={caracteristica.idCaracteristica}
                className="bg-jo-darkCard border border-jo-darkBorder rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-jo-darkText mb-1">
                      {caracteristica.nombre}
                    </h3>
                    {caracteristica.descripcion && (
                      <p className="text-sm text-jo-darkTextMuted">
                        {caracteristica.descripcion}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleEdit(caracteristica)}
                      className="p-2 text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(caracteristica.idCaracteristica)}
                      className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-jo-darkSurface border border-jo-darkBorder rounded-xl shadow-premium-dark max-w-md w-full p-6">
            <h3 className="text-xl font-display font-bold text-jo-darkText mb-4">
              {editingId ? 'Editar Característica' : 'Nueva Característica'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-jo-darkText mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-2 bg-jo-darkCard border border-jo-darkBorder text-jo-darkText rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none placeholder:text-jo-darkTextMuted"
                  placeholder="Ej: Piscina, Garage, Quincho"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-jo-darkText mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 bg-jo-darkCard border border-jo-darkBorder text-jo-darkText rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none resize-none placeholder:text-jo-darkTextMuted"
                  placeholder="Descripción opcional..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-jo-darkBorder text-jo-darkText rounded-lg hover:bg-jo-darkCard transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-jo-pink hover:bg-jo-pinkHover text-white rounded-lg transition-colors"
                >
                  {editingId ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
