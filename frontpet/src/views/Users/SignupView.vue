<style>
  @import "../../styles/Users/styles.css";
</style>
<script src="../../scripts/Users/signup.js"></script>

<template>
  <body>
    <header class="p-3 bg-success text-white">
        <div class="container" id="cabecalho">
          <div class="d-flex flex-row flex-wrap align-items-center justify-content-between">
            <!-- LADO ESQUERDO -->
            <div class="d-flex flex-row">
            <button v-on:click="home()" class="btn btn-outline-light nav col-6 col-lg-auto mb-2 justify-content-center mb-md-0" id="btnIcones2">
                <img class="ms-2" src="../../assets/icons/svg/home.svg">
            </button>
            </div>

            <!-- MEIO -->
            <div>
            <h1 v-on:click="home()" class="pointer" style="color: black">GetPet</h1>
            </div>

            <!-- LADO DIREITO -->
            <div class="d-flex flex-row align-items-center justify-content-around"></div>
          </div>
        </div>
    </header><br>
    <div class="container-fluid">
      <div class="row">
        <img src="../../assets/images/icon_getpet.png" alt="">
      </div>
      <form @submit.prevent="insert()">
        <div class="row form-floating">
          <input v-model="inputUser.email" name="email" type="text" required class="form-control" placeholder="Email">
          <label class="input-label">E-mail</label>
        </div>
        <div class="row form-floating mt-3">
          <input v-model="confirms.email" name="confirm-email" type="text" required class="form-control"
            placeholder="Senha">
          <label class="input-label">Confirme seu E-mail</label>
        </div>
        <div class="row form-floating mt-3">
          <input v-model="inputUser.cpf" maxlength="11" name="cpf" type="text" required class="form-control" placeholder="CPF">
          <label class="input-label">CPF</label>
        </div>
        <div class="row form-floating mt-3">
          <input v-model="inputUser.phone" name="tel" type="text" required class="form-control" placeholder="Telefone">
          <label class="input-label">Telefone</label>
        </div>
        <div class="row justify-content-space-between mt-3">
          <div class="col">
            <input v-model="inputUser.city" name="cidade" type="text" required class="form-control" placeholder="Cidade">
          </div>
          <div class="col-4">
            <select v-model="inputUser.uf" required class="form-control" name="uf" placeholder="Estado">
              <option disabled hidden value="">UF</option>
              <option v-for="UF in ufs" :value="UF"> {{ UF }} </option>
            </select>
          </div>
        </div>
        <div class="row form-floating mt-3">
          <input v-model="inputUser.username" name="name" type="text" required class="form-control" placeholder="Usuário">
          <label class="input-label">Usuário</label>
        </div>
        <div class="row form-floating mt-3">
          <input v-model="inputUser.password" name="password" type="password" required class="form-control" placeholder="Senha">
          <label class="input-label">Senha</label>
        </div>
        <div class="row form-floating mt-3">
          <input v-model="confirms.password" name="confirm-password" type="password" required class="form-control" placeholder="Confirmar senha">
          <label class="input-label">Confirme sua senha</label>
        </div>
        <div class="row justify-content-evenly mt-3">
          <div class="col-4">
            <a href="/login" class="btn btn-danger">Voltar</a>
          </div>
          <div class="col-4">
            <button class="btn btn-success">Confirmar</button>
          </div>
        </div>
      </form>
    </div>
  </body>
</template>

<style scoped>
  .container-fluid {
      font-family: 'Poppins', sans-serif !important;
      display: grid !important;
      place-content: center !important;
      height: 100vh;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>