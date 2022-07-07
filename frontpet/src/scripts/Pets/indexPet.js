import { createOptions } from '../../utils/http';
import HeaderView from '../../views/Users/HeaderView.vue';
import MenuView from '../../views/Users/MenuView.vue';


export default {
  created: function () {
    this.getPets();
  },
  methods: {
    getPets: async function () {
      var res = await fetch(`${this.server}/adoptions/`, createOptions('GET'));
      this.pets = await res.json();
      this.pets = this.pets.adoptions;
    },
    petProfile: function(target){
      this.$router.push(`/adoptions/${target.id}`);
    }
  },
  data: function(){
    return {
      pets: [],
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      selM: 5,
      months: ['1 mês', '2 meses', '3 meses', '4 meses', '5 meses', '6 meses', '7 meses', '8 meses', '9 meses', '10 meses', '11 meses'],
      selY: 5,
      years: ['1 ano', '2 anos', '3 anos', '4 anos', '5 anos', '6 anos', '7 anos', '8 anos', '9 anos', '10 anos', 'Mais de 10 anos'],
      species: ['Cachorro', 'Gato', 'Ave', 'Réptil'],
      checkedSpecies: [],
      checkedColors: [],
      checkedBreeds: [],
      checkedSizes: [],
      breedDog: [ 'Spitz Alemão', 'Bulldog Francês', 'Shih Tzu', 'Pug', 'Rottweiler', 'Golden Retriever', 'Pastor Alemão', 'Border Collie', 'SDR', 'Outro'],
      breedCat: [ 'Persa', 'Siamese', 'Ragdoll', 'Siamês', 'Sphynx', 'Gato SDR', 'Outras raças de gato'],
      breedBird: [ 'Canário', 'Pássaro', 'Ave SDR', 'Outras raças de ave'],
      breedReptile: [ 'Tartaruga', 'Lagarto', 'Outros tipos de répteis'],
      colors: ['Branco', 'Preto', 'Marrom', 'Cinza', 'Pardo', 'Vermelho', 'Amarelo', 'Verde', 'Azul', 'Outro']
    }
  },
  components: { HeaderView, MenuView }
} 