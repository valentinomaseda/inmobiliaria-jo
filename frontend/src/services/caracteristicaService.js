import apiClient from './api';

export const caracteristicaService = {
  getAll: async () => {
    const response = await apiClient.get('/caracteristicas');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/caracteristicas/${id}`);
    return response.data;
  },

  create: async (caracteristica) => {
    const response = await apiClient.post('/caracteristicas', caracteristica);
    return response.data;
  },

  update: async (id, caracteristica) => {
    const response = await apiClient.put(`/caracteristicas/${id}`, caracteristica);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/caracteristicas/${id}`);
    return response.data;
  },

  addToPropiedad: async (idPropiedad, idCaracteristica) => {
    const response = await apiClient.post('/caracteristicas/vincular', {
      idPropiedad,
      idCaracteristica
    });
    return response.data;
  },

  removeFromPropiedad: async (idPropiedad, idCaracteristica) => {
    const response = await apiClient.delete(`/caracteristicas/desvincular/${idPropiedad}/${idCaracteristica}`);
    return response.data;
  }
};
