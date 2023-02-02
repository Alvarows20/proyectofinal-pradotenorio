<template>
  <div class="col col-sm-6 col-md-4 col-lg-3">
    <v-card class="mx-auto my-2 card-card" width="300">
      <v-card-title style="padding-top: 5px">{{ pedido.fecha }} </v-card-title>
      <v-chip
        class="ma-2 ml-4 my-0"
        label
        small
        text-color="white"
        color="black"
        >Id Usuario: {{ pedido.userid }}</v-chip
      >
      <v-card-title style="padding-top: 5px">{{ pedido.nombre }} </v-card-title>
      <v-card-subtitle>Total: {{ pedido.total }}</v-card-subtitle>
      <v-card-subtitle>Entregado: {{ pedido.entregado }}</v-card-subtitle>
      <v-card-text>
        <v-row align="center" class="mx-0 my-2 justify-lg-space-between">
          <v-spacer class="mb-2"></v-spacer>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'PedidoCard',
  props: ['pedido'],
};
</script>

<style></style>
