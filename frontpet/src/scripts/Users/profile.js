import HeaderView from '../../views/Users/HeaderView.vue';
import { createOptions, createOptionsImgs } from '../../utils/http';

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
    uploadPfp: async function(imgs){
      var res = await fetch(`${this.server}/adoptions/${this.user.id}`, createOptionsImgs('PATCH', 'adoptions', null, null, imgs.target.files[0])),
          data = await res.json();

          console.log(data);

      if(data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
      else this.user = data;
    },
    removePet: async function(target){
      if(confirm(`Deseja realmente remover o pet ${target.pet_name}?`)){
        var res = await fetch(`${this.server}/adoptions/${target.id}`, createOptions('DELETE')),
            data = await res.json();
        if(data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
        else for(let pet in this.availablePets) if(target.id === this.availablePets[pet].id) delete this.availablePets[pet];  
      }
    },
    petInsert: async function(){
      if(this.petAge == 'Anos') this.insertPet.petAge = this.insertPet.petAge * 12;
      
      var res = await fetch(`${this.server}/adoptions/`, createOptions('POST', this.insertPet)),
          data = await res.json();
          
      if(data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
      else this.$router.go();
    },
    petProfile: function(target){
      this.$router.push(`/adoptions/${target.id}`);
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
      insertPet: {
        petName: '',
        petAge: '',
        petSize: '',
        petSpecies: '',
        petColor: '',
        petBreed: '',
        desc: ''
      },
      pfp:{
        pfp: '',
        data: '',
        imgs: ''
      },
      species: ['Cachorro', 'Gato', 'Ave', 'Réptil','Outro'],
      breedDog: [ 'Spitz Alemão', 'Bulldog Francês', 'Shih Tzu', 'Pug', 'Rottweiler', 'Golden Retriever', 'Pastor Alemão', 'Border Collie', 'SDR', 'Outro'],
      breedCat: [ 'Persa', 'Siamese', 'Ragdoll', 'Siamês', 'Sphynx', 'SDR', 'Outro'],
      breedBird: [ 'Canário', 'Pássaro', 'SDR', 'Outro'],
      breedReptile: [ 'Tartaruga', 'Lagarto', 'Outro'],
      colors: ['Branco', 'Preto', 'Marrom', 'Cinza', 'Pardo', 'Vermelho', 'Amarelo', 'Verde', 'Azul', 'Outro'],
      petAge: '',
      ufs: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      passConfirm: ''
    }
  },

  components: { HeaderView }
}