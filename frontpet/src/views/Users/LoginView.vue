<script src="../../scripts/Users/login"></script>
<style>
    @import "../../styles/Users/styles.css";
</style>
<template>
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
    </header>
    <div class="container-fluid">
        <form @submit.prevent="login(user, pass)">
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
                    <a href="/signup" class="btn btn-outline-success" type="button">Cadastrar</a>
                </div>
                <div class="col-4">
                    <button class="btn btn-success" type="submit">Entrar</button>
                </div>
            </div>
        </form>
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