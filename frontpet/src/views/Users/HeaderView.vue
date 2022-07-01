<script src="../../scripts/Users/login.js"></script>

<template>
  <header class="p-3 bg-success text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <ul class="nav col-6 col-lg-auto mb-2 justify-content-center mb-md-0" style="margin-right: 35%;">
          <img src="../../assets/icons/svg/home.svg">
          <li><a href="#" class="nav-link px-2 text-white">Início</a></li>
        </ul>

        <h1>GetPet</h1>        

        <button @click="logout()" class="btn btn-danger nav col-6 col-lg-auto mb-2 justify-content-center mb-md-0" style="margin-left: 35%;">
          Sair
        </button>
      </div>
    </div>
  </header>
</template>