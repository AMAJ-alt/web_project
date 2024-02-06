<template>
  <!-- Header Componets -->
  <AppHeader />

  <!-- Adding br for position fixed -->
  <!-- <AppMargin /> -->

  <!-- router -->
  <RouterView />

  <AppSideBar />

  <AppBottom />
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppSideBar from './components/AppSideBar.vue';
// import AppMargin from './components/AppMargin.vue';
import AppBottom from './components/AppBottom.vue';

export default {
  components: {
    AppHeader,
    // AppMargin,
    AppSideBar,
    AppBottom,
  },

  mounted() {
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);
  },
  beforeUnmount() {
    window.removeEventListener('online', this.handleNetworkChange);
    window.removeEventListener('offline', this.handleNetworkChange);
  },
  methods: {
    handleNetworkChange() {
      const isOnline = navigator.onLine;
      if (isOnline) {
        this.$toast.open({
          message: 'حالا آنلاین هستید!',
          type: 'info',
        });
      } else {
        this.$toast.open({
          message: 'آفلاین هستید!',
          type: 'error',
        });
      }
    },
  },
};
</script>
