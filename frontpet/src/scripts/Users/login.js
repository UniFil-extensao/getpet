import { createOptions } from '../../utils/http';

export default {
  methods:{
    login: async function(username, password){
      var res = await fetch(`${this.server}/login`, createOptions('POST', { username, password })),
          data = await res.json();
      
      if(data.username) {
        this.loggedUser = data;
        this.$router.push('/users/1'); 
      }
    },
    logout: async function(){
      var res = await fetch(`http://localhost:8000/users/logout`, createOptions('GET'));
      this.loggedUser = {};
      this.$router.push('/login');
    }
  },
  data: function () {
    return {
      server: `http://localhost:${import.meta.env.VITE_PORT}/users/`,
      user: '',
      pass:'',
      loggedUser: {}
    }
  }
}