<template>
  <v-form @submit.prevent="submit" v-model="valido">
    <v-text-field
      v-model="usuario.email"
      :rules="rules.email"
      label="Email"
      type="text"
      maxlength="80"
      :disabled="disabled"
      required
    ></v-text-field>
    <v-text-field
      v-model="usuario.password"
      :rules="rules.password"
      label="Password"
      type="password"
      maxlength="80"
      :disabled="disabled"
      required
    ></v-text-field>
    <v-select
      v-if="usuario.rol === 'Administrador'"
      v-model="usuario.rol"
      :rules="rules.rol"
      :items="roles"
      label="Standard"
      :disabled="disabled"
      dense
    ></v-select>
    <div class="flex-center mt-4">
      <v-btn
        class="btn-login pa-6"
        type="submit"
        @click.prevent="submeter"
        :disabled="!valido || disabled"
      >
        <slot></slot>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
      valido: false,
      viewPass: false,
      logueado: false,
      roles: ['Administrador', 'Cliente'],
    };
  },

  methods: {
    async submeter() {
      if (!this.isLogin) {
        const response = await this.$store.dispatch(
          'register',
          this.usuarioForm
        );
        if (response) {
          this.getUsuario({
            email: this.usuarioForm.email,
            senha: this.usuarioForm.senha,
          });
          this.$router.push({ name: 'Usuario' });
        }
      } else {
        this.atualizarUsuario(this.usuarioForm);
      }
    },
  },
  computed: {
    ...mapState({
      usuario: (state) => state.usuario,
      rules: (state) => state.rules,
      disabled: (state) => state.disabled,
    }),
    ...mapGetters(['usuario', 'isLogin', 'rules', 'disabled']),
  },
};
</script>

<style lang="scss"></style>
