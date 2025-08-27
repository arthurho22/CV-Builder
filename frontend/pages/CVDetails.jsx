import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { buscarCurriculoAPI, excluirCurriculoAPI } from '../services/api';
import Swal from 'sweetalert2';

export default function CVDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculo, setCurriculo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCurriculo();
  }, [id]);

  const carregarCurriculo = async () => {
    try {
      const data = await buscarCurriculoAPI(id);
      setCurriculo(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível carregar o currículo'
      });
      navigate('/visualizar-curriculos');
    }
    setLoading(false);
  };

  const handleExcluir = async () => {
    const confirmacao = await Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir o currículo de ${curriculo.nome}?`,
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
        navigate('/visualizar-curriculos');
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
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              <div className="h-20 bg-gray-300 rounded"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!curriculo) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Currículo não encontrado</h1>
          <Link
            to="/visualizar-curriculos"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Voltar para a lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{curriculo.nome}</h1>
              <p className="text-gray-600 mt-1">{curriculo.email}</p>
              <p className="text-gray-600">{curriculo.telefone}</p>
              <p className="text-gray-600">{curriculo.endereco}</p>
            </div>
            
            <div className="flex gap-2">
              <Link
                to={`/editar-curriculo/${curriculo._id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
              >
                ✏️ Editar
              </Link>
              <button
                onClick={handleExcluir}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                🗑️ Excluir
              </button>
              <Link
                to="/visualizar-curriculos"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                ↩️ Voltar
              </Link>
            </div>
          </div>
        </div>

        {curriculo.resumo && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo Profissional</h2>
            <p className="text-gray-700 leading-relaxed">{curriculo.resumo}</p>
          </div>
        )}

        {curriculo.experiencias && curriculo.experiencias.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Experiência Profissional</h2>
            <div className="space-y-4">
              {curriculo.experiencias.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800">{exp.cargo}</h3>
                  <p className="text-gray-600">{exp.empresa}</p>
                  <p className="text-gray-500 text-sm">{exp.periodo}</p>
                  <p className="text-gray-700 mt-2">{exp.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {curriculo.educacao && curriculo.educacao.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Formação Acadêmica</h2>
            <div className="space-y-3">
              {curriculo.educacao.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.curso}</h3>
                    <p className="text-gray-600">{edu.instituicao}</p>
                  </div>
                  <span className="text-gray-500">{edu.ano}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {curriculo.habilidades && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Habilidades</h2>
            <p className="text-gray-700">{curriculo.habilidades}</p>
          </div>
        )}

        {curriculo.idiomas && curriculo.idiomas.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Idiomas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculo.idiomas.map((idioma, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium text-gray-800">{idioma.idioma}</span>
                  <span className="text-gray-600">{idioma.nivel}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}