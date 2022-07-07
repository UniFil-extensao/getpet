import HeaderView from '../../views/Users/HeaderView.vue';
import { createOptions } from '../../utils/http';

export default {
  created: async function () {
    this.user = await fetch(`${this.server}/users/${this.userId}`, createOptions('GET'));
    this.user = await this.user.json();
    this.updateUser.city = this.user.city;
    this.updateUser.uf = this.user.uf;
    this.loggedUser = JSON.parse(localStorage.user);

    this.donatedPets = await fetch(`${this.server}/adoptions/?oldOwnerId=${this.userId}`, createOptions('GET'));
    this.donatedPets = await this.donatedPets.json();
    this.donatedPets = this.donatedPets.adoptions;
    for(let pet in this.donatedPets) {
      if(this.donatedPets[pet].status === 'A'){
        this.availablePets[pet] = this.donatedPets[pet];
        delete this.donatedPets[pet];
      }
    }

    this.adoptedPets = await fetch(`${this.server}/adoptions/?newOwnerId=${this.userId}`, createOptions('GET'));
    this.adoptedPets = await this.adoptedPets.json();
    this.adoptedPets = this.adoptedPets.adoptions;


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
    },
    removePet: async function(petId){
      if(confirm(`Deseja realmente remover o pet ${this.availablePets[petId-1].pet_name}?`)){
        var res = await fetch(`${this.server}/adoptions/${petId}`, createOptions('DELETE')),
            data = await res.json();
        if(data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
        else delete this.availablePets[petId-1];
      }
    }
  },
  data: function () {
    return {
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      userId: this.$route.params.id,
      user: {},
      donatedPets: {},
      adoptedPets: {},
      availablePets: {},
      loggedUser: {},
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