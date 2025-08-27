import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCurriculoById } from '../utils/api';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

export default function CVDetails() {
  const { id } = useParams();
  const [curriculo, setCurriculo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurriculo();
  }, [id]);

  const loadCurriculo = async () => {
    try {
      const response = await getCurriculoById(id);
      setCurriculo(response.data);
    } catch (error) {
      console.error('Erro ao carregar currículo:', error);
      Swal.fire('Erro', 'Não foi possível carregar o currículo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!curriculo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Currículo não encontrado</h2>
          <Link to="/visualizar-curriculos" className="text-blue-600 hover:underline">
            Voltar para a lista de currículos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/visualizar-curriculos"
            className="text-blue-600 hover:underline flex items-center"
          >
            ← Voltar para currículos
          </Link>
          <div className="flex space-x-4">
            <Link
              to={`/editar-curriculo/${curriculo.id}`}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <FaEdit className="mr-2" /> Editar
            </Link>
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Imprimir
            </button>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-md p-8 print:shadow-none">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{curriculo.nome}</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-1" />
                {curriculo.cidade && curriculo.estado ? `${curriculo.cidade}, ${curriculo.estado}` : 'Localização não informada'}
              </div>
              <div>|</div>
              <div>{curriculo.email}</div>
              <div>|</div>
              <div>{curriculo.telefone}</div>
            </div>
          </div>


          {curriculo.resumo && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">Resumo Profissional</h2>
              <p className="text-gray-700">{curriculo.resumo}</p>
            </section>
          )}


          {curriculo.experiencias && curriculo.experiencias.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">Experiência Profissional</h2>
              {curriculo.experiencias.map((exp, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">{exp.cargo}</h3>
                  <p className="text-gray-600">{exp.empresa}</p>
                  <p className="text-gray-500 flex items-center">
                    <FaCalendar className="mr-1" /> {exp.periodo}
                  </p>
                  <p className="text-gray-700 mt-2">{exp.descricao}</p>
                </div>
              ))}
            </section>
          )}


          {curriculo.educacao && curriculo.educacao.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">Formação Acadêmica</h2>
              {curriculo.educacao.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{edu.curso}</h3>
                  <p className="text-gray-600">{edu.instituicao}</p>
                  <p className="text-gray-500">Conclusão: {edu.ano}</p>
                </div>
              ))}
            </section>
          )}


          {curriculo.habilidades && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">Habilidades</h2>
              <p className="text-gray-700">{curriculo.habilidades}</p>
            </section>
          )}


          {curriculo.idiomas && curriculo.idiomas.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold border-b-2 border-gray-200 pb-2 mb-4">Idiomas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculo.idiomas.map((idioma, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <span className="font-semibold">{idioma.idioma}: </span>
                    <span>{idioma.nivel}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}