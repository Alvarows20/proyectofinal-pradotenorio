import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import carrito from './modules/carrito';
import productos from './modules/productos';
import pedidos from './modules/pedidos';
import to from './modules/to';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    carrito,
    to,
    productos,
    pedidos,
  },
});
