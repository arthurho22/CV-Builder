import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function VisualizarCurriculos() {
  const [curriculos, setCurriculos] = useState([]);

  useEffect(() => {
    loadCurriculos();
  }, []);

  const loadCurriculos = async () => {
    try {
      const response = await api.getCurriculos();
      setCurriculos(response.data);
    } catch (error) {
      console.error('Erro ao carregar currículos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteCurriculo(id);
      loadCurriculos(); 
    } catch (error) {
      console.error('Erro ao excluir currículo:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Meus Currículos</h1>
      {curriculos.map((cv) => (
        <div key={cv.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold">{cv.nome}</h2>
          <p>{cv.email}</p>
          <div className="mt-2">
            <Link
              to={`/curriculo/${cv.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Visualizar
            </Link>

            <Link
              to={`/editar-curriculo/${cv.id}`}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Editar
            </Link>

            <button 
              onClick={() => handleDelete(cv.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}