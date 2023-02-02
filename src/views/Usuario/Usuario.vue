<template>
  <v-main>
    <v-container>
      <Navbar />
      <v-row>
        <v-col class="col-12 col-md-4 col-lg-3">
          <v-list nav width="100%">
            <v-list-item-group v-model="itemSeleccionado" color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                class="btn-border"
                :to="{ name: item.route }"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title> {{ item.texto }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item class="btn-border" @click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-exit-run</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Salir</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col class="col-12 col-md-8 col-lg-9">
          <h2>{{ seleccionado.texto }}</h2>
          <p>{{ seleccionado.descripcion }}</p>
          <div class="configuraciones">
            <router-view></router-view>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
export default {
  name: 'Usuario',
  components: {
    Navbar,
  },
  data() {
    return {
      itemSeleccionado: 0,
      items: [
        {
          id: 0,
          texto: 'Datos de Usuario',
          descripcion: 'Agregar información sobre Usted',
          icon: 'mdi-account',
          route: 'UsuarioEditar',
        },
        {
          id: 1,
          texto: 'Histórico de Pedidos',
          descripcion: 'Verificar todas las compras echa por Usted',
          icon: 'mdi-shopping',
          route: 'Pedidos',
        },
        /*  {
          texto: 'Hablar con un vendedor',
          descripcion:
            'Necesita ayuda o informarse sobre el mejor curso de Coder? Hable con un vendedor',
          icon: 'mdi-account-voice',
          route: 'HablarConVendedor',
        }, */
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    seleccionado() {
      return this.items[this.itemSeleccionado];
    },
  },

  /*   public deslogarUsuario: () => void;

  public sair(): void {
    this.deslogarUsuario();
    this.$router.push({ name: 'Login' });
  } */
};
</script>

<style lang="scss" scoped>
/* @import '@/sass/custom';*/

.btn-border {
  border-bottom: solid 1px lighten(#fff, 5%);
}

.configuraciones {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  color: #fff;
  .form-usuario {
    width: 100%;
    max-width: 700px;
  }
}
</style>
