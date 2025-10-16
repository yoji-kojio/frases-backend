const Database = require('../database/db');
const categoriesDb = new Database('categories');

const categoriesController = {
  // GET /categories - Listar todas as categorias
  getAll: (req, res) => {
    try {
      const categories = categoriesDb.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  },

  // GET /categories/:id - Buscar categoria por ID
  getById: (req, res) => {
    try {
      const category = categoriesDb.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  },

  // POST /categories - Criar nova categoria
  create: (req, res) => {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      const newCategory = categoriesDb.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar categoria' });
    }
  },

  // PUT /categories/:id - Atualizar categoria
  update: (req, res) => {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      const updatedCategory = categoriesDb.update(req.params.id, { name });
      
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  },

  // DELETE /categories/:id - Deletar categoria
  delete: (req, res) => {
    try {
      const deleted = categoriesDb.delete(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      res.json({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
  }
};

module.exports = categoriesController;

