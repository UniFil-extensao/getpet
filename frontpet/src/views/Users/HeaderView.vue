<script src="../../scripts/Users/login.js"></script>

<template>
  <header class="p-3 bg-success text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <button class="btn btn-outline-light nav col-6 col-lg-auto mb-2 justify-content-center mb-md-0" style="border-color: transparent !important; margin-right: 35%;">
          <img class="ms-2" src="../../assets/icons/svg/home.svg">
        </button>

        <h1>GetPet</h1>        

        <button @click="logout()" class="btn btn-outline-danger nav col-6 col-lg-auto mb-2 justify-content-center mb-md-0" style="border-color: transparent !important; margin-left: 35%;">
          <img class="ms-2 mt-2" src="../../assets/icons/svg/account-logout.svg">
        </button>
      </div>
    </div>
  </header>
</template>