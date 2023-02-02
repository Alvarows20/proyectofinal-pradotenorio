<template>
  <v-navigation-drawer
    fixed
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
    left
    v-model="drawerOpen"
    @input="onInput"
    v-if="isLogin"
  >
    <v-list dense>
      <template>
        <v-list-item :to="{ name: 'Home' }">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-title> Inicio </v-list-item-title>
        </v-list-item>
      </template>
      <template v-if="esAdministrador">
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item>
              <v-list-item-title> PANEL DE ADMIN</v-list-item-title>
            </v-list-item>
          </v-list-item>
          <v-list-item :to="{ name: 'Productos' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item>
              <v-list-item-title> Productos </v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list-group>
      </template>
      <template v-if="esAdministrador || esCliente">
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item>
              <v-list-item-title> VER PERFIL</v-list-item-title>
            </v-list-item>
          </v-list-item>
          <v-list-item :to="{ name: 'UsuarioEditar' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item>
              <v-list-item-title> Mi Perfil </v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list-group>
      </template>
      <!-- <template v-if="esAdministrador || esCliente">
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item>
              <v-list-item-title> Volver a Home</v-list-item-title>
            </v-list-item>
          </v-list-item>
          <v-list-item :to="{ name: 'Home' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item>
              <v-list-item-title> Home </v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list-group>
      </template> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NavigationDrawerLeft',
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      drawerOpen: this.open,
    };
  },
  watch: {
    open(newVal) {
      this.drawerOpen = newVal;
      //console.log('open: ' + this.drawerOpen);
    },
  },
  methods: {
    onInput(isOpen) {
      this.$emit('drawer-opened', isOpen);
      //console.log('onInput: ' + isOpen);
    },
  },
  computed: {
    email() {
      return localStorage.Email;
    },
    numberOfItem() {
      return this.$store.state.carts.length;
    },
    esAdministrador() {
      return (
        this.$store.state.auth.usuario &&
        this.$store.state.auth.usuario.rol === 'Administrador'
      );
    },
    esCliente() {
      return (
        this.$store.state.auth.usuario &&
        this.$store.state.auth.usuario.rol === 'Cliente'
      );
    },
    ...mapGetters(['isLogin']),
  },
};
</script>

<style lang="scss" scoped></style>
