const Database = require('../database/db');
const authorsDb = new Database('authors');

const authorsController = {
  // GET /authors - Listar todos os autores
  getAll: (req, res) => {
    try {
      const authors = authorsDb.findAll();
      res.json(authors);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar autores' });
    }
  },

  // GET /authors/:id - Buscar autor por ID
  getById: (req, res) => {
    try {
      const author = authorsDb.findById(req.params.id);
      if (!author) {
        return res.status(404).json({ error: 'Autor não encontrado' });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar autor' });
    }
  },

  // POST /authors - Criar novo autor
  create: (req, res) => {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      const newAuthor = authorsDb.create({ name });
      res.status(201).json(newAuthor);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar autor' });
    }
  },

  // PUT /authors/:id - Atualizar autor
  update: (req, res) => {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      const updatedAuthor = authorsDb.update(req.params.id, { name });
      
      if (!updatedAuthor) {
        return res.status(404).json({ error: 'Autor não encontrado' });
      }

      res.json(updatedAuthor);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar autor' });
    }
  },

  // DELETE /authors/:id - Deletar autor
  delete: (req, res) => {
    try {
      const deleted = authorsDb.delete(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Autor não encontrado' });
      }

      res.json({ message: 'Autor deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar autor' });
    }
  }
};

module.exports = authorsController;

