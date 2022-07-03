import HeaderView from '../../views/Users/HeaderView.vue';
import { createOptions } from '../../utils/http';

export default {
  created: async function () {
    this.user = await fetch(`${this.server}/users/${this.userId}`, createOptions('GET'));
    this.user = await this.user.json();
  },
  methods:{
    update: async function(){

      for(let prop in this.updateUser) if(!this.updateUser[prop]) delete this.updateUser[prop];
      if(this.updateUser.pass == this.passConfirm) this.updateUser.password = this.updateUser.pass;
      if(this.updateUser.city && this.updateUser.uf) this.updateUser.address = { city: this.updateUser.city, uf: this.updateUser.uf };

      var res = await fetch(`${this.server}/users/${this.user.id}`, createOptions('PATCH', this.updateUser)),
          data = await res.json();

      if(data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
      else this.user = data;
    }
  },
  data: function () {
    return {
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      userId: this.$route.params.id,
      user: {},
      updateUser: {
        username: '',
        city: '',
        uf: '',
        pass: ''
      },
      ufs: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      passConfirm: ''
    }
  },

  components: { HeaderView }
}