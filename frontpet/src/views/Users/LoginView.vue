  <style>
  @import "../../styles/Users/styles.css";
  </style>
<template>
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
                <input id="floatingPassword" name="password" type="password" required class="form-control"
                    placeholder="Senha">
                <label for="floatingPassword" class="input-label">Senha</label>
            </div>
            <div class="row justify-content-evenly mt-3">
                <div class="col-4">
                    <a href="/signup" class="btn btn-outline-success" type="submit">Cadastrar</a>
                </div>
                <div class="col-4">
                    <button class="btn btn-success" type="submit">Entrar</button>
                </div>
            </div>
        </div>
    </form>
</template>
