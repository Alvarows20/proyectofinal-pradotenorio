import router from '../../router';
import axios from 'axios';
export default {
  state: {
    isLogin: false,
    usuario: [],
    disabled: false,
    rules: {
      required: [(v) => !!v || 'Este campo obligatorio.'],
      email: [
        (v) => !!v || 'Este campo obligatorio.',
        (v) => /.+@.+\..+/.test(v) || 'Ingrese un e-mail válido.',
      ],
      password: [
        (v) => !!v || 'Este campo obligatorio.',
        (v) =>
          (v && v.length >= 6) ||
          'La contraseña debe tener mínimo 6 caracteres',
        (v) =>
          /(?=.*[a-z])|(?=.*[A-Z])/.test(v) ||
          'Agregue carácter/es a su contraseña',
        (v) => /(?=.*\d)/.test(v) || 'Ingrese número/s a su contraseña',
      ],
    },
    alert_warning: false,
  },
  mutations: {
    LOGIN(state) {
      state.isLogin = true;
      router.push({ name: 'Home' }).catch(() => {});
    },
    SET_USUARIO(state, payload) {
      state.usuario = payload;
    },
    REGISTER() {
      router.push({ name: 'Home' }).catch(() => {});
    },
    LOGUEADO(state) {
      state.isLogin = true;
      // router.push({name: 'Home'})
    },
    NO_LOGUEADO(state) {
      state.isLogin = false;
      router.push({ name: 'Home' }).catch(() => {});
    },
    LOGOUT(state) {
      localStorage.removeItem('Usuario');
      localStorage.removeItem('token');
      localStorage.removeItem('Email');

      //localStorage.clear();
      state.isLogin = false;
      router.push({ name: 'Home' }).catch(() => {});
    },
    SHOW_ALERT_WARNING(state) {
      state.alert_warning = true;
      setTimeout(() => {
        state.alert_warning = false;
      }, 3000);
    },
  },
  actions: {
    guardarUsuario({ commit }, payload) {
      commit('SET_USUARIO', payload);
      localStorage.setItem('Usuario', JSON.stringify(payload));
      localStorage.setItem('token', payload.token);
      localStorage.setItem('Email', payload.email);
      commit('LOGIN');
    },
    login(context, payload) {
      //console.log(payload, `login de usuario actions`);
      /* axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: payload,
      }) */
      //console.log(payload, `login usuario`);
      localStorage.setItem('token', payload.token);
      localStorage.setItem('Email', payload.email);
      context.commit('LOGIN');
    },
    register(context, payload) {
      // console.log(payload, `registro de usuario actions`);
      axios({
        url: 'https://61e45b6b1a976f00176ee447.mockapi.io/usuarios',
        method: 'post',
        data: payload,
      }).then(() => {
        // console.log(`registrado correctamente:`, data.data);

        /*   localStorage.setItem('token', payload.token);
        localStorage.setItem('Email', payload.email); */
        context.commit('REGISTER');
      });
    },
    loginCheck(context) {
      if (localStorage.token) {
        context.commit('LOGUEADO');
        let usuario = JSON.parse(localStorage.getItem('Usuario'));
        // console.log(usuario, 'loginCheck');
        if (usuario) {
          //context.commit('setToken', usuario);
          context.commit('SET_USUARIO', usuario);
          // console.log('usuario', usuario);
        }
        router.push({ name: 'Home' }).catch(() => {});
      } else {
        context.commit('NO_LOGUEADO');
      }
    },
    logout({ commit }) {
      commit('SET_USUARIO', null);
      commit('LOGOUT');
    },
    errorLogin(context) {
      context.commit('SHOW_ALERT_WARNING');
    },
  },
  getters: {
    isLogin: (state) => state.isLogin,
    usuario: (state) => state.usuario,
    rules: (state) => state.rules,
    disabled: (state) => state.disabled,
    alert_warning: (state) => state.alert_warning,
  },
};
