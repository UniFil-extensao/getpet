<script src="../../scripts/Pets/indexPet.js"></script>
<template>
	<HeaderView />
	<!-- <MenuView /> -->
	<div class="divisor-linha"></div>
	<div class="container">
		<div class="row mb-2 ms-5">
			<div class="col-md-3">
				<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250">
					<div class="col p-4 d-flex flex-column">
						<h2>Filtros</h2>
						<div class="divisor-linha"></div>
						<h4>Espécie:</h4>
						<div v-for="specie in species" class="form-check">
							<input class="form-check-input species-cb" type="checkbox" v-model="checkedSpecies" :value="specie" id="flexCheckDefault" @change="manageFilters">
							<label class="form-check-label" for="flexCheckDefault" >{{ specie }}</label>
						</div>
						<div class="divisor-linha"></div>
						<h4 v-if="checkedSpecies.length">Raça:</h4>
						<div v-for="specie in checkedSpecies" class="form-check">
							<div v-for="breed in breeds[specie]">
								<input v-model="checkedBreeds" :value="breed"
									@change="manageFilters" class="form-check-input"  type="checkbox" id="flexCheckDefault">
								<label class="form-check-label" for="flexCheckDefault">{{ breed }}</label>
							</div>
						</div>
						<div v-if="checkedSpecies.length" class="divisor-linha"></div>
						<h4>Idade:</h4>
						<div>
							<input min="0" :max="months.length-1" v-model="selM" @change="manageFilters" type="range" class="form-range" id="customRange1">
							<label for="customRange1" class="form-label">De: {{ months[selM] }}</label>
							<br>
							<input min="0" :max="years.length-1" v-model="selY"
								@change="manageFilters" type="range" class="form-range" id="customRange1">
							<label for="customRange1" class="form-label">Até: {{ years[selY] }}</label>
						</div>
						<div class="divisor-linha"></div>
						<h4>Cor:</h4>
						<div v-for="color in colors" class="form-check">
							<input class="form-check-input" type="checkbox" :value="color" v-model="checkedColors" @change="manageFilters"  id="flexCheckDefault">
							<label class="form-check-label" for="flexCheckDefault">
								{{ color }}
							</label>
						</div>
						<div class="divisor-linha"></div>
						<h4>Tamanho:</h4>
						<div class="form-check">
							<input v-model="checkedSizes" class="form-check-input" type="checkbox" value="S" id="flexCheckDefault" @change="manageFilters">
							<label class="form-check-label" for="flexCheckDefault">
								Pequeno
							</label>
						</div>
						<div class="form-check">
							<input v-model="checkedSizes" class="form-check-input" type="checkbox" value="M" id="flexCheckDefault" @change="manageFilters">
							<label class="form-check-label" for="flexCheckDefault">
								Médio
							</label>
						</div>
						<div class="form-check">
							<input v-model="checkedSizes" class="form-check-input" type="checkbox" value="L" id="flexCheckDefault" @change="manageFilters">
							<label class="form-check-label" for="flexCheckDefault">
								Grande
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
					<div class="col p-4 d-flex flex-column position-static">
						<strong class="d-inline-block mb-3 text-success">Adote:</strong>
						<form class="input-group" @submit.prevent="manageFilters">
							<input v-model="search" type="search" class="form-control rounded" placeholder="Pesquisar..."	aria-label="Search" aria-describedby="search-addon" />
							<button type="submit" class="btn btn-outline-success">Pesquisar</button>
						</form>
					</div>
				</div>
				<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
					<div v-if="pets.length" v-for="pet in pets" class="border shadow-sm">
						<div class="col p-4 d-flex flex-column position-static">
							<span>
								<p style="float:left" class="mb-4 text-success"><strong>{{ pet.pet_name ?? 'Sem Nome' }}:</strong> {{ pet.pet_species !== 'outro' && pet.pet_species || '' }} {{ pet.pet_breed ?? 'outra raça' }} {{ pet.pet_age > 11 ? Math.floor(pet.pet_age / 12) + ' anos' : pet.pet_age ? pet.pet_age + ' meses' : '(idade desconhecida)' }} {{ pet.pet_color !== 'outro' && pet.pet_color || '(cor não fornecida)' }}</p>
                                <span>
                                    <button style="float:right" type="button" class="btn btn-outline-success" v-on:click="petProfile(pet)">Mais Detalhes</button>
                                </span>
							</span>
						</div>
						<div class="divisor-linha"></div>
					</div>
					<ul class="mt-3 pagination justify-content-center">
						<li class="page-item">
							<button value="a" v-on:click="changePage" :class="'btn btn-outline-success page-link-success transp ' + ((currPage === 1) ?'disabled' : '')">Anterior</button>
						</li>
						<li v-for="n in totalPages" class="page-item">
							<button :value="n" v-on:click="changePage" :class="'btn btn-outline-success page-link-success transp ' + ((n == currPage) ? 'disabled' : '')" id="btnProx">{{n}}</button>
						</li>
						<li class="page-item">
							<button value="p" v-on:click="changePage" :class="'btn btn-outline-success page-link-success transp ' + ((currPage === totalPages) ? 'disabled' : '')" id="btnProx">Próxima</button>
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
