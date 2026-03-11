import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiX, FiUpload, FiTrash2, FiImage } from 'react-icons/fi';
import { propiedadService } from '../../services/propiedadService';
import { imagenService } from '../../services/imagenService';
import { caracteristicaService } from '../../services/caracteristicaService';

const MAX_IMAGES = 10;

export default function AdminPropiedadForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    valor: '',
    descripcion: '',
    cantAmbientes: '',
    metCuad: '',
    operacion: 'venta',
    tipo: 'casa',
    direccion: '',
    numero: '',
    piso: '',
    depto: '',
    barrio: '',
    ciudad: '',
    provincia: '',
    codigo_postal: '',
    latitud: '',
    longitud: '',
    estado: 'disponible',
    destacada: false
  });
  const [imagenes, setImagenes] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [todasCaracteristicas, setTodasCaracteristicas] = useState([]);
  const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);

  useEffect(() => {
    loadCaracteristicas();
    if (isEdit) {
      loadPropiedad();
    }
  }, [id]);

  const loadCaracteristicas = async () => {
    try {
      const response = await caracteristicaService.getAll();
      setTodasCaracteristicas(response.data || []);
    } catch (error) {
      console.error('Error al cargar características:', error);
    }
  };

  const loadPropiedad = async () => {
    try {
      const response = await propiedadService.getById(id);
      const propiedad = response.data;
      setFormData({
        ...propiedad,
        destacada: !!propiedad.destacada
      });
      setImagenes(propiedad.imagenes || []);
      setCaracteristicasSeleccionadas(
        (propiedad.caracteristicas || []).map(c => c.idCaracteristica)
      );
    } catch (error) {
      alert('Error al cargar la propiedad');
      navigate('/admin/propiedades');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_IMAGES - selectedFiles.length - imagenes.length;
    
    if (files.length > remaining) {
      alert(`Solo puedes agregar ${remaining} imagen(es) más. Máximo ${MAX_IMAGES} en total.`);
      return;
    }

    setSelectedFiles([...selectedFiles, ...files]);
    
    // Crear URLs de preview
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeSelectedFile = (index) => {
    // Revocar URL de preview
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const toggleCaracteristica = (idCaracteristica) => {
    if (caracteristicasSeleccionadas.includes(idCaracteristica)) {
      setCaracteristicasSeleccionadas(
        caracteristicasSeleccionadas.filter(id => id !== idCaracteristica)
      );
    } else {
      setCaracteristicasSeleccionadas([...caracteristicasSeleccionadas, idCaracteristica]);
    }
  };

  const handleUploadImages = async (propiedadId) => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      await imagenService.upload(propiedadId, selectedFiles);
      setSelectedFiles([]);
      if (isEdit) {
        await loadPropiedad();
      }
    } catch (error) {
      alert('Error al subir imágenes');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (idImagen) => {
    if (!window.confirm('¿Eliminar esta imagen?')) return;

    try {
      await imagenService.delete(idImagen);
      await loadPropiedad();
    } catch (error) {
      alert('Error al eliminar imagen');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let propiedadId;
      
      if (isEdit) {
        await propiedadService.update(id, formData);
        propiedadId = id;
        
        // Actualizar características (eliminar todas y volver a vincular)
        const caracteristicasActuales = (await propiedadService.getById(id)).data.caracteristicas || [];
        
        // Desvincular las que ya no están seleccionadas
        for (const caract of caracteristicasActuales) {
          if (!caracteristicasSeleccionadas.includes(caract.idCaracteristica)) {
            await caracteristicaService.removeFromPropiedad(propiedadId, caract.idCaracteristica);
          }
        }
        
        // Vincular las nuevas
        for (const idCaract of caracteristicasSeleccionadas) {
          if (!caracteristicasActuales.find(c => c.idCaracteristica === idCaract)) {
            await caracteristicaService.addToPropiedad(propiedadId, idCaract);
          }
        }
      } else {
        const response = await propiedadService.create(formData);
        propiedadId = response.data.id;
        
        // Vincular características seleccionadas
        for (const idCaract of caracteristicasSeleccionadas) {
          await caracteristicaService.addToPropiedad(propiedadId, idCaract);
        }
      }

      // Subir imágenes si hay archivos seleccionados
      if (selectedFiles.length > 0) {
        await handleUploadImages(propiedadId);
      }

      navigate('/admin/propiedades');
    } catch (error) {
      alert('Error al guardar la propiedad');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-jo-dark mb-2">
          {isEdit ? 'Editar Propiedad' : 'Nueva Propiedad'}
        </h2>
        <p className="text-jo-textMuted">
          {isEdit ? 'Actualiza los datos de la propiedad' : 'Completa los datos de la nueva propiedad'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="bg-white rounded-xl shadow-premium p-6">
          <h3 className="text-lg font-semibold text-jo-dark mb-4">Información Básica</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Nombre de la propiedad *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="Ej: Casa moderna en barrio cerrado"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Operación *
              </label>
              <select
                name="operacion"
                value={formData.operacion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                required
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
                <option value="alquiler_temporal">Alquiler Temporal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Tipo *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                required
              >
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
                Precio ($) *
              </label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="0"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Estado *
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                required
              >
                <option value="disponible">Disponible</option>
                <option value="reservada">Reservada</option>
                <option value="vendida">Vendida</option>
                <option value="alquilada">Alquilada</option>
                <option value="inactiva">Inactiva</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Ambientes
              </label>
              <input
                type="number"
                name="cantAmbientes"
                value={formData.cantAmbientes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Metros cuadrados
              </label>
              <input
                type="number"
                name="metCuad"
                value={formData.metCuad}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="destacada"
                  checked={formData.destacada}
                  onChange={handleChange}
                  className="w-4 h-4 text-jo-pink rounded focus:ring-jo-pink"
                />
                <span className="text-sm font-medium text-jo-dark">
                  Marcar como propiedad destacada
                </span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none resize-none"
                placeholder="Describe las características de la propiedad..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="bg-white rounded-xl shadow-premium p-6">
          <h3 className="text-lg font-semibold text-jo-dark mb-4">Ubicación</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="Calle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Número
              </label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="1234"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Piso
              </label>
              <input
                type="text"
                name="piso"
                value={formData.piso}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Departamento
              </label>
              <input
                type="text"
                name="depto"
                value={formData.depto}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="B"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Barrio
              </label>
              <input
                type="text"
                name="barrio"
                value={formData.barrio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="Centro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="Córdoba"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Provincia
              </label>
              <input
                type="text"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
               placeholder="Córdoba"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Código Postal
              </label>
              <input
                type="text"
                name="codigo_postal"
                value={formData.codigo_postal}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Latitud
              </label>
              <input
                type="number"
                name="latitud"
                value={formData.latitud}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="-31.4173"
                step="0.00000001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-jo-dark mb-2">
                Longitud
              </label>
              <input
                type="number"
                name="longitud"
                value={formData.longitud}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent outline-none"
                placeholder="-64.1834"
                step="0.00000001"
              />
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="bg-white rounded-xl shadow-premium p-6">
          <h3 className="text-lg font-semibold text-jo-dark mb-4">Características</h3>
          
          {todasCaracteristicas.length === 0 ? (
            <p className="text-jo-textMuted text-sm">
              No hay características disponibles. 
              <a href="/admin/caracteristicas" className="text-jo-pink hover:underline ml-1">
                Crear características
              </a>
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {todasCaracteristicas.map((caracteristica) => (
                <label
                  key={caracteristica.idCaracteristica}
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    caracteristicasSeleccionadas.includes(caracteristica.idCaracteristica)
                      ? 'border-jo-pink bg-jo-pink/5'
                      : 'border-jo-border hover:border-jo-pink/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={caracteristicasSeleccionadas.includes(caracteristica.idCaracteristica)}
                    onChange={() => toggleCaracteristica(caracteristica.idCaracteristica)}
                    className="w-4 h-4 text-jo-pink rounded focus:ring-jo-pink"
                  />
                  <span className="text-sm font-medium text-jo-dark">
                    {caracteristica.nombre}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Imágenes */}
        <div className="bg-white rounded-xl shadow-premium p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-jo-dark">Imágenes</h3>
            <span className="text-sm text-jo-textMuted">
              {imagenes.length + selectedFiles.length} / {MAX_IMAGES} imágenes
            </span>
          </div>
          
          {/* Imágenes existentes (solo en modo edición) */}
          {isEdit && imagenes.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-jo-dark mb-3">Imágenes actuales</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagenes.map((imagen) => (
                  <div key={imagen.idImagen} className="relative group">
                    <img
                      src={imagenService.getImageUrl(imagen.url)}
                      alt="Propiedad"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {imagen.es_principal && (
                      <div className="absolute top-2 left-2 bg-jo-pink text-white text-xs px-2 py-1 rounded">
                        Principal
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(imagen.idImagen)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preview de imágenes seleccionadas */}
          {selectedFiles.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-jo-dark mb-3">
                Nuevas imágenes ({selectedFiles.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={previewUrls[index]}
                      alt={file.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded truncate">
                      {file.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Área de upload clickeable */}
          {(imagenes.length + selectedFiles.length) < MAX_IMAGES && (
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="block border-2 border-dashed border-jo-border hover:border-jo-pink rounded-lg p-8 text-center cursor-pointer transition-all hover:bg-jo-surface/50"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-jo-surface p-4 rounded-full">
                    <FiImage className="text-jo-pink" size={32} />
                  </div>
                  <div>
                    <p className="text-jo-pink hover:text-jo-pinkHover font-medium">
                      Click para seleccionar imágenes
                    </p>
                    <p className="text-xs text-jo-textMuted mt-2">
                      o arrastra y suelta aquí
                    </p>
                  </div>
                  <div className="text-xs text-jo-textMuted">
                    <p>JPG, PNG, GIF, WEBP - Máx. 5MB por imagen</p>
                    <p className="mt-1">
                      Puedes subir {MAX_IMAGES - imagenes.length - selectedFiles.length} imagen(es) más
                    </p>
                  </div>
                </div>
              </label>
            </div>
          )}

          {(imagenes.length + selectedFiles.length) >= MAX_IMAGES && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-700 text-sm font-medium">
                Has alcanzado el límite máximo de {MAX_IMAGES} imágenes
              </p>
              <p className="text-yellow-600 text-xs mt-1">
                Elimina alguna imagen existente para agregar más
              </p>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/propiedades')}
            className="px-6 py-3 border border-jo-border rounded-lg hover:bg-jo-surface transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex items-center gap-2 bg-jo-pink hover:bg-jo-pinkHover text-white px-6 py-3 rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            <FiSave size={20} />
            {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear Propiedad'}
          </button>
        </div>
      </form>
    </div>
  );
}
