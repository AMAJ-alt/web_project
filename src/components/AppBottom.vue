<template>
  <div class="appBottomMenu" v-show="visableity">
    <a href="#" class="item">
      <div class="col">
        <p class="d-none">asa</p>
        <ion-icon name="file-tray-full-outline"> </ion-icon>
      </div>
    </a>
    <a href="#" class="item active">
      <div class="col">
        <p class="d-none">asa</p>
        <ion-icon name="calendar-outline"> </ion-icon>
      </div>
    </a>
    <a href="#" class="item">
      <div class="col">
        <p class="d-none">asa</p>
        <ion-icon name="archive-outline"> </ion-icon>
      </div>
    </a>
    <a href="#" class="item">
      <div class="col">
        <p class="d-none">asa</p>
        <ion-icon name="document-text-outline"> </ion-icon>
      </div>
    </a>
    <a href="#sidebarPanel" class="item" data-bs-toggle="offcanvas">
      <div class="col">
        <p class="d-none">asa</p>
        <ion-icon name="menu-outline" role="img" class="md hydrated" aria-label="menu outline"> </ion-icon>
      </div>
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppBottom',
  computed: {
    ...mapState(['visableity']),
  },
  mounted() {
    this.$store.dispatch('WS_GetAppMenuList', '[{}]');
  },
  // beforeRouteEnter(to, from, next) {
  //   next(async (vm) => {
  //     // const menuJsonArr = [];
  //     // vm.GetAppMenuListResult.forEach((x) => {
  //     //   let menuJson = {};
  //     //   menuJson = x;
  //     //   menuJsonArr.push(menuJson);
  //     // });
  //   });
  // },
};
</script>
