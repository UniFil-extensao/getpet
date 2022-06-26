<script src="../../scripts/Users/profile.js"></script>

<template>
<HeaderView/>
<div class="divisor-linha"></div>
<div class="container">
  <div class="row mb-2">
    <div class="col-md-4">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <h3 class="d-inline-block mb-3 text-success">Username <img src="../../assets/icons/svg/pencil.svg"></h3>
          <h3 class="mb-0 text-success">Cidade - UF <img src="../../assets/icons/svg/pencil.svg"></h3>
        </div>
        <div class="rounded-circle col-4 d-none d-lg-block" style="border: 1px solid; margin-right: 15px;">
          FOTO DO USER
        </div>
      </div>
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <h4 class="d-inline-block mb-3 text-success">user.qtd_adotados <span style="float: right;"><img class="mb-1" src="../../assets/icons/svg/star.svg"> x</span></h4>
          <h4 class="mb-0 text-success">user.qtd_doados  <span style="float: right;"><img class="mb-1" src="../../assets/icons/svg/star.svg"> y</span></h4>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-3 text-success">Dados do usuário:</strong>
          <span>
            <p style="float:left" class="mb-4 text-success">Nome:</p>
            <p style="float:right" class="mb-1 text-secondary">user.nome</p>
          </span>
          <span>
            <p style="float:left" class="mb-4 text-success">Email:</p>
            <p style="float:right" class="mb-1 text-secondary">user.email</p>
          </span>
          <span>
            <p style="float:left" class="mb-4 text-success">Telefone:</p>
            <p style="float:right" class="mb-1 text-secondary">user.telefone</p>
          </span>
          <span>
            <p style="float:left" class="mb-4 text-success">Senha:</p>
            <button style="float:right" type="button" class="btn btn-outline-success">Alterar senha</button>
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <!-- botao para redirecionar para pets adotados -->
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.divisor-linha {
  height: 3rem;
  border-width: 1px 0;
}
</style>