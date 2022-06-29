import { createOptions } from '../../utils/http';

export default {
  methods:{
    login: async function(username, password) {
      var res = await fetch(`${this.server}/login`, createOptions('POST', { username, password }));  
      var data = await res.json();
      console.log(data)
    }
  },
  data: function () {
    return {
      server: `http://localhost:${import.meta.env.VITE_PORT}`,
      user: '',
      pass:''
    }
  }
}