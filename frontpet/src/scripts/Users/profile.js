import HeaderView from '../../views/Users/HeaderView.vue';
import { createOptions } from '../../utils/http';

export default {
  created: async function () {
    this.user = await fetch(`${this.server}/users/${this.userId}`, createOptions('GET'))
    this.user = await this.user.json();
  },
  methods:{
    getUser: function(){
      console.log(this.user)
    }
  },
  data: function () {
    return {
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      userId: this.$route.params.id,
      user: {}
    }
  },

  components: { HeaderView }
}