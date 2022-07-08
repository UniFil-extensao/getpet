<script src="../../scripts/Users/login.js"></script>
<style src="../../styles/Users/styles.css"></style>
<template>
  <header class="p-3 bg-success text-white">
    <div class="container" id="cabecalho">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <button v-on:click="profile()" class="btn btn-outline-light nav col-6 col-lg-auto mb-2 justify-content-center mb-md-0" id="btnIcones1">
          <img class="ms-2" src="../../assets/icons/svg/person.svg" style="height: 20px;">
        </button>
        <button v-on:click="home()" class="btn btn-outline-light nav col-6 col-lg-auto mb-2 justify-content-center mb-md-0" id="btnIcones2">
          <img class="ms-2" src="../../assets/icons/svg/home.svg">
        </button>
        <h1 v-on:click="home()" class="pointer" style="color: black">GetPet</h1>
        <div class="dropdown" style="margin-left: 20%;" >
          <button class="btn btn-secondary dropdown-toggle" type="button" id="btnDrop" data-bs-toggle="dropdown" aria-expanded="false">
            Favoritos
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
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
        <button @click="logout()" class="btn btn-outline-danger nav col-6 col-lg-auto mb-2 justify-content-center mb-md-0" style="border-color: transparent !important; margin-left: 1%; width: 45px;">
          <img class="ms-2 mt-2" src="../../assets/icons/svg/account-logout.svg">
        </button>
      </div>
    </div>
  </header>
</template>

<style>

  .pointer {cursor: pointer;}

</style>