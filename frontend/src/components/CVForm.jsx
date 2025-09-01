import { useFormik } from 'formik';
import * as Yup from 'yup'; 

// Schema simplificado - APENAS os campos que existem no formulário
const simpleSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: Yup.string().nullable(),
  cep: Yup.string().nullable()
});

export default function CVForm({ onSubmit, initialData = {} }) {
  const formik = useFormik({
    initialValues: {
      nome: initialData.nome || '',
      email: initialData.email || '',
      telefone: initialData.telefone || '',
      cep: initialData.cep || '',
      rua: initialData.rua || '',
      numero: initialData.numero || '',
      bairro: initialData.bairro || '',
      cidade: initialData.cidade || '',
      estado: initialData.estado || '',
      resumo: initialData.resumo || '',
      experiencias: initialData.experiencias || [{ 
        cargo: '', 
        empresa: '', 
        periodo: '', 
        descricao: '' 
      }],
      educacao: initialData.educacao || [{ 
        curso: '', 
        instituicao: '', 
        ano: '' 
      }],
      habilidades: initialData.habilidades || '',
      idiomas: initialData.idiomas || [{ 
        idioma: '', 
        nivel: '' 
      }]
    },
    validationSchema: simpleSchema,
    onSubmit: (values) => {
      console.log('📤 Formulário enviado! Dados:', values);
      onSubmit(values);
    },
    enableReinitialize: true
  });

  // Função para debug - testar se o botão funciona
  const handleTestClick = () => {
    console.log('🎯 Botão clicado!');
    console.log('📋 Valores atuais:', formik.values);
    console.log('❌ Erros:', formik.errors);
    console.log('✋ Touched:', formik.touched);
    
    // Força o envio manualmente
    formik.handleSubmit();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome Completo*</label>
              <input
                type="text"
                name="nome"
                value={formik.values.nome}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                  formik.errors.nome && formik.touched.nome 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                }`}
              />
              {formik.errors.nome && formik.touched.nome && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.nome}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email*</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                  formik.errors.email && formik.touched.email 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                }`}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={formik.values.telefone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CEP</label>
              <input
                type="text"
                name="cep"
                value={formik.values.cep}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="00000-000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Rua</label>
              <input
                type="text"
                name="rua"
                value={formik.values.rua}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Número</label>
              <input
                type="text"
                name="numero"
                value={formik.values.numero}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                name="bairro"
                value={formik.values.bairro}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={formik.values.cidade}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input
                type="text"
                name="estado"
                value={formik.values.estado}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="SP"
              />
            </div>
          </div>
        </div>

        {/* Botão dentro do form para submit normal */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 w-full"
        >
          Salvar Currículo (Submit Normal)
        </button>
      </form>

      {/* Botão alternativo para debug */}
      <button
        onClick={handleTestClick}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 w-full"
      >
        Salvar Currículo (Debug Mode)
      </button>

      {/* Botão de emergência - ignora validação */}
      <button
        onClick={() => {
          console.log('🚀 Envio de emergência! Dados:', formik.values);
          onSubmit(formik.values);
        }}
        className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 w-full"
      >
        Salvar Currículo (EMERGÊNCIA - Sem Validação)
      </button>
    </div>
  );
}