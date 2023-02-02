import axios from 'axios';

export default {
  state: {
    pedidos: [],
  },
  mutations: {
    OBTENER_PEDIDOS(state, payload) {
      state.pedidos = payload;
      // console.log(this.state.pedidos, `state pedido mutation`);
      //router.push({name: 'Home'})
    },
  },
  actions: {
    obtenerPedidos(context) {
      axios({
        url: 'https://61e45b6b1a976f00176ee447.mockapi.io/pedidos',
        method: 'get',
      })
        .then(({ data }) => {
          // console.log(data, `dispatch accion obtenerPedidos`);
          context.commit('OBTENER_PEDIDOS', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    pedidos: (state) => state.pedidos,
  },
};
