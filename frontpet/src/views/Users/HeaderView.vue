<script src="../../scripts/Users/login.js"></script>
<style src="../../styles/Users/styles.css"></style>
<template>
  <header class="p-3 bg-success text-white">
    <div class="container" id="cabecalho">
      <div class="d-flex flex-row flex-wrap align-items-center justify-content-between">
        <!-- LADO ESQUERDO -->
        <div class="d-flex flex-row">
          <button v-if="loggedIn" v-on:click="profile()" class="btn btn-outline-light nav  col-lg-auto mb-2 justify-content-center mb-md-0" id="btnIcones1">
            <img class="ms-2" src="../../assets/icons/svg/person.svg" style="height: 20px;">
          </button>
          <button v-on:click="home()" class="btn btn-outline-light nav col-6 col-lg-auto mb-2 justify-content-center mb-md-0" id="btnIcones2">
            <img class="ms-2" src="../../assets/icons/svg/home.svg">
          </button>
        </div>

        <!-- MEIO -->
        <div>
          <h1 v-on:click="home()" class="pointer" style="color: black">GetPet</h1>
        </div>

        <!-- LADO DIREITO -->
        <div class="d-flex flex-row align-items-center justify-content-around">
          <div v-if="loggedIn && favs.length" class="dropdown" >
            <button class="btn btn-secondary dropdown-toggle" type="button" id="btnDrop" data-bs-toggle="dropdown" aria-expanded="false">
              Favoritos
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="fav in favs">
                <span v-if="fav.adoption" role="button" v-on:click="petProfile(fav)" class="dropdown-item" href="#">
                  <!-- REFAC: refazer utilizando os dados certos -->
                  {{ fav.adoption.pet_name }} - {{ fav.adoption.pet_species }} {{ fav.adoption.pet_breed }} 
                </span>
              </li>
            </ul>
          </div>
          <div class="dropdown" style="margin-left: ;">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="btnDrop" data-bs-toggle="dropdown" aria-expanded="false">
              Notificações
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
          <button v-if="loggedIn" @click="logout()" class="btn btn-outline-danger nav col-6 col-lg-auto mb-2 d-flex flex-nowrap flex-row justify-content-between align-items-center mb-md-0" style="border-color: transparent !important; margin-left: 1%;">
            <img class="ms-2 mt-1 me-2" src="../../assets/icons/svg/account-logout.svg">
            <span style="color: black">Logout</span>
          </button>
          <router-link v-else to="/login" class="btn btn-outline-light d-flex nav col-6 col-lg-auto mb-2 justify-content-center align-items-center mb-md-0" style="border-color: transparent !important">
            <img class="me-2 ms-2 mt-2" src="../../assets/icons/svg/account-login.svg">
            <span style="color: black">Login</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<style>

  .pointer {cursor: pointer;}

</style>