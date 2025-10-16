# API de Frases e Autores

Uma API RESTful para gerenciamento de frases, autores e categorias. Esta API utiliza arquivos JSON como banco de dados, facilitando o desenvolvimento e testes.

## 📋 Características

- CRUD completo para Frases, Autores e Categorias
- 50 frases pré-cadastradas de autores famosos
- 20 autores conhecidos
- 10 categorias diversas (Sabedoria, Amor, Amizade, Coragem, etc.)
- Busca de frase aleatória
- Filtros por autor e categoria
- Sistema de relacionamentos entre entidades

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor em modo de desenvolvimento
npm run dev

# Ou iniciar servidor em modo de produção
npm start
```

O servidor iniciará na porta 3000 por padrão. Acesse http://localhost:3000 para ver a documentação da API.

## 📚 Endpoints da API

### Frases

#### GET /api/phrases
Lista todas as frases.

**Query Parameters:**
- `author_id` - Filtrar por autor (ex: `?author_id=1`)
- `category_id` - Filtrar por categoria (ex: `?category_id=2`)
- `include=full` - Inclui dados completos de autor e categoria

**Exemplos:**
```bash
# Listar todas as frases
curl http://localhost:3000/api/phrases

# Listar frases de um autor específico
curl http://localhost:3000/api/phrases?author_id=1

# Listar frases com dados completos
curl http://localhost:3000/api/phrases?include=full

# Listar frases de uma categoria
curl http://localhost:3000/api/phrases?category_id=2
```

#### GET /api/phrases/random
Retorna uma frase aleatória.

**Query Parameters:**
- `include=full` - Inclui dados completos de autor e categoria

**Exemplo:**
```bash
curl http://localhost:3000/api/phrases/random?include=full
```

#### GET /api/phrases/:id
Busca uma frase específica por ID.

**Exemplo:**
```bash
curl http://localhost:3000/api/phrases/1?include=full
```

#### POST /api/phrases
Cria uma nova frase.

**Body:**
```json
{
  "text": "A vida é bela",
  "author_id": 1,
  "category_id": 7
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/api/phrases \
  -H "Content-Type: application/json" \
  -d '{"text": "A vida é bela", "author_id": 1, "category_id": 7}'
```

#### PUT /api/phrases/:id
Atualiza uma frase existente.

**Body (todos os campos são opcionais):**
```json
{
  "text": "Texto atualizado",
  "author_id": 2,
  "category_id": 3
}
```

**Exemplo:**
```bash
curl -X PUT http://localhost:3000/api/phrases/1 \
  -H "Content-Type: application/json" \
  -d '{"text": "Texto atualizado"}'
```

#### DELETE /api/phrases/:id
Deleta uma frase.

**Exemplo:**
```bash
curl -X DELETE http://localhost:3000/api/phrases/1
```

### Autores

#### GET /api/authors
Lista todos os autores.

**Exemplo:**
```bash
curl http://localhost:3000/api/authors
```

#### GET /api/authors/:id
Busca um autor específico por ID.

**Exemplo:**
```bash
curl http://localhost:3000/api/authors/1
```

#### POST /api/authors
Cria um novo autor.

**Body:**
```json
{
  "name": "Novo Autor"
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "Novo Autor"}'
```

#### PUT /api/authors/:id
Atualiza um autor existente.

**Body:**
```json
{
  "name": "Nome Atualizado"
}
```

**Exemplo:**
```bash
curl -X PUT http://localhost:3000/api/authors/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Nome Atualizado"}'
```

#### DELETE /api/authors/:id
Deleta um autor.

**Exemplo:**
```bash
curl -X DELETE http://localhost:3000/api/authors/1
```

### Categorias

#### GET /api/categories
Lista todas as categorias.

**Exemplo:**
```bash
curl http://localhost:3000/api/categories
```

#### GET /api/categories/:id
Busca uma categoria específica por ID.

**Exemplo:**
```bash
curl http://localhost:3000/api/categories/1
```

#### POST /api/categories
Cria uma nova categoria.

**Body:**
```json
{
  "name": "Nova Categoria"
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Nova Categoria"}'
```

#### PUT /api/categories/:id
Atualiza uma categoria existente.

**Body:**
```json
{
  "name": "Nome Atualizado"
}
```

**Exemplo:**
```bash
curl -X PUT http://localhost:3000/api/categories/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Nome Atualizado"}'
```

#### DELETE /api/categories/:id
Deleta uma categoria.

**Exemplo:**
```bash
curl -X DELETE http://localhost:3000/api/categories/1
```

## 🗂️ Estrutura do Projeto

```
frases-backend/
├── src/
│   ├── controllers/
│   │   ├── authorsController.js
│   │   ├── categoriesController.js
│   │   └── phrasesController.js
│   ├── database/
│   │   ├── db.js
│   │   ├── authors.json
│   │   ├── categories.json
│   │   └── phrases.json
│   ├── routes/
│   │   ├── authors.js
│   │   ├── categories.js
│   │   └── phrases.js
│   └── server.js
├── package.json
└── README.md
```

## 📊 Estrutura de Dados

### Phrase
```json
{
  "id": 1,
  "text": "Texto da frase",
  "author_id": 1,
  "category_id": 1
}
```

### Author
```json
{
  "id": 1,
  "name": "Nome do Autor"
}
```

### Category
```json
{
  "id": 1,
  "name": "Nome da Categoria"
}
```

## 🎯 Categorias Disponíveis

1. Sabedoria
2. Amor
3. Amizade
4. Coragem
5. Aprendizado
6. Motivação
7. Felicidade
8. Sucesso
9. Vida
10. Inspiração

## ✨ Exemplos de Uso

### Buscar frase aleatória com dados completos
```bash
curl http://localhost:3000/api/phrases/random?include=full
```

Resposta:
```json
{
  "id": 5,
  "text": "Seja a mudança que você deseja ver no mundo.",
  "author_id": 3,
  "category_id": 10,
  "author": {
    "id": 3,
    "name": "Mahatma Gandhi"
  },
  "category": {
    "id": 10,
    "name": "Inspiração"
  }
}
```

### Buscar todas as frases de amor
```bash
curl http://localhost:3000/api/phrases?category_id=2&include=full
```

### Criar uma nova frase
```bash
curl -X POST http://localhost:3000/api/phrases \
  -H "Content-Type: application/json" \
  -d '{
    "text": "O importante é não parar de questionar.",
    "author_id": 1,
    "category_id": 5
  }'
```

## 🔧 Tecnologias Utilizadas

- Node.js
- Express
- CORS
- File System (JSON como banco de dados)

## 📝 Notas

- Os dados são persistidos em arquivos JSON na pasta `src/database/`
- Todas as alterações (criar, atualizar, deletar) são salvas automaticamente nos arquivos
- Os IDs são gerados automaticamente de forma incremental
- A API utiliza CORS para permitir requisições de diferentes origens

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades!

## 📄 Licença

MIT

