const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, '../data/curriculos.json');

const readCurriculos = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeCurriculos = async (curriculos) => {
  await fs.writeFile(dataPath, JSON.stringify(curriculos, null, 2));
};

exports.getCurriculos = async (req, res) => {
  try {
    const curriculos = await readCurriculos();
    res.json(curriculos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCurriculoById = async (req, res) => {
  try {
    const curriculos = await readCurriculos();
    const curriculo = curriculos.find(c => c.id === req.params.id);
    
    if (!curriculo) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    res.json(curriculo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCurriculo = async (req, res) => {
  try {
    const curriculos = await readCurriculos();
    const newCurriculo = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...req.body
    };
    
    curriculos.push(newCurriculo);
    await writeCurriculos(curriculos);
    
    res.status(201).json(newCurriculo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCurriculo = async (req, res) => {
  try {
    const curriculos = await readCurriculos();
    const index = curriculos.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    curriculos[index] = { ...curriculos[index], ...req.body };
    await writeCurriculos(curriculos);
    
    res.json(curriculos[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCurriculo = async (req, res) => {
  try {
    const curriculos = await readCurriculos();
    const filteredCurriculos = curriculos.filter(c => c.id !== req.params.id);
    
    if (curriculos.length === filteredCurriculos.length) {
      return res.status(404).json({ message: 'Currículo não encontrado' });
    }
    
    await writeCurriculos(filteredCurriculos);
    res.json({ message: 'Currículo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};