const express = require('express');
const router = express.Router();
const phrasesController = require('../controllers/phrasesController');

// Rota para frase aleatória deve vir antes da rota :id
router.get('/random', phrasesController.getRandom);
router.get('/', phrasesController.getAll);
router.get('/:id', phrasesController.getById);
router.post('/', phrasesController.create);
router.put('/:id', phrasesController.update);
router.delete('/:id', phrasesController.delete);

module.exports = router;

