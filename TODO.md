# Header

## Logado

### Favoritos:

- [ ] Buscar favoritos de um usuário
- [ ] Exibir nome do pet no dropdown de favoritos
- [ ] Exibir foto do pet no dropdown de favoritos (se quiser)
- [ ] Ao clicar em um favorito, navegar para a página da adoção.

### Notificações:

- [x] Incluir `closed_at` na lista de opções aceitas de ordenação na rota de listagem em `controllers/adoptions`;
- [ ] Criar o dropdown de notificações;

  > Notificações são adoções que foram concluídas (fechadas) pelo Doador,
  > mas que o adotante não deu nota para o Doador.

  Para buscar as notificações de um usuário, use a rota `/adoptions` com os parametros:

  ```js
  const params = {
    noLimit: 'true',
    status: 'f',
    orderBy: 'closed_at',
    newOwnerId: this.user.id,
    nullDonorScore: 'true',
  };
  ```

- [ ] Exibir um badge com o total de notificações encontradas;
- [ ] Exibir os nomes dos pets no dropdown de notificações;
- [ ] Exibir os fotos dos pets no dropdown de notificações (se quiser);
  > Implementar consistente com o dropdown de favoritos
- [ ] Ao clicar em uma notificação, abrir o _ReviewModal_, passando id do Doador e da Adoção.
- [ ] Ao confirmar o _ReviewModal_, remover a notificação com os id's passados.

# Componentes Soltos

## Modais

### ReviewModal

- [ ] Exibir:
  - nome e foto do pet,
  - nome e foto do doador,
  - formulário contento o campo para a nota de 1 a 5 (obrigatório),
  - botão de confirmação,
  - botão de cancelar,
  - botão de fechar.
- [ ] Receber id do Pet e id do Doador como parâmetro;
- [ ] Buscar com request dados do pet e do doador;
- [ ] Ao clicar em cancelar ou fechar, fechar o modal e resetar o formulário;
- [ ] Ao clicar em confirmar, enviar requisição para a rota `/adoptions/:id/close` com o body no formato:
  ```js
  const formData = {
    donorScore: this.donorScore,
  };
  ```
