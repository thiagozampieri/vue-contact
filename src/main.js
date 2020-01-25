import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.filter('phone', function (phone) {
  return phone.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
});

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})