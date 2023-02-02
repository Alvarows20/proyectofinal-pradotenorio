<template>
  <div>
    <NavigationDrawerLeft
      :open="openLeftNavigationDrawer"
      @drawer-opened="handleDrawerChange('left', $event)"
    >
    </NavigationDrawerLeft>

    <NavigationDrawerRight
      :open="openRightNavigationDrawer"
      @drawer-opened="handleDrawerChange('right', $event)"
    >
    </NavigationDrawerRight>
    <v-app-bar
      flat
      dense
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      :clipped-right="$vuetify.breakpoint.mdAndUp"
      app
      color="#000"
      dark
    >
      <v-container class="d-flex align-center justify-space-between">
        <v-toolbar-title>
          <v-app-bar-nav-icon
            @click.stop="openLeftNavigationDrawer = !openLeftNavigationDrawer"
            v-if="isLogin"
          ></v-app-bar-nav-icon>

          <router-link
            tag="span"
            class="hidden-sm-and-down font-weight-black"
            to="/"
          ></router-link>
        </v-toolbar-title>

        <v-toolbar-title>
          <router-link to="/">
            <v-img src="/assets/images/logo.jpg" class="logo"></v-img>
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          small
          style="position: relative"
          @click.stop="openRightNavigationDrawer = !openRightNavigationDrawer"
          v-if="isLogin"
          class="cart-button mt-2"
          icon
          color="white"
        >
          <v-badge
            small
            v-if="numberOfItem > 0"
            color="red"
            :content="numberOfItem"
            class="badge-carrito"
          >
            <v-icon small>fas fa-shopping-bag</v-icon>
          </v-badge>
          <v-icon small v-else>fas fa-shopping-bag</v-icon>
        </v-btn>

        <div class="d-sm-block ml-6">
          <v-btn :to="{ name: 'UsuarioEditar' }" v-if="isLogin">
            <v-icon left>mdi-account</v-icon>
            {{ usuario.email }}
          </v-btn>

          <v-btn :to="{ name: 'Login' }" v-else>
            <v-icon left>mdi-account</v-icon>
            Entrar / Registrar
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavigationDrawerLeft from './NavigationDrawerLeft.vue';
import NavigationDrawerRight from './NavigationDrawerRight.vue';

export default {
  name: 'Navbar',
  components: {
    NavigationDrawerLeft,
    NavigationDrawerRight,
  },
  data() {
    return {
      //drawer: true,
      openLeftNavigationDrawer: false,
      openRightNavigationDrawer: false,
    };
  },
  methods: {
    toHome() {
      this.$store.dispatch('toHome');
    },
    toLogin() {
      this.$store.dispatch('toLogin');
    },
    toCarrito() {
      this.$store.dispatch('toCarrito');
    },
    logout() {
      this.$store.dispatch('logout');
    },
    handleDrawerChange(type, isOpen) {
      if (type == 'left') {
        this.openLeftNavigationDrawer = isOpen;
        //console.log('left');
      } else {
        this.openRightNavigationDrawer = isOpen;
        //console.log('right');
      }
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
    ...mapGetters(['usuario', 'isLogin']),
  },

  /* mounted() {
    this.$store.dispatch('loginCheck');

    console.log('rol', this.$store.getters.usuario.rol);
  }, */
};
</script>

<style>
.title {
  color: #003;
}
.logo {
  height: auto;
  width: 45px;
  align-items: center;
}
.badge-carrito {
  display: absolute;
  top: 0;
  right: 0;
}
</style>
