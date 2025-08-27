const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/curriculosdb')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

// Modelo de Currículo
const curriculoSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  endereco: String,
  resumo: String,
  experiencias: [{
    cargo: String,
    empresa: String,
    periodo: String,
    descricao: String
  }],
  educacao: [{
    curso: String,
    instituicao: String,
    ano: String
  }],
  habilidades: String,
  idiomas: [{
    idioma: String,
    nivel: String
  }]
}, { timestamps: true });

const Curriculo = mongoose.model('Curriculo', curriculoSchema);

// Rotas da API
app.get('/api/curriculos', async (req, res) => {
  try {
    const curriculos = await Curriculo.find().sort({ createdAt: -1 });
    res.json(curriculos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/curriculos/:id', async (req, res) => {
  try {
    const curriculo = await Curriculo.findById(req.params.id);
    if (!curriculo) return res.status(404).json({ message: 'Currículo não encontrado' });
    res.json(curriculo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/curriculos', async (req, res) => {
  try {
    const curriculo = new Curriculo(req.body);
    const savedCurriculo = await curriculo.save();
    res.status(201).json(savedCurriculo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/curriculos/:id', async (req, res) => {
  try {
    const curriculo = await Curriculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!curriculo) return res.status(404).json({ message: 'Currículo não encontrado' });
    res.json(curriculo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/curriculos/:id', async (req, res) => {
  try {
    const curriculo = await Curriculo.findByIdAndDelete(req.params.id);
    if (!curriculo) return res.status(404).json({ message: 'Currículo não encontrado' });
    res.json({ message: 'Currículo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ message: 'API do CV Builder funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
