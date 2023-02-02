<template>
  <v-app>
    <v-main>
      <router-view class="" />
      <Alerts />
    </v-main>
  </v-app>
</template>

<script>
import Alerts from './components/Alerts.vue';

export default {
  name: 'App',
  components: {
    Alerts,
  },
  mounted() {
    this.$store.dispatch('loginCheck');
  },
  /* beforeMount() {
    window.addEventListener('load', this.onLoad);
    window.addEventListener('beforeunload', this.onUnload);
  },
  beforeDestroy() {
    window.removeEventListener('load', this.onLoad);
    window.removeEventListener('beforeunload', this.onUnload);
  }, */
  /* methods: {
    onLoad() {
      window.localStorage.clear();
    },
    onUnload() {
      window.localStorage.clear();
    },
  }, */
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
