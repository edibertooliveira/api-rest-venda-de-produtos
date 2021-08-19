<p align="center">
<a href="https://www.linkedin.com/in/ediberto-b-oliveira-872926178/">
  <img alt="Ediberto Oliveira" src="https://img.shields.io/badge/Author-Ediberto%20Oliveira-red" />
  </a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/edibertooliveira/api-rest-venda-de-produtos?color=red">

  <a aria-label="Completed" href="https://edibertooliveira.github.io/api-rest-venda-de-produtos/">
    <img src="https://img.shields.io/badge/Project-api--rest--venda--de--produtos-red"></img>
  </a>
  <a href="https://github.com/edibertooliveira/api-rest-venda-de-produtos/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/edibertooliveira/api-rest-venda-de-produtos?color=red">
  </a>

  <a href="https://github.com/edibertooliveira/api-rest-venda-de-produtos/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-red">
  </a>

   <a href="https://github.com/edibertooliveira/api-rest-venda-de-produtos/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/edibertooliveira/api-rest-venda-de-produtos?color=red">
  </a>
</p>

# API Rest Venda de produtos

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

