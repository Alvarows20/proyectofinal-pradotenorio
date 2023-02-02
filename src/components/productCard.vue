<template>
  <div class="col col-sm-6 col-md-4 col-lg-3">
    <v-card class="mx-auto my-2 card-card" width="300">
      <v-img height="250" :src="product.imagen"></v-img>
      <v-chip
        class="ma-2 ml-4 my-0"
        label
        small
        text-color="white"
        color="black"
        >CAMISAS</v-chip
      >
      <v-card-title style="padding-top: 5px"
        >{{ product.nombre }}
      </v-card-title>
      <v-card-subtitle>Precio: {{ product.precio }}</v-card-subtitle>
      <v-card-text>
        <v-row align="center" class="mx-0 my-2 justify-lg-space-between">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="20"
          ></v-rating>
          <ProductDetail class="ml-10" :product="product"></ProductDetail>
          <v-spacer class="mb-8"></v-spacer>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ProductDetail from '../components/ProductDetail.vue';
export default {
  name: 'Card',
  components: {
    ProductDetail,
  },
  props: ['product'],
};
</script>

<style></style>
