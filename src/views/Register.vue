<template>
  <v-layout id="register" align-center justify-center>
    <div class="wrapper-test">
      <div class="message"></div>
      <v-form ref="form" v-model="valid" lazy-validation class="form-signin">
        <h2 class="form-signin-heading text-center">Registrarse</h2>
        <v-text-field
          v-model="nombre"
          :rules="nombreRules"
          autofocus
          color="accent"
          label="Nombre"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          color="accent"
          label="Email"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          type="password"
          color="accent"
          label="Password"
          required
        >
        </v-text-field>
        <v-btn class="btn lg primary block" @click="register()"
          >Registrarse</v-btn
        >
        <v-spacer></v-spacer>
        <div class="mt-8">
          Ya tienes una cuenta?
          <a href="" @click.prevent="toLogin">Login</a>
        </div>
      </v-form>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      valid: false,

      nombreRules: [
        (v) => !!v || 'El Nombre es requerido',
        (v) =>
          (v && v.length <= 20) ||
          'El Nombre debe tener como máximo 20 caracteres',
      ],

      emailRules: [
        (v) => !!v || 'E-mail es requerido',
        (v) => /.+@.+\..+/.test(v) || 'El email debe ser válido',
      ],

      passwordRules: [
        (v) => !!v || 'La contraseña es Requerida',
        (v) =>
          (v && v.length <= 15) ||
          'La contraseña debe tener como máximo 15 caracteres',
      ],
      nombre: '',
      email: '',
      password: '',
      errorM: null,
      textoAlerta: '',
      alerta: false,
      alertaError: false,
    };
  },
  methods: {
    toLogin() {
      this.$store.dispatch('toLogin');
    },
    register() {
      if (this.$refs.form.validate()) {
        this.alerta = true;
        this.mostrarAlerta('Se registró correctamente');
        this.$store.dispatch('register', {
          usuario: this.nombre,
          email: this.email,
          password: this.password,
        });
      } else {
        this.alertaError = true;
        this.mostrarAlerta('Completar todos los campos');
      }
    },

    mostrarAlerta(texto) {
      this.textoAlerta = texto;
      setTimeout(() => {
        this.alerta = false;
        this.alertaError = false;
      }, 2000);
    },
  },
};
</script>

<style>
#register {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(72, 161, 118, 1) 100%
  );
  min-height: 100vh;
}
.wrapper-test {
  margin: 80px;
}
.form-signin {
  max-width: 1000px;
  margin: 0 auto;
  background-color: #000;
  padding: 15px 40px 50px;
  border: 1px solid #000;
  border-radius: 10px;
}
.form-signin input[type='text'],
.form-signin input[type='password'] {
  margin-bottom: 20px;
}
.form-signin .form-control {
  padding: 10px;
}
.list-group-item:hover {
  background-color: beige;
}
</style>
