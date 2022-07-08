import HeaderView from '../../views/Users/HeaderView.vue';
import { createOptions } from '../../utils/http';

export default {
  created: async function () {
    this.pet = await fetch(
      `${this.server}/adoptions/${this.$route.params.id}`,
      createOptions('GET')
    );
    this.pet = await this.pet.json();

    // REM: REMOVER
    console.log(this.pet);

    this.owner = await fetch(
      `${this.server}/users/${this.petnew_owner_id || this.pet.old_owner_id}`,
      createOptions('GET')
    );
    this.owner = await this.owner.json();
  },
  methods: {},
  data: function () {
    return {
      pet: {},
      owner: {},
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
    };
  },
  components: { HeaderView },
};
