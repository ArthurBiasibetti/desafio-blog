# Purplose

> ## Objetivo

Desenvolver um **Blog** onde se possa criar posts sobre assuntos variados

> ## Tecnologias

- NodeJs
- Typescript
- Tsoa - para gerenciamento de documentação do swagger
- Jest

> ## Iniciando a aplicação:

Primeiro digite:

- `$ npm install` ou `$ yarn install`.

Após isso suba o banco de dados no docker digitando:

- `$ npm run postgres:up` ou `$ yarn postgres:up`

Para construir as tabelas digite:

- `$ npm run typeorm:migrations:run` ou `$ yarn typeorm:migrations:run`

Para criar o usuario admin digite:

- `$ npm run typeorm:seed` ou `$ yarn typeorm:seed`

> ## Rotas da aplicação

Pode se ver as rotas da aplicação através do swagger na rota [localhost:3001/docs](http://localhost:3001/docs)

**É necessario estar com a aplicação rodando! ⚠️**
