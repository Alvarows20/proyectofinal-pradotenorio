<template>
  <div>
    <transition name="fade" mode="out-in">
      <v-alert type="success" class="custom-alert" v-show="alert" key="1">
        Item agregado al carrito!
      </v-alert>
    </transition>
    <transition name="fade" mode="out-in">
      <v-alert
        type="warning"
        class="custom-alert"
        v-show="error_item_repeated"
        key="1"
      >
        El item ya está en el carrito!
      </v-alert>
    </transition>
    <transition name="fade" mode="out-in">
      <v-alert type="success" class="custom-alert" v-show="pedido_ok" key="1">
        Se generó el pedido!
      </v-alert>
    </transition>
    <!--
    <transition name="fade" mode="out-in">
      <v-alert type="success" class="custom-alert" v-show="userUpdate" key="1">
        Usuario actualizado satisfactoramente!
      </v-alert>
    </transition>
    <transition name="fade" mode="out-in">
      <v-alert
        type="error"
        class="custom-alert"
        v-show="userUpdateError"
        key="1"
      >
        No es posible actualizar los datos.
      </v-alert>
    </transition> -->
    <transition name="fade" mode="out-in">
      <v-alert
        type="warning"
        class="custom-alert"
        v-show="alert_warning"
        key="1"
      >
        No es posible loguearse. Verifique usuario y contraseña.
      </v-alert>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Alerts',
  computed: {
    ...mapState({
      alert_warning: (state) => state.alert_warning,
      alert: (state) => state.alert,
      error_item_repeated: (state) => state.error_item_repeated,
      pedido_ok: (state) => state.pedido_ok,
    }),
    ...mapGetters([
      'alert_warning',
      'alert',
      'error_item_repeated',
      'pedido_ok',
    ]),
  },
};
</script>

<style lang="scss">
.custom-alert {
  position: fixed !important;
  z-index: 99999;
  top: 92vh;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 600px) {
    top: 80vh;
  }
}
</style>
