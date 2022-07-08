<script src="../../scripts/Pets/profilePet.js"></script>

<template>
    <HeaderView/>
    <div class="divisor-linha"></div>
    <div class="container">
        <div class="row mb-2 ms-4">
            <div class="col-md-3">
                <div class="row">
                    <div class="col-md-auto mb-3">
                        <img class="circular--square border border-success" src="../../assets/images/img-dog-test.jpg"/>
                    </div>
                    <div class="col-md-auto mt-3">
                        <h5 class="text-success">Nome: {{ pet.pet_name }}</h5>
                        <h5 role="button" v-on:click="ownerProfile()" class="text-success">Dono(a): {{ owner.username }}</h5>
                    </div>
                </div>
                <div class="row g-0 border rounded overflow-auto mb-4 shadow-sm h-md-250 position-relative" style="height: 650px;">
                    <img src="../../assets/images/apple-touch-icon.png" height="200" />
                    <img src="../../assets/images/apple-touch-icon.png" height="200" />
                    <img src="../../assets/images/apple-touch-icon.png" height="200" />
                    <img src="../../assets/images/apple-touch-icon.png" height="200" />
                    <img src="../../assets/images/apple-touch-icon.png" height="200" />
                </div>
            </div>
            <div class="col-md-8 mt-5">
                <div class="row d-flex justify-content-center">
                    <div v-if="loggedUser.id != owner.id" class="col-md-auto mb-4">
                        <button v-if="!isFav" v-on:click="addFav()" type="button" class="btn btn-outline-success">
                            Adicionar aos Favoritos
                            <img src="../../assets/icons/svg/star.svg" width="15" height="15"/>
                        </button>
                        <button v-else v-on:click="removeFav()" type="button" class="btn btn-outline-danger">
                            Remover dos Favoritos
                            <img src="../../assets/icons/svg/star.svg" width="15" height="15"/>
                        </button>
                    </div>
                    <div class="col-md-auto mb-4">
                        <button type="button" class="btn btn-outline-success">
                            Compartilhar
                            <img src="../../assets/icons/svg/share.svg" width="15" height="15"/>
                        </button>
                    </div>
                    <div class="col-md-auto mb-4">
                        <button type="button" class="btn btn-danger" disabled>
                            Reportar Anúncio
                            <img src="../../assets/icons/svg/warning.svg" width="15" height="15"/>
                        </button>
                    </div>
                    <div class="col-md-auto mb-4">
                        <button v-if="loggedUser.id == owner.id" v-on:click="getFavUsers()" type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#modalFav">
                            Interessados
                            <img src="../../assets/icons/svg/star.svg" width="15" height="15"/>
                        </button>
                    </div>
                </div>
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="row centered">
                        <div class="col-md-3 mt-2 mb-4">
                            <h2 class="text-success">Espécie:</h2>
                        </div>
                        <div class="col-md-3 mt-2 mb-4">
                            <h3 class="text-success">{{pet.pet_species}}</h3>
                        </div>
                        <div class="col-md-3 mt-2 mb-4">
                            <h2 class="text-success">Tamanho:</h2>
                        </div>
                        <div class="col-md-3 mt-2 mb-4">
                            <h3 class="text-success">{{pet.pet_size == 'M' ? 'Médio' : pet.pet_size == 'L' ? 'Grande' : 'Pequeno'}}</h3>
                        </div>
                    </div>
                    <div v-if="pet.pet_age" class="row centered">
                        <div class="col-md-3 mb-4">
                            <h2 class="text-success">Idade:</h2>
                        </div>
                        <div class="col-md-3 mt-2 mb-4">
                            <h3 class="text-success">{{ pet.pet_age < 12 ? (pet.pet_age).toFixed() + ' Meses' : (pet.pet_age / 12).toFixed() + ' Anos' }}</h3>
                        </div>
                    </div>
                    <hr/>
                    <div class="col-md-11 mb-4 centered">
                        <h3 class="text-success">Descrição:</h3>
                        <p class="fs-5 mr-3">{{ pet.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!--Modal User-->
<div class="modal fade" id="modalFav" tabindex="-1" aria-labelledby="modalLabelFav" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
            <h3 class="modal-title" id="modalLabelUser">Selecionar usuário para adoção:</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div v-for="favUser in favUsers" v-on:click="selectUser(favUser)" role="button" style="margin-top: 15px; margin-bottom: 15px;">
            <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" style="height: 80px; margin-left: 40px" alt="">
            <label role="button" style ="margin-left: 30px !important; font-size: 25px !important; font-weight: bold !important;" class="profileFav">{{ favUser.username }}</label>
        </div>
        <div class="row" v-if="selected.username" style="margin-bottom: 10px;">
            <input type="text" readonly :value="'Novo dono: ' + selected.username" class="form-control" style="background-color:white; margin-left: 23%; border-radius: 10px; width: 260px; height: 30px;">
            <input type="range" v-model="adopterScore" class="mt-3 form-range" style="margin-left: 23%; max-width: 260px;" min="0" max="5">
            <p style="margin-left: 23%;">Nota para {{ selected.username }} : {{ adopterScore }}</p>
        </div>
        <div class="modal-footer">
            <button type="button" v-on:click="donatePet(selected)" v-if="selected.username" class="btn btn-outline-success" data-bs-dismiss="modal">Doar para: {{selected.username}}</button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
        </div>
    </form>
    </div>
  </div>
</div>
</template>


<style>

    .divisor-linha {
        height: 3rem;
        border-width: 1px 0;
    }

    .centered {
        margin: 0 auto !important;
        float: none !important;
    }

    .circular--square {
        border-radius: 50%;
        width: 95px;
        height: 95px;
    }

    button:disabled {
        cursor: not-allowed;
        pointer-events: all !important;
    }
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        input[type='range']::-webkit-slider-thumb {
            background: #4CAF50;
        }
    }
</style>