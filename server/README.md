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
- `POST /api/push/subscribe` - Registrar subscription
- `POST /api/push/unsubscribe` - Remover subscription
- `POST /api/push/send` - Enviar notificação push
- `GET /api/push/subscriptions` - Listar subscriptions (debug)
- `GET /health` - Health check

## Uso

O frontend deve:
1. Obter a chave pública VAPID
2. Solicitar permissão de notificação
3. Criar subscription usando a API do navegador
4. Enviar subscription para `/api/push/subscribe`

Para enviar notificações, fazer POST para `/api/push/send` com:
```json
{
  "userId": "user123",
  "title": "Título",
  "body": "Corpo da notificação",
  "icon": "/icon-192.png",
  "url": "/"
}
```
