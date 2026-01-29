# Melhoria no Frontend – Guia para outro projeto

Este documento descreve como replicar a melhoria do frontend (login/registro + uso da API em vez de JSONBin + sincronização e offline) em **outro projeto**. Use como checklist e referência.

---

## 1. Visão geral

**Objetivo:**  
- Ter login e registro de usuários.  
- Usar a API do backend (GET/PUT `/api/sync` e auth) quando o usuário estiver logado.  
- Manter compatibilidade com o fluxo antigo (ex.: JSONBin + ID manual) quando não houver login.  
- Sincronização offline (outbox) enviar para a API quando logado, ou para o serviço antigo.

**Pré-requisito:** Backend já implementado conforme `BACKEND_MELHORIA.md` (auth + sync + decks/cards/tags).

---

## 2. Novo serviço: apiService.js

Criar um módulo (ex.: `src/services/apiService.js`) que centraliza chamadas à API e tokens.

### 2.1 Configuração

- **Base URL:** `window.API_BASE_URL` ou variável de ambiente ou constante (ex.: `http://localhost:3000`).
- **Chaves no localStorage:**  
  - `api_access_token`  
  - `api_refresh_token`  
  - `api_user` (JSON do objeto user: `{ id, email, name }`)

### 2.2 Funções de token e usuário

- `getAccessToken()` – ler access token do localStorage.
- `getRefreshToken()` – ler refresh token do localStorage.
- `getStoredUser()` – ler e fazer `JSON.parse` de `api_user`; retornar `null` se não houver.
- `setTokens(accessToken, refreshToken, user)` – salvar os três no localStorage.
- `clearTokens()` – remover as três chaves.
- `isLoggedIn()` – retornar `!!getAccessToken()`.
- `authHeaders()` – retornar `{ Authorization: 'Bearer ' + getAccessToken() }` ou `{}`.

### 2.3 Refresh de token

- Função `refreshAccessToken()`:  
  - Enviar `POST /api/auth/refresh` com body `{ refreshToken: getRefreshToken() }`.  
  - Se 200, salvar novo `accessToken` no localStorage e retornar `true`.  
  - Se erro, chamar `clearTokens()` e retornar `false`.

### 2.4 Requisições genéricas

- `request(method, path, body, options)`:  
  - Montar URL (base + path).  
  - Headers: `Content-Type: application/json` e `...authHeaders()`.  
  - Se resposta 401 e existir refresh token e não for retry, chamar `refreshAccessToken()` e repetir a requisição uma vez (`options._retry`).  
  - Retornar o `Response` (fetch).

### 2.5 Auth

- **register(email, password, name)**  
  - `POST /api/auth/register` com `{ email, password, name }`.  
  - Se sucesso: `setTokens(data.accessToken, data.refreshToken, data.user)` e retornar `{ success: true, user, accessToken, refreshToken }`.  
  - Se erro: retornar `{ success: false, error: mensagem }`.

- **login(email, password)**  
  - `POST /api/auth/login` com `{ email, password }`.  
  - Mesma lógica de tokens e retorno.

- **logout()**  
  - Opcional: `POST /api/auth/logout` com `{ refreshToken }`.  
  - Chamar `clearTokens()` e retornar `{ success: true }`.

- **getMe()**  
  - `GET /api/auth/me` usando `request()`.  
  - Retornar `{ success: true, user }` ou `{ success: false, error }`. Em 401, chamar `clearTokens()`.

### 2.6 Sync (compatível com fluxo atual)

- **getSync()**  
  - `GET /api/sync` (com auth).  
  - Resposta esperada: `{ decks, tags, lastSync }`.  
  - Retornar `{ success: true, data: { decks, tags, lastSync } }` ou `{ success: false, error }`.

- **updateUserData(userData)**  
  - `PUT /api/sync` com body `{ decks: userData.decks || [], tags: userData.tags || [] }`.  
  - Retornar `{ success: true, lastSync }` ou `{ success: false, error }`.

### 2.7 Exportar no escopo global (se não usar bundler)

- Expor um objeto (ex.: `window.apiService`) com todas as funções acima e `API_BASE`, para o app e o syncManager usarem.

---

## 3. Inclusão do script no HTML

- Incluir o script do apiService **antes** do script que usa localStorage/sync (ex.: antes de `offlineStorage.js` e do app principal).  
- Exemplo: `<script src="./src/services/apiService.js"></script>`.

---

## 4. Estado no App (React ou equivalente)

Adicionar estado para login e formulário de auth:

- `apiUser` – objeto do usuário logado ou `null` (inicializar com `apiService.getStoredUser()` se existir).
- `showAuthModal` – boolean para exibir modal de login/registro.
- `authMode` – `'login'` ou `'register'`.
- `authEmail`, `authPassword`, `authName` – campos do formulário.
- `authError` – mensagem de erro no modal.
- `authLoading` – boolean durante submit.

Ao montar o app, em um `useEffect` sem dependências (ou equivalente), chamar `apiService.getStoredUser()` e, se existir, setar `apiUser` (para restaurar sessão após refresh).

---

## 5. Handlers de auth

- **handleLogin()**  
  - Validar email e senha.  
  - Chamar `apiService.login(authEmail, authPassword)`.  
  - Se sucesso: setar `apiUser` com `result.user`, fechar modal, limpar campos e `authError`, mostrar mensagem de sucesso.  
  - Se erro: setar `authError` com `result.error`.

- **handleRegister()**  
  - Validar email, senha (ex.: mín. 6 caracteres) e opcionalmente nome.  
  - Chamar `apiService.register(authEmail, authPassword, authName)`.  
  - Mesma lógica de sucesso/erro que o login.

- **handleLogout()**  
  - Chamar `apiService.logout()`.  
  - Setar `apiUser` para `null` e mostrar mensagem (ex.: "Você saiu da conta").

---

## 6. Modal de Login/Registro

- Exibir quando `showAuthModal` for true.
- Título: "Entrar" ou "Criar conta" conforme `authMode`.
- Campos:
  - Email (obrigatório).
  - Nome (opcional), apenas quando `authMode === 'register'`.
  - Senha (obrigatório); placeholder em registro pode ser "Mínimo 6 caracteres".
- Se `authError`, exibir em destaque (ex.: texto vermelho).
- Botões:
  - Um para alternar modo: "Criar conta" quando em login, "Já tenho conta" quando em registro; ao clicar, trocar `authMode` e limpar `authError`.
  - Um para submit: "Entrar" ou "Registrar"; desabilitar se `authLoading` ou falta email/senha; ao clicar chamar `handleLogin` ou `handleRegister`.
- Fechar modal: limpar `authError`, `authEmail`, `authPassword`, `authName` e setar `showAuthModal` false.

---

## 7. Menu de Sincronização (Configurações)

Ajustar a seção de "Sincronização" no menu de configurações:

- **Se `apiUser` existir (logado):**  
  - Mostrar texto "Logado: {email}".  
  - Botão "Sincronizar Dados" (chama a função de sync existente).  
  - Botão "Sair" (chama `handleLogout`).

- **Se não logado:**  
  - Botão "Entrar (Login)" – abre modal de auth com `authMode = 'login'`.  
  - Botão "Registrar conta" – abre modal com `authMode = 'register'`.  
  - Se o projeto ainda tiver fluxo antigo (ex.: JSONBin): manter opções "Criar Novo ID de Usuário" e "Inserir ID de Usuário" apenas quando não logado; quando logado, não exibir essas opções.

---

## 8. Funções de dados: saveData, loadData, syncData

Garantir que, quando o usuário estiver logado, usem a API; caso contrário, o fluxo antigo (ex.: JSONBin).

### 8.1 saveData (salvar na nuvem)

- Montar objeto de sync a partir do estado atual (ex.: `decks` e `tags` do localStorage ou estado).
- Se `apiService.isLoggedIn()`:  
  - Chamar `apiService.updateUserData(syncData)`.  
  - Tratar sucesso/erro e retornar.
- Senão: manter lógica antiga (ex.: JSONBin com `userBinId`).  
  - Se não houver nem login nem ID antigo, mostrar mensagem: "Faça login ou configure o ID de usuário primeiro."

### 8.2 loadData (carregar da nuvem)

- Se `apiService.isLoggedIn()`:  
  - Chamar `apiService.getSync()`.  
  - Se sucesso, aplicar `data.decks` e `data.tags` no estado e no localStorage (e mostrar feedback).
- Senão: manter lógica antiga (ex.: JSONBin).  
  - Se não houver login nem ID, mostrar mensagem pedindo login ou configuração.

### 8.3 syncData (merge local + nuvem e salvar)

- Se `apiService.isLoggedIn()`:  
  - Carregar dados locais (decks/tags).  
  - Chamar `apiService.getSync()` para obter dados da nuvem.  
  - Fazer merge (mesma lógica de merge que já existir no app: decks e cards por id, tags união).  
  - Atualizar estado e localStorage com o resultado.  
  - Chamar `apiService.updateUserData({ decks: mergedDecks, tags: mergedTags })`.  
  - Mostrar mensagem de sucesso e encerrar.
- Senão: manter fluxo antigo (buscar da nuvem, merge, salvar na nuvem com JSONBin ou equivalente).  
  - Exigir login ou ID conforme o caso.

Em todos os casos, usar um estado de "loading" (ex.: `isSyncing`) e desabilitar botões durante a operação.

---

## 9. Sincronização ao ficar online

- No efeito que escuta o evento `online`:  
  - Condição para rodar sync não deve depender só do ID antigo; deve incluir "logado na API".  
  - Exemplo: `canSync = jsonbinBinId || apiService.isLoggedIn()`.  
  - Se `canSync` e existir `syncManager`, chamar `syncManager.syncAll()` (ou equivalente).  
- Incluir `apiUser` (ou um booleano derivado) nas dependências do efeito para que, após login, a próxima vez que ficar online já use a nova condição.

---

## 10. syncManager (offline / outbox)

- No módulo que processa a fila de sincronização (ex.: `syncManager.js`), para cada item do outbox:
  - Se `apiService.isLoggedIn()`:  
    - Para operações do tipo "deck_update" / "deck_create": chamar `apiService.updateUserData(item.data)` (onde `item.data` tem `decks` e `tags`).  
    - Para "card_create" / "card_update": obter estado atual com `apiService.getSync()`, aplicar a alteração do item no objeto (deck/cards), depois `apiService.updateUserData(...)` com o objeto completo.  
    - Marcar item como sincronizado ou remover da fila em caso de sucesso; em caso de erro, manter para retry.
  - Senão: manter a lógica antiga (ex.: `jsonbinService.updateUserData(userId, ..., data)` com `userId` do localStorage).

Assim, o replay offline passa a usar a API quando o usuário estiver logado.

---

## 11. Push (notificações)

- Onde o app registra a subscription de push (ex.: ao ativar notificações):  
  - Enviar `userId` para o backend.  
  - Se logado: usar `apiUser.id` (ou `apiService.getStoredUser().id`) como `userId`.  
  - Se não: usar o ID antigo (ex.: JSONBin) ou `'anonymous'`.  
- Assim o backend associa a subscription ao usuário logado quando existir.

---

## 12. Limpeza de dados (clearData)

- Na função que limpa todos os dados (ex.: "Limpar tudo" nas configurações):  
  - Além de limpar estado e localStorage dos decks/tags e do ID antigo, chamar `apiService.clearTokens()` e setar `apiUser` para `null`.  
- Isso evita ficar "logado" com tokens inválidos após limpar.

---

## 13. Exportar / importar dados da nuvem (se existir)

- Exportar dados da nuvem:  
  - Se logado: usar `apiService.getSync()` e gerar o arquivo (ex.: JSON) a partir de `result.data`.  
  - Senão: manter fluxo antigo (ex.: JSONBin).  
  - Exigir login ou ID se não houver nenhum dos dois.
- Carregar/visualizar dados da nuvem:  
  - Se logado: usar `apiService.getSync()` para preencher a pré-visualização ou estado.  
  - Senão: fluxo antigo.  
- Botões que dependem de "ter conta configurada" devem considerar `apiUser || jsonbinBinId` (ou equivalente) para habilitar/desabilitar.

---

## 14. Painel / debug (se existir)

- Onde for exibido "ID Usuário JSONBin" ou equivalente:  
  - Mostrar "Conta: {email}" quando `apiUser` existir; caso contrário, "JSONBin ID: ..." ou "Não configurado".  
- Botões que dependem de ter "conta" para exportar/carregar nuvem:  
  - `disabled={loadingCloud || (!apiUser && !jsonbinBinId)}` (ou equivalente no seu estado).

---

## 15. Checklist final (frontend)

- [ ] `apiService.js` criado com: base URL, tokens no localStorage, getSync, updateUserData, login, register, logout, getMe, isLoggedIn, clearTokens, authHeaders, refresh em 401.
- [ ] Script do apiService incluído no HTML antes dos que usam sync/login.
- [ ] Estado de auth e formulário (apiUser, showAuthModal, authMode, authEmail, authPassword, authName, authError, authLoading).
- [ ] useEffect para restaurar apiUser a partir de getStoredUser() ao montar.
- [ ] Handlers: handleLogin, handleRegister, handleLogout.
- [ ] Modal de login/registro com campos e alternância de modo.
- [ ] Menu de sincronização: quando logado, mostrar email + Sincronizar + Sair; quando não, Entrar + Registrar + (opcional) opções antigas de ID.
- [ ] saveData, loadData, syncData: usar API quando apiService.isLoggedIn(), senão fluxo antigo; mensagens adequadas quando nem login nem ID.
- [ ] Evento "online": condição de sync inclui apiService.isLoggedIn(); dependências do efeito incluem apiUser (ou equivalente).
- [ ] syncManager: ao processar outbox, se logado usar apiService.getSync/updateUserData; senão fluxo antigo.
- [ ] Push: userId = apiUser.id quando logado.
- [ ] clearData: chamar apiService.clearTokens() e setar apiUser null.
- [ ] Export/import nuvem e botões de "conta" consideram apiUser e jsonbinBinId (ou equivalente).

Com isso, o frontend fica preparado para usar o backend com login e API em outro projeto, mantendo compatibilidade com o fluxo antigo quando desejado.
