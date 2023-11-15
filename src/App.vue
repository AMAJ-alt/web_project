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
};
</script>
