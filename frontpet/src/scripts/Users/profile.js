import HeaderView from '../../views/Users/HeaderView.vue';
import { createOptions, createOptionsImgs } from '../../utils/http';

export default {
  created: async function () {
    this.user = await fetch(
      `${this.server}/users/${this.userId}`,
      createOptions('GET')
    );
    this.user = await this.user.json();
    this.updateUser.city = this.user.city;
    this.updateUser.uf = this.user.uf;
    this.loggedUser = JSON.parse((await cookieStore.get('user')).value ?? '{}');
  },
  beforeMount: async function () {
    await this.getPets();
  },
  methods: {
    getPets: async function () {
      var res = await fetch(
          `${this.server}/adoptions/?oldOwnerId=${this.userId}&status=F`,
          createOptions('GET')
        ),
        data = await res.json();
      this.donatedPets = data.adoptions;

      this.availablePets = await fetch(
        `${this.server}/adoptions/?oldOwnerId=${this.userId}&status=A`,
        createOptions('GET')
      );
      this.availablePets = await this.availablePets.json();
      this.availablePets = this.availablePets.adoptions;

      this.adoptedPets = await fetch(
        `${this.server}/adoptions/?newOwnerId=${this.userId}&status=F`,
        createOptions('GET')
      );

      this.adoptedPets = await this.adoptedPets.json();
      this.adoptedPets = this.adoptedPets.adoptions;
    },
    update: async function () {
      const fetchOptions = this.updateUser.pfp
        ? createOptionsImgs('PATCH', 'user', this.updateUser)
        : createOptions('PATCH', this.updateUser);

      var res = await fetch(
          `${this.server}/users/${this.user.id}`,
          fetchOptions
        ),
        data = await res.json();

      if (data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
      else this.user = data;
    },
    saveImage: async function (event) {
      const evSrc = event.target;
      const imgFiles = evSrc.files;
      if (evSrc.id.includes('pet-pfp')) {
        this.insertPet.pfp = imgFiles[0];
      } else if (evSrc.id.includes('pet-imgs')) {
        this.insertPet.imgs = imgFiles;
      } else if (evSrc.id.includes('user-pfp')) {
        // TODO
      }
    },
    removePet: async function (target) {
      if (confirm(`Deseja realmente remover o pet ${target.pet_name}?`)) {
        const res = await fetch(
          `${this.server}/adoptions/${target.id}`,
          createOptions('DELETE')
        );
        if (res.status !== 204) {
          data = await res.json();
          return alert(data.errors[Object.keys(data.errors)[0]]);
        }

        this.availablePets = this.availablePets.filter(
          pet => pet.id !== target.id
        );
      }
    },
    petInsert: async function () {
      const insertData = Object.assign({}, this.insertPet);
      if (this.petAge == 'Anos') insertData.petAge = insertData.petAge * 12;

      const fetchOptions =
        insertData.pfp || insertData.imgs
          ? createOptionsImgs('POST', 'adoption', insertData)
          : createOptions('POST', insertData);

      var res = await fetch(`${this.server}/adoptions/`, fetchOptions),
        data = await res.json();

      if (data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
      else this.$router.go();
    },
    petProfile: function (target) {
      this.$router.push(`/adoptions/${target.id}`);
    },
  },
  data: function () {
    return {
      userId: Number(this.$route.params.id),
      user: {},
      donatedPets: {},
      adoptedPets: {},
      availablePets: {},
      loggedUser: {},
      updateUser: {
        username: '',
        city: '',
        uf: '',
        pass: '',
      },
      insertPet: {
        petName: '',
        petAge: '',
        petSize: '',
        petSpecies: '',
        petColor: '',
        petBreed: '',
        desc: '',
      },
      pfp: {
        pfp: '',
        data: '',
        imgs: '',
      },
      species: ['Cachorro', 'Gato', 'Ave', 'Réptil', 'Outro'],
      breedDog: [
        'Spitz Alemão',
        'Bulldog Francês',
        'Shih Tzu',
        'Pug',
        'Rottweiler',
        'Golden Retriever',
        'Pastor Alemão',
        'Border Collie',
        'SRD',
        'Outro',
      ],
      breedCat: [
        'Persa',
        'Siamese',
        'Ragdoll',
        'Siamês',
        'Sphynx',
        'SRD',
        'Outro',
      ],
      breedBird: ['Canário', 'Pássaro', 'SRD', 'Outro'],
      breedReptile: ['Tartaruga', 'Lagarto', 'Outro'],
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
      petAge: 'Meses',
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
      passConfirm: '',
    };
  },
  components: { HeaderView },
  inject: {
    server: {
      from: 'server',
    },
  },
};
