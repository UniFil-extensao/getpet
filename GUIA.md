# Guia de Instalação e Configuração

## Índice

1. <a style="color: inherit" href="#install">Instalação</a>
1. <a style="color: inherit" href="#scripts">Scripts de Desenvolvimento</a>
1. <a style="color: inherit" href="#structure">Estrutura do Código</a>
1. <a style="color: inherit" href="#help">Socorro</a>

## Instalação<span id="install"></span>

### Necessário

Esses devem ser instalados manualmente:

1. [Node.js](https://nodejs.org/)
1. NPM (Vem junto com o Node.js)
1. [MariaDB](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.8&os=windows&cpu=x86_64&pkg=msi&m=fder)

### Variáveis de ambiente

> Atenção: Para rodar em produção, é necessário fornecer um certificado SSL válido. Caso contrário, algumas funcionalidades não funcionarão como esperado.
> Informe o caminho para o certificado e a chave privada nos arquivos .env conforme descrito abaixo.

#### Front-end

Variáveis de ambiente para o front-end, localizadas no arquivo `.env.local` na pasta `./frontpet`.

| Variável           | Descrição                                                                                                                                  | Valor padrão          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| VITE_SERVER        | Url para o servidor do backend, incluindo protocolo.                                                                                       | http://127.0.0.1:8000 |
| VITE_PORT          | Porta para rodar o frontend.                                                                                                               | 3000                  |
| VITE_SSL_CERT_PATH | Caminho para o certificado SSL. Para desenvolvimento é opcional. Para produção, deve ser fornecido um certificado válido.                  |                       |
| VITE_SSL_KEY_PATH  | Caminho para a chave privada do certificado SSL. Para desenvolvimento é opcional. Para produção, deve ser fornecido um certificado válido. |                       |

#### Back-end

Variáveis de ambiente para o back-end, localizadas no arquivo `.env` na pasta `./backpet/config`.

| Variável         | Descrição                                                                                                                                  | Valor padrão                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| NODE_ENV         | Ambiente de execução.                                                                                                                      | development                   |
| IP_ADDRESS       | Endereço IP do servidor do backend.                                                                                                        | 127.0.0.1                     |
| APP_FRONTEND_URL | Url para o frontend, incluindo protocolo.                                                                                                  | http://localhost:3000         |
| PORT             | Porta para rodar o backend.                                                                                                                | 8000                          |
| JWT_SECRET       | Segredo para assinar os tokens JWT. **DEVE SER ALTERADO EM PRODUÇÃO**                                                                      | secret                        |
| PASSWD_SALT      | Valor para fazer o salt de senhas ao salvar no banco de dados. **DEVE SER ALTERADO EM PRODUÇÃO**                                           | $2a$10$tVQDvyTBMZsZHl39.6zVOe |
| SALT_ROUNDS      | Quantidade de rounds para o algoritmo de salt de senhas.                                                                                   | 10                            |
| DB_DRIVER        | Driver do banco de dados.                                                                                                                  | mysql                         |
| DB_NAME          | Nome do banco de dados.                                                                                                                    | getpet                        |
| DB_HOST          | Endereço IP do servidor do banco de dados.                                                                                                 | 127.0.0.1                     |
| DB_PORT          | Porta do servidor do banco de dados.                                                                                                       | 3306                          |
| DB_USER          | Usuário do banco de dados.                                                                                                                 | getpet                        |
| DB_PASSWORD      | Senha do usuário do banco de dados. **DEVE SER ALTERADO EM PRODUÇÃO**                                                                      | getpet                        |
| SSL_KEY_PATH     | Caminho para a chave privada do certificado SSL. Para desenvolvimento é opcional. Para produção, deve ser fornecido um certificado válido. |                               |
| SSL_CERT_PATH    | Caminho para o certificado SSL. Para desenvolvimento é opcional. Para produção, deve ser fornecido um certificado válido.                  |                               |

### Procedimento

1. Clone o repositório

#### Instalação automática: Windows

1. Certifique-se de conseguir executar scripts do PowerShell

1. Execute o script `install.ps1` na pasta raiz do projeto

   Para instalar em modo de produção, execute `.\install.ps1 -p`

   Para ver as opções do script, execute `.\install.ps1 -h`

1. Siga as instruções do script

#### Instalação automática: Linux

1. Execute o script `install.sh` na pasta raiz do projeto

   Para instalar em modo de produção, execute `./install.sh -p`

   Para ver as opções do script, execute `./install.sh -h`

1. Siga as instruções do script

#### Manual: Básico

> As instruções consideram que o diretório atual é a raiz do projeto.

1. Crie um arquivo `.env` na pasta `./backpet/config` com o conteúdo do arquivo `./backpet/config/.env.example`. Altere as variáveis de ambiente conforme necessário.

   Para desenvolvimento, uma simples _cópia_ do arquivo `.env.example` é suficiente.

   Esse aruivo **_NÃO DEVE_** ser commitado.

1. Crie um arquivo `.env.local` na pasta `./frontpet` com o conteúdo do arquivo `./frontpet/.env`. Altere as variáveis de ambiente conforme necessário.

1. Ao baixar o projeto pela primeira vez, será necessário criar o banco de dados para o projeto e instalar as dependências.

   1. Instale as dependências para o front-end:

      ```bash
      cd frontpet
      npm install
      cd ..
      ```

   1. Instale as dependências para o back-end:

      ```bash
      cd backpet
      npm install
      cd ..
      ```

1. Antes de continuar, certifique-se de estar na pasta `/backpet`.

```bash
cd backpet
```

1. Certifique-se que o MariaDB está instalado e acessível como variável de ambiente.

#### Manual: Produção

1. Acesse o MariaDB como root:

   Windows:

   ```batch
   mariadb -u root -p
   ```

   Linux:

   ```bash
   sudo mariadb -u root -p
   ```

1. Crie o banco de dados `getpet`:

   ```sql
   CREATE DATABASE getpet;
   ```

1. Crie o usuário `getpet`, com a senha de produção:

   ```sql
   CREATE USER 'getpet'@'localhost' IDENTIFIED BY 'senhaProducao';
   ```

   > Ajuste a senha no arquivo `.env` para que sejam a mesma.

1. Dê permissões ao usuário `getpet` sobre o banco de dados `getpet`:

   ```sql
   GRANT ALL PRIVILEGES ON getpet.* TO 'getpet'@'localhost';
   FLUSH PRIVILEGES;
   ```

1. Saia do MariaDB:

   ```sql
   EXIT;
   ```

1. Utilize o comando abaixo para criar as tabelas no banco de dados `getpet`:

   ```bash
   npm run migrate:run
   ```

1. Entre novamente no MariaDB, desta vez utilizando o usuário `getpet`, e crie o usuário administrador para a aplicação:

   ```bash
   mariadb -u getpet -p
   ```

   _Altere os dados conforme necessário._

   ```sql
   INSERT INTO users
      (username, password, city, uf, cpf, phone, email, admin)
   VALUES
      ('admin', 'senhadeadmin', '', '', '', '', '', 'S');
   EXIT;
   ```

1. Para iniciar a aplicação, utilize os comandos abaixo em terminais separados (abrir cada terminal na pasta raiz do projeto):

   1. Front-end:

      ```bash
      cd frontpet
      npm start
      ```

   1. Back-end:

      ```bash
      cd backpet
      npm start
      ```

#### Manual: Desenvolvimento

1. Crie os bancos de dados e usuários:

   Windows

   ```batch
   mariadb -u root -p < config\startdb.sql
   ```

   Linux

   ```bash
   sudo mariadb -u root -p < config/startdb.sql
   ```

   Agora os bancos de desenvolvimento, `getpet_dev`, e teste, `getpet_test`, estão disponíveis; além do usuário `getpet`.

   > Caso queira mudar a senha do usuário:
   >
   > 1. Entre no Banco de Dados
   >
   >    Windows:
   >
   >    ```batch
   >    mariadb -u root -p
   >    ```
   >
   >    Linux:
   >
   >    ```bash
   >    sudo mariadb -u root -p
   >    ```
   >
   > 1. Digite o comando abaixo, trocando a senha como desejado:
   >    ```sql
   >    ALTER USER 'getpet'@'localhost' IDENTIFIED BY 'novasenha';
   >    ```
   >    **Não esqueça de ajustar a senha no arquivo `.env` também.**

1. Utilize o comando abaixo para criar as tabelas do banco de dados e inserir dados iniciais:

   ```bash
   npm run updatedb
   ```

1. Agora o sistema está pronto para rodar. Para isso, utilize os comandos abaixo em terminais separados (abrir cada terminal na pasta raiz do projeto):

   1. Front-end:

      ```bash
      cd frontpet
      npm run dev
      ```

   1. Back-end:

      ```bash
      cd backpet
      npm run dev
      ```

## Scripts de Desenvolvimento<span id="scripts"></span>

Para maior praticidade, algumas tarefas do desenvolvimento são realizadas por scripts.

Para executar um dos scripts, utilize o comando:

```bash
npm run <script> [argumentos]
```

### Lista de Scripts

Abaixo estão os scripts disponíveis no backend e suas descrições:

| Nome            | Argumentos | Descrição                                                                                                                               |
| --------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`           | -          | Roda o servidor de desenvolvimento. <br>A porta em que o servidor roda pode ser configurada no arquivo `.env`                           |
| `test`          | -          | Roda todos os testes do projeto.                                                                                                        |
| `testing`       | -          | Roda os testes em modo _watch_. Útil para debugar e corrigir falhas                                                                     |
| `migrate:make`  | \<nome>    | Cria um novo arquivo de migração. Utilizado quando for criar ou modificar uma tabela, trigger etc.                                      |
| `migrate:run`   | -          | Roda todas as migrações do banco de dados.                                                                                              |
| `migrate:clear` | -          | Apaga todas as tabelas do banco de dados. Utilize em conjunto com `updatedb` para resetar rapidamente o banco de dados.                 |
| `seed:make`     | \<nome>    | Cria um novo arquivo de seed. Utilizado para agilizar a criação de registros em tabelas para testes e desenvolvimento.                  |
| `seed:run`      | -          | Roda todos os seeds do banco de dados. <br>\*_**Cuidado**: Seeds apagam todos registros atuais do banco, para então inserir os padrões_ |
| `updatedb`      | -          | Roda todas as migrações e seeds.<br>Atalho para `migrate:run` e `seed:run`                                                              |
| `salt:new`      | -          | Gera um novo salt para fazer o hashing das senhas                                                                                       |

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
- [Documentação da Express](https://expressjs.com/pt-br/4x/api.html)
- [Documentação do MariaDB](https://mariadb.com/kb/pt/documentation/)
- [Documentação do Knex](http://knexjs.org/guide/)
- [Documentação do Jest](https://jestjs.io/pt-BR/docs/getting-started)
- [Documentação do Validator](https://www.npmjs.com/package/validator)

### Ferramentas úteis

- [Gerador de Celulares Válidos](https://geradornv.com.br/gerador-celular/)

### Tutoriais

- [Tutorial de Knex](https://blog.shahednasser.com/knex-js-tutorial-for-beginners/)

### StackOverflow

-
