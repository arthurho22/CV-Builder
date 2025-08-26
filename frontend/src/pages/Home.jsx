import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState } from 'react';

export default function Home() {
  const [curriculos] = useLocalStorage('curriculos', []);


  const totalCurriculos = curriculos.length;
  const ultimosCurriculos = curriculos.slice(-3).reverse();

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
          <Link
            to="/criar-curriculo"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
          >
            Criar Meu Currículo
          </Link>
          <Link
            to="/visualizar-curriculos"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-semibold transition"
          >
            Visualizar Currículos
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Estatísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">{totalCurriculos}</p>
              <p className="text-gray-600">Total de currículos</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">{totalCurriculos}</p>
              <p className="text-gray-600">Currículos esta semana</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">100%</p>
              <p className="text-gray-600">Aproveitamento</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Últimos currículos criados</h2>
          {ultimosCurriculos.length > 0 ? (
            <div className="space-y-4">
              {ultimosCurriculos.map((cv) => (
                <div key={cv.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <h3 className="font-semibold text-lg">{cv.nome}</h3>
                  <p className="text-gray-600">
                    {cv.experiencias?.[0]?.cargo || 'Sem cargo definido'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum currículo criado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}