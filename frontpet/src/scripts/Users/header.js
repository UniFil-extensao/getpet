
export default {

  updated: function(){
    console.log(hover);
  },
  data: function () {
    return {
      server: `localhost:${import.meta.env.VITE_PORT}`
    }
  }
}