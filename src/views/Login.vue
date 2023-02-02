<template>
  <v-layout id="login" align-center justify-center>
    <div class="wrapper-test">
      <div class="message"></div>
      <v-form ref="form" v-model="valid" lazy-validation class="form-signin">
        <h2 class="form-signin-heading text-center">Login</h2>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          autofocus
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

        <v-btn class="btn lg primary block mt-4" @click="login()">Login</v-btn>
        <v-spacer></v-spacer>
        <div class="mt-6">
          No tienes una cuenta?
          <a href="" @click.prevent="toRegister">Registrarse</a>
        </div>
        <v-spacer></v-spacer>
        <div class="mt-8">
          <a href="" @click.prevent="toHome">Página Principal</a>
        </div>
      </v-form>
      <template>
        <div class="mt-8">
          <v-alert v-if="!alerta" :value="alerta" type="success">
            {{ textoAlerta }}
          </v-alert>
          <v-alert v-else :value="alertaError" type="error">
            {{ textoAlerta }}
          </v-alert>
        </div>
      </template>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      valid: false,

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

      email: '',
      password: '',
      errorM: null,
      textoAlerta: '',
      alerta: false,
      alertaError: false,
    };
  },
  methods: {
    toRegister() {
      this.$store.dispatch('toRegister');
    },
    toHome() {
      this.$store.dispatch('toHome');
    },
    login() {
      if (this.$refs.form.validate()) {
        this.alerta = true;
        this.mostrarAlerta('Se logueó correctamente');
      } else {
        this.alertaError = true;
        this.mostrarAlerta('Completar todos los campos');
      }

      if (this.email == 'a@a.com' && this.password == 'admin') {
        //this.$emit('authenticated', true);

        const newAdmin = {
          id: 1,
          email: this.email,
          password: this.password,
          token: this.email + this.password,
          rol: 'Administrador',
        };
        this.$store.dispatch('guardarUsuario', newAdmin);
      } else if (this.email == 'c@c.com' && this.password == 'cliente') {
        //this.$emit('authenticatedCliente', true);
        // this.$router.replace({ name: 'Home' });
        const newCliente = {
          id: 2,
          email: this.email,
          password: this.password,
          token: this.email + this.password,
          rol: 'Cliente',
        };
        this.$store.dispatch('guardarUsuario', newCliente);
      } else {
        //this.alertaError = true;
        //this.mostrarAlerta('El email y contraseña  son incorrectos');
        this.$store.dispatch('errorLogin');
      }
    },
    mostrarAlerta(texto) {
      this.textoAlerta = texto;
      setTimeout(() => {
        this.alerta = false;
        this.alertaError = false;
      }, 1500);
    },
  },
};
</script>

<style>
#login {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(72, 161, 118, 1) 100%
  );
  min-height: 100vh;
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
a {
  color: #fff !important;
}
div {
  color: #fff !important;
}
h2 {
  color: #fff !important;
}
.custom-placeholer-color input::placeholder {
  color: red !important;
  opacity: 1;
}
</style>
