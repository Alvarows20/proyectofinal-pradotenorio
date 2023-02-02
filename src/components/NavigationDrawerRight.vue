<template>
  <v-navigation-drawer
    style="width: auto"
    app
    right
    :clipped="$vuetify.breakpoint.mdAndUp"
    v-model="drawerOpen"
    @input="onInput"
    v-if="isLogin"
  >
    <v-container>
      <div>
        <p class="text-right">
          <v-btn @click="drawerOpen = false" class="d-inline-block"
            ><v-icon>fa-times</v-icon></v-btn
          >
        </p>
      </div>
      <div class="container col">
        <div class="row">
          <!-- <table v-if="carts.length > 0" class="col-8 table mt-8 mr-8">
            <tbody>
              <TableRow
                :headers="carritoHeaders"
                v-for="cart in carts"
                :key="cart.id"
                :cart="cart"
              ></TableRow>
            </tbody>
          </table> -->
          <v-simple-table height="300px" v-if="items.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Imagen</th>
                  <th class="text-center">Nombre</th>

                  <th class="text-center">Cantidad</th>
                  <th class="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index + 1">
                  <td><img class="checkout-img" :src="item.imagen" /></td>
                  <td>{{ item.nombre }}</td>

                  <!--  <td>
                    <v-btn
                      v-if="item.cantidad > 1 && !reload"
                      @click.prevent="restarCantidad(item.id, item.cantidad)"
                      class="quantity-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-minus</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      disabled
                      @click.prevent="restarCantidad(item.id, item.cantidad)"
                      class="quantity-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-minus</v-icon>
                    </v-btn>

                    {{ cantidadcarrito }}

                    <v-btn
                      v-if="!reload"
                      @click.prevent="agregarCantidad(item.id, item.cantidad)"
                      class="quantity-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-plus</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      disabled
                      @click.prevent="agregarCantidad(item.id, item.cantidad)"
                      class="quantity-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-plus</v-icon>
                    </v-btn>
                  </td> -->
                  <td>
                    <select
                      v-model="item.cantidadcarrito"
                      @change="cambiarCantidad(item, item.cantidadcarrito)"
                    >
                      <option v-for="selected in item.cantidad" :key="selected">
                        {{ selected }}
                      </option>
                    </select>
                    <!-- <p>{{ selected }}</p> -->
                  </td>
                  <td>{{ item.precio * item.cantidadcarrito }}</td>
                  <td class="align-middle">
                    <v-btn
                      small
                      @click.prevent="removerCarrito(index)"
                      class="delete-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-trash-alt</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <h1 v-else class="col text--disabled" style="margin-top: 10rem">
            Su Carrito está Vacio..
          </h1>
        </div>
        <div class="col">
          <v-card class="mx-auto mt-2 pt-2" max-width="344">
            <v-card-text>
              <p class="display-1 font-weight-black text--primary">
                Resumen del Pedido
              </p>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-card-subtitle
                  class="col"
                  style="padding-top: 0px; padding-bottom: 0"
                  >Total Item:</v-card-subtitle
                >
                <v-card-subtitle
                  class="col mr-5 font-weight-light"
                  style="padding: 5px"
                  >{{ items.length }} item(s)</v-card-subtitle
                >
              </v-row>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-card-subtitle
                  class="col"
                  style="padding-top: 0px; padding-bottom: 0"
                  >Gastos de Envio:</v-card-subtitle
                >
                <v-card-subtitle
                  class="col mr-5 font-weight-light"
                  style="padding: 5px"
                  >Gratis</v-card-subtitle
                >
              </v-row>
            </v-card-text>

            <v-card-text>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-card-subtitle
                  class="col-4"
                  style="padding-top: 0px; padding-bottom: 0"
                  >Subtotal:</v-card-subtitle
                >
                <v-card-title class="col font-weight-black" style="padding: 5px"
                  >Precio: {{ price }}
                </v-card-title>
              </v-row>
            </v-card-text>
          </v-card>
          <div class="my-2 row">
            <v-col class="col-6 p-2">
              <v-btn
                color="success"
                x-large
                width="100%"
                class="col-8 mx-auto"
                @click="finalizarPedido"
              >
                Finalizar
              </v-btn>
            </v-col>
            <v-col class="col-6 p-2">
              <v-btn
                color="error"
                x-large
                width="100%"
                class="col-8 mx-auto"
                @click="vaciarCarrito"
                >Vaciar</v-btn
              >
            </v-col>
          </div>
        </div>
      </div>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
//import TableRow from '../components/CartTableRow';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'NavigationDrawerLeft',
  components: {
    //TableRow,
  },
  props: {
    open: {
      type: Boolean,
      default: true,
    },
    carritoHeaders: [
      { text: 'Precio', value: 'precio' },
      { text: 'Cantidad', value: 'cantidad', width: '200px' },
      { text: 'Total', value: 'total' },
    ],
  },

  data() {
    return {
      drawerOpen: this.open,
      reload: false,
      selected: 1,
      newpedido: {
        userid: '',
        productos: [],
        entregado: false,
        fecha: '',
        total: '',
      },
      /* carrito: [], */
    };
  },
  watch: {
    open(newVal) {
      this.drawerOpen = newVal;
      //console.log('open: ' + this.drawerOpen);
    },
  },
  methods: {
    ...mapActions(['vaciarCarrito']),
    onInput(isOpen) {
      this.$emit('drawer-opened', isOpen);
      //console.log('onInput: ' + isOpen);
    },
    /* setCarrito() {
      if (localStorage.getItem('carrito')) {
        this.carrito = JSON.parse(localStorage.getItem('carrito'));
      }
    }, */

    /* checkout() {
      this.$store.dispatch('checkout');
    }, */
    finalizarPedido() {
      const idUser = JSON.parse(localStorage.getItem('Usuario')).id;
      let pedidoTotal = 0;

      //console.log('userid', JSON.parse(localStorage.getItem('Usuario')).id);

      this.newpedido.userid = idUser;
      this.newpedido.fecha = new Date();
      this.items.forEach((index) => {
        //console.log('carrito para push', index);
        //console.log('nombre de producto en carrito', index.nombre);
        this.newpedido.productos.push({
          nombre: index.nombre,
          cantidadcarrito: index.cantidadcarrito,
          precio: index.precio,
        });
        pedidoTotal += index.precio * index.cantidadcarrito;
      });
      this.newpedido.total = pedidoTotal;

      //console.log('el newpedido es:', this.newpedido);

      this.$store.dispatch('agregarPedido', this.newpedido);

      this.vaciarNewPedido();
      this.vaciarCarrito();
      //this.vaciarCarrito();

      this.$emit('drawer-opened', false);
    },
    vaciarNewPedido() {
      this.newpedido = {
        userid: '',
        productos: [],
        entregado: false,
        fecha: '',
        total: '',
      };
    },
    agregarCantidad(id, cantidad) {
      this.reload = true;
      //let cantidad = this.cart.cantidad;
      //let id = this.cart.id;
      cantidad++;
      //console.log(cantidad);
      const newCantidad = {
        nId: id,
        nCantidad: cantidad,
      };
      this.$store.dispatch('agregarCantidad', newCantidad);
      setTimeout(() => {
        this.reload = false;
      }, 1000);
    },
    restarCantidad(id, cantidad) {
      this.reload = true;
      //let cantidad = this.cart.cantidad;
      //let id = this.cart.id;
      cantidad--;
      //console.log(cantidad);
      const newCantidad = {
        nId: id,
        nCantidad: cantidad,
      };
      this.$store.dispatch('restarCantidad', newCantidad);
      setTimeout(() => {
        this.reload = false;
      }, 1000);
    },
    removeProduct(id) {
      this.$store.dispatch('eliminarItemCarrito', id);
    },
    cambiarCantidad(item, cantidad) {
      const oldItems = JSON.parse(localStorage.getItem('carrito')) || [];
      const idToUse = item.id;
      const existingItem = oldItems.find(({ id }) => id === idToUse);
      if (existingItem) {
        Object.assign(existingItem, {
          nombre: item.nombre,
          cantidadcarrito: parseInt(cantidad),
          cantidad: item.cantidad,
          precio: item.precio,
          imagen: item.imagen,
        });
        //console.log(existingItem);
        //console.log(item.nombre, cantidad);
      } else {
        const newItem = {
          id: idToUse,
          nombre: item.nombre,
          cantidadcarrito: parseInt(cantidad),
          cantidad: item.cantidad,
          precio: item.precio,
          imagen: item.imagen,
        };
        //console.log(newItem);
        oldItems.push(newItem);
      }

      localStorage.setItem('carrito', JSON.stringify(oldItems));
      this.$store.dispatch('carritoLocalStorage');
    },
    removerCarrito(index) {
      this.$store.dispatch('removerCarrito', index);
      //console.log(index);
    },
  },
  computed: {
    email() {
      return localStorage.Email;
    },
    numberOfItem() {
      return this.$store.state.carrito.items.length;
    },
    esAdministrador() {
      return (
        this.$store.getters.usuario &&
        this.$store.getters.usuario.rol === 'Administrador'
      );
    },
    esCliente() {
      return (
        this.$store.getters.usuario &&
        this.$store.getters.usuario.rol === 'Cliente'
      );
    },
    ...mapGetters(['isLogin', 'items']),

    items() {
      return this.$store.state.carrito.items;
    },
    price() {
      let precioInicial = 0;
      let precioTotal = 0;
      //   let carts = this.$store.state.carts
      //console.log(this.items, `carrito inicial`);
      for (let i = 0; i < this.items.length; i++) {
        precioInicial += this.items[i].precio * this.items[i].cantidadcarrito;
      }
      precioTotal = parseFloat(precioInicial).toLocaleString('id');

      return precioTotal;
    },
  },
  /*  mounted() {
    this.$nextTick(function () {
      this.setCarrito();
      console.log('carrito', this.carrito);
    });
  }, */
};
</script>

<style lang="scss" scoped>
.checkout-img {
  height: 3rem;
}
th {
  text-align: center;
}
.quantity-toggle {
  display: flexbox;
  flex-direction: column;
  align-items: center;
}
.quantity-button {
  display: inline;
  align-items: center;
  justify-content: center;
}
.quantity {
  border: 1px solid rgba(0, 0, 0);
  padding-top: 2px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selector {
  border-radius: 15px;
  background-color: red;
}
.custom-select {
  position: relative;
  font-family: Arial;
  color: white !important;
}
select {
  width: 100%;
  min-width: 7ch;
  max-width: 15ch;
  text-align: center;
  text-align-last: center;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
}
</style>
