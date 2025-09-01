import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Swal from 'sweetalert2';
import { 
  FaEdit, FaTrash, FaPrint, FaArrowLeft, FaEnvelope, 
  FaPhone, FaMapMarkerAlt, FaCalendar, FaBriefcase, 
  FaGraduationCap, FaLanguage, FaGlobe, FaLinkedin, FaGithub,
  FaUser, FaStar, FaCode, FaTools
} from 'react-icons/fa';

export default function VerCurriculo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculos, setCurriculos] = useLocalStorage('curriculos', []);
  const [curriculo, setCurriculo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundCurriculo = curriculos.find(c => c.id === parseInt(id));
    if (foundCurriculo) {
      setCurriculo(foundCurriculo);
    }
    setLoading(false);
  }, [id, curriculos]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir o currículo de ${curriculo.nome}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      background: '#1f2937',
      color: '#fff'
    });

    if (result.isConfirmed) {
      const updatedCurriculos = curriculos.filter(c => c.id !== parseInt(id));
      setCurriculos(updatedCurriculos);
      
      Swal.fire({
        title: 'Excluído!',
        text: 'Currículo excluído com sucesso.',
        icon: 'success',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#8b5cf6'
      });
      
      navigate('/visualizar-curriculos');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!curriculo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Currículo não encontrado</h2>
          <Link 
            to="/visualizar-curriculos" 
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Voltar para a lista de currículos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 print:bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 print:hidden">
          <Link
            to="/visualizar-curriculos"
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Voltar para Currículos
          </Link>
          
          <div className="flex gap-3">
            <Link
              to={`/editar-curriculo/${curriculo.id}`}
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 group"
            >
              <FaEdit className="group-hover:scale-110 transition-transform" />
              Editar
            </Link>
            
            <button
              onClick={handlePrint}
              className="bg-green-600/20 hover:bg-green-600/30 text-green-300 px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 group"
            >
              <FaPrint className="group-hover:scale-110 transition-transform" />
              Imprimir
            </button>
            
            <button
              onClick={handleDelete}
              className="bg-red-600/20 hover:bg-red-600/30 text-red-300 px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 group"
            >
              <FaTrash className="group-hover:scale-110 transition-transform" />
              Excluir
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 print:bg-white print:border-gray-200 print:backdrop-blur-0">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
              {curriculo.nome?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-2 print:text-gray-800">
              {curriculo.nome}
            </h1>
            
            {curriculo.experiencias?.[0]?.cargo && (
              <p className="text-xl text-purple-300 mb-6 print:text-gray-600">
                {curriculo.experiencias[0].cargo}
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {curriculo.email && (
                <div className="flex items-center gap-2 text-purple-200 print:text-gray-600">
                  <FaEnvelope className="text-purple-400 print:text-gray-400" />
                  <span>{curriculo.email}</span>
                </div>
              )}
              
              {curriculo.telefone && (
                <div className="flex items-center gap-2 text-purple-200 print:text-gray-600">
                  <FaPhone className="text-purple-400 print:text-gray-400" />
                  <span>{curriculo.telefone}</span>
                </div>
              )}
              
              {(curriculo.cidade || curriculo.estado) && (
                <div className="flex items-center gap-2 text-purple-200 print:text-gray-600">
                  <FaMapMarkerAlt className="text-purple-400 print:text-gray-400" />
                  <span>
                    {curriculo.cidade && `${curriculo.cidade}, `}
                    {curriculo.estado}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4">
              {curriculo.linkedin && (
                <a
                  href={curriculo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 group"
                >
                  <FaLinkedin className="text-blue-400 group-hover:text-blue-300 text-xl" />
                </a>
              )}
              
              {curriculo.github && (
                <a
                  href={curriculo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 group"
                >
                  <FaGithub className="text-purple-400 group-hover:text-purple-300 text-xl" />
                </a>
              )}
              
              {curriculo.portfolio && (
                <a
                  href={curriculo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 group"
                >
                  <FaGlobe className="text-green-400 group-hover:text-green-300 text-xl" />
                </a>
              )}
            </div>
          </div>

          {curriculo.resumo && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white print:text-gray-800 flex items-center gap-2">
                  <FaUser className="text-purple-400 print:text-gray-400" />
                  Resumo Profissional
                </h2>
              </div>
              <p className="text-purple-200 leading-relaxed print:text-gray-700">
                {curriculo.resumo}
              </p>
            </section>
          )}

          {curriculo.experiencias && curriculo.experiencias.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white print:text-gray-800 flex items-center gap-2">
                  <FaBriefcase className="text-blue-400 print:text-gray-400" />
                  Experiência Profissional
                </h2>
              </div>
              
              <div className="space-y-6">
                {curriculo.experiencias.map((exp, index) => (
                  <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 print:bg-gray-50 print:border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1 print:text-gray-800">
                          {exp.cargo}
                        </h3>
                        <p className="text-blue-300 print:text-gray-600">
                          {exp.empresa}
                        </p>
                      </div>
                      
                      {(exp.dataInicio || exp.dataFim) && (
                        <div className="flex items-center gap-2 text-purple-300 text-sm print:text-gray-500">
                          <FaCalendar />
                          <span>
                            {exp.dataInicio} - {exp.dataFim || 'Presente'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {exp.descricao && (
                      <p className="text-purple-200 leading-relaxed print:text-gray-700">
                        {exp.descricao}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {curriculo.educacao && curriculo.educacao.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white print:text-gray-800 flex items-center gap-2">
                  <FaGraduationCap className="text-green-400 print:text-gray-400" />
                  Formação Acadêmica
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {curriculo.educacao.map((edu, index) => (
                  <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 print:bg-gray-50 print:border-gray-200">
                    <h3 className="text-lg font-semibold text-white mb-2 print:text-gray-800">
                      {edu.curso}
                    </h3>
                    <p className="text-green-300 mb-2 print:text-gray-600">
                      {edu.instituicao}
                    </p>
                    {edu.ano && (
                      <p className="text-purple-300 text-sm print:text-gray-500">
                        Conclusão: {edu.ano}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {curriculo.idiomas && curriculo.idiomas.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white print:text-gray-800 flex items-center gap-2">
                  <FaLanguage className="text-yellow-400 print:text-gray-400" />
                  Idiomas
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculo.idiomas.map((idioma, index) => (
                  <div key={index} className="bg-white/5 rounded-2xl p-4 border border-white/10 print:bg-gray-50 print:border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white print:text-gray-800">
                        {idioma.idioma}
                      </span>
                      <span className="text-yellow-300 text-sm print:text-gray-600">
                        {idioma.nivel}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 print:bg-gray-200">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: idioma.nivel === 'Básico' ? '33%' : 
                                 idioma.nivel === 'Intermediário' ? '66%' : '100%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {curriculo.habilidades && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white print:text-gray-800 flex items-center gap-2">
                  <FaCode className="text-pink-400 print:text-gray-400" />
                  Habilidades
                </h2>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 print:bg-gray-50 print:border-gray-200">
                <p className="text-purple-200 leading-relaxed print:text-gray-700">
                  {curriculo.habilidades}
                </p>
              </div>
            </section>
          )}
        </div>

        {curriculo.dataCriacao && (
          <div className="text-center mt-8 print:hidden">
            <p className="text-purple-300 text-sm">
              Currículo criado em: {new Date(curriculo.dataCriacao).toLocaleDateString('pt-BR')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}