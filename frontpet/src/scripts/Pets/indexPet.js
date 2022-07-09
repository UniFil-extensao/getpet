import { createOptions } from '../../utils/http';
import HeaderView from '../../views/Users/HeaderView.vue';
import MenuView from '../../views/Users/MenuView.vue';

export default {
  created: function () {
    this.selY = this.years.length - 1;
    this.getPets();
  },
  methods: {
    getPets: async function () {
      const prepQuery = arr => {
        return arr.map(item => encodeURI(item)).join(',');
      };
      let options = {};

      if (this.search) options.search = this.search;

      // TODO: pages

      options.species = prepQuery(this.checkedSpecies);

      options.breeds = prepQuery(this.checkedBreeds);
      options.colors = prepQuery(this.checkedColors);
      options.sizes = prepQuery(this.checkedSizes);

      options.page = this.currPage;

      if (this.selM != 0) options.minAge = this.selM;
      if (this.selY != this.years.length - 1) options.maxAge = this.selY * 12;

      if (this.search) options.search = this.search;

      const queryStr =
        '?' +
        Object.entries(options)
          .filter(([key, value]) => value)
          .map(([key, value]) => {
            return key + '=' + value;
          })
          .join('&');

      var res = await fetch(
        `${this.server}/adoptions/${queryStr}`,
        createOptions('GET')
      );
      this.pets = await res.json();
      this.totalPages = this.pets.total_pages;
      this.pets = this.pets.adoptions;
    },
    petProfile: function (target) {
      this.$router.push(`/adoptions/${target.id}`);
    },
    manageFilters: function (event) {
      const checkbox = event.target;
      if (!checkbox.checked) {
        const key = this.breeds[checkbox.value];
        if (!checkbox.checked && key !== undefined) {
          this.checkedBreeds = this.checkedBreeds.filter(item => {
            return !key.includes(item);
          });
        }
      }
      this.getPets();
    },
    changePage: function (event) {
      const val = event.target.value;
      if (+val > 0) this.currPage = +event.target.value;
      else if (val === 'a' && this.currPage > 0) this.currPage--;
      else if (val === 'p' && this.currPage < this.totalPages) this.currPage++;
      this.getPets();
    },
  },
  data: function () {
    return {
      pets: [],
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      selM: 0,
      months: [
        'Sem Limite',
        '1 mês',
        '2 meses',
        '3 meses',
        '4 meses',
        '5 meses',
        '6 meses',
        '7 meses',
        '8 meses',
        '9 meses',
        '10 meses',
        '11 meses',
      ],
      selY: 0,
      years: [
        '1 ano',
        '2 anos',
        '3 anos',
        '4 anos',
        '5 anos',
        '6 anos',
        '7 anos',
        '8 anos',
        '9 anos',
        '10 anos',
        'Mais de 10 anos',
      ],
      species: ['Cachorro', 'Gato', 'Ave', 'Réptil'],
      checkedSpecies: [],
      checkedColors: [],
      checkedBreeds: [],
      checkedSizes: [],
      breeds: {
        Cachorro: [
          'Spitz Alemão',
          'Bulldog Francês',
          'Shih Tzu',
          'Pug',
          'Rottweiler',
          'Golden Retriever',
          'Pastor Alemão',
          'Border Collie',
        ],
        Gato: ['Persa', 'Siamese', 'Ragdoll', 'Siamês', 'Sphynx'],
        Ave: ['Canário', 'Pássaro'],
        Réptil: ['Tartaruga', 'Lagarto'],
      },
      colors: [
        'Branco',
        'Preto',
        'Marrom',
        'Cinza',
        'Pardo',
        'Vermelho',
        'Amarelo',
        'Verde',
        'Azul',
        'Outro',
      ],
      totalPages: 1,
      currPage: 1,
      search: '',
    };
  },
  components: { HeaderView, MenuView },
};
