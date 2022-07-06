import { createOptions } from '../../utils/http';

export default {
  methods: {
    login: async function (username, password) {
      var res = await fetch(
          `${this.server}/login`,
          createOptions('POST', { username, password })
        ),
        data = await res.json();

      if (data.username) {
        this.loggedUser = data;
        this.$router.push(`/users/${this.loggedUser.id}`);
      } else if (data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
    },
    logout: async function () {
      await fetch(`http://localhost:8000/users/logout`, createOptions('POST'));
      this.loggedUser = {};
      this.$router.push('/login');
    },
  },
  mounted: async function () {
    if (localStorage.user) {
      this.loggedUser = JSON.parse(localStorage.user);
    }
  },
  watch: {
    loggedUser: function (user) {
      localStorage.user = JSON.stringify(user);
    },
  },
  data: function () {
    return {
      server: `http://localhost:${import.meta.env.VITE_PORT}/users`,
      user: '',
      pass: '',
      loggedUser: {},
    };
  },
};
