import * as yup from 'yup';

export const curriculoSchema = yup.object().shape({

    nome: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),
  
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Email é obrigatório'),
  
  telefone: yup
    .string()
    .required('Telefone é obrigatório')
    .min(14, 'Telefone incompleto')
    .max(15, 'Telefone muito longo'),
  
  cep: yup
    .string()
    .required('CEP é obrigatório')
    .length(9, 'CEP deve ter 8 dígitos'),
  
  rua: yup
    .string()
    .required('Rua é obrigatória')
    .min(3, 'Nome da rua muito curto'),
  
  numero: yup
    .string()
    .required('Número é obrigatório'),
  
  bairro: yup
    .string()
    .required('Bairro é obrigatório'),
  
  cidade: yup
    .string()
    .required('Cidade é obrigatória'),
  
  estado: yup
    .string()
    .required('Estado é obrigatório')
    .length(2, 'Estado deve ter 2 caracteres'),
  
  resumo: yup
    .string()
    .required('Resumo profissional é obrigatório')
    .min(50, 'Resumo deve ter pelo menos 50 caracteres')
    .max(500, 'Resumo muito longo'),
  
  experiencias: yup.array().of(
    yup.object().shape({
      cargo: yup
        .string()
        .required('Cargo é obrigatório'),
      empresa: yup
        .string()
        .required('Empresa é obrigatória'),
      dataInicio: yup
        .string()
        .required('Data de início é obrigatória'),
      dataFim: yup
        .string(),
      descricao: yup
        .string()
        .required('Descrição é obrigatória')
        .min(20, 'Descrição muito curta')
    })
  ),
  
  educacao: yup.array().of(
    yup.object().shape({
      curso: yup
        .string()
        .required('Curso é obrigatório'),
      instituicao: yup
        .string()
        .required('Instituição é obrigatória'),
      ano: yup
        .string()
        .required('Ano de conclusão é obrigatório')
        .matches(/^(19|20)\d{2}$/, 'Ano inválido')
    })
  ),
  
  habilidades: yup
    .string()
    .required('Habilidades são obrigatórias')
    .min(10, 'Liste pelo menos algumas habilidades'),
  
  idiomas: yup.array().of(
    yup.object().shape({
      idioma: yup
        .string()
        .required('Idioma é obrigatório'),
      nivel: yup
        .string()
        .required('Nível é obrigatório')
        .oneOf(['Básico', 'Intermediário', 'Avançado', 'Fluente'], 'Nível inválido')
    })
  )
});