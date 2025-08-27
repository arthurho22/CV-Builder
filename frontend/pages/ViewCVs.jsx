import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarCurriculosAPI, excluirCurriculoAPI } from '../services/api';
import Swal from 'sweetalert2';

export default function ViewCVs() {
  const [curriculos, setCurriculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCurriculos();
  }, []);

  const carregarCurriculos = async () => {
    try {
      const data = await listarCurriculosAPI();
      setCurriculos(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível carregar os currículos'
      });
    }
    setLoading(false);
  };

  const handleExcluir = async (id, nome) => {
    const confirmacao = await Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir o currículo de ${nome}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacao.isConfirmed) {
      try {
        await excluirCurriculoAPI(id);
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Currículo excluído com sucesso.'
        });
        carregarCurriculos();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível excluir o currículo'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-20 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Currículos Cadastrados</h1>
          <p className="text-gray-600">Gerencie todos os currículos do sistema</p>
        </div>

        <div className="grid gap-6">
          {curriculos.map((curriculo) => (
            <div key={curriculo._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{curriculo.nome}</h2>
                  <p className="text-gray-600 mt-1">{curriculo.email}</p>
                  <p className="text-gray-600">{curriculo.telefone}</p>
                  
                  {curriculo.experiencias && curriculo.experiencias.length > 0 && (
                    <p className="text-gray-700 mt-2">
                      <strong>Última experiência:</strong> {curriculo.experiencias[0].cargo} na {curriculo.experiencias[0].empresa}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/curriculo/${curriculo._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    👀 Ver
                  </Link>
                  <Link
                    to={`/editar-curriculo/${curriculo._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    ✏️ Editar
                  </Link>
                  <button
                    onClick={() => handleExcluir(curriculo._id, curriculo.nome)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {curriculos.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Nenhum currículo encontrado</h2>
            <p className="text-gray-600 mb-6">Comece criando o primeiro currículo do sistema</p>
            <Link
              to="/criar-curriculo"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              ➕ Criar Primeiro Currículo
            </Link>
          </div>
        )}

        {curriculos.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mt-6 text-center">
            <p className="text-gray-600">
              Total de <strong>{curriculos.length}</strong> currículo(s) cadastrado(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}