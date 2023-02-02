<template>
  <tr>
    <td scope="row">
      <img class="checkout-img" src="/assets/images/logo.jpeg" />
    </td>
    <td class="align-middle">{{ cart.nombre }}</td>

    <td class="align-middle">{{ cart.precio }}</td>

    <td class="align-middle">Total: {{ precioTotal }}</td>
    <td class="align-middle quantity-toggle">
      <div class="row">
        <v-btn
          v-if="cart.cantidad > 1 && !reload"
          @click.prevent="restarCantidad"
          class="quantity-button"
          icon
          color="grey"
        >
          <v-icon>fas fa-minus</v-icon>
        </v-btn>
        <v-btn
          v-else
          disabled
          @click.prevent="restarCantidad"
          class="quantity-button"
          icon
          color="grey"
        >
          <v-icon>fas fa-minus</v-icon>
        </v-btn>
        <div class="quantity">{{ cart.cantidad }}</div>
        <v-btn
          v-if="!reload"
          @click.prevent="agregarCantidad"
          class="quantity-button"
          icon
          color="grey"
        >
          <v-icon>fas fa-plus</v-icon>
        </v-btn>
        <v-btn
          v-else
          disabled
          @click.prevent="agregarCantidad"
          class="quantity-button"
          icon
          color="grey"
        >
          <v-icon>fas fa-plus</v-icon>
        </v-btn>
      </div>
    </td>
    <td class="align-middle">
      <v-btn
        @click.prevent="removeProduct"
        class="delete-button"
        icon
        color="grey"
      >
        <v-icon>fas fa-trash-alt</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
  props: ['cart'],
  data() {
    return {
      reload: false,
    };
  },
  methods: {
    agregarCantidad() {
      this.reload = true;
      let cantidad = this.cart.cantidad;
      let id = this.cart.id;
      cantidad += 1;
      //console.log(cantidad);
      const newCantidad = {
        nId: id,
        nCantidad: cantidad,
      };
      this.$store.dispatch('agregarCantidad', newCantidad);
      setTimeout(() => {
        this.reload = false;
      }, 2000);
    },
    restarCantidad() {
      this.reload = true;
      let cantidad = this.cart.cantidad;
      let id = this.cart.id;
      cantidad -= 1;
      //console.log(cantidad);
      const newCantidad = {
        nId: id,
        nCantidad: cantidad,
      };
      this.$store.dispatch('restarCantidad', newCantidad);
      setTimeout(() => {
        this.reload = false;
      }, 2000);
    },
    removeProduct() {
      this.$store.dispatch('eliminarItemCarrito', this.cart.id);
    },
  },
  computed: {
    precioTotal() {
      let precioTotal = this.cart.precio * this.cart.cantidad;
      return parseFloat(precioTotal).toLocaleString('id');
    },
  },
};
</script>

<style>
.checkout-img {
  width: 30px;
  height: 30px;
}
</style>
