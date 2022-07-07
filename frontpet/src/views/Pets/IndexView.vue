<script src="../../scripts/Pets/indexPet.js"></script>
<template>
    <HeaderView />
    <MenuView />
    <div class="divisor-linha"></div>
    <div class="container">
        <div class="row mb-2 ms-5">
            <div class="col-md-3">
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250">
                    <div class="col p-4 d-flex flex-column">
                        <h2>Filtros</h2>
                        <div class="divisor-linha"></div>
                        <h4>Raça:</h4>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="dalmata" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Dalmataaaa
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="golden" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Golden
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="outros" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Outros
                            </label>
                        </div>
                        <div class="divisor-linha"></div>
                        <h4>Idade:</h4>
                        <div>
                            <input min="0" max="10" v-model="selM" type="range" class="form-range" id="customRange1">
                            <label for="customRange1" class="form-label">De: {{ months[selM] }}</label>
                            <br>
                            <input min="0" max="10" v-model="selY" type="range" class="form-range" id="customRange1">
                            <label for="customRange1" class="form-label">Até: {{ years[selY] }}</label>
                        </div>
                        <div class="divisor-linha"></div>
                        <h4>Cor:</h4>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="preto" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Preto
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="cinza" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Cinza
                            </label>
                        </div>
                        <div class="divisor-linha"></div>
                        <h4>Tamanho:</h4>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="pequeno" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Pequeno
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="medio" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Médio
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="grande" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Grande
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div
                    class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-3 text-success">Adote:</strong>
                        <div class="input-group">
                            <input type="search" class="form-control rounded" placeholder="Pesquisar..."
                                aria-label="Search" aria-describedby="search-addon" />
                            <button type="button" class="btn btn-outline-success">Pesquisar</button>
                        </div>
                    </div>
                </div>
                <div
                    class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="rounded-circle col-3 d-none d-lg-block"
                        style="border: 1px solid; margin-right: 5px; margin-left: 15px;">
                    </div>
                    <div class="col p-4 d-flex flex-column position-static">
                        <span>
                            <p style="float:left" class="mb-4 text-success">Species Age Race Color Petname</p>
                            <span>
                                <button style="float:right" type="button"
                                    class="btn btn-outline-success">Visualizar/Adotar</button>
                            </span>
                        </span>
                    </div>
                    <div class="divisor-linha"></div>
                    <div class="rounded-circle col-3 d-none d-lg-block"
                        style="border: 1px solid; margin-right: 5px; margin-left: 15px;">
                    </div>
                    <div class="col p-4 d-flex flex-column position-static">
                        <span>
                            <p style="float:left" class="mb-4 text-success">Species Age Race Color Petname</p>
                            <span>
                                <button style="float:right" type="button"
                                    class="btn btn-outline-success">Visualizar/Adotar</button>
                            </span>
                        </span>
                    </div>
                    <div class="divisor-linha"></div>
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <a class="btn btn-outline-success page-link">Anterior</a>
                        </li>
                        <li class="page-item"><a class="btn btn-outline-success page-link-success transp" href="#" id="btnProx">1</a></li>
                        <li class="page-item"><a class="btn btn-outline-success page-link-success transp" href="#" id="btnProx">2</a></li>
                        <li class="page-item"><a class="btn btn-outline-success page-link-success transp" href="#" id="btnProx">3</a></li>
                        <li class="page-item">
                            <a class="btn btn-success page-link-success" href="#">Próximo</a>
                        </li>
                    </ul>
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
@media screen and (-webkit-min-device-pixel-ratio:0) {
    input[type='range']::-webkit-slider-thumb {
      background: #4CAF50;
    }
}

input:checked{
    border: 1px solid #4CAF50;
    background-color: #4CAF50;
}
.transp {
    border-color: transparent !important;
}
</style>
