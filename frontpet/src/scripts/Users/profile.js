import HeaderView from '../../views/Users/HeaderView.vue';
import { createOptions } from '../../utils/http';

export default {
  created: async function () {
    this.user = await fetch(`${this.server}/users/${this.userId}`, createOptions('GET'));
    this.user = await this.user.json();
    console.log(this.user);
  },
  methods:{
  },
  data: function () {
    return {
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      userId: this.$route.params.id,
      user: {},
      loggedUser: {}
    }
  },

  components: { HeaderView }
}