# Configuração do JSONBin (sincronização)

As credenciais do JSONBin **não ficam mais no código**. Para a sincronização via JSONBin funcionar, defina a config no frontend de uma destas formas:

## Opção 1: Script antes do app (recomendado para dev)

Crie um arquivo **não versionado** (ex.: `config.jsonbin.js`) na raiz do projeto com:

```javascript
window.__JSONBIN_CONFIG__ = {
  masterKey: 'SUA_MASTER_KEY_JSONBIN',
  binId: 'ID_DO_SEU_BIN'
};
```

Inclua esse script em `index.html` **antes** do `jsonbinService.js`:

```html
<script src="./config.jsonbin.js"></script>
<script src="./jsonbinService.js"></script>
```

Adicione `config.jsonbin.js` ao `.gitignore`.

## Opção 2: Definir em tempo de execução

Em algum ponto do app (ex.: após carregar o usuário ou em uma tela de configurações), execute:

```javascript
window.__JSONBIN_CONFIG__ = {
  masterKey: '...',
  binId: '...'
};
```

A Master Key e o Bin ID são obtidos no painel do [JSONBin.io](https://jsonbin.io).
