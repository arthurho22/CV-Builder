import { useFormik } from 'formik';
import { curriculoSchema } from '../utils/validationSchema';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { criarCurriculoAPI, atualizarCurriculoAPI } from '../services/api';


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
    validationSchema: curriculoSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true 
  });

  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...formik.values[arrayName]];
    newArray[index][field] = value;
    formik.setFieldValue(arrayName, newArray);
  };

  const addArrayItem = (arrayName, defaultValue) => {
    formik.setFieldValue(arrayName, [
      ...formik.values[arrayName],
      defaultValue
    ]);
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = formik.values[arrayName].filter((_, i) => i !== index);
    formik.setFieldValue(arrayName, newArray);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto space-y-6">
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
            <label className="block text-sm font-medium text-gray-700">Telefone*</label>
            <input
              type="tel"
              name="telefone"
              value={formik.values.telefone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                formik.errors.telefone && formik.touched.telefone 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {formik.errors.telefone && formik.touched.telefone && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.telefone}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CEP*</label>
            <input
              type="text"
              name="cep"
              value={formik.values.cep}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                formik.errors.cep && formik.touched.cep 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {formik.errors.cep && formik.touched.cep && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.cep}</div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Rua*</label>
            <input
              type="text"
              name="rua"
              value={formik.values.rua}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                formik.errors.rua && formik.touched.rua 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {formik.errors.rua && formik.touched.rua && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.rua}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Número*</label>
            <input
              type="text"
              name="numero"
              value={formik.values.numero}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                formik.errors.numero && formik.touched.numero 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {formik.errors.numero && formik.touched.numero && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.numero}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bairro*</label>
            <input
              type="text"
              name="bairro"
              value={formik.values.bairro}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                formik.errors.bairro && formik.touched.bairro 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {formik.errors.bairro && formik.touched.bairro && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.bairro}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cidade*</label>
            <input
              type="text"
              name="cidade"
              value={formik.values.cidade}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                formik.errors.cidade && formik.touched.cidade 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {formik.errors.cidade && formik.touched.cidade && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.cidade}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estado*</label>
            <input
              type="text"
              name="estado"
              value={formik.values.estado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                formik.errors.estado && formik.touched.estado 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
              placeholder="SP"
            />
            {formik.errors.estado && formik.touched.estado && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.estado}</div>
            )}
          </div>
        </div>
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