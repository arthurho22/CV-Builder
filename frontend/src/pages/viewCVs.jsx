import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurriculos, deleteCurriculo } from '../utils/api';
import Swal from 'sweetalert2';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function ViewCVs() {
  const [curriculos, setCurriculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurriculos();
  }, []);

  const loadCurriculos = async () => {
    try {
      const response = await getCurriculos();
      setCurriculos(response.data);
    } catch (error) {
      console.error('Erro ao carregar currículos:', error);
      Swal.fire('Erro', 'Não foi possível carregar os currículos.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nome) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir o currículo de ${nome}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteCurriculo(id);
        Swal.fire('Excluído!', 'Currículo excluído com sucesso.', 'success');
        loadCurriculos(); 
      } catch (error) {
        console.error('Erro ao excluir currículo:', error);
        Swal.fire('Erro', 'Não foi possível excluir o currículo.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Todos os Currículos</h1>
          <Link
            to="/criar-curriculo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Novo Currículo
          </Link>
        </div>

        {curriculos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculos.map((curriculo) => (
              <div key={curriculo.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800">{curriculo.nome}</h2>
                <p className="text-gray-600 mt-2">{curriculo.email}</p>
                <p className="text-gray-600">{curriculo.telefone}</p>
                
                {curriculo.experiencias && curriculo.experiencias.length > 0 && (
                  <p className="text-gray-700 mt-3">
                    <strong>Última experiência:</strong> {curriculo.experiencias[0].cargo} na {curriculo.experiencias[0].empresa}
                  </p>
                )}

                <div className="flex justify-between mt-6">
                  <Link
                    to={`/curriculo/${curriculo.id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <FaEye className="mr-1" /> Visualizar
                  </Link>
                  <Link
                    to={`/editar-curriculo/${curriculo.id}`}
                    className="text-green-600 hover:text-green-800 flex items-center"
                  >
                    <FaEdit className="mr-1" /> Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(curriculo.id, curriculo.nome)}
                    className="text-red-600 hover:text-red-800 flex items-center"
                  >
                    <FaTrash className="mr-1" /> Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Nenhum currículo encontrado.</p>
            <Link
              to="/criar-curriculo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center"
            >
              <FaPlus className="mr-2" /> Criar Primeiro Currículo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}