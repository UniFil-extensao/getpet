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
        this.loggedIn = true;
        this.home();
      } else if (data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
    },
    logout: async function () {
      await fetch(`${this.server}/users/logout`, createOptions('POST'));

      /* TEMPORÁRIO */
      this.loggedUser = {};
      localStorage.clear();
      //

      this.loggedIn = false;

      this.$router.go();
    },
    petProfile: function (target) {
      this.$router
        .push({ path: `/adoptions/${target.id}` })
        .then(() => this.$router.go());
    },
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
    openReview: async function (target) {
      this.notif = target;
      //get old owner user by id (target.old_owner_id)
      var res = await fetch(
        `${this.server}/users/${target.old_owner_id}`,
        createOptions('GET')
      );
      this.oldOwner = await res.json();
    },
    rate: async function () {
      var res = await fetch(
        `${this.server}/adoptions/${this.notif.id}/close`,
        createOptions('POST', { donorScore: this.donorScore })
      );
      var data = await res.json();
      if (data.errors) alert(data.errors[Object.keys(data.errors)[0]]);
    },
  },
  created: async function () {
    const user = await cookieStore
      .get('user')
      .then(user => user && JSON.parse(user.value));
    if (!user) return;

    this.loggedUser = user;
    this.loggedIn = true;

    this.favs = await await fetch(
      `${this.server}/favorites/`,
      createOptions('GET')
    ).then(res => res.json());
  },
  mounted: async function () {
    if (!this.loggedUser) return;

    const params = {
        noLimit: 'true',
        status: 'f',
        orderBy: 'closed_at',
        newOwnerId: this.loggedUser.id,
        nullDonorScore: true,
      },
      queryParams = new URLSearchParams(params).toString();
    console.log(`${this.server}/adoptions/?${queryParams}`);
    var res = await fetch(
      `${this.server}/adoptions/?${queryParams} `,
      createOptions('GET')
    );
    this.notifications = await res.json();
    console.log(this.notifications);
  },
  watch: {
    loggedUser: function (user) {
      // TODO: na próxima versão, usar cookieStore e remover isso
      if (Object.keys(user).length) localStorage.user = JSON.stringify(user);
    },
  },
  data: function () {
    return {
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      user: '',
      pass: '',
      favs: { adoption: { pet_name: '' } },
      loggedUser: {},
      loggedIn: false,
      notifications: { adoptions: [] },
      notif: {},
      oldOwner: {},
      donorScore: 5,
    };
  },
};
