# Variáveis de ambiente no Vercel

No Vercel **não se usa arquivo `.env`** no repositório. As variáveis são configuradas no **dashboard** do projeto:

**Project → Settings → Environment Variables**

## Obrigatórias (backend / API)

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL do PostgreSQL (ex.: Neon): `postgresql://user:password@host/db?sslmode=require` |
| `JWT_SECRET` | Segredo para tokens JWT (valor aleatório e seguro) |
| `JWT_REFRESH_SECRET` | Segredo para refresh tokens (valor aleatório e seguro) |

## Push Notifications (para ativar notificações no app)

| Variável | Descrição |
|----------|-----------|
| `VAPID_PUBLIC_KEY` | Chave pública (ver como gerar abaixo) |
| `VAPID_PRIVATE_KEY` | Chave privada (gerada pelo mesmo comando) |
| `VAPID_SUBJECT` | Opcional. Ex.: `mailto:seu@email.com` |

### Como obter as chaves VAPID (para usar no Vercel)

As chaves são geradas **no seu computador**, uma vez. Depois você cola os valores nas variáveis de ambiente do Vercel.

1. No seu PC, abra o terminal na pasta do projeto (ou na pasta `server`).
2. Rode:
   ```bash
   npx web-push generate-vapid-keys
   ```
3. O comando vai mostrar algo assim:
   ```
   ====== VAPID Keys ======
   Public Key:  BEl62iUYgUivxIkv69yViEuiBIa-Ib27-P...
   Private Key: UUxI4O8-FbRouA...
   ========================
   ```
4. No **Vercel** → seu projeto → **Settings** → **Environment Variables**:
   - Crie `VAPID_PUBLIC_KEY` e cole o valor da **Public Key** (inteira).
   - Crie `VAPID_PRIVATE_KEY` e cole o valor da **Private Key** (inteira).
5. Faça um novo deploy (ou aguarde o próximo) para as variáveis passarem a valer.

**Importante:** Use o mesmo par de chaves em todos os ambientes (desenvolvimento e produção). Se você já gerou chaves antes no `.env` local, pode reutilizar essas mesmas no Vercel.

## Quando atualizar o deploy

- **Não** é preciso configurar de novo a cada deploy. As variáveis que já estão no dashboard do Vercel continuam valendo.
- Só é preciso **adicionar ou alterar** variáveis quando você mudar algo (ex.: novo banco, ativar push pela primeira vez, trocar segredos).

## Observação

O frontend usa a mesma origem do deploy (`location.origin`) para chamar a API, então a URL da API e do servidor de push é definida automaticamente — não é necessário definir `API_BASE_URL` no Vercel para o frontend.
