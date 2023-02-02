<template>
  <!-- <v-card class="mx-auto" color="#26c6da" dark max-width="400">
    <v-card-title>
      <v-icon large left> mdi-twitter </v-icon>
      <span class="text-h6 font-weight-light">Twitter</span>
    </v-card-title>

    <v-card-text class="text-h5 font-weight-bold">
      "Turns out semicolon-less style is easier and safer in TS because most
      gotcha edge cases are type invalid as well."
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-icon class="mr-1"> mdi-heart </v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1"> mdi-share-variant </v-icon>
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card> -->
  <div class="mx-auto row product-list">
    <PedidoCard
      class="card-hover"
      v-for="pedido in buscarPedidos"
      :key="pedido.id"
      :pedido="pedido"
    ></PedidoCard>
    <div v-if="buscarPedidos.length == 0">
      <v-label color="#0d47a1"> No hay pedidos</v-label>
    </div>
  </div>
</template>

<script>
import PedidoCard from '../../components/PedidoCard.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'UsuarioPedidos',
  components: {
    PedidoCard,
  },
  data() {
    return {
      id: 0,
    };
  },

  computed: {
    buscarPedidos() {
      /*  return this.$store.state.pedidos.pedidos.filter((p) => {
        return p.nombre.toLowerCase().indexOf(this.buscar.toLowerCase()) != -1;
      }); */
      return this.$store.getters.pedidos.filter((p) => p.userid == this.id);
    },
  },
  getters: {
    ...mapGetters(['isLogin', 'usuario']),
  },
  mounted() {
    this.$store.dispatch('obtenerPedidos');
    this.id = this.$store.state.auth.usuario.id;
    //this.$store.dispatch('obtenerCarrito');
  },
  /* mounted() {
    this.$store.dispatch('obtenerProductos');
    this.$store.dispatch('obtenerCarrito');
  }, */
};
</script>

<style lang="scss" scoped>
.v-label {
  font-size: 40px !important;
}
</style>
