<template>
  <v-row justify="center">
    <v-btn icon color="blue" @click.stop="dialog = true">
      <v-icon>fas fa-shopping-cart fa-lg</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="450">
      <v-card class="mx-auto my-0">
        <!--  <v-img height="400" :src="product.image_url"></v-img> -->
        <v-img height="400" :src="product.imagen"></v-img>
        <v-card-text style="padding-bottom: 0px">
          <v-chip
            class="ma-2 ml-4 my-2"
            label
            small
            text-color="white"
            color="black"
            >COMIDA</v-chip
          >
          <v-row align="center" class="mx-0 justify-lg-space-between">
            <v-card-title
              class="col"
              style="padding-top: 5px; padding-bottom: 0"
              >{{ product.nombre }}</v-card-title
            >
            <v-rating
              :value="4.5"
              class="col ml-3 mx-0 my-0"
              align="right"
              style="padding-top: 0"
              color="amber"
              dense
              half-increments
              readonly
              size="20"
            ></v-rating>
          </v-row>
          <v-card-subtitle style="padding-top: 0"
            >PRECIO: {{ product.precio }}</v-card-subtitle
          >
          <v-row align="center" class="mx-0 my-0 justify-lg-space-between">
            <v-card-subtitle
              class="col"
              style="padding-top: 0px; padding-bottom: 0"
              >Fabricante:</v-card-subtitle
            >
            <v-card-subtitle
              class="col mr-5 font-weight-black"
              style="padding: 5px"
              >Tienda</v-card-subtitle
            >
          </v-row>
          <v-row align="center" class="mx-0 my-0 justify-lg-space-between">
            <v-card-subtitle
              class="col"
              style="padding-top: 0px; padding-bottom: 0"
              >Dimensiones del Producto:</v-card-subtitle
            >
            <v-card-subtitle
              class="col mr-5 font-weight-black"
              style="padding: 5px"
              >12.7 x 12.7 x 20 cm</v-card-subtitle
            >
          </v-row>
          <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
            <v-card-subtitle
              class="col"
              style="padding-top: 0px; padding-bottom: 0"
              >Peso:</v-card-subtitle
            >
            <v-card-subtitle
              class="col mr-5 font-weight-black"
              style="padding: 5px"
              >800 gr</v-card-subtitle
            >
          </v-row>

          <v-card-subtitle
            class="font-italic font-weight-light"
            style="padding-top: 0px"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,</v-card-subtitle
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="text-center">
            <v-btn
              @click.prevent="agregarProductoCarrito(product)"
              rounded
              color="#0E004B"
              class="orange--text"
              dark
              ><span class="mr-3"
                ><v-icon
                  style="font-size: 0.5rem; color: #f2ae11; margin-bottom: 2px"
                  >fas fa-plus fa-lg</v-icon
                ></span
              >Agregar a Carrito</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      dialog: false,
      //cantidadcarrito: 1,
    };
  },
  props: ['product'],
  methods: {
    /*  agregarProductoCarrito() {
      console.log(this.product, `producto a agregar`);
      const newProduct = { ...this.product, cantidadcarrito: 1 };
      console.log('nuevo producto', newProduct);
      //this.$store.dispatch('agregarProductoCarrito', this.product);
      this.$store.dispatch('agregarCarrito', newProduct);
    }, */
    /* addToCart() {
      this.$store.commit('AGREGAR_CARRITO_LOCALSTORAGE', this.product);
    }, */
    agregarProductoCarrito(item) {
      const oldItems = JSON.parse(localStorage.getItem('carrito')) || [];
      const idToUse = item.id;
      const existingItem = oldItems.find(({ id }) => id === idToUse);
      if (existingItem) {
        this.$store.dispatch('errorItemRepeated');
        this.dialog = false;
      } else {
        //console.log(this.product, `producto a agregar`);
        const newProduct = { ...this.product, cantidadcarrito: 1 };
        //console.log('nuevo producto', newProduct);
        //this.$store.dispatch('agregarProductoCarrito', this.product);
        this.$store.dispatch('agregarCarrito', newProduct);
        /*   console.log(newItem);
        oldItems.push(newItem); */
        this.dialog = false;
      }

      /* localStorage.setItem('carrito', JSON.stringify(oldItems));
      this.$store.dispatch('carritoLocalStorage'); */
    },
  },
};
</script>

<style></style>
