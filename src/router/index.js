import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    meta: {
      requiresAuth: true,
    },
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    meta: {
      requiresAuth: true,
    },
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/productos',
    meta: {
      administrador: true,
    },
    name: 'Productos',
    component: () => import('../views/Productos.vue'),
  },
  {
    path: '/carrito',
    meta: {
      administrador: true,
      cliente: true,
    },
    name: 'Carrito',
    component: () => import('../views/Carrito.vue'),
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: () => import('../views/Usuario/Usuario.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/editar',
        name: 'UsuarioEditar',
        component: () => import('../views/Usuario/UsuarioEditar.vue'),
      },
      {
        path: '/pedidos',
        name: 'Pedidos',
        component: () => import('../views/Usuario/UsuarioPedidos.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/* router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
}); */
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    next();
  } else if (
    store.state.auth.usuario &&
    store.state.auth.usuario.rol == 'Administrador'
  ) {
    if (to.matched.some((record) => record.meta.administrador)) {
      next();
    }
  } else if (
    store.state.auth.usuario &&
    store.state.auth.usuario.rol == 'Cliente'
  ) {
    if (to.matched.some((record) => record.meta.cliente)) {
      next();
    }
  } else {
    next({ name: 'Login' });
  }
});

export default router;
