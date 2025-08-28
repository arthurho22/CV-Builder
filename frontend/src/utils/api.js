import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const getCurriculos = () => api.get('/curriculos');
export const getCurriculoById = (id) => api.get(`/curriculos/${id}`);
export const createCurriculo = (data) => api.post('/curriculos', data);
export const updateCurriculo = (id, data) => api.put(`/curriculos/${id}`, data);
export const deleteCurriculo = (id) => api.delete(`/curriculos/${id}`);