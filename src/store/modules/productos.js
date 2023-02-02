import axios from 'axios';

export default {
  state: {
    productos: [],
  },
  mutations: {
    OBTENER_PRODUCTOS(state, payload) {
      state.productos = payload;
      //console.log(this.state.productos, `state producto mutation`);
      //router.push({name: 'Home'})
    },
  },
  actions: {
    obtenerProductos(context) {
      axios({
        url: 'https://61e45b6b1a976f00176ee447.mockapi.io/productos',
        method: 'get',
      })
        .then(({ data }) => {
          // console.log(data, `dispatch accion obtenerProductos`);
          context.commit('OBTENER_PRODUCTOS', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    productos: (state) => state.productos,
  },
};
