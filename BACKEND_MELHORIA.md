# Melhoria no Backend – Guia para outro projeto

Este documento descreve como replicar a melhoria do backend (banco de dados + login de usuários + API de flashcards) em **outro projeto**. Use como checklist e referência de implementação.

---

## 1. Visão geral

**Objetivo:** Ter um backend com banco de dados (SQLite), autenticação (JWT), e endpoints para usuários, decks, cards, tags e sincronização em blob, além de integrar Push com auth e persistência.

**Stack:** Node.js, Express, SQLite (better-sqlite3), JWT (jsonwebtoken), bcrypt.

---

## 2. Dependências

No `package.json` do servidor, incluir:

```json
{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "better-sqlite3": "^11.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "web-push": "^3.6.6"
  }
}
```

Instalar: `npm install`.

---

## 3. Variáveis de ambiente (.env)

Criar/atualizar `.env` (e `.env.example`) com:

```env
# VAPID (Push)
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:admin@example.com

# JWT (obrigatório em produção)
JWT_SECRET=your_jwt_secret_change_in_production
JWT_REFRESH_SECRET=your_jwt_refresh_secret_change_in_production

# Servidor
PORT=3000

# Banco (opcional)
# DATABASE_PATH=./data/flashcard.db
```

---

## 4. Banco de dados (db.js)

- Criar arquivo `db.js` na raiz do servidor.
- Garantir que o diretório do banco exista antes de abrir (ex.: `data/`).
- Usar `better-sqlite3`, caminho absoluto quando `DATABASE_PATH` for relativo.
- Habilitar `foreign_keys = ON`.
- Executar um `initSchema()` que cria as tabelas (e índices) abaixo.

**Schema SQL (resumo):**

```sql
-- users
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- refresh_tokens (para logout/refresh)
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- decks (id texto para compatibilidade com frontend)
CREATE TABLE IF NOT EXISTS decks (
  id TEXT NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- cards
CREATE TABLE IF NOT EXISTS cards (
  id TEXT NOT NULL PRIMARY KEY,
  deck_id TEXT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  kanji TEXT,
  reading TEXT,
  meaning TEXT,
  interval INTEGER DEFAULT 0,
  next_review INTEGER,
  ease_factor REAL DEFAULT 2.5,
  tags TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- push_subscriptions (user_id pode ser NULL para anônimo)
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  keys TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(endpoint)
);

-- lastSync por usuário
CREATE TABLE IF NOT EXISTS user_sync_metadata (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  last_sync TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_decks_user_id ON decks(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_deck_id ON cards(deck_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user_id ON push_subscriptions(user_id);
```

- Em `cards`, o campo `tags` armazena JSON (array de strings).
- Exportar a instância do banco: `module.exports = db;`.

---

## 5. Middleware de autenticação (middleware/auth.js)

- Ler `JWT_SECRET` e `JWT_REFRESH_SECRET` do `process.env` (com fallback para dev).
- Funções:
  - `signAccessToken(payload, expiresIn)` – ex.: 15m.
  - `signRefreshToken(payload, expiresIn)` – ex.: 7d.
  - `verifyAccessToken(token)` e `verifyRefreshToken(token)`.
  - `authMiddleware(req, res, next)` – lê header `Authorization: Bearer <token>`, valida access token, define `req.user = { id, email }`, ou responde 401.
  - `optionalAuth(req, res, next)` – se houver Bearer válido, preenche `req.user`; senão segue sem erro.
- Payload sugerido: `{ userId, email }`.

---

## 6. Rotas de autenticação (routes/auth.js)

- **POST /api/auth/register**  
  Body: `{ email, password, name? }`.  
  Validar email e senha (ex.: senha mín. 6 caracteres). Verificar se email já existe. Hash da senha com bcrypt (ex.: 10 rounds). Inserir em `users`. Gerar access + refresh token. Inserir refresh token em `refresh_tokens` com `expires_at`. Retornar `{ user: { id, email, name }, accessToken, refreshToken, expiresIn }` (201).

- **POST /api/auth/login**  
  Body: `{ email, password }`.  
  Buscar usuário por email, comparar senha com bcrypt. Gerar access + refresh token, salvar refresh em `refresh_tokens`. Retornar `{ user, accessToken, refreshToken, expiresIn }`.

- **POST /api/auth/refresh**  
  Body: `{ refreshToken }`.  
  Verificar JWT do refresh e existência/não expirado em `refresh_tokens`. Gerar novo access token. Retornar `{ accessToken, expiresIn }`.

- **GET /api/auth/me**  
  Protegido por `authMiddleware`. Buscar usuário por `req.user.id`, retornar `{ user: { id, email, name, created_at } }`.

- **POST /api/auth/logout**  
  Body: `{ refreshToken? }`. Se enviado, remover da tabela `refresh_tokens`. Retornar `{ success: true }`.

Montar em `app.use('/api/auth', authRoutes)`.

---

## 7. Rotas de usuário (routes/users.js)

- Todas as rotas com `authMiddleware`.
- **GET /api/users/me** – retornar perfil (id, email, name, created_at, updated_at).
- **PATCH /api/users/me** – body `{ name?, email? }`; atualizar apenas campos enviados; ao alterar email, checar unicidade.
- **GET /api/users/me/sync-metadata** – retornar `{ lastSync }` de `user_sync_metadata` para o usuário logado.

Montar em `app.use('/api/users', usersRoutes)`.

---

## 8. Rotas de decks (routes/decks.js)

- Todas com `authMiddleware`. Usar `req.user.id` como `user_id`.
- **GET /api/decks** – listar decks do usuário; incluir cards (ou count) em cada deck; formato de card: `id, kanji, reading, meaning, interval, nextReview, easeFactor, tags` (tags como array).
- **GET /api/decks/:id** – um deck com todos os cards; 404 se não pertencer ao usuário.
- **POST /api/decks** – body `{ name, id? }`; se não enviar `id`, gerar (ex.: `deck_${Date.now()}_${random}`). Inserir em `decks`. Retornar deck criado (com `cards: []`).
- **PATCH /api/decks/:id** – body `{ name? }`; atualizar nome; 404 se não for do usuário.
- **DELETE /api/decks/:id** – deletar deck (e cards em cascata); 404 se não for do usuário.

Montar em `app.use('/api/decks', decksRoutes)`.

---

## 9. Rotas de cards (routes/cards.js)

- Router com `mergeParams: true` e montado em `/api/decks/:deckId/cards`.
- Middleware que verifica se o deck existe e pertence a `req.user.id`; definir `req.deckId`.
- **GET /api/decks/:deckId/cards** – listar cards do deck (paginação opcional: `?page=1&limit=100`). Resposta: `{ cards, total, page, limit }`.
- **GET /api/decks/:deckId/cards/:cardId** – um card; 404 se não existir ou não for do deck.
- **POST /api/decks/:deckId/cards/bulk** – body `{ cards: [{ kanji, reading, meaning, tags?, ... }] }`. Inserir em lote; rota deve vir **antes** de `POST /:cardId` para não confundir "bulk" com cardId.
- **POST /api/decks/:deckId/cards** – body um card; gerar `id` se não enviado; inserir em `cards` (tags como JSON string).
- **PATCH /api/decks/:deckId/cards/:cardId** – atualizar campos enviados (kanji, reading, meaning, interval, nextReview, easeFactor, tags).
- **DELETE /api/decks/:deckId/cards/:cardId** – deletar card; 404 se não existir.

Mapear linha do banco para objeto: `nextReview` ← `next_review`, `easeFactor` ← `ease_factor`, `tags` ← `JSON.parse(tags)` (ou array vazio).

Montar em `app.use('/api/decks/:deckId/cards', cardsRoutes)`.

---

## 10. Rotas de tags (routes/tags.js)

- **GET /api/tags** – protegido por auth. Coletar todas as tags únicas dos cards dos decks do usuário (ler campo `tags` em `cards` e fazer parse do JSON). Retornar `{ tags: string[] }` ordenado.

Montar em `app.use('/api/tags', tagsRoutes)`.

---

## 11. Rotas de sincronização (routes/sync.js)

- Objetivo: compatibilidade com cliente que envia/recebe blob completo `{ decks, tags }`.
- Todas as rotas com `authMiddleware`; usar `req.user.id`.

- **GET /api/sync**  
  Buscar todos os decks do usuário com seus cards; montar array no formato `{ id, name, cards }` (cada card com `id, kanji, reading, meaning, interval, nextReview, easeFactor, tags`). Coletar tags únicas dos cards (ou de `user_sync_metadata`/outra fonte). Buscar `last_sync` em `user_sync_metadata`. Retornar `{ decks, tags, lastSync }`.

- **PUT /api/sync** e **POST /api/sync**  
  Body: `{ decks?, tags? }`.  
  Lógica de merge/replace:
  - Para cada deck em `decks`: se já existir deck com aquele `id` e `user_id`, atualizar nome; senão inserir. Deletar todos os cards do deck e reinserir os que vêm no payload (gerar `id` para deck/card se não vier).
  - Atualizar `user_sync_metadata` com `last_sync = now()`.
  - Resposta: `{ lastSync }`.

Montar em `app.use('/api/sync', syncRoutes)`.

---

## 12. Integração do Push com auth e banco

- **GET /api/push/vapid-public-key** – retornar `VAPID_PUBLIC_KEY` (pode ser público).
- **POST /api/push/subscribe**  
  Usar `optionalAuth`. Body: `{ subscription, userId? }`. Se `req.user` existir, usar `req.user.id`; senão usar `userId` do body ou null. Inserir/atualizar em `push_subscriptions` (endpoint único): `user_id`, `endpoint`, `keys` (JSON string do `subscription.keys`). Ex.: `INSERT ... ON CONFLICT(endpoint) DO UPDATE SET user_id=..., keys=...`.
- **POST /api/push/unsubscribe** – body `{ endpoint }`; deletar por endpoint.
- **POST /api/push/send** – body `userId?, title, body, icon?, ...`. Buscar em `push_subscriptions` por `user_id` quando `userId` for informado; senão buscar todos. Para cada linha, montar objeto `{ endpoint, keys: JSON.parse(keys) }` e chamar `webpush.sendNotification`. Em erros 410/404, remover subscription do banco.
- **GET /api/push/subscriptions** – protegido por auth; retornar subscriptions do `req.user.id` (ex.: endpoint mascarado, createdAt).

---

## 13. Utilitários no app principal (index.js ou app.js)

- **GET /health** – retornar `{ status: 'ok', timestamp, subscriptions? }` (subscriptions pode ser count da tabela push).
- **GET /api/version** – opcional; retornar versão do app (ex.: lendo de um arquivo ou constante).

---

## 14. Ordem de montagem e CORS

- `require('dotenv').config()` no início.
- `require('./db')` para garantir criação do banco e schema.
- `app.use(cors())` e `app.use(express.json())`.
- Montar rotas: auth (público), users, decks, cards, tags, sync (protegidas). Depois rotas de push e utilitários.
- Iniciar servidor com `app.listen(PORT)`.

---

## 15. Checklist final (backend)

- [ ] Dependências instaladas (bcrypt, better-sqlite3, jsonwebtoken, etc.).
- [ ] `.env` e `.env.example` com JWT e VAPID e PORT/DATABASE_PATH.
- [ ] `db.js` cria diretório do banco, abre SQLite e executa schema (users, refresh_tokens, decks, cards, push_subscriptions, user_sync_metadata + índices).
- [ ] Middleware de auth (Bearer, sign/verify access e refresh).
- [ ] Rotas auth: register, login, refresh, me, logout.
- [ ] Rotas users: GET/PATCH me, GET sync-metadata.
- [ ] Rotas decks: list, get, create, update, delete (sempre por user_id).
- [ ] Rotas cards: list, get, create, bulk create, update, delete (deck ownership).
- [ ] Rotas tags: GET (tags únicas do usuário).
- [ ] Rotas sync: GET (blob completo), PUT/POST (receber blob e persistir).
- [ ] Push: subscribe com user_id (token ou body), unsubscribe, send (por userId), subscriptions no banco.
- [ ] Health e opcionalmente version.
- [ ] `.gitignore` incluir `data/` e `.env`.

---

## 16. Estrutura de arquivos sugerida

```
server/
  .env
  .env.example
  .gitignore
  package.json
  db.js
  index.js
  middleware/
    auth.js
  routes/
    auth.js
    users.js
    decks.js
    cards.js
    tags.js
    sync.js
  data/
    flashcard.db   (gerado)
```

Com isso, o backend fica pronto para outro projeto usar a mesma melhoria (banco + login + API de flashcards + sync em blob + push integrado).
