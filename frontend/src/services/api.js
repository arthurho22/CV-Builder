import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCurriculos = () => api.get('/curriculos');
export const getCurriculoById = (id) => api.get(`/curriculos/${id}`);
export const createCurriculo = (curriculo) => api.post('/curriculos', curriculo);
export const updateCurriculo = (id, curriculo) => api.put(`/curriculos/${id}`, curriculo);
export const deleteCurriculo = (id) => api.delete(`/curriculos/${id}`);