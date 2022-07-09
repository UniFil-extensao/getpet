import { createOptions } from '../../utils/http';

export default {
  methods: {
    login: async function (username, password) {
      var res = await fetch(
          `${this.server}/users/login`,
          createOptions('POST', { username, password })
        ),
        data = await res.json();

      if (data.username) {
        this.loggedUser = data;
        this.$router.push(`/users/${this.loggedUser.id}`);
      } else if (data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
    },
    logout: async function () {
      await fetch(`${this.server}/users/logout`, createOptions('POST'));
      this.loggedUser = {};
      this.$router.push('/login');
    },
    petProfile: function (target) {},
    profile: function () {
      if (Object.keys(this.loggedUser).length)
        this.$router
          .push({ path: `/users/${this.loggedUser.id}` })
          .then(() => this.$router.go());
      else this.$router.push('/login');
    },
    home: function () {
      this.$router.push('/');
    },
  },
  created: async function () {
    var res = await fetch(`${this.server}/favorites/`, createOptions('GET'));
    this.favs = await res.json();
    for (let fav of this.favs) {
      res = await fetch(
        `${this.server}/adoptions/${fav.id}`,
        createOptions('GET')
      );
      fav.adoption = await res.json();
    }
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
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      user: '',
      pass: '',
      favs: '',
      loggedUser: {},
    };
  },
};
