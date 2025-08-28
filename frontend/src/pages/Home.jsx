import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Home() {
  const [curriculos] = useLocalStorage('curriculos', []);
  const navigate = useNavigate();

  const totalCurriculos = curriculos.length;
  const ultimosCurriculos = curriculos.slice(-3).reverse();

  const curriculosEstaSemana = curriculos.filter(curriculo => {
    const umaSemanaAtras = new Date();
    umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);
    return new Date(curriculo.dataCriacao || new Date()) >= umaSemanaAtras;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Crie seu currículo em minutos
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          O CV Builder ajuda você a criar um currículo profissional e moderno para se destacar no mercado.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => navigate('/criar-curriculo')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl"
          >
            📝 Criar Meu Currículo
          </button>
          <button
            onClick={() => navigate('/visualizar-curriculos')}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl"
          >
            📋 Visualizar Currículos
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Estatísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-2xl shadow-md">
              <p className="text-4xl font-bold text-blue-600 mb-2">{totalCurriculos}</p>
              <p className="text-gray-600">Total de currículos</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl shadow-md">
              <p className="text-4xl font-bold text-green-600 mb-2">{curriculosEstaSemana}</p>
              <p className="text-gray-600">Currículos esta semana</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-2xl shadow-md">
              <p className="text-4xl font-bold text-purple-600 mb-2">100%</p>
              <p className="text-gray-600">Aproveitamento</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Últimos currículos criados</h2>
          {ultimosCurriculos.length > 0 ? (
            <div className="space-y-4">
              {ultimosCurriculos.map((cv) => (
                <div 
                  key={cv.id} 
                  className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition duration-200 cursor-pointer"
                  onClick={() => navigate(`/curriculo/${cv.id}`)}
                >
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">{cv.nome}</h3>
                  <p className="text-gray-600">
                    {cv.experiencias?.[0]?.cargo || 'Sem cargo definido'}
                  </p>
                  {cv.email && (
                    <p className="text-sm text-gray-500 mt-2">{cv.email}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">Nenhum currículo criado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}