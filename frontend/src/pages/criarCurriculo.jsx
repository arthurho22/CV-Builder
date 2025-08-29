import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
<<<<<<< HEAD
import Swal from 'sweetalert2';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaBriefcase, FaGraduationCap, FaLanguage, 
  FaPlus, FaTrash, FaArrowLeft, FaSave,
  FaLinkedin, FaGithub, FaGlobe
} from 'react-icons/fa';
=======
import CVForm from '../components/CVForm';
>>>>>>> 8d645a8b6c3c88bef368e672f79b1a12ffdd16fd

export default function CriarCurriculo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculos, setCurriculos] = useLocalStorage('curriculos', []);
  const [activeSection, setActiveSection] = useState('pessoal');
  
  const isEditMode = !!id;
  
  const curriculoParaEditar = isEditMode 
    ? curriculos.find(c => c.id === parseInt(id)) 
    : null;

  const [formData, setFormData] = useState({
    // Informações Pessoais
    nome: '',
    email: '',
    telefone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    
    // Resumo
    resumo: '',
    
    // Experiências
    experiencias: [],
    
    // Educação
    educacao: [],
    
    // Idiomas
    idiomas: [],
    
    // Habilidades
    habilidades: ''
  });

<<<<<<< HEAD
  useEffect(() => {
    if (curriculoParaEditar) {
      setFormData(curriculoParaEditar);
    }
  }, [curriculoParaEditar]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
=======

const handleSubmit = async (formData) => {
  try {
    if (isEditMode) {
      await updateCurriculo(id, formData);
      Swal.fire('Sucesso!', 'Currículo atualizado com sucesso!', 'success');
    } else {
      await createCurriculo(formData);
      Swal.fire('Sucesso!', 'Currículo criado com sucesso!', 'success');
    }
    navigate('/visualizar-curriculos');
  } catch (error) {
    console.error('Erro ao salvar:', error);
    Swal.fire('Erro', 'Não foi possível salvar o currículo', 'error');
  }
};
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {isEditMode ? 'Editar Currículo' : 'Criar Currículo'}
                        </h1>
                    </div>
>>>>>>> 8d645a8b6c3c88bef368e672f79b1a12ffdd16fd

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, template) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], template]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      const updated = curriculos.map(c => 
        c.id === parseInt(id) ? { ...formData, id: parseInt(id) } : c
      );
      setCurriculos(updated);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Currículo atualizado com sucesso!',
        icon: 'success',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#8b5cf6'
      });
    } else {
      const novoCurriculo = { 
        ...formData, 
        id: Date.now(),
        dataCriacao: new Date().toISOString()
      };
      setCurriculos([...curriculos, novoCurriculo]);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Currículo criado com sucesso!',
        icon: 'success',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#8b5cf6'
      });
    }
    
    navigate('/visualizar-curriculos');
  };

  const sections = [
    { id: 'pessoal', label: 'Informações Pessoais', icon: FaUser },
    { id: 'resumo', label: 'Resumo', icon: FaUser },
    { id: 'experiencias', label: 'Experiências', icon: FaBriefcase },
    { id: 'educacao', label: 'Formação', icon: FaGraduationCap },
    { id: 'idiomas', label: 'Idiomas', icon: FaLanguage },
    { id: 'habilidades', label: 'Habilidades', icon: FaUser }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/visualizar-curriculos')}
            className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all duration-300 group"
          >
            <FaArrowLeft className="text-white group-hover:text-purple-300" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white">
              {isEditMode ? '✏️ Editar Currículo' : '🎨 Criar Currículo'}
            </h1>
            <p className="text-purple-200">
              {isEditMode ? 'Atualize suas informações profissionais' : 'Preencha suas informações para criar um currículo incrível'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Navegação */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 text-lg">Seções</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-purple-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <section.icon className="text-sm" />
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Formulário Principal */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              
              {/* Seção: Informações Pessoais */}
              {activeSection === 'pessoal' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FaUser className="text-purple-400" />
                    Informações Pessoais
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-purple-200 mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-purple-200 mb-2">Email *</label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-purple-200 mb-2">Telefone</label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <input
                          type="tel"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange('telefone', e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-purple-200 mb-2">CEP</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <input
                          type="text"
                          value={formData.cep}
                          onChange={(e) => handleInputChange('cep', e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                          placeholder="00000-000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-purple-200 mb-2">LinkedIn</label>
                      <div className="relative">
                        <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                          placeholder="linkedin.com/in/seu-perfil"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-purple-200 mb-2">GitHub</label>
                      <div className="relative">
                        <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <input
                          type="url"
                          value={formData.github}
                          onChange={(e) => handleInputChange('github', e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                          placeholder="github.com/seu-usuario"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-purple-200 mb-2">Portfólio</label>
                      <div className="relative">
                        <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <input
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => handleInputChange('portfolio', e.target.value)}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                          placeholder="seuportfolio.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Seção: Resumo */}
              {activeSection === 'resumo' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FaUser className="text-purple-400" />
                    Resumo Profissional
                  </h2>
                  
                  <div>
                    <label className="block text-purple-200 mb-2">Resumo *</label>
                    <textarea
                      required
                      value={formData.resumo}
                      onChange={(e) => handleInputChange('resumo', e.target.value)}
                      rows={6}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                      placeholder="Descreva brevemente sua experiência profissional, habilidades e objetivos..."
                    />
                    <p className="text-purple-300 text-sm mt-2">
                      {formData.resumo.length}/500 caracteres
                    </p>
                  </div>
                </div>
              )}

              {/* Seção: Experiências */}
              {activeSection === 'experiencias' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FaBriefcase className="text-purple-400" />
                    Experiências Profissionais
                  </h2>
                  
                  {formData.experiencias.map((exp, index) => (
                    <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-semibold">Experiência #{index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeArrayItem('experiencias', index)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-purple-200 mb-2">Cargo *</label>
                          <input
                            type="text"
                            required
                            value={exp.cargo || ''}
                            onChange={(e) => handleArrayChange('experiencias', index, 'cargo', e.target.value)}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                            placeholder="Desenvolvedor Frontend"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-purple-200 mb-2">Empresa *</label>
                          <input
                            type="text"
                            required
                            value={exp.empresa || ''}
                            onChange={(e) => handleArrayChange('experiencias', index, 'empresa', e.target.value)}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                            placeholder="Nome da empresa"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-purple-200 mb-2">Data de Início</label>
                          <input
                            type="month"
                            value={exp.dataInicio || ''}
                            onChange={(e) => handleArrayChange('experiencias', index, 'dataInicio', e.target.value)}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-purple-200 mb-2">Data de Término</label>
                          <input
                            type="month"
                            value={exp.dataFim || ''}
                            onChange={(e) => handleArrayChange('experiencias', index, 'dataFim', e.target.value)}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                            placeholder="Presente"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-purple-200 mb-2">Descrição das Atividades</label>
                        <textarea
                          value={exp.descricao || ''}
                          onChange={(e) => handleArrayChange('experiencias', index, 'descricao', e.target.value)}
                          rows={3}
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                          placeholder="Descreva suas principais atividades e conquistas..."
                        />
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addArrayItem('experiencias', {
                      cargo: '',
                      empresa: '',
                      dataInicio: '',
                      dataFim: '',
                      descricao: ''
                    })}
                    className="w-full bg-white/10 hover:bg-white/20 border-2 border-dashed border-white/30 rounded-2xl p-6 text-purple-200 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <FaPlus className="group-hover:scale-110 transition-transform" />
                    Adicionar Experiência
                  </button>
                </div>
              )}

              {/* Botões de Navegação e Submit */}
              <div className="flex justify-between items-center pt-8 mt-8 border-t border-white/20">
                <div className="flex gap-3">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
                      }`}
                      title={section.label}
                    >
                      <section.icon />
                    </button>
                  ))}
                </div>
                
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
                >
                  <FaSave />
                  {isEditMode ? 'Atualizar Currículo' : 'Salvar Currículo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}