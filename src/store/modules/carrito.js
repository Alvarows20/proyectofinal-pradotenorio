import router from '../../router';
import axios from 'axios';
export default {
  state: {
    alert: false,
    alert_error: false,
    error_item_repeated: false,
    pedido_ok: false,
    carts: [],
    items: [],
    pedidos: [],
  },
  mutations: {
    OBTENER_CARRITO(state, payload) {
      state.carts = payload;
      //console.log(this.state.carts, `state carrito mutation`);
      //router.push({ name: 'Cart'})
    },

    /*  updateCart(state, payload) {
            state.carts.push(payload);
          }, */
    UPDATE_CARRITO(state, carrito) {
      state.items = carrito;
    },

    INSERT_CARRITO(state, producto) {
      state.items.push(producto);
      localStorage.setItem('carrito', JSON.stringify(state.items));
    },

    AGREGAR_PEDIDO(state, payload) {
      state.pedidos.push(payload);
    },

    DELETE_CARRITO(state, index) {
      state.items.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(state.items));
    },

    DELETE_ALL_CARRITO(state) {
      state.items = [];
      localStorage.setItem('carrito', JSON.stringify(state.items));
    },

    SHOW_ALERT(state) {
      state.alert = true;
      setTimeout(() => {
        state.alert = false;
      }, 3000);
    },

    SHOW_ALERT_ERROR(state) {
      state.alert_error = true;
      setTimeout(() => {
        state.alert = false;
      }, 3000);
    },

    SHOW_ERROR_ITEM_REPEATED(state) {
      state.error_item_repeated = true;
      setTimeout(() => {
        state.error_item_repeated = false;
      }, 3000);
    },
    SHOW_PEDIDO_OK(state) {
      state.pedido_ok = true;
      setTimeout(() => {
        state.pedido_ok = false;
      }, 3000);
    },
  },
  actions: {
    obtenerCarrito(context) {
      axios({
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito`,
        method: 'get',
        /* headers: {
                token: localStorage.token,
              }, */
      })
        .then(({ data }) => {
          //console.log(data.carts, `<<< accion obtenerCarrito`);
          context.commit('OBTENER_CARRITO', data);
        })
        .catch(() => {
          router.push({ name: 'Home' }).catch(() => {});
        });
    },

    agregarProductoCarrito(context, payload) {
      axios({
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito`,
        method: 'POST',
        /* headers: {
                token: localStorage.token,
              }, */
        data: {
          id: payload.id,
          nombre: payload.nombre,
          precio: payload.precio,
          cantidad: payload.cantidad,
          image: payload.image,
        },
      })
        .then(({ data }) => {
          context.dispatch('obtenerCarrito', data);
        })
        .catch(() => {});
    },

    agregarCantidad(context, payload) {
      axios({
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito/${payload.nId}`,
        method: 'put',
        /* headers: {
                token: localStorage.token,
              }, */
        data: {
          cantidad: payload.nCantidad,
        },
      }).then(() => {
        //console.log('Item sumado 1 en Carrito', data);
        context.dispatch('obtenerCarrito');
      });
    },
    restarCantidad(context, payload) {
      axios({
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito/${payload.nId}`,
        method: 'put',
        /* headers: {
                token: localStorage.token,
              }, */
        data: {
          cantidad: payload.nCantidad,
        },
      }).then(() => {
        //console.log('Item restado 1 en Carrito', data);
        context.dispatch('obtenerCarrito');
      });
    },

    eliminarItemCarrito(context, payload) {
      axios({
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito/${payload}`,
        method: 'delete',
        /* headers: {
                token: localStorage.token,
              }, */
      }).then(() => {
        //context.commit('removeFavorite', payload)
        context.dispatch('obtenerCarrito');
      });
    },

    carritoLocalStorage(context) {
      if (localStorage.getItem('carrito')) {
        context.commit(
          'UPDATE_CARRITO',
          JSON.parse(localStorage.getItem('carrito'))
        );
      }
    },
    agregarCarrito(context, producto) {
      context.commit('INSERT_CARRITO', producto);
      context.commit('SHOW_ALERT');
    },
    //remover index del carrito
    removerCarrito(context, index) {
      context.commit('DELETE_CARRITO', index);
    },

    vaciarCarrito(context) {
      context.commit('DELETE_ALL_CARRITO');
    },
    errorItemRepeated(context) {
      context.commit('SHOW_ERROR_ITEM_REPEATED');
    },
    agregarPedido(context, payload) {
      axios
        .post(`https://61e45b6b1a976f00176ee447.mockapi.io/pedidos`, payload)
        .then(() => {
          context.commit('AGREGAR_PEDIDO', payload);
          context.commit('SHOW_PEDIDO_OK');
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    },
    /*  checkout(context, payload) {
            console.log(payload, `here`);
            axios({
              url: 'http://localhost:3000/cart/checkout',
              method: 'put',
              headers: {
                token: localStorage.token,
              },
            }).then(({ data }) => {
              console.log(data, `here in store`);
      
              context.dispatch('fetchCart');
            });
          }, */

    /* checkout(context, payload) {
      console.log(payload, `here`);
      axios({
        url: 'http://localhost:3000/cart/checkout',
        method: 'put',
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          console.log(data, `here in store`);
          Swal.fire('Success!', 'Checkout Success.', 'success');
          context.dispatch('fetchCart');
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.error[0],
          });
        });
    }, */
  },
  getters: {
    alert: (state) => state.alert,
    items: (state) => state.items,
    error_item_repeated: (state) => state.error_item_repeated,
    pedido_ok: (state) => state.pedido_ok,
  },
};
