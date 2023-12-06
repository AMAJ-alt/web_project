<template>
  <!-- Header Componets -->
  <AppHeader />

  <!-- Adding br for position fixed -->
  <AppMargin />

  <!-- router -->
  <RouterView />
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppMargin from './components/AppMargin.vue';

export default {
  components: {
    AppHeader,
    AppMargin,
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
