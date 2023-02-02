<template>
  <v-container>
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <table v-if="carts.length > 0" class="col-8 table mt-8 mr-8">
          <tbody>
            <TableRow
              :headers="carritoHeaders"
              v-for="cart in carts"
              :key="cart.id"
              :cart="cart"
            ></TableRow>
          </tbody>
        </table>
        <h1 v-else class="col text--disabled" style="margin-top: 10rem">
          Su Carrito está Vacio..
        </h1>
        <div class="col mt-5">
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <p class="display-1 font-weight-black text--primary ml-4">
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
                  >{{ carts.length }} item(s)</v-card-subtitle
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
          <div class="my-4 row">
            <v-btn
              @click="checkout"
              x-large
              color="success"
              class="col-7 mx-auto"
              dark
              >Generar Pedido</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import Navbar from '../components/Navbar';
import TableRow from '../components/CartTableRow';
export default {
  name: 'Cart',
  methods: {
    checkout() {
      this.$store.dispatch('checkout');
    },
  },
  data() {
    return {
      // precioTotal=0
      carritoHeaders: [
        { text: 'Precio', value: 'precio' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Total', value: 'total' },
      ],
    };
  },
  components: {
    Navbar,
    TableRow,
  },
  mounted() {
    this.$store.dispatch('obtenerCarrito');
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    price() {
      let precioInicial = 0;
      let precioTotal = 0;
      //   let carts = this.$store.state.carts
      // console.log(this.carts, `carrito inicial`);
      for (let i = 0; i < this.carts.length; i++) {
        precioInicial += this.carts[i].precio * this.carts[i].cantidad;
      }
      precioTotal = parseFloat(precioInicial).toLocaleString('id');

      return precioTotal;
    },
  },
};
</script>

<style>
.checkout-img {
  height: 8rem;
}
.quantity-toggle {
  display: flexbox;
  flex-direction: column;
  align-items: center;
}
.quantity-button {
  display: flex;
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
</style>
