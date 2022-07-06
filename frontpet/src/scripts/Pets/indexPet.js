import { createOptions } from '../../utils/http';
import HeaderView from '../../views/Users/HeaderView.vue';


export default {
  data: function(){
    return{
      selM: 5,
      months: ['1 mês', '2 meses', '3 meses', '4 meses', '5 meses', '6 meses', '7 meses', '8 meses', '9 meses', '10 meses', '11 meses'],
      selY: 5,
      years: ['1 ano', '2 anos', '3 anos', '4 anos', '5 anos', '6 anos', '7 anos', '8 anos', '9 anos', '10 anos', 'Mais de 10 anos'],
    }
  },
  components: { HeaderView }
} 