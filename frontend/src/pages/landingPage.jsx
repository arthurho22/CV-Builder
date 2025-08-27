import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCurriculos } from '../utils/api';
import { FaPlus, FaEye, FaUser, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

export default function LandingPage() {
  const [curriculos, setCurriculos] = useState([]);
  const [stats, setStats] = useState({ total: 0, withExperience: 0, withEducation: 0 });

  useEffect(() => {
    loadCurriculos();
  }, []);

  const loadCurriculos = async () => {
    try {
      const response = await getCurriculos();
      const data = response.data;
      
      setCurriculos(data.slice(-3)); 
      
      setStats({
        total: data.length,
        withExperience: data.filter(c => c.experiencias && c.experiencias.length > 0).length,
        withEducation: data.filter(c => c.educacao && c.educacao.length > 0).length
      });
    } catch (error) {
      console.error('Erro ao carregar currículos:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Crie Seu Currículo Perfeito
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Construa um currículo profissional em minutos e destaque-se no mercado de trabalho.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/criar-curriculo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center"
            >
              <FaPlus className="mr-2" /> Criar Meu Currículo
            </Link>
            <Link
              to="/visualizar-curriculos"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 flex items-center"
            >
              <FaEye className="mr-2" /> Visualizar Currículos
            </Link>
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-8">Estatísticas da Plataforma</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
              <p className="text-gray-600">Currículos Criados</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBriefcase className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.withExperience}</h3>
              <p className="text-gray-600">Com Experiência</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.withEducation}</h3>
              <p className="text-gray-600">Com Formação</p>
            </div>
          </div>
        </section>


        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-8">Últimos Currículos Criados</h2>
          {curriculos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {curriculos.map((curriculo) => (
                <div key={curriculo.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800">{curriculo.nome}</h3>
                  <p className="text-gray-600 mt-2">
                    {curriculo.experiencias && curriculo.experiencias.length > 0
                      ? curriculo.experiencias[0].cargo
                      : 'Sem experiência informada'}
                  </p>
                  <Link
                    to={`/curriculo/${curriculo.id}`}
                    className="text-blue-600 hover:underline mt-4 inline-block"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Nenhum currículo criado ainda.</p>
          )}
        </section>
      </div>
    </div>
  );
}