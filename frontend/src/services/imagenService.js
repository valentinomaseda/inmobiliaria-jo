import apiClient from './api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const imagenService = {
  upload: async (idPropiedad, files) => {
    const formData = new FormData();
    formData.append('idPropiedad', idPropiedad);
    
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    const response = await apiClient.post('/imagenes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getByPropiedad: async (idPropiedad) => {
    const response = await apiClient.get(`/imagenes/propiedad/${idPropiedad}`);
    return response.data;
  },

  setPrincipal: async (idImagen) => {
    const response = await apiClient.put(`/imagenes/${idImagen}/principal`);
    return response.data;
  },

  updateOrden: async (idImagen, orden) => {
    const response = await apiClient.put(`/imagenes/${idImagen}/orden`, { orden });
    return response.data;
  },

  delete: async (idImagen) => {
    const response = await apiClient.delete(`/imagenes/${idImagen}`);
    return response.data;
  },

  getImageUrl: (url) => {
    return `${API_URL.replace('/api', '')}${url}`;
  }
};
