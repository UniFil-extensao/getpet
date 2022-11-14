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
          <div v-if="loggedIn" class="dropdown" >
            <button class="btn btn-secondary dropdown-toggle" type="button" id="btnDrop" data-bs-toggle="dropdown" aria-expanded="false">
              Favoritos ({{favs.length}})
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-if="favs.length" v-for="fav in favs">
                <span role="button" v-on:click="petProfile(fav)" class="dropdown-item" href="#">
                  {{ fav.pet_name }} - {{ fav.pet_species }}
                </span>
              </li>
              <li v-else>
                <span class="dropdown-item">Nenhum favorito</span>
              </li>
            </ul>
          </div>
          <div v-if="loggedIn" class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="btnDrop" data-bs-toggle="dropdown" aria-expanded="false">
              Notificações ({{ notifications.adoptions.length != null ? notifications.adoptions.length : 0 }})
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-if="notifications.adoptions.length" v-for="notif in notifications.adoptions">
                <button @click="openReview(notif)" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalNotif">
                  {{ notif.pet_name }} - {{ notif.pet_species }} {{ notif.pet_breed }}
                </button>
              </li>
              <li v-else>
                <p class="dropdown-item">Nenhuma notificação</p>
              </li>
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

  <div class="modal fade" id="modalNotif" tabindex="-1" aria-labelledby="modalLabelNotif" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h3 class="modal-title" id="modalLabelUser">Revisão:</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <div class="mb-5">
              <h3 class="ms-3">Pet:</h3><br>
              <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" style="height: 80px; margin-left: 40px" alt="">
              <label role="button" style ="margin-left: 30px !important; font-size: 25px !important; font-weight: bold !important;" class="profileFav">{{notif.pet_name}}</label>
            </div>

            <div class="mb-5">
              <h3 class="ms-3">Antigo dono:</h3><br>
              <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" style="height: 80px; margin-left: 40px" alt="">
              <label role="button" style ="margin-left: 30px !important; font-size: 25px !important; font-weight: bold !important;" class="profileFav">{{oldOwner.username}}</label>
            </div>

            <input type="range" v-model="donorScore" class="form-range ms-3" style="max-width: 400px;" min="0" max="5">
            <p class="ms-3">Nota para {{oldOwner.username}}: {{donorScore}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" v-on:click="donorScore = 5" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" v-on:click="rate()" class="btn btn-outline-success" data-bs-dismiss="modal">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>

  .pointer {cursor: pointer;}

</style>