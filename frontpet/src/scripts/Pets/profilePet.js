import HeaderView from '../../views/Users/HeaderView.vue';
import { createOptions } from '../../utils/http';

export default {
  created: async function () {
    this.pet = await fetch(
      `${this.server}/adoptions/${this.$route.params.id}`,
      createOptions('GET')
    );
    this.pet = await this.pet.json();

    this.petPics = await fetch(
      `${this.server}/adoptions/${this.pet.id}/pictures`,
      createOptions('GET')
    ).then(res => res.json());

    this.owner = await fetch(
      `${this.server}/users/${this.petnew_owner_id || this.pet.old_owner_id}`,
      createOptions('GET')
    );
    this.owner = await this.owner.json();
    this.loggedUser = JSON.parse(localStorage.user ?? '{}');
    // this.loggedUser = JSON.parse(cookieStore.get("loggedUser") ?? "{}");
  },
  methods: {
    ownerProfile: function () {
      this.$router.push(`/users/${this.owner.id}`);
    },
    donatePet: async function (user) {
      var body = {
          newOwnerId: this.selected.id,
          adopterScore: this.adopterScore,
          donorScore: 0,
        },
        res = await fetch(
          `${this.server}/adoptions/${this.adoptionId}/close`,
          createOptions('PATCH', body)
        ),
        data = await res.json();
      if (data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
      else {
        alert(
          'A doação foi realizada com sucesso! Você será redirecionado para tela inicial.'
        );
        this.$router.push('/');
      }
    },
    getMyFavs: async function () {
      this.myFavs = await fetch(
        `${this.server}/favorites/`,
        createOptions('GET')
      );
      this.myFavs = await this.myFavs.json();
      for (let fav in this.myFavs) {
        if (this.myFavs[fav].id == this.$route.params.id) {
          this.favId = this.myFavs[fav].favorite_id;
          this.isFav = true;
        } else this.isFav = false;
      }
    },
    getFavUsers: async function () {
      var res = await fetch(
        `${this.server}/favorites/${this.adoptionId}`,
        createOptions('GET')
      );
      this.favUsers = await res.json();
      return this.favUsers;
    },
    selectUser: function (user) {
      this.selected = user;
    },
    addFav: async function () {
      var body = { adoptionId: this.adoptionId },
        res = await fetch(
          `${this.server}/favorites`,
          createOptions('POST', body)
        ),
        data = await res.json();

      if (data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
      else this.isFav = true;
    },
    removeFav: async function () {
      await this.getMyFavs();
      var res = await fetch(
        `${this.server}/favorites/${this.favId}`,
        createOptions('DELETE')
      );
      if (res.status !== 204) return alert('Erro ao remover favorito');

      this.isFav = false;
      this.$router.go();
    },
    shareLink: function () {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado!');
    },
  },
  data: function () {
    return {
      pet: {},
      adoptionId: Number(this.$route.params.id),
      favUsers: {},
      selected: {},
      owner: {},
      isFav: '',
      adopterScore: 5,
      favId: '',
      loggedUser: {},
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      petPics: [],
    };
  },
  components: { HeaderView },
};
