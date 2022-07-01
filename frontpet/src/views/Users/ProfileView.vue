<script src="../../scripts/Users/profile.js"></script>

<template>
  <HeaderView/>
  <div class="divisor-linha"></div>
  <div class="container">
    <div class="row mb-2 ms-5">
      <div class="col-md-4">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <h3 class="d-inline-block mb-3 text-success">{{ user.username }} <img src="../../assets/icons/svg/pencil.svg"></h3>
            <h3 class="mb-0 text-success">{{ user.city }} - {{ user.uf }} <img src="../../assets/icons/svg/pencil.svg"></h3>
          </div>
          <div class="rounded-circle col-4 d-none d-lg-block" style="border: 1px solid; margin-right: 15px;">
            {{ user.profile_pic_path }}
          </div>
        </div>
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <h4 class="d-inline-block mb-3 text-success">user.qtd_adotados <span style="float: right;"><img class="mb-1" src="../../assets/icons/svg/star.svg"> {{ user.adopter_score }}</span></h4>
            <h4 class="mb-0 text-success">user.qtd_doados  <span style="float: right;"><img class="mb-1" src="../../assets/icons/svg/star.svg"> {{ user.donor_score }} </span></h4>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-3 text-success">Dados do usuário:</strong>
            <span>
              <p style="float:left" class="mb-4 text-success">Nome: {{ loggedUser }}</p>
              <p style="float:right" class="mb-1 text-secondary">{{ user.username }}</p>
            </span>
            <span>
              <p style="float:left" class="mb-4 text-success">Email:</p>
              <p style="float:right" class="mb-1 text-secondary">{{ user.email }}</p>
            </span>
            <span>
              <p style="float:left" class="mb-4 text-success">Telefone:</p>
              <p style="float:right" class="mb-1 text-secondary">{{ user.phone }}</p>
            </span>
            <span>
              <p style="float:left" class="mb-4 text-success">Senha:</p>
              <button style="float:right" type="button" class="btn btn-outline-success">Alterar senha</button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2 ms-5">
      <div class="col-md-6 mb-4">
        <div class="dropdown">
          <a class="btn border rounded shadow-sm btn-outline-success mb-2" style="width:100%" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <h4 class="mt-1" style="float:left;">Já doou</h4>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <div>
                <a class="dropdown-item border-bottom" href="#">
                  <h4 class="text-success">Pet name</h4>
                  <p class="text-secondary">Dono anterior</p>
                </a>
              </div>  
            </li>
            <li>
              <div>
                <a class="dropdown-item border-bottom" href="#">
                  <h4 class="text-success">Pet name</h4>
                  <p class="text-secondary">Dono anterior</p>
                </a>
              </div>  
            </li>
            <li>
              <div>
                <a class="dropdown-item" href="#">
                  <h4 class="text-success">Pet name</h4>
                  <p class="text-secondary">Dono anterior</p>
                </a>
              </div>  
            </li>
          </ul>
        </div>

        <div class="dropdown">
          <a class="btn border rounded shadow-sm btn-outline-success mb-2" style="width:100%" href="#" role="button" id="dropdownMenuLink2" data-bs-toggle="dropdown" aria-expanded="false">
            <h4 class="mt-1" style="float:left;">Já adotou</h4>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <div>
                <a class="dropdown-item border-bottom" href="#">
                  <h4 class="text-success">Pet name</h4>
                  <p class="text-secondary">Dono anterior</p>
                </a>
              </div>  
            </li>
            <li>
              <div>
                <a class="dropdown-item border-bottom" href="#">
                  <h4 class="text-success">Pet name</h4>
                  <p class="text-secondary">Dono anterior</p>
                </a>
              </div>  
            </li>
            <li>
              <div>
                <a class="dropdown-item" href="#">
                  <h4 class="text-success">Pet name</h4>
                  <p class="text-secondary">Dono anterior</p>
                </a>
              </div>  
            </li>
          </ul>
        </div>

      </div>
      <div class="col-md-4">
        <!-- v-if pets disponibilizados -->
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <div class="row">
              <h4 class="text-success col-6 me-2 mb-2"> Disponibilizando: </h4>
              <button type="button" class="col-4 ms-3 mb-3 btn btn-outline-success">Anunciar Pet</button>
            </div>
            <!-- v-for pets disponibilizados -->
            <div class="border rounded shadow-sm mb-3">
              <div class="row m-2">
                <p class="col-5 text-secondary"> Pet name </p>
                <p class="col-4 me-4 text-secondary"> Age </p>
                <img class="col-2 mt-3" src="../../assets/icons/svg/trash.svg">
              </div>
              <div class="row m-2">
                <p class="col-5 text-secondary"> Species </p>
                <a role="button" class="col-4 link-success"> Ver perfil </a>
              </div>
            </div>
            <div class="border rounded shadow-sm mb-3">
              <div class="row m-2">
                <p class="col-5 text-secondary"> Pet name </p>
                <p class="col-4 me-4 text-secondary"> Age </p>
                <img class="col-2 mt-3" src="../../assets/icons/svg/trash.svg">
              </div>
              <div class="row m-2">
                <p class="col-5 text-secondary"> Species </p>
                <a role="button" class="col-4 link-success"> Ver perfil </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

ul {
  width: 100%;
}
.divisor-linha {
  height: 3rem;
  border-width: 1px 0;
}
</style>