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
                        <h5 class="text-success">pet.name</h5>
                        <h5 class="text-success">pet.dono</h5>
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
                    <div class="col-md-auto mb-4">
                        <button type="button" class="btn btn-outline-success">
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
                        <button type="button" class="btn btn-danger">
                            Reportar Anúncio
                            <img src="../../assets/icons/svg/warning.svg" width="15" height="15"/>
                        </button>
                    </div>
                </div>
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="row centered">
                        <div class="col-md-3 mt-2 mb-4">
                            <h2 class="text-success">Espécie:</h2>
                        </div>
                        <div class="col-md-3 mt-2 mb-4">
                            <h3 class="text-success">pet.species</h3>
                        </div>
                        <div class="col-md-3 mt-2 mb-4">
                            <h2 class="text-success">Tamanho:</h2>
                        </div>
                        <div class="col-md-3 mt-2 mb-4">
                            <h3 class="text-success">pet.size</h3>
                        </div>
                    </div>
                    <div class="row centered">
                        <div class="col-md-3 mb-4">
                            <h2 class="text-success">Idade:</h2>
                        </div>
                        <div class="col-md-3 mt-2 mb-4">
                            <h3 class="text-success">pet.age</h3>
                        </div>
                        <div class="col-md-3 mb-4">
                            <h2 class="text-success">Peso:</h2>
                        </div>
                        <div class="col-md-3 mt-2 mb-4">
                            <h3 class="text-success">pet.weight</h3>
                        </div>
                    </div>
                    <hr/>
                    <div class="col-md-11 mb-4 centered">
                        <h3 class="text-success">Anúncio:</h3>
                        <p class="fs-5 mr-3" text-break>
                            Lorem ipsum dolor sit amet. Ea voluptatum expedita in nostrum itaque ut vitae ipsa ea earum facilis. Cum deserunt asperiores eos nulla ipsam quo assumenda consectetur est totam eligendi et dolorum impedit ea quam sunt. 
                        </p>
                        <p class="fs-5 mr-3" text-break>
                            Et placeat eaque et recusandae velit et facere voluptate aut quod assumenda. Et voluptatem quos et fuga vitae eum consequuntur molestias ea sunt sint ut enim incidunt ut maiores maxime.
                        </p>
                        <p class="fs-5 mr-3" text-break>
                            Eum laboriosam deserunt qui itaque fuga est tempore laudantium non quos autem ut ducimus internos in sapiente maiores. Qui necessitatibus consequatur id soluta rerum non enim vero sed illo alias. Qui ipsa omnis et obcaecati optio et voluptatem dolor est ipsum dolores vel voluptatem nihil At laudantium saepe. Ad unde illum sed  nihil vel nemo magni sit consequatur recusandae et galisum blanditiis eum aliquam rerum. 
                        </p>
                    </div>
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
        width: 95px;
        height: 95px;
    }

</style>