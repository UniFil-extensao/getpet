import { createOptions } from '../../utils/http';

export default {
  methods: {
    insert: async function () {
      if (this.confirms.password !== this.inputUser.password) {
        alert('As senhas não conferem!');
        return;
      } else if (this.confirms.email !== this.inputUser.email) {
        alert('Os emails não conferem!');
        return;
      }

      var res = await fetch(
          `${this.server}/users/`,
          createOptions('POST', this.inputUser)
        ),
        data = await res.json();

      if (data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
      else this.$router.push('/login');
    },
  },
  data: function () {
    return {
      inputUser: {
        username: '',
        password: '',
        email: '',
        cpf: '',
        city: '',
        uf: '',
        phone: '',
      },
      confirms: {
        password: '',
        email: '',
      },
      ufs: [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
      ],
    };
  },
  inject: {
    server: {
      from: 'server',
    },
  },
};
