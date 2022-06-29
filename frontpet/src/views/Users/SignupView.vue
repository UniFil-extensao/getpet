  <style>
  @import "../../styles/Users/styles.css";
  </style>

  <script src="../../scripts/Users/signup.js"></script>

<template>

  <body>
    <form>
      <div class="container-fluid">
        <div class="row">
          <img src="../../assets/images/icon_getpet.png" alt="">
        </div>
        <div class="row form-floating">
          <input name="email" type="text" id="floatingInput" required class="form-control" placeholder="Email">
          <label for="floatingInput" class="input-label">E-mail</label>
        </div>
        <div class="row form-floating mt-3">
          <input id="floatingPassword" name="confirm-email" type="text" required class="form-control"
            placeholder="Senha">
          <label for="floatingPassword" class="input-label">Confirme seu E-mail</label>
        </div>
        <div class="row form-floating mt-3">
          <input name="cpf" type="text" id="floatingInput" required class="form-control" placeholder="Email">
          <label for="floatingInput" class="input-label">CPF</label>
        </div>
        <div class="row form-floating mt-3">
          <input id="floatingPassword" name="tel" type="number" required class="form-control" placeholder="Senha">
          <label for="floatingPassword" class="input-label">Telefone</label>
        </div>
        <div class="row justify-content-space-between mt-3">
          <div class="col">
            <input id="floatingPassword" name="cidade" type="text" required class="form-control" placeholder="Cidade">
          </div>
          <div class="col-4">
            <select id="floatingInput" required class="form-control" name="uf" placeholder="Estado">
              <option value="">UF</option>
              <option v-for="UF in ufs" :value="UF"> {{ UF }} </option>
            </select>
          </div>
        </div>
        <div class="row form-floating mt-3">
          <input id="floatingPassword" name="name" type="text" required class="form-control" placeholder="Senha">
          <label for="floatingPassword" class="input-label">Usuário</label>
        </div>
        <div class="row form-floating mt-3">
          <input name="password" type="password" id="floatingInput" required class="form-control" placeholder="Email">
          <label for="floatingInput" class="input-label">Senha</label>
        </div>
        <div class="row form-floating mt-3">
          <input id="floatingPassword" name="confirm-password" type="password" required class="form-control"
            placeholder="Senha">
          <label for="floatingPassword" class="input-label">Confirme sua senha</label>
        </div>
        <div class="row justify-content-evenly mt-3">
          <div class="col-4">
            <a href="/login" class="btn btn-danger">Voltar</a>
          </div>
          <div class="col-4">
            <button class="btn btn-success" type="submit">Confirmar</button>
          </div>
        </div>
      </div>
    </form>
  </body>
</template>