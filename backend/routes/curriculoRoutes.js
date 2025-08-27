const express = require('express');
const router = express.Router();
const {
  getCurriculos,
  getCurriculoById,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo
} = require('../controllers/curriculoController.js');

router.get('/', getCurriculos);
router.get('/:id', getCurriculoById);
router.post('/', createCurriculo);
router.put('/:id', updateCurriculo);
router.delete('/:id', deleteCurriculo);

module.exports = router;