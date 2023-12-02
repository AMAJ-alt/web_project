<template>
  <GetAdvCntApp />
</template>

<script>
import GetAdvCntApp from '@/components/GetAdvCntApp.vue';

export default {
  name: 'GetAdvCntView',
  components: {
    GetAdvCntApp,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch('headerTitle', {
        center: 'مطالب',
        left: '<ion-icon name="file-tray-stacked-outline"></ion-icon>',
      }).then(() => {
      });
    });
  },
};
</script>
