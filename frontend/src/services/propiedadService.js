import apiClient from './api';

export const propiedadService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/propiedades?${params}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/propiedades/${id}`);
    return response.data;
  },

  create: async (propiedad) => {
    const response = await apiClient.post('/propiedades', propiedad);
    return response.data;
  },

  update: async (id, propiedad) => {
    const response = await apiClient.put(`/propiedades/${id}`, propiedad);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/propiedades/${id}`);
    return response.data;
  }
};
