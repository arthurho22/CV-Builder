import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState } from 'react';

export default function VerCurriculo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculos, setCurriculos] = useLocalStorage('curriculos', []);
  
  const cv = curriculos.find(c => c.id === parseInt(id));

  if (!cv) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Currículo não encontrado!</h1>
        <Link to="/visualizar-curriculos" className="text-blue-500 underline">
          Voltar para a lista
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este currículo permanentemente?')) {
      const updatedCurriculos = curriculos.filter(c => c.id !== parseInt(id));
      setCurriculos(updatedCurriculos);
      navigate('/visualizar-curriculos'); 
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{cv.nome}</h1>
        <div className="mt-2 text-gray-600">
          <p>📧 {cv.email}</p>
          <p>📞 {cv.telefone}</p>
          {cv.endereco && <p>📍 {cv.endereco}</p>}
        </div>
      </div>

      {cv.resumo && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Resumo Profissional</h2>
          <p className="text-gray-700">{cv.resumo}</p>
        </div>
      )}

      {cv.experiencias && cv.experiencias.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Experiência Profissional</h2>
          {cv.experiencias.map((exp, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
              <h3 className="font-semibold text-lg text-gray-800">{exp.cargo}</h3>
              <p className="text-gray-600 font-medium">{exp.empresa}</p>
              {exp.periodo && <p className="text-gray-500 text-sm">{exp.periodo}</p>}
              {exp.descricao && <p className="text-gray-700 mt-2">{exp.descricao}</p>}
            </div>
          ))}
        </div>
      )}

      {cv.educacao && cv.educacao.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Formação Acadêmica</h2>
          {cv.educacao.map((edu, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
              <h3 className="font-semibold text-lg text-gray-800">{edu.curso}</h3>
              <p className="text-gray-600">{edu.instituicao}</p>
              {edu.ano && <p className="text-gray-500 text-sm">Concluído em: {edu.ano}</p>}
            </div>
          ))}
        </div>
      )}

      {cv.habilidades && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Habilidades</h2>
          <p className="text-gray-700">{cv.habilidades}</p>
        </div>
      )}

      {cv.idiomas && cv.idiomas.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Idiomas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cv.idiomas.map((idioma, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-800">{idioma.idioma}</p>
                <p className="text-gray-600 text-sm">Nível: {idioma.nivel}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <Link
          to="/visualizar-curriculos"
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
        >
          ← Voltar
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}