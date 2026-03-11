# Backend Push Notifications - NihonGo Deck

Backend simples em Express para gerenciar push notifications do PWA.

## Configuração

1. Instalar dependências:
```bash
npm install
```

2. Gerar VAPID keys:
```bash
npx web-push generate-vapid-keys
```

3. Criar arquivo `.env` baseado em `.env.example` e adicionar as VAPID keys geradas.

4. Iniciar servidor:
```bash
npm start
# ou para desenvolvimento com auto-reload:
npm run dev
```

## Endpoints

- `GET /api/push/vapid-public-key` - Obter chave pública VAPID
- `POST /api/push/subscribe` - Registrar subscription (**requer autenticação**)
- `POST /api/push/unsubscribe` - Remover subscription (**requer autenticação**)
- `POST /api/push/send` - Enviar notificação push (**requer autenticação**; envia apenas para o próprio usuário)
- `GET /api/push/subscriptions` - Listar subscriptions (autenticado)
- `GET /health` - Health check

## Uso

O frontend deve:
1. Estar autenticado (Bearer token).
2. Obter a chave pública VAPID.
3. Solicitar permissão de notificação.
4. Enviar subscription para `/api/push/subscribe` (o usuário é identificado pelo token).

Para enviar notificações, fazer POST para `/api/push/send` com **Authorization: Bearer &lt;accessToken&gt;** e body:
```json
{
  "title": "Título",
  "body": "Corpo da notificação",
  "icon": "/icon-192.png",
  "url": "/"
}
```
(As notificações são enviadas apenas para o usuário autenticado.)
