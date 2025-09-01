const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const dataFile = path.join(__dirname, 'data.json');

const readData = () => {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Erro ao ler dados:', error);
    return [];
  }
};

const saveData = (data) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};


app.get('/api/curriculos', async (req, res) => {
  try {
    const curriculos = readData().sort((a, b) => 
      new Date(b.createdAt || b.dataCriacao) - new Date(a.createdAt || a.dataCriacao)
    );
    res.json(curriculos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/curriculos/:id', async (req, res) => {
  try {
    const curriculos = readData();
    const curriculo = curriculos.find(c => c.id === req.params.id || c._id === req.params.id);
    
    if (!curriculo) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    res.json(curriculo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/curriculos', async (req, res) => {
  try {
    const curriculos = readData();
    const novoCurriculo = {
      _id: Date.now().toString(),
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    curriculos.push(novoCurriculo);
    saveData(curriculos);
    
    res.status(201).json(novoCurriculo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/curriculos/:id', async (req, res) => {
  try {
    const curriculos = readData();
    const index = curriculos.findIndex(c => 
      c.id === parseInt(req.params.id) || c._id === req.params.id || c.id === req.params.id
    );
    
    if (index === -1) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    curriculos[index] = { 
      ...curriculos[index], 
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    saveData(curriculos);
    res.json(curriculos[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/curriculos/:id', async (req, res) => {
  try {
    const curriculos = readData();
    const index = curriculos.findIndex(c => 
      c.id === parseInt(req.params.id) || c._id === req.params.id || c.id === req.params.id
    );
    
    if (index === -1) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    const curriculoExcluido = curriculos.splice(index, 1)[0];
    saveData(curriculos);
    
    res.json({ message: 'Currículo deletado com sucesso', curriculo: curriculoExcluido });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'API do CV Builder funcionando!',
    timestamp: new Date().toISOString(),
    dataFile: dataFile
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API CV Builder funcionando perfeitamente!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`✅ API CV Builder está no ar!`);
  console.log(`📁 Dados salvos em: ${dataFile}`);
  console.log(`🌐 Frontend: http://localhost:5173`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});