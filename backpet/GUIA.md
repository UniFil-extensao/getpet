# API do GETPET

## Índice

1. <a style="color: inherit" href="#install">Instalação (Desenvolvimento)</a>
1. <a style="color: inherit" href="#scripts">Scripts de Desenvolvimento</a>
1. <a style="color: inherit" href="#structure">Estrutura do Código</a>
1. <a style="color: inherit" href="#routes">Rotas</a>
1. <a style="color: inherit" href="#tests">Testes</a>
1. <a style="color: inherit" href="#help">Socorro</a>

## Instalação<span id="install"></span>

### Necessário

Esses devem ser instalados manualmente.

1. [Node.js](https://nodejs.org/)
1. NPM (Vem junto com o Node.js)
1. [MariaDB](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.8&os=windows&cpu=x86_64&pkg=msi&m=fder)

### Passos

Ao baixar o projeto pela primeira vez, será necessário criar o banco de dados para o projeto e instalar as dependências.

> As instruções consideram que o diretório atual é `/backpet`.

1. Instale as dependências:

   ```bash
   npm install
   ```

1. Crie seu arquivo `.env`.

   Utilize como base o arquivo .env.example. Esse aruivo **_NÃO DEVE_** ser commitado.

   Para desenvolvimento, uma simples _cópia_ do arquivo `.env.example`, renomeada para `.env` é suficiente.

1. Certifique-se que o MariaDB está instalado e, caso estiver usando Windows, acessível no `%PATH%`.

1. Crie os bancos de dados e o usuário da aplicação:

   Windows

   ```batch
   mariadb -u root -p < config\startdb.sql
   ```

   Linux

   ```bash
   sudo mariadb -u root -p < config/startdb.sql
   ```

   Agora os bancos de desenvolvimento, `getpet_dev`, e teste, `getpet_test`, estão disponíveis; além do usuário `getpet`.

   Caso deseje mudar a senha do usuário:

   1. Entre no Banco de Dados

      Windows:

      ```batch
      mariadb -u root -p
      ```

      Linux:

      ```bash
      sudo mariadb -u root -p
      ```

   1. Digite o comando abaixo, trocando a senha como desejado:
      ```sql
      ALTER USER 'getpet'@'localhost' IDENTIFIED BY 'novasenha';
      ```
      > Não esqueça de ajustar a senha no seu arquivo `.env` também.

1. Ajuste o banco:

   Utilize o comando abaixo para criar as tabelas do banco de dados e inserir dados iniciais:

   ```bash
   npm run updatedb
   ```

Agora você já deve conseguir rodar o projeto. Para isso utilize o comando:

```bash
npm run dev
```

## Scripts de Desenvolvimento<span id="scripts"></span>

Para maior praticidade, algumas tarefas do desenvolvimento são realizadas por scripts.

Para executar um dos scripts, utilize o comando:

```bash
npm run <script> [argumentos]
```

### Lista de Scripts

Abaixo estão os scripts disponíveis e suas descrições:

| Nome           | Argumentos | Descrição                                                                                                                               |
| -------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`          | -          | Roda o servidor de desenvolvimento. <br>A porta em que o servidor roda pode ser configurada no arquivo `.env`                           |
| `test`         | -          | Roda todos os testes do projeto.                                                                                                        |
| `migrate:make` | \<nome>    | Cria um novo arquivo de migração. Utilizado quando for criar ou modificar uma tabela, trigger etc.                                      |
| `migrate:run`  | -          | Roda todas as migrações do banco de dados.                                                                                              |
| `seed:make`    | \<nome>    | Cria um novo arquivo de seed. Utilizado para agilizar a criação de registros em tabelas para testes e desenvolvimento.                  |
| `seed:run`     | -          | Roda todos os seeds do banco de dados. <br>\*_**Cuidado**: Seeds apagam todos registros atuais do banco, para então inserir os padrões_ |
| `updatedb`     | -          | Roda todas as migrações e seeds.<br>Atalho para `migrate:run` e `seed:run`                                                              |
| `salt:new`     | -          | Gera um novo salt para fazer o hashing das senhas                                                                                       |

## Estrutura do Código<span id="structure"></span>

O código da API está dividido da seguinte forma:

```
/config
/db
    /migrations
    /seeds
/src
    /controllers
    /middleware
    /models
    /routes
    /services
    /utils
/tests
app.js
index.js
```

### db

| Diretório  | Função                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| migrations | Contém as migrations que criam e atualizam o banco de dados.           |
| seeds      | Contém os seeds que criam registros automaticamente no banco de dados. |

### src

| Diretório   | Função                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| controllers | Contém os controllers que são responsáveis por lidar com as requisições recebidas.                                                                                       |
| middleware  | Contém tratamentos que devem ser aplicados a muitas rotas. <br> _Ex_: Tratamento de erros, autenticação de usuário                                                       |
| models      | Contém arquivos com operações de banco de dados e schemas das tabelas geradas pelas migrations. <br> _Somente os arquivos contidos aqui devem acessar o banco de dados._ |
| routes      | Contém apenas as rotas disponíveis na API.                                                                                                                               |
| services    | Contém os serviços que são responsáveis por operações relacionadas a regra de negócio. <br>_Ex_: tratamento de dados das requisições, validações etc.                    |
| utils       | Contém funções que auxiliam no desenvolvimento e não se encaixam em outros lugares.                                                                                      |

### tests

> **_TODO_**

## Rotas<span id="routes"></span>

### Disponíveis

#### Usuários

| Método | Path         | Autorização | Disponibilidade |                                   Documentação                                   | Função                                |
| :----: | ------------ | :---------: | :-------------: | :------------------------------------------------------------------------------: | ------------------------------------- |
|  GET   | `/users`     |      -      | Desenvolvimento |                                        -                                         | Lista todos os usuários.              |
|  POST  | `/users`     |      -      |      Final      | [#15](https://github.com/COMP4026-ENSW2026/atividade-config-01-getpet/issues/15) | Cria um novo usuário.                 |
|  GET   | `/users/:id` |      -      |      Final      | [#16](https://github.com/COMP4026-ENSW2026/atividade-config-01-getpet/issues/16) | Lista dados de um usuário específico. |
|  PUT   | `/users/:id` |    Login    |      Final      | [#17](https://github.com/COMP4026-ENSW2026/atividade-config-01-getpet/issues/17) | Atualiza um usuário.                  |
| DELETE | `/users/:id` |      -      | Desenvolvimento |                                        -                                         | Apaga um usuário.                     |

### Previstas

As rotas previstas para a API podem ser conferidas nas <a href="https://github.com/COMP4026-ENSW2026/atividade-config-01-getpet/issues">Issues do projeto</a>.

## Testes<span id="tests"></span>

**_TODO_**

## Socorro<span id="help"></span>

Alguns links e dicas para ajudar no desenvolvimento.

### Dicas

#### Método avançado para resolver problemas:

- Pesquise no Google
- Clique no primeiro link para o StackOverflow
- Ignore a pergunta e vá direto para a resposta mais votada
- A resposta é um exemplo extremamente simples e fácil de entender que faz exatamente o que você quer?
  - Se sim, acabou o problema.
  - Se não, vá para a próxima resposta e repita.
- Se todas as respostas foram esgotadas, volte para a pergunta e dê uma lida por cima para descobrir se ela tem algo a ver com o seu problema.
  - Se sim, repita o processo, mas com mais atenção.
  - Se não, volte para o google e vá para o próximo link do StackOverflow.
  - Se talvez, volte para o google e vá para o próximo link do StackOverflow, mas deixe a aba aberta por hora.
- Repita e adapte conforme for necessário.
- Se tudo leva a documentação, aceite e leia a documentação.
- Se tudo leva a alguma Issue não resolvida do GitHub, repense todo o problema.
- Se nada leva a lugar nenhum e ninguém jamais mencionou ter esse problema antes, então, ou:
  - A pergunta é muito ampla, Quebre ela em partes menores e tente de novo.
  - Você é um pioneiro trabalhando em algum jeito novo e incrível de se fazer algo.
  - Esse é o jeito errado de resolver o problema. Pense de novo.

Fonte: https://www.reddit.com/r/learnprogramming/comments/sj6oyi/comment/hvdrxix/?utm_source=share&utm_medium=web2x&context=3

### Documentação

- [Documentação do JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Documentação do NodeJS](https://nodejs.org/pt-br/docs/)
- [Documentação do MariaDB](https://mariadb.com/kb/pt/documentation/)
- [Documentação do Knex](http://knexjs.org/guide/)
- [Documentação do Jest](https://jestjs.io/pt-BR/docs/getting-started)
- [Documentação do Validator](https://www.npmjs.com/package/validator)

### Tutoriais

- [Tutorial de Knex](https://blog.shahednasser.com/knex-js-tutorial-for-beginners/)

### StackOverflow

-
