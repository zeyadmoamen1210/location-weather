import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/leaflet.js'
import './plugins/vuesax.js'
import './plugins/axios.js';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
