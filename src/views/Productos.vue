<template>
  <v-container>
    <Navbar />
    <div>
      <v-data-table
        :headers="headers"
        :items="productos"
        :search="search"
        sort-by="nombre"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Productos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="text-xs-center"
              v-model="search"
              append-icon="search"
              label="Búsqueda"
              single-line
              hide-details
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#0d47a1"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="imagen"
                          label="Imagen"
                        ></v-text-field>
                        <p>
                          Agregar imágenes: menpants.jpg, menpants2.jpg,
                          shirt.jpg, womanpants.jpg
                        </p>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          type="number"
                          v-model="cantidad"
                          label="Cantidad"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          type="number"
                          v-model="precio"
                          label="Precio"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12" v-show="valida">
                        <div
                          class="red--text"
                          v-for="v in validaMensaje"
                          :key="v"
                          v-text="v"
                        ></div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="guardar">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Estás seguro/a que quieres eliminar el item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Eliminar</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>

          <v-icon small @click="eliminarItem(item)"> mdi-delete </v-icon>
        </template>

        <template v-slot:[`item.imagen`]="{ item }">
          <v-img width="50" :src="item.imagen"></v-img>
        </template>

        <template v-slot:no-data>
          <v-label color="#0d47a1"> No hay datos en la tabla</v-label>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { mapState, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  components: {
    Navbar,
  },
  data: () => ({
    dialog: false,
    search: '',
    imagen: '',
    dialogDelete: false,
    headers: [
      { text: 'Actions', value: 'actions', sortable: false },
      { text: 'Código', value: 'id', sortable: false },
      { text: 'Imagen', value: 'imagen', sortable: false },
      { text: 'Nombre', value: 'nombre', sortable: true },
      { text: 'Precio', value: 'precio', sortable: false },
      { text: 'Cantidad', value: 'cantidad', sortable: false },
    ],
    newImagen: '/assets/images/',
    id: '',
    nombre: '',
    stock: 0,
    precio: 0,
    cantidad: 0,
    valida: 0,
    validaMensaje: [],
    editedIndex: -1,
    adModal: 0,
    adAccion: 0,
    adNombre: '',
    adId: '',
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo producto' : 'Editar producto';
    },
    /* productos() {
      return this.$store.state.productos;
    }, */
    ...mapState({
      productos: (state) => state.productos,
    }),
    ...mapGetters(['productos']),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.$store.dispatch('obtenerProductos');
  },

  methods: {
    uploadImage(event) {
      const URL = '/assets/images/';

      let data = new FormData();
      data.append('name', 'my-picture');
      data.append('file', event.target.files[0]);

      let config = {
        header: {
          'Content-Type': 'image/png',
        },
      };

      axios.put(URL, data, config).then(() => {
        //console.log('image upload response > ', response);
      });
    },
    editItem(item) {
      this.id = item.id;
      this.nombre = item.nombre;
      this.cantidad = item.cantidad;
      this.precio = item.precio;
      this.imagen = item.imagen;
      this.dialog = true;
      this.editedIndex = 1;
    },

    eliminarItem(item) {
      this.dialogDelete = true;
      this.id = item.id;
      // console.log(item, `abrir dialog de eliminar item`);
    },

    limpiar() {
      this.id = '';
      this.nombre = '';
      this.cantidad = 0;
      this.imagen = '';
      this.precio = 0;
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];

      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          'El nombre del articulo debe tener entre 1 y 50 caracteres'
        );
        this.valida = 1;
        return this.valida;
      }
      if (this.cantidad < 0) {
        this.validaMensaje.push('Ingrese una cantidad válida mayor a 0');
        this.valida = 1;
        return this.valida;
      }

      if (this.precio < 0) {
        this.validaMensaje.push('Ingrese un precio válido mayor a 0');
        this.valida = 1;
        return this.valida;
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },

    listar() {
      this.$store.dispatch('obtenerProductos');
    },
    guardar() {
      let me = this;
      // let header = { Token: this.$store.state.token };
      // let configuracion = { headers: header };
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        //Código para editar
        axios
          .put(
            `https://61e45b6b1a976f00176ee447.mockapi.io/productos/${this.id}`,
            {
              nombre: this.nombre,
              precio: parseInt(this.precio),
              cantidad: parseInt(this.cantidad),
              imagen: this.imagen,
            }
            /* configuracion */
          )
          .then(function () {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        //Código para guardar
        axios
          .post(
            'https://61e45b6b1a976f00176ee447.mockapi.io/productos/',
            {
              nombre: this.nombre,
              cantidad: parseInt(this.cantidad),
              precio: parseInt(this.precio),
              imagen: this.newImagen + this.imagen,
            }
            //configuracion
          )
          .then(function () {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    deleteItemConfirm() {
      let me = this;
      axios
        .delete(
          `https://61e45b6b1a976f00176ee447.mockapi.io/productos/${this.id}`

          /* configuracion */
        )
        .then(function () {
          me.limpiar();
          me.closeDelete();
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    close() {
      this.dialog = false;
      /* this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }); */
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
