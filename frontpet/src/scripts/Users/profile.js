import HeaderView from '../../views/Users/HeaderView.vue';

export default {

  data: function () {
    return {
      server: `localhost:${import.meta.env.VITE_PORT}`
    }
  },

  components: { HeaderView }
}