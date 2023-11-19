<template>
  <!-- Header Componets -->
  <AppHeader />

  <!-- Adding br for position fixed -->
  <AppMargin />

  <!-- Filter component -->
  <!-- <AppFilter /> -->

  <!-- router -->
  <RouterView />
</template>

<script>
import AppHeader from './components/AppHeader.vue';
// import AppFilter from './components/AppFilter.vue';
import AppMargin from './components/AppMargin.vue';

export default {
  components: {
    AppHeader,
    // AppFilter,
    AppMargin,
  },
};
</script>
