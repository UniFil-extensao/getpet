<style>
  @import "../../styles/Users/styles.css";
</style>
<script src="../../scripts/Users/signup.js"></script>

<template>
  <body>
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
          <input v-model="inputUser.cpf" name="cpf" type="text" required class="form-control" placeholder="CPF">
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
              <option value="">UF</option>
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