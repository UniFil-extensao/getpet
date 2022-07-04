<script src="../../scripts/Users/login"></script>
<style>
    @import "../../styles/Users/styles.css";
</style>
<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <img src="../../assets/images/icon_getpet.png" alt="">
        </div>
        <div class="row form-floating">
            <input name="Username" v-model="user" type="text" id="floatingInput" required class="form-control" placeholder="Usuário">
            <label for="floatingInput" class="input-label">Usuário</label>
        </div>
        <div class="row form-floating mt-3">
            <input id="floatingPassword" v-model="pass" name="password" type="password" required class="form-control"
                placeholder="Senha">
            <label for="floatingPassword" class="input-label">Senha</label>
        </div>
        <div class="row justify-content-evenly mt-3">
            <div class="col-4">
                <a href="/signup" class="btn btn-outline-success" type="submit">Cadastrar</a>
            </div>
            <div class="col-4">
                <button class="btn btn-success" @click="login(user, pass)" type="submit">Entrar</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.container-fluid {
    font-family: 'Poppins', sans-serif !important;
    display: grid !important;
    place-content: center !important;
    height: 100vh;
}
</style>