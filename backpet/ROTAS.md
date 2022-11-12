# Índice

- <a href="#user" style="text-decoration: none; color: inherit">Usuário</a>
- <a href="#adoption" style="text-decoration: none; color: inherit">Adoção</a>
- <a href="#favorites" style="text-decoration: none; color: inherit">Favoritos</a>

# Usuário<span id="user"></span>

- <a href="#get-user" style="text-decoration: none; color: inherit">GET /users/:id</a>
- <a href="#post-user" style="text-decoration: none; color: inherit">POST /users</a>
- <a href="#patch-user" style="text-decoration: none; color: inherit">PATCH /users/:id</a>
- <a href="#post-login" style="text-decoration: none; color: inherit">POST /login</a>
- <a href="#post-logout" style="text-decoration: none; color: inherit">POST /logout</a>

## GET /users/:id<span id="get-user"></span>

Retorna os dados de um usuário. Caso o usuário não seja o mesmo que está logado, retorna apenas os dados públicos.

### Response

Retorna um objeto contendo os dados do usuário.

Exemplos:

- Usuário logado

```json
{
  "id": 2,
  "username": "mariabetania",
  "city": "Maringá",
  "uf": "PR",
  "cpf": "10987654321",
  "phone": "18993289050",
  "email": "maria@maria.com.br",
  "adopter_score": 4.2,
  "donor_score": null,
  "profile_pic_path": null
}
```

- Usuário diferente do logado

```json
{
  "id": 3,
  "username": "alfonso",
  "city": "São Paulo",
  "uf": "SP",
  "phone": "54986546571",
  "adopter_score": null,
  "donor_score": 4.2,
  "profile_pic_path": null
}
```

## POST /users<span id="post-user"></span>

Cria um novo usuário e automaticamente faz login como esse usuário. Retorna o usuário criado e o token de autenticação.

### Request

### Request

Aceita `json`, ou `form-data` quando for necessário envio de imagens.

Quando utilizar form-data, os dados da adoção devem ser enviados no campo `user`.

#### Body

FormData (apenas quando `Content-type` for `multipart/form-data`)

| Campo  | Descrição                           | Obrigatório | Tipo     |
| ------ | ----------------------------------- | ----------- | -------- |
| `user` | Objeto JSON com os dados do usuário | **Sim**     | `string` |
| `pfp`  | Imagem do perfil do usuário         | Não         | `file`   |

JSON ou campo `user`, no caso de form-data

| Campo      | Descrição       | Obrigatório | Tipo     | Valores                                 |
| ---------- | --------------- | ----------- | -------- | --------------------------------------- |
| `username` | Nome de usuário | **Sim**     | `string` |                                         |
| `password` | Senha           | **Sim**     | `string` |                                         |
| `email`    | Email           | **Sim**     | `string` |                                         |
| `phone`    | Telefone        | **Sim**     | `string` |                                         |
| `cpf`      | CPF             | **Sim**     | `string` |                                         |
| `city`     | Cidade          | **Sim**     | `string` |                                         |
| `uf`       | Estado          | **Sim**     | `string` | Sigla de um estado (Ex. "AM", "AP" ...) |

Exemplos:

```js
const userData = {
  username: 'donatello',
  cpf: '00000000001',
  password: '123456',
  email: 'donatello@tortuguita.com',
  phone: '43988325994',
  city: 'Pindamonhangaba',
  uf: 'SP',
};
```

- Enviando imagem de perfil

  ```js
  const profilePicture = document.getElementById('profile-picture').files[0];

  const formData = new FormData();
  formData.append('pfp', profilePicture, profilePicture.name);
  formData.append('user', JSON.stringify(userData));

  fetch('/users', {
    method: 'POST',
    body: formData,
  });
  ```

- Sem imagem de perfil
  ```js
  fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  ```

## PATCH /users/:id<span id="patch-user"></span>

> Requer autenticação.

Atualiza o usuário de acordo com os dados enviados. Um usuário pode atualizar somente seus próprios dados.

### Request

Aceita `json`, ou `form-data` quando for necessário envio de imagem.

Quando utilizar form-data, os dados da adoção devem ser enviados no campo `user`.

#### Body

FormData (apenas quando `Content-type` for `multipart/form-data`)

| Campo  | Descrição                            | Obrigatório | Tipo     |
| ------ | ------------------------------------ | ----------- | -------- |
| `user` | Objeto JSON com os dados a atualizar | **Sim**     | `string` |
| `pfp`  | Imagem de perfil do usuário          | Não         | `file`   |

JSON ou campo `user`, no caso de form-data

| Campo      | Descrição                   | Obrigatório | Tipo     | Valores                                                   |
| ---------- | --------------------------- | ----------- | -------- | --------------------------------------------------------- |
| `username` | Nome de usuário             | Não         | `string` |                                                           |
| `password` | Senha                       | Não         | `string` |                                                           |
| `email`    | Email                       | Não         | `string` |                                                           |
| `phone`    | Telefone                    | Não         | `string` |                                                           |
| `address`  | Cidade e estado             | Não         | `object` | Objeto no formato: `{ city: "nome da cidade", uf: "UF" }` |
| `active`   | Ativa ou desativa o usuário | Não         | `string` | "S" ou "N"                                                |

### Response

Retorna o usuário atualizado. Segue o mesmo formato que o retorno da seleção de usuário.

## POST /login<span id="post-login"></span>

Autentica um usuário e retorna o token de autenticação.

### Request

#### Body

| Campo      | Descrição       | Obrigatório | Tipo     | Valores |
| ---------- | --------------- | ----------- | -------- | ------- |
| `username` | Nome de usuário | **Sim**     | `string` |         |
| `password` | Senha           | **Sim**     | `string` |         |

Exemplo:

```json
{
  "username": "afonso",
  "password": "123456"
}
```

### Response

Retorna o usuário logado. Segue o mesmo formato que o retorno da seleção de usuário.

## POST /logout<span id="post-logout"></span>

Anula o token de autenticação, deslogando o usuário atual.

### Response

Retorna status `204`.

# Adoção <span id="adoption"></span>

- <a href="#get-adoptions" style="text-decoration: none; color: inherit">GET /adoptions</a>
- <a href="#get-adoption" style="text-decoration: none; color: inherit">GET /adoptions/:id</a>
- <a href="#get-adoption-pics" style="text-decoration: none; color: inherit">GET /adoptions/:id/pictures</a>
- <a href="#del-adoption" style="text-decoration: none; color: inherit">DELETE /adoptions/:id</a>
- <a href="#post-adoption" style="text-decoration: none; color: inherit">POST /adoptions</a>
- <a href="#patch-adoption" style="text-decoration: none; color: inherit">PATCH /adoptions/:id</a>
- <a href="#close-adoption" style="text-decoration: none; color: inherit">PATCH /adoptions/:id/close</a>

## GET /adoptions <span id="get-adoptions"></span>

Lista adoções de acordo com os parâmetros passados.

### Request

#### Parâmetros

| Parâmetro        | Descrição                                                                                           | Exemplo                 |
| ---------------- | --------------------------------------------------------------------------------------------------- | ----------------------- |
| `search`         | Termo para buscar adoção. Busca por nome do animal e descrição.                                     | `search=bolinha`        |
| `page`           | Número da página.                                                                                   | `page=2`                |
| `noLimit`        | Se for passado, não limita a quantidade de adoções retornadas.                                      | `noLimit=true`          |
| `orderBy`        | Ordena as adoções por uma coluna. Aceita `created_at`, `closed_at`, `breed`, `age`, `color`, `size` | `orderBy=created_at`    |
| `orderDir`       | Direção de ordenação. Aceita `asc` ou `desc`.                                                       | `orderDir=desc`         |
| `species`        | Filtra as adoções por espécies. Aceita `cachorro`, `gato`, `ave`, `réptil`, `outro`.                | `species=cachorro,gato` |
| `breeds`         | Filtra as adoções por raças.                                                                        | `breeds=srd,pug`        |
| `minAge`         | Filtra as adoções por idade mínima (em meses).                                                      | `minAge=0`              |
| `maxAge`         | Filtra as adoções por idade máxima (em meses).                                                      | `maxAge=72`             |
| `colors`         | Filtra as adoções por cores.                                                                        | `colors=preto,branco`   |
| `sizes`          | Filtra as adoções por tamanhos. Aceita `S`, `M`, `L`.                                               | `sizes=S,M`             |
| `oldOwnerId`     | Filtra as adoções por id do dono original.                                                          | `oldOwnerId=1`          |
| `newOwnerId`     | Filtra as adoções por id do novo dono.                                                              | `newOwnerId=1`          |
| `status`         | Filtra as adoções por status. Aceita `a`, `f`.                                                      | `status=a,f`            |
| `nullDonorScore` | Se for passado, retorna apenas as adoções com score de doador nulo.                                 | `nullDonorScore=true`   |

Exemplo de requisição:

```js
const params = {
  page: 1,
  orderBy: 'created_at',
  orderDir: 'desc',
  species: ['cachorro', 'gato'].join(','),
};

const queryParams = new URLSearchParams(params).toString();

fetch(`/adoptions?${queryParams}`)
  .then(response => response.json())
  .then(console.log);
```

### Response

Retorna um array contendo as adoções que atendem aos parâmetros passados e o total de páginas de resultados.

Exemplo:

```json
{
  "adoptions": [
    {
      "id": 6,
      "created_at": "2022-11-12T17:35:48.000Z",
      "closed_at": null,
      "status": "A",
      "old_owner_id": 3,
      "new_owner_id": null,
      "desc": "Chihuahua gordo que só dorme e treme. Gosta de passeios na praia em domingos ensolarados com chuva.",
      "pet_size": "M",
      "pet_name": "Batatovisk",
      "pet_age": 144,
      "pet_species": "cachorro",
      "pet_breed": "outro",
      "pet_color": "amarelo",
      "thumbnail_path": null,
      "adopter_score": null,
      "donor_score": null
    },
    {
      "id": 1,
      "created_at": "2022-11-12T17:25:22.000Z",
      "closed_at": null,
      "status": "A",
      "old_owner_id": 2,
      "new_owner_id": null,
      "desc": "Crescido na rua, muito arteiro mas é um bom menino (bom menino vale  pra gato também? não sei). Com a inflação, não tenho mais como sustentar todos os meus gatos. Por isso, eu quero um novo lar pra ele.",
      "pet_size": "S",
      "pet_name": "Bonifácio",
      "pet_age": 24,
      "pet_species": "gato",
      "pet_breed": "persa",
      "pet_color": "cinza",
      "thumbnail_path": null,
      "adopter_score": null,
      "donor_score": null
    }
  ],
  "total_pages": 1
}
```

## GET /adoptions/:id <span id="get-adoption"></span>

Retorna os dados de uma adoção.

### Response

Retorna um objeto contendo os dados da adoção.

Exemplo:

```json
{
  "id": 6,
  "created_at": "2022-11-12T17:35:48.000Z",
  "closed_at": null,
  "status": "A",
  "old_owner_id": 3,
  "new_owner_id": null,
  "desc": "Chihuahua gordo que só dorme e treme. Gosta de passeios na praia em domingos ensolarados com chuva.",
  "pet_size": "M",
  "pet_name": "Batatovisk",
  "pet_age": 144,
  "pet_species": "cachorro",
  "pet_breed": "outro",
  "pet_color": "amarelo",
  "thumbnail_path": null,
  "adopter_score": null,
  "donor_score": null
}
```

## GET /adoptions/:id/pictures <span id="get-adoption-pics"></span>

Retorna as fotos disponíveis de uma adoção.

### Response

Retorna um array contendo caminhos para as imagens de uma adoção.

Exemplo:

```json
[
  "/uploads/adoptions/1/1.jpg",
  "/uploads/adoptions/1/2.jpg",
  "/uploads/adoptions/1/3.jpg"
]
```

## DELETE /adoptions/:id <span id="del-adoption"></span>

> Requer autenticação.

Exclui uma adoção.
Somente o dono original pode excluir uma adoção, desde que esta não tenha sido fechada ainda.

### Response

Retorna status `204` se a adoção foi excluída com sucesso.

## POST /adoptions <span id="post-adoption"></span>

> Requer autenticação

### Request

Aceita `json`, ou `form-data` quando for necessário envio de imagens.

Quando utilizar form-data, os dados da adoção devem ser enviados no campo `adoption`.

#### Body

FormData (apenas quando `Content-type` for `multipart/form-data`)

| Campo      | Descrição                          | Obrigatório | Tipo          |
| ---------- | ---------------------------------- | ----------- | ------------- |
| `adoption` | Objeto JSON com os dados da adoção | **Sim**     | `string`      |
| `pfp`      | Imagem do perfil do animal         | Não         | `file`        |
| `imgs`     | Imagens do animal (Até 4)          | Não         | `array<file>` |

JSON ou campo `adoption`, no caso de form-data

| Campo        | Descrição                | Obrigatório | Tipo     | Valores                                                                                        |
| ------------ | ------------------------ | ----------- | -------- | ---------------------------------------------------------------------------------------------- |
| `desc`       | Descrição da adoção      | **Sim**     | `string` |                                                                                                |
| `petSize`    | Tamanho do animal        | **Sim**     | `string` | "S", "M", "L"                                                                                  |
| `petName`    | Nome do animal           | Não         | `string` |                                                                                                |
| `petAge`     | Idade do animal em meses | Não         | `int`    |                                                                                                |
| `petSpecies` | Espécie do animal        | Não         | `string` | "cachorro", "gato", "ave", "réptil", "outro"                                                   |
| `petBreed`   | Raça do animal           | Não         | `string` |                                                                                                |
| `petColor`   | Cor do animal            | Não         | `string` | "branco", "preto", "marrom", "cinza", "pardo", "vermelho", "amarelo", "verde", "azul", "outro" |

Exemplos

```json
{
  "desc": "Animal muito dócil e carinhoso",
  "petSize": "M",
  "petName": "Bolinha",
  "petAge": 3,
  "petSpecies": "cachorro",
  "petBreed": "SRD",
  "petColor": "marrom"
}
```

### Response

Se criada com sucesso, retorna status `201` e o body contendo a adoção, assim como acontece na rota de seleção de adoções.

## PATCH /adoptions/:id <span id="patch-adoption"></span>

> Requer autenticação.

Atualiza uma adoção de acordo com os dados enviados. Somente o dono original pode atualizar uma adoção, desde que esta não tenha sido fechada ainda.

### Request

Aceita `json`, ou `form-data` quando for necessário envio de imagem.

Quando utilizar form-data, os dados da adoção devem ser enviados no campo `adoption`.

#### Body

FormData (apenas quando `Content-type` for `multipart/form-data`)

| Campo    | Descrição                          | Obrigatório | Tipo     |
| -------- | ---------------------------------- | ----------- | -------- |
| adoption | Objeto JSON com os dados da adoção | **Sim**     | `string` |
| pfp      | Imagem de perfil do animal         | Não         | `file`   |

JSON ou campo `adoption`, no caso de form-data

| Campo        | Descrição                | Obrigatório | Tipo     | Valores                                                                                        |
| ------------ | ------------------------ | ----------- | -------- | ---------------------------------------------------------------------------------------------- |
| `desc`       | Descrição da adoção      | **Sim**     | `string` |                                                                                                |
| `petSize`    | Tamanho do animal        | **Sim**     | `string` | "S", "M", "L"                                                                                  |
| `petName`    | Nome do animal           | Não         | `string` |                                                                                                |
| `petAge`     | Idade do animal em meses | Não         | `int`    |                                                                                                |
| `petSpecies` | Espécie do animal        | Não         | `string` | "cachorro", "gato", "ave", "réptil", "outro"                                                   |
| `petBreed`   | Raça do animal           | Não         | `string` |                                                                                                |
| `petColor`   | Cor do animal            | Não         | `string` | "branco", "preto", "marrom", "cinza", "pardo", "vermelho", "amarelo", "verde", "azul", "outro" |

## PATCH /adoptions/:id/close <span id="close-adoption"></span>

> Requer autenticação.

Fecha uma adoção. Somente o dono original pode fechar uma adoção. Uma vez fechada, o novo dono ainda pode alterar a pontuação de doador da adoção. Nenhuma outra alteração é permitida e a adoção não pode mais ser excluída.

### Request

Existem duas possibilidades para esta requisição:

- o dono original marca a adoção como fechada, avaliando o novo dono;

  | Campo          | Descrição              | Obrigatório | Tipo    | Valores   |
  | -------------- | ---------------------- | ----------- | ------- | --------- |
  | `newOwnerId`   | ID do novo dono        | **Sim**     | `int`   |           |
  | `adopterScore` | Pontuação do novo dono | **Sim**     | `float` | 0.0 - 5.0 |

  Exemplo:

  ```json
  {
    "newOwnerId": 1,
    "adopterScore": 5
  }
  ```

- o novo dono avalia o dono original.

  | Campo        | Descrição                  | Obrigatório | Tipo    | Valores   |
  | ------------ | -------------------------- | ----------- | ------- | --------- |
  | `donorScore` | Pontuação do dono original | **Sim**     | `float` | 0.0 - 5.0 |

  Exemplo:

  ```json
  {
    "donorScore": 5
  }
  ```

### Response

Retorna a adoção atualizada, assim como acontece na rota de seleção de adoções.

# Favoritos <span id="favorites"></span>

- <a href="#get-favorites" style="text-decoration: none; color: inherit">GET /favorites</a>
- <a href="#post-favorite" style="text-decoration: none; color: inherit">POST /favorites</a>
- <a href="#delete-favorite" style="text-decoration: none; color: inherit">DELETE /favorites/:id</a>
- <a href="get-users-favorited" style="text-decoration: none; color: inherit">GET /favorites/:adoptionId</a>

## GET /favorites <span id="get-favorites"></span>

> Requer autenticação.

Retorna uma lista de adoções favoritadas pelo usuário autenticado.

### Response

Retorna um array contendo as adoções favoritadas pelo usuário autenticado.

Exemplo:

```json
[
  {
    "favorite_id": 2,
    "id": 4,
    "pet_species": "cachorro",
    "desc": "Cachorro bem fofinho",
    "thumbnail_path": null
  },
  {
    "favorite_id": 18,
    "id": 7,
    "pet_species": "gato",
    "desc": "Bichinho muito arteiro, mas carinhoso",
    "thumbnail_path": "/uploads/adoptions/7/profile_picture.jpg"
  }
]
```

## POST /favorites <span id="post-favorite"></span>

> Requer autenticação.

Adiciona uma adoção aos favoritos do usuário autenticado.

### Request

#### Body

| Campo        | Descrição    | Obrigatório | Tipo  |
| ------------ | ------------ | ----------- | ----- |
| `adoptionId` | ID da adoção | **Sim**     | `int` |

### Response

Retorna a adoção adicionada aos favoritos. Segue o mesmo formato que as adoções retornadas na listagem de favoritos de um usuário.

## DELETE /favorites/:id <span id="delete-favorite"></span>

Remove uma adoção dos favoritos do usuário autenticado.

### Response

Retorna status `204`.

## GET /favorites/:adoptionId <span id="get-users-favorited"></span>

Retorna uma lista de usuários que favoritaram uma determinada adoção.

### Response

Retorna um array contendo os usuários que favoritaram a adoção.

Exemplo:

```json
[
  {
    "id": 3,
    "username": "donatello",
    "profile_pic_path": "/uploads/users/3/profile_picture.jpg"
  },
  {
    "id": 2,
    "username": "afonso",
    "profile_pic_path": "/uploads/users/2/profile_picture.jpg"
  }
]
```
