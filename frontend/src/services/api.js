import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error.response?.data || error.message);
    throw error;
  }
);

export const criarCurriculoAPI = async (curriculoData) => {
  try {
    const response = await api.post('/curriculos', curriculoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao criar currículo');
  }
};

export const atualizarCurriculoAPI = async (id, curriculoData) => {
  try {
    const response = await api.put(`/curriculos/${id}`, curriculoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar currículo');
  }
};

export const listarCurriculosAPI = async () => {
  try {
    const response = await api.get('/curriculos');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao listar currículos');
  }
};

export const buscarCurriculoAPI = async (id) => {
  try {
    const response = await api.get(`/curriculos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar currículo');
  }
};

export const excluirCurriculoAPI = async (id) => {
  try {
    const response = await api.delete(`/curriculos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao excluir currículo');
  }
};

export default api;