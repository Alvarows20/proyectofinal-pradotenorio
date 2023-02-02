<template>
  <v-container>
    <Navbar></Navbar>
    <div class="banner row mt-8">
      <div class="col banner-text">
        <h1 class="font-light-black display-1">IR A NUESTRO PRODUCTOS</h1>
        <h1 class="font-weight-black display-4">TIENDA</h1>
        <a>
          <div @click.prevent="$vuetify.goTo(target, option)">
            <v-icon large>fa-chevron-down</v-icon>
          </div>
        </a>
      </div>
      <div class="col banner-img">
        <img
          class="center"
          src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        />
      </div>
    </div>
    <div class="container">
      <div class="search-wrapper heading mb-6" id="collection">
        <h1 class="container font-weight-black display-1">
          Nuestros Productos
        </h1>
        <input
          id="input-buscador"
          type="text"
          class="col-12 col-sm-12"
          v-model="buscar"
          placeholder="Buscar Productos"
        />
      </div>

      <div class="mx-auto row product-list">
        <Card
          class="card-hover"
          v-for="product in buscarProductos"
          :key="product.id"
          :product="product"
        ></Card>
      </div>

      <div class="container banner mt-4" v-if="!isLogin">
        <div class="row giveaway-banner">
          <div class="banner-text" style="padding-left: 0px; color: white">
            <h1 class="font-weight-black display-1">REGISTRARSE ES FACIL!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              malesuada urna non vulputate elementum. Aliquam neque arcu,
              scelerisque sed turpis at, maximus ultrices tellus. Mauris quis ex
              at purus imperdiet sagittis vel quis ligula. Maecenas congue
              placerat ipsum, at finibus mi porta ut. Cras ultricies molestie
              libero, in facilisis leo pharetra vitae. Morbi fermentum neque ac
              maximus auctor. Phasellus ornare egestas sapien vel lacinia.
              Integer blandit felis ac sem imperdiet, vitae pellentesque nunc
              mollis.
            </p>
            <div class="my-2" @click.prevent="toRegister">
              <v-btn depressed color="primary">Registrarse</v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="my-6 container">
        <Footer />
      </div>
    </div>
  </v-container>
</template>

<script>
import Navbar from '../components/Navbar';
import Card from '../components/productCard';
import Footer from '../components/Footer.vue';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'Home',
  components: {
    Navbar,
    Card,
    Footer,
  },
  data() {
    return {
      duration: 300,
      offset: 0,
      easing: 'easeInOutCubic',
      buscar: '',
    };
  },
  methods: {
    toRegister() {
      this.$store.dispatch('toRegister');
    },
  },
  computed: {
    target() {
      return '#collection';
    },
    option() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
    loginStatus() {
      return this.$store.getters.usuario.isLogin;
    },
    /* productos() {
      return this.$store.state.productos;
    }, */
    buscarProductos() {
      return this.$store.getters.productos.filter((p) => {
        return p.nombre.toLowerCase().indexOf(this.buscar.toLowerCase()) != -1;
      });
    },
    checkToken() {
      return this.localStorage.token;
    },
    carts() {
      return this.$store.state.carts;
    },
    ...mapState({
      isLogin: (state) => state.isLogin,
    }),
    ...mapGetters(['isLogin']),
    /* ...mapState({
      productos: (state) => state.productos,
      //cargandoCarrito: (state) => state.cargandoCarrito,
    }), */
    //...mapGetters(['productos']),
  },
  mounted() {
    this.$store.dispatch('obtenerProductos');
    //this.$store.dispatch('obtenerCarrito');
  },
};
</script>

<style>
@keyframes bounce {
  0%,
  20%,
  60%,
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  40% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }

  80% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
}
img {
  height: 15rem;
}
img.center {
  display: block;
  margin: 0 auto;
}
.card-hover {
  transition: all 0.2s ease-in-out;
}
.card-hover:hover {
  transform: scale(0.9);
}
.start-nav {
  color: #0d47a1;
}
.start-nav:hover {
  color: #0d47a1;
  font-size: 250%;
}
.card-card {
  border-radius: 1rem !important;
  -webkit-box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.41) !important;
  -moz-box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.41) !important;
  box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.41) !important;
}
.banner-text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.giveaway-banner {
  display: flex;
  background: rgb(11, 4, 15);
  background: linear-gradient(
    90deg,
    rgba(11, 4, 15, 1) 0%,
    rgba(28, 59, 70, 1) 50%,
    rgba(31, 64, 104, 1) 100%
  );
  margin: 0%;
  border-radius: 1rem;
  height: 28rem;
  -webkit-box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.7) !important;
  -moz-box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.7) !important;
  box-shadow: 0px 5px 34px -3px rgba(112, 112, 112, 0.7) !important;
}
.giveaway-banner:hover {
  animation: bounce 1s;
}
/* .giveaway {
  margin-top: 5rem;
  margin-bottom: 5rem;
} */

.top-collection {
  border-radius: 3rem;
}
.fade {
  opacity: 0.5;
}
.fade:hover {
  opacity: 1;
}
#input-buscador {
  display: flex;
  background: linear-gradient(
    90deg,
    rgba(11, 4, 15, 1) 0%,
    rgba(28, 59, 70, 1) 50%,
    rgba(31, 64, 104, 1) 100%
  );
  margin: 0% !important;
  border-radius: 1rem;
  color: white !important;
}
#input-buscador::placeholder {
  color: white !important;
  font-size: 1.2em;
  font-style: italic;
}
h1 {
  color: white !important;
}
</style>
