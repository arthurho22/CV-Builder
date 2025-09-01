import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Swal from 'sweetalert2';
import { FaEye, FaEdit, FaTrash, FaPlus, FaUser, FaEnvelope, FaBriefcase } from 'react-icons/fa';

export default function VisualizarCurriculos() {
  const [curriculos, setCurriculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [curriculosStorage, setCurriculosStorage] = useLocalStorage('curriculos', []);

  useEffect(() => {
    loadCurriculos();
  }, []);

  const loadCurriculos = () => {
    try {
      setCurriculos(curriculosStorage);
    } catch (error) {
      console.error('Erro ao carregar currículos:', error);
      Swal.fire('Erro', 'Não foi possível carregar os currículos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, nome) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir o currículo de ${nome}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      background: '#1f2937',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const novosCurriculos = curriculosStorage.filter(cv => cv.id !== id);
          setCurriculosStorage(novosCurriculos);
          setCurriculos(novosCurriculos);
          
          Swal.fire({
            title: 'Excluído!',
            text: 'Currículo excluído com sucesso.',
            icon: 'success',
            background: '#1f2937',
            color: '#fff'
          });
        } catch (error) {
          console.error('Erro ao excluir:', error);
          Swal.fire({
            title: 'Erro',
            text: 'Não foi possível excluir o currículo',
            icon: 'error',
            background: '#1f2937',
            color: '#fff'
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">📋 Meus Currículos</h1>
            <p className="text-purple-200">Gerencie todos os seus currículos profissionais</p>
          </div>
          <button
            onClick={() => navigate('/criar-curriculo')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-3 transform hover:scale-105"
          >
            <FaPlus className="text-lg" /> Novo Currículo
          </button>
        </div>

        {curriculos.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 max-w-2xl mx-auto border border-white/20">
              <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUser className="text-4xl text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Nenhum currículo encontrado</h2>
              <p className="text-purple-200 mb-8">Comece criando seu primeiro currículo profissional!</p>
              <button
                onClick={() => navigate('/criar-curriculo')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                🚀 Criar Primeiro Currículo
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {curriculos.map((cv) => (
              <div key={cv.id} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-purple-400/30 transition-all duration-300 hover:transform hover:scale-105 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {cv.nome?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {cv.nome || 'Sem nome'}
                    </h3>
                    <p className="text-purple-200 text-sm">ID: {cv.id}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {cv.email && (
                    <div className="flex items-center gap-3 text-purple-200">
                      <FaEnvelope className="text-purple-400" />
                      <span className="text-sm">{cv.email}</span>
                    </div>
                  )}
                  
                  {cv.experiencias?.[0]?.cargo && (
                    <div className="flex items-center gap-3 text-purple-200">
                      <FaBriefcase className="text-purple-400" />
                      <span className="text-sm">{cv.experiencias[0].cargo}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-6 border-t border-white/20">
                  <button
                    onClick={() => navigate(`/curriculo/${cv.id}`)}
                    className="flex-1 bg-white/20 text-white px-4 py-3 rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <FaEye className="group-hover/btn:scale-110 transition-transform" /> Ver
                  </button>
                  <button
                    onClick={() => navigate(`/editar-curriculo/${cv.id}`)}
                    className="flex-1 bg-blue-600/20 text-blue-300 px-4 py-3 rounded-xl hover:bg-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <FaEdit className="group-hover/btn:scale-110 transition-transform" /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cv.id, cv.nome || 'Sem nome')}
                    className="flex-1 bg-red-600/20 text-red-300 px-4 py-3 rounded-xl hover:bg-red-600/30 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <FaTrash className="group-hover/btn:scale-110 transition-transform" /> Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {curriculos.length > 0 && (
          <div className="mt-12 bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-white text-lg font-semibold mb-4">📊 Estatísticas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{curriculos.length}</div>
                <div className="text-purple-200 text-sm">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {curriculos.filter(cv => cv.experiencias?.length > 0).length}
                </div>
                <div className="text-purple-200 text-sm">Com Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {curriculos.filter(cv => cv.educacao?.length > 0).length}
                </div>
                <div className="text-purple-200 text-sm">Com Educação</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">
                  {curriculos.filter(cv => cv.idiomas?.length > 0).length}
                </div>
                <div className="text-purple-200 text-sm">Com Idiomas</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}