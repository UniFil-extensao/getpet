<script src="../../scripts/Users/profile.js"></script>
<template>
  <HeaderView/>
  <div class="divisor-linha"></div>
  <div class="container">
    <div class="row mb-2 ms-5">
      <div class="col-md-4">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <img v-bind:src="user.profile_pic_path ? this.server + user.profile_pic_path : '../../src/assets/images/img-user.jpg'" class="circular--square border border-3 border-success centered"/>
            <h3 class="d-inline-block mb-3 text-success">{{ user.username }}
            <button v-if="loggedUser.id == user.id" type="button" class="btn btn-outline-success" style="border-color: transparent !important;" data-bs-toggle="modal" data-bs-target="#modalUser">
              <img src="../../assets/icons/svg/pencil.svg">
            </button>
            </h3>
            <h3 class="mb-0 text-success">{{ user.city }} - {{ user.uf }}
              <button v-if="loggedUser.id == user.id" type="button" class="btn btn-outline-success" style="border-color: transparent !important;" data-bs-toggle="modal" data-bs-target="#modalCity">
                <img src="../../assets/icons/svg/pencil.svg">
              </button>
            </h3>
          </div>
        </div>
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <h4 class="d-inline-block mb-3 text-success"> {{ Object.keys(adoptedPets).length }} Adotados<span style="float: right;"><img class="mb-1" src="../../assets/icons/svg/star.svg"> {{ user.adopter_score }}</span></h4>
            <h4 class="mb-0 text-success"> {{ Object.keys(donatedPets).length }} Doados  <span style="float: right;"><img class="mb-1" src="../../assets/icons/svg/star.svg"> {{ user.donor_score }} </span></h4>
          </div>
        </div>
      </div>
      <div v-if="loggedUser.id == user.id" class="col-md-6">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-3 text-success">Dados do usu??rio:</strong>
            <span>
              <p style="float:left" class="mb-4 text-success">Nome:</p>
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
              <button style="float:right" type="button" data-bs-toggle="modal" data-bs-target="#modalPassword" class="btn btn-outline-success">Alterar senha</button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2 ms-5">
      <div  class="col-md-6 mb-4">
        <div v-if="Object.keys(donatedPets).length" class="dropdown">
          <a class="btn border rounded shadow-sm btn-outline-success mb-2" style="width:100%" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <h4 class="mt-1" style="float:left;">J?? doou</h4>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li v-for="pet in donatedPets">
              <a class="dropdown-item border-bottom" href="#">
                <h4 class="text-success mt-2">{{ pet.pet_name }}</h4>
                <p v-if="pet.pet_species" class="text-secondary">{{ pet.pet_species }} - {{ pet.pet_breed }}</p>
              </a>
            </li>
          </ul>
        </div>

        <div v-if="Object.keys(adoptedPets).length" class="dropdown">
          <a class="btn border rounded shadow-sm btn-outline-success mb-2" style="width:100%" href="#" role="button" id="dropdownMenuLink2" data-bs-toggle="dropdown" aria-expanded="false">
            <h4 class="mt-1" style="float:left;">J?? adotou</h4>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li v-for="pet in adoptedPets">
              <a class="dropdown-item border-bottom" href="#">
                <h4 class="text-success mt-2">{{ pet.pet_name }}</h4>
                <p v-if="pet.pet_species" class="text-secondary">{{ pet.pet_species }} - {{ pet.pet_breed }}</p>
              </a>
            </li>
          </ul>
        </div>

      </div>
      <div class="col-md-4">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <div class="row">
              <h4 class="text-success col-6 me-2 mb-2" style="font-size: 23px"> Disponibilizando: </h4>
              <button v-if="loggedUser.id == user.id" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="col-4 ms-3 mb-3 btn btn-outline-success">Anunciar Pet</button>
            </div>
            <div v-if="Object.keys(availablePets).length" v-for="pet in availablePets" class="border rounded shadow-sm mb-3">
              <div class="row m-2">
                <p v-if="pet.pet_name" class="col-5 text-secondary"> {{ pet.pet_name }} </p>
                <p v-if="pet.pet_age" class="col-4 me-4 text-secondary"> {{ pet.pet_age < 12 ? pet.pet_age.toFixed() + ' Meses' : (pet.pet_age / 12).toFixed() + ' Anos'  }} </p>
                <button v-if="loggedUser.id == user.id" v-on:click="removePet(pet)" style="border-color: transparent !important;" class="col-2 mt-3 btn btn-outline-danger">
                  <img src="../../assets/icons/svg/trash.svg">
                </button>
              </div>
              <div class="row m-2">
                <p v-if="pet.pet_species || pet.pet_breed" class="col-5 text-secondary"> {{ pet.pet_species }} - {{ pet.pet_breed }} </p>
                <a role="button" v-on:click="petProfile(pet)" class="col-4 link-success"> Ver perfil </a>
              </div>
            </div>
            <div v-else-if="loggedUser.id == user.id" class="row">
              <h5 class="text-success col-6 me-2 mb-2"> Sem pets dispon??veis! </h5>
              <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="col-4 ms-3 mb-3 btn btn-outline-success">Anunciar Pet</button>
            </div>
            <div v-else class="row">
              <h5 class="text-success opacity-75 mt-4 me-2 mb-2" style="display: inline; text-align: center"> Sem pets dispon??veis! </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<!--Modal User-->
<div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="modalLabelUser" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form @submit.prevent="update()">
        <div class="modal-header">
          <h3 class="modal-title" id="modalLabelUser">Alterar usu??rio</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <input placeholder="Usu??rio:" type="text" class="form-control" v-model="updateUser.username">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" data-bs-dismiss="modal" class="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!--Modal City-->
<div class="modal fade" id="modalCity" tabindex="-1" aria-labelledby="modalLabelCity" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form @submit.prevent="update()">
        <div class="modal-header">
          <h3 class="modal-title" id="modalLabelCity">Alterar Cidade - UF</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-space-between mt-3">
            <div class="col">
              <input name="cidade" v-model="updateUser.city" type="text" required class="form-control" placeholder="Cidade">
            </div>
            <div class="col-4">
              <select v-model="updateUser.uf" required class="form-control" name="uf" placeholder="Estado">
                <option disabled hidden value="">UF</option>
                <option v-for="UF in ufs" :value="UF"> {{ UF }} </option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" data-bs-dismiss="modal" class="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!--Modal Password-->
<div class="modal fade" id="modalPassword" tabindex="-1" aria-labelledby="modalLabelPassword" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form @submit.prevent="update()">

        <div class="modal-header">
          <h3 class="modal-title" id="modalLabelPassword">Alterar senha</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-space-between mt-3">
            <div class="col">
              <input name="password" v-model="updateUser.pass" type="password" required class="form-control" placeholder="Nova senha">
            </div>
            <div class="col">
              <input name="password" v-model="passConfirm" type="password" required class="form-control" placeholder="Confirmar senha">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" data-bs-dismiss="modal" class="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal Anunciar Pet-->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-success" id="staticBackdropLabel">Cadastrar Pet para ado????o</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="petInsert()">
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4 mb-3">
              <input v-model="insertPet.petName" type="text" class="form-control" placeholder="Nome do animal" required="">
            </div>
            <div class="col-md-2 mb-3">
              <input v-model="insertPet.petAge" @scroll.prevent type="number" class="form-control" placeholder="Idade" min="0" required="">
            </div>
            <div class="col-md-3 mb-3">
              <select v-model="petAge" class="form-select" id="age" required>
                  <option value="Meses">Meses</option>
                  <option value="Anos">Anos</option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <select v-model="insertPet.petSize" class="form-select" id="size" required="">
                  <option hidden disabled value="">Tamanho</option>
                  <option value="S">Pequeno</option>
                  <option value="M">M??dio</option>
                  <option value="L">Grande</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 mb-3">
              <select v-model="insertPet.petSpecies" class="form-select" id="species" required="">
                  <option hidden disabled value="">Especie</option>
                  <option v-for="specie in species">{{ specie }}</option>
              </select>
            </div>
            <div class="col-md-4 mb-3">
              <select v-model="insertPet.petColor" class="form-select" id="color" required="">
                  <option hidden disabled value="">Cor</option>
                  <option v-for="color in colors">{{ color }}</option>
              </select>
            </div>
            <div class="col-md-4 mb-3">
              <select v-model="insertPet.petBreed" class="form-select" id="breed" required="">
                  <option hidden disabled value="">Ra??a</option>
                  <option v-if="insertPet.petSpecies == 'Cachorro'" v-for="dog in breedDog">{{ dog }}</option>
                  <option v-else-if="insertPet.petSpecies == 'Gato'" v-for="cat in breedCat">{{ cat }}</option>
                  <option v-else-if="insertPet.petSpecies == 'Ave'" v-for="bird in breedBird">{{ bird }}</option>
                  <option v-else-if="insertPet.petSpecies == 'R??ptil'" v-for="reptile in breedReptile">{{ reptile }}</option>
                  <option v-else-if="insertPet.petSpecies == 'Outro'">SDR</option>
              </select>
            </div>
          </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="country">Foto de Perfil (128px X 128px)</label>
            <div>
              <input v-on:change="saveImage" class="custom-file-upload" id="pet-pfp-upload" type="file" accept="image/png, image/jpeg"/>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="country">Fotos adicionais</label>
            <div>
              <input v-on:change="saveImage" class="custom-file-upload" id="pet-imgs-upload" type="file" accept="image/png, image/jpeg" multiple/>
            </div>
          </div>
        </div>

          <div class="row">
            <div class="col-md-12 mb-3">
              <label>Adicione uma descri????o:</label>
              <textarea v-model="insertPet.desc" class="form-control" id="message-text" placeholder="Descri????o do An??ncio" required minlength="20"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</div>



</template>

<style scoped>
  ul {
    width: 100%;
  }

  input[type="number"] {
    -moz-appearance:textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .divisor-linha {
    height: 3rem;
    border-width: 1px 0;
  }

  .row {
    margin-left: 0;
  }

  .circular--square {
    border-radius: 50%;
    width: 145px;
    height: 145px;
  }

  .custom-file-upload::-webkit-file-upload-button {
    background:#198754;
    color: #fff;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border: 1px solid;
    border-radius: .25rem;
    cursor: pointer;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
  }
</style>