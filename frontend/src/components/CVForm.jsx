import { useState } from 'react';

export default function CVForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    nome: initialData.nome || '',
    email: initialData.email || '',
    telefone: initialData.telefone || '',
    endereco: initialData.endereco || '',
    resumo: initialData.resumo || '',
    experiencias: initialData.experiencias || [{ cargo: '', empresa: '', periodo: '', descricao: '' }],
    educacao: initialData.educacao || [{ curso: '', instituicao: '', ano: '' }],
    habilidades: initialData.habilidades || '',
    idiomas: initialData.idiomas || [{ idioma: '', nivel: '' }]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleExperienciaChange = (index, field, value) => {
    const novasExperiencias = [...formData.experiencias];
    novasExperiencias[index][field] = value;
    setFormData({ ...formData, experiencias: novasExperiencias });
  };

  const handleEducacaoChange = (index, field, value) => {
    const novaEducacao = [...formData.educacao];
    novaEducacao[index][field] = value;
    setFormData({ ...formData, educacao: novaEducacao });
  };

  const handleIdiomaChange = (index, field, value) => {
    const novosIdiomas = [...formData.idiomas];
    novosIdiomas[index][field] = value;
    setFormData({ ...formData, idiomas: novosIdiomas });
  };

  const addExperiencia = () => {
    setFormData({
      ...formData,
      experiencias: [...formData.experiencias, { cargo: '', empresa: '', periodo: '', descricao: '' }]
    });
  };

  const addEducacao = () => {
    setFormData({
      ...formData,
      educacao: [...formData.educacao, { curso: '', instituicao: '', ano: '' }]
    });
  };

  const addIdioma = () => {
    setFormData({
      ...formData,
      idiomas: [...formData.idiomas, { idioma: '', nivel: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome Completo*</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone*</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Endereço</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>


      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resumo Profissional</h2>
        <textarea
          name="resumo"
          value={formData.resumo}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
        />
      </div>


      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Experiência Profissional</h2>
        {formData.experiencias.map((exp, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cargo</label>
                <input
                  type="text"
                  value={exp.cargo}
                  onChange={(e) => handleExperienciaChange(index, 'cargo', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Empresa</label>
                <input
                  type="text"
                  value={exp.empresa}
                  onChange={(e) => handleExperienciaChange(index, 'empresa', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Período</label>
                <input
                  type="text"
                  value={exp.periodo}
                  onChange={(e) => handleExperienciaChange(index, 'periodo', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: 2020 - 2023"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  value={exp.descricao}
                  onChange={(e) => handleExperienciaChange(index, 'descricao', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addExperiencia}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          + Adicionar Experiência
        </button>
      </div>


      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Educação</h2>
        {formData.educacao.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Curso</label>
                <input
                  type="text"
                  value={edu.curso}
                  onChange={(e) => handleEducacaoChange(index, 'curso', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instituição</label>
                <input
                  type="text"
                  value={edu.instituicao}
                  onChange={(e) => handleEducacaoChange(index, 'instituicao', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ano de Conclusão</label>
                <input
                  type="text"
                  value={edu.ano}
                  onChange={(e) => handleEducacaoChange(index, 'ano', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: 2022"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addEducacao}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          + Adicionar Educação
        </button>
      </div>


      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Habilidades</h2>
        <textarea
          name="habilidades"
          value={formData.habilidades}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Liste suas habilidades técnicas e comportamentais"
        />
      </div>


      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Idiomas</h2>
        {formData.idiomas.map((idioma, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Idioma</label>
                <input
                  type="text"
                  value={idioma.idioma}
                  onChange={(e) => handleIdiomaChange(index, 'idioma', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nível</label>
                <select
                  value={idioma.nivel}
                  onChange={(e) => handleIdiomaChange(index, 'nivel', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Selecione</option>
                  <option value="Básico">Básico</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                  <option value="Fluente">Fluente</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addIdioma}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          + Adicionar Idioma
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
      >
        Salvar Currículo
      </button>
    </form>
  );
}