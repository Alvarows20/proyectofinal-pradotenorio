<template>
  <v-card height="30">
    <v-footer absolute class="font-weight-medium" color="black">
      <v-col class="text-center" cols="12" style="color: white">
        {{ new Date().getFullYear() }} —
        <strong>CoderHouse Curso Vue JS — Prado Tenorio Alvaro</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
.footer {
  background-color: black;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  color: white;
}
</style>
