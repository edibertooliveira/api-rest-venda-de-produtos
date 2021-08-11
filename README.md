# Api Venda de produtos

# Contexto
Este projeto trata-se de uma ferramenta de back-office para operações de venda ao cliente cadastrado.

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, PostgreSQL, TypeScript, TypeORM


## Instalando Dependências

> Backend
```bash
cd api-rest-venda-de-produtos/
npm install / yarn
npm run typeorm migration:run / yarn typeorm migration:run
```

> Observação
_Necessario ter instalado: Nodejs, postgreSQL-server, redis_

### Configurações das Variáveis de Ambiente
Deve criar um arquivo `.env` baseado no modelo `.env.exemplo` na raiz principal do projeto.

>Configurações locais:

```
Autorização: senha secreta do JWT;
Banco de dados: porta, usuario, e senha;
Cache: host, porta e senha do redis.
```

## Executando aplicação

>Para rodar o back-end:

  ```bash
  npm run dev / yarn dev
  ```

