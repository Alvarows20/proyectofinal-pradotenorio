import router from '../../router';
export default {
  actions: {
    toCarrito() {
      router.push({ name: 'Carrito' }).catch(() => {});
      console.log('Al Carrito');
    },

    toHome() {
      router.push({ name: 'Home' }).catch(() => {});
    },
    toLogin() {
      router.push({ name: 'Login' }).catch(() => {});
    },
    toRegister() {
      router.push({ name: 'Register' }).catch(() => {});
    },
  },
};
