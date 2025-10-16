const express = require('express');
const cors = require('cors');

const phrasesRoutes = require('./routes/phrases');
const authorsRoutes = require('./routes/authors');
const categoriesRoutes = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'API de Frases e Autores',
    version: '1.0.0',
    endpoints: {
      phrases: '/api/phrases',
      authors: '/api/authors',
      categories: '/api/categories'
    },
    documentation: {
      phrases: {
        'GET /api/phrases': 'Listar todas as frases (query params: ?author_id=1, ?category_id=1, ?include=full)',
        'GET /api/phrases/random': 'Obter frase aleatória (?include=full)',
        'GET /api/phrases/:id': 'Buscar frase por ID (?include=full)',
        'POST /api/phrases': 'Criar nova frase (body: {text, author_id, category_id})',
        'PUT /api/phrases/:id': 'Atualizar frase (body: {text?, author_id?, category_id?})',
        'DELETE /api/phrases/:id': 'Deletar frase'
      },
      authors: {
        'GET /api/authors': 'Listar todos os autores',
        'GET /api/authors/:id': 'Buscar autor por ID',
        'POST /api/authors': 'Criar novo autor (body: {name})',
        'PUT /api/authors/:id': 'Atualizar autor (body: {name})',
        'DELETE /api/authors/:id': 'Deletar autor'
      },
      categories: {
        'GET /api/categories': 'Listar todas as categorias',
        'GET /api/categories/:id': 'Buscar categoria por ID',
        'POST /api/categories': 'Criar nova categoria (body: {name})',
        'PUT /api/categories/:id': 'Atualizar categoria (body: {name})',
        'DELETE /api/categories/:id': 'Deletar categoria'
      }
    }
  });
});

// Rotas da API
app.use('/api/phrases', phrasesRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/categories', categoriesRoutes);

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Acesse http://localhost:${PORT} para ver a documentação`);
});

module.exports = app;

