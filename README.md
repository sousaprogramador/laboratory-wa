# Instruções
## Usuario e Senha
  - admin@admin.com | password: 123456
## Desenvolvimento
- Informe no arquivo `.ormconfig.json` as variáveis de acesso de banco de dados;
- Inicie um banco de dados mysql;
- Execute:

```bash
yarn                         ## install
yarn typeorm migration:run   ## run migration
yarn dev                     ## start dev server
```

- Outra alternativa é utilizar o `Docker` e o `docker-compose`, usando o comando:

```bash
docker-compose up -d
```

## Produção

- Informe no arquivo `.ormconfig.json` as variáveis do ambiente de produção.;
- Inicie um banco de dados mysql;
- Execute:

```bash
yarn                         ## install
yarn build                   ## build with babel and webpack
yarn typeorm migration:run   ## run migrations
yarn start                   ## start server
```

- Já existe uma implementação em produção, na plataforma `Digital Ocean`:
  - [desafio-wa-laboratory](http://206.189.229.140:4000/);
## Banco de Dados

- Adicione as configurações nas variáveis de ambiente do seu banco de dados. De preferência, utilizado MySQL, pois foi desenvolvido nele a API:
  - `type`;
  - `host`;
  - `username`;
  - `password`;
  - `database`;
  - `port`.
