<script src="../../scripts/Pets/profilePet.js"></script>

<template>
    <HeaderView/>
    <div class="container p-5 mr-4">
        <div class="row mb-2 ms-4">
            <div class="col-md-3">
                <div class="row">
                    <div class="col-md-auto mt-5 mb-2">
                        <img class="circular--square border border-3 border-success centered" src="../../assets/images/img-cat-test.jpg"/>
                    </div>
                </div>
                <div class="col-md-auto mt-3">
                    <h4 class="text-success">Nome: {{ pet.pet_name }}</h4>
                    <h4 class="text-success">Dono(a): {{ owner.username }}</h4>
                </div>
            </div>
            <div class="col-md-8 mt-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-auto mb-4">
                        <button type="button" class="btn btn-outline-success" disabled>
                            Enviar Mensagem
                            <img src="../../assets/icons/svg/chat.svg" width="15" height="15"/>
                        </button>
                    </div>
                    <div class="col-md-auto mb-4">
                        <button type="button" class="btn btn-outline-success">
                            Adicionar aos Favoritos
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
                </div>
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
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
        <div class="container-fluid">
            <h3 class="text-success">Fotos de {{ pet.pet_name }}:</h3>
        </div>
        <div class="scroll row row-cols-4 row-cols-md-3 g-4 border rounded overflow-auto flex-md-row mb-4 shadow-sm h-md-250 position-relative mt-3 centered" style=" width: 1150px; height: 600px;">
            <div class="col">
                <div class="card shadow p-3 mb-5 bg-body rounded">
                    <img src="../../assets/images/apple-touch-icon.png"/>
                </div>
            </div>
            <div class="col">
                <div class="card shadow p-3 mb-5 bg-body rounded">
                    <img src="../../assets/images/apple-touch-icon.png"/>
                </div>
            </div>
            <div class="col">
                <div class="card shadow p-3 mb-5 bg-body rounded">
                    <img src="../../assets/images/apple-touch-icon.png"/>
                </div>
            </div>
            <div class="col mb-3">
                <div class="card shadow p-3 mb-5 bg-body rounded">
                    <img src="../../assets/images/apple-touch-icon.png"/>
                </div>
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
        width: 200px;
        height: 200px;
    }

    button:disabled {
        cursor: not-allowed;
        pointer-events: all !important;
    }

    ::-webkit-scrollbar-thumb {
        background: #198754;
    }

    .scroll::-webkit-scrollbar {
        width:10px;
        height: 10px;
    }
 
    .scroll::-webkit-scrollbar-thumb {
        background: #198754;
    }

</style>