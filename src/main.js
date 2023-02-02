import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    this.$store.dispatch('carritoLocalStorage');
    //this.$store.dispatch('usuario/usuarioLocalStorage');
  },
}).$mount('#app');
