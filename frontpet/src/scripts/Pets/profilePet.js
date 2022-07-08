import HeaderView from '../../views/Users/HeaderView.vue';
import { createOptions } from '../../utils/http';

export default {
  created: async function () {
    this.pet = await fetch(`${this.server}/adoptions/${this.$route.params.id}`, createOptions('GET'));  
    this.pet = await this.pet.json();

    this.owner = await fetch(`${this.server}/users/${this.petnew_owner_id || this.pet.old_owner_id}`, createOptions('GET'));
    this.owner = await this.owner.json();
    this.loggedUser = JSON.parse(localStorage.user);

    this.myFavs = await fetch(`${this.server}/favorites/`, createOptions('GET'));
    this.myFavs = await this.myFavs.json();
    for(let fav in this.myFavs) {
      if(this.myFavs[fav].id == this.$route.params.id) {
        this.favId = this.myFavs[fav].favorite_id;
        
      }
    }
  },
  methods:{
    getFavUsers: async function(){
      var res = await fetch(`${this.server}/favorites/${this.adoptionId}`, createOptions('GET'));
      this.favUsers = await res.json();
      return this.favUsers;
    },
    selectUser: function(user){
      this.selected = user;
    },
    addFav: async function(){
      var body = { adoptionId: this.adoptionId },
          res = await fetch(`${this.server}/favorites`, createOptions('POST', body)),
          data = await res.json();

      if (data.errors) alert(data.errors[Object.keys(data.errors)[0]])
      else this.isFav = false;
    },
    removeFav: async function(){
      var res = await fetch(`${this.server}/favorites/${this.favId}`, createOptions('DELETE')),
          data = await res.json();
      this.isFav = true;
      this.$router.go();
    }
  },
  data: function () {
    return {
      pet: {},
      adoptionId: Number(this.$route.params.id),
      favUsers: {},
      selected: {},
      owner: {},
      isFav: '',
      favId: '',
      loggedUser: {},
      server: `http://localhost:${import.meta.env.VITE_PORT}`
    }   
  },
  components: { HeaderView }
}