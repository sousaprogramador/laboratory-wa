# Instruções
## Desenvolvimento
- Informe no arquivo `.ormconfig.json` as variáveis de ambiente, como credenciais, acesso de banco de dados, secrets, etc;
- Inicie um banco de dados postgresql;
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

- Informe no arquivo `.ormconfig.json` as variáveis do ambiente de produção. IMPORTANTE: você precisa alterar as variáveis
  do TypeORM para usar o diretório de produção, substituindo `src` por `dist` e `*.ts` por `*.js`;
- Inicie um banco de dados postgresql;
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
