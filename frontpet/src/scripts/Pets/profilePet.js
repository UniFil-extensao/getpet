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
  },
  methods: {
    shareLink: function () {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado!');
    },
  },
  data: function () {
    return {
      pet: {},
      petPics: [],
      owner: {},
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
    };
  },
  components: { HeaderView },
};
