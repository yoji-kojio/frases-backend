const Database = require('../database/db');
const phrasesDb = new Database('phrases');
const authorsDb = new Database('authors');
const categoriesDb = new Database('categories');

const phrasesController = {
  // GET /phrases - Listar todas as frases (com opção de filtros)
  getAll: (req, res) => {
    try {
      let phrases = phrasesDb.findAll();
      
      // Filtro por autor
      if (req.query.author_id) {
        phrases = phrases.filter(p => p.author_id === parseInt(req.query.author_id));
      }
      
      // Filtro por categoria
      if (req.query.category_id) {
        phrases = phrases.filter(p => p.category_id === parseInt(req.query.category_id));
      }

      // Opção para incluir dados completos de autor e categoria
      if (req.query.include === 'full') {
        const authors = authorsDb.findAll();
        const categories = categoriesDb.findAll();
        
        phrases = phrases.map(phrase => ({
          ...phrase,
          author: authors.find(a => a.id === phrase.author_id),
          category: categories.find(c => c.id === phrase.category_id)
        }));
      }

      res.json(phrases);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar frases' });
    }
  },

  // GET /phrases/:id - Buscar frase por ID
  getById: (req, res) => {
    try {
      let phrase = phrasesDb.findById(req.params.id);
      
      if (!phrase) {
        return res.status(404).json({ error: 'Frase não encontrada' });
      }

      // Incluir dados completos de autor e categoria
      if (req.query.include === 'full') {
        const author = authorsDb.findById(phrase.author_id);
        const category = categoriesDb.findById(phrase.category_id);
        phrase = { ...phrase, author, category };
      }

      res.json(phrase);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar frase' });
    }
  },

  // GET /phrases/random - Buscar frase aleatória
  getRandom: (req, res) => {
    try {
      const phrases = phrasesDb.findAll();
      
      if (phrases.length === 0) {
        return res.status(404).json({ error: 'Nenhuma frase encontrada' });
      }

      const randomIndex = Math.floor(Math.random() * phrases.length);
      let phrase = phrases[randomIndex];

      // Incluir dados completos de autor e categoria
      if (req.query.include === 'full') {
        const author = authorsDb.findById(phrase.author_id);
        const category = categoriesDb.findById(phrase.category_id);
        phrase = { ...phrase, author, category };
      }

      res.json(phrase);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar frase aleatória' });
    }
  },

  // POST /phrases - Criar nova frase
  create: (req, res) => {
    try {
      const { text, author_id, category_id } = req.body;
      
      if (!text || !author_id || !category_id) {
        return res.status(400).json({ 
          error: 'Texto, autor_id e category_id são obrigatórios' 
        });
      }

      // Verificar se autor existe
      const author = authorsDb.findById(author_id);
      if (!author) {
        return res.status(400).json({ error: 'Autor não encontrado' });
      }

      // Verificar se categoria existe
      const category = categoriesDb.findById(category_id);
      if (!category) {
        return res.status(400).json({ error: 'Categoria não encontrada' });
      }

      const newPhrase = phrasesDb.create({ 
        text, 
        author_id: parseInt(author_id), 
        category_id: parseInt(category_id) 
      });

      res.status(201).json(newPhrase);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar frase' });
    }
  },

  // PUT /phrases/:id - Atualizar frase
  update: (req, res) => {
    try {
      const { text, author_id, category_id } = req.body;
      const updates = {};

      if (text) updates.text = text;
      
      if (author_id) {
        const author = authorsDb.findById(author_id);
        if (!author) {
          return res.status(400).json({ error: 'Autor não encontrado' });
        }
        updates.author_id = parseInt(author_id);
      }

      if (category_id) {
        const category = categoriesDb.findById(category_id);
        if (!category) {
          return res.status(400).json({ error: 'Categoria não encontrada' });
        }
        updates.category_id = parseInt(category_id);
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ 
          error: 'Nenhum campo para atualizar fornecido' 
        });
      }

      const updatedPhrase = phrasesDb.update(req.params.id, updates);
      
      if (!updatedPhrase) {
        return res.status(404).json({ error: 'Frase não encontrada' });
      }

      res.json(updatedPhrase);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar frase' });
    }
  },

  // DELETE /phrases/:id - Deletar frase
  delete: (req, res) => {
    try {
      const deleted = phrasesDb.delete(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Frase não encontrada' });
      }

      res.json({ message: 'Frase deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar frase' });
    }
  }
};

module.exports = phrasesController;

