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
      this.loggedUser = null;
      cookieStore.delete('user');
      //

      this.loggedIn = false;

      this.$router.go();
    },
    petProfile: function (target) {
      this.$router
        .push({ path: `/adoptions/${target.adoption_id}` })
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
      console.log(this.donorScore);
      var res = await fetch(
        `${this.server}/adoptions/${this.notif.id}/close`,
        createOptions('PATCH', { donorScore: +this.donorScore })
      );
      var data = await res.json();
      if (data.errors) return alert(data.errors[Object.keys(data.errors)[0]]);

      this.$router.go();
    },
  },
  created: async function () {
    const user = await cookieStore
      .get('user')
      .then(user => user && JSON.parse(user.value));
    if (!user) return;

    this.loggedUser = user;
    this.loggedIn = true;

    this.favs = await fetch(
      `${this.server}/favorites/`,
      createOptions('GET')
    ).then(res => res.json());

    const params = {
      noLimit: 'true',
      status: 'f',
      orderBy: 'closed_at',
      newOwnerId: this.loggedUser.id,
      nullDonorScore: true,
    };
    const queryParams = new URLSearchParams(params).toString();
    var res = await fetch(
      `${this.server}/adoptions/?${queryParams} `,
      createOptions('GET')
    );
    this.notifications = await res.json();
  },
  watch: {
    loggedUser: async function (user) {
      if (Object.keys(user).length)
        await cookieStore.set('user', JSON.stringify(user));
    },
  },
  data: function () {
    return {
      user: '',
      pass: '',
      favs: [],
      loggedUser: null,
      loggedIn: false,
      notifications: { adoptions: [] },
      notif: {},
      oldOwner: {},
      donorScore: 5,
    };
  },
  inject: {
    server: {
      from: 'server',
    },
  },
};
