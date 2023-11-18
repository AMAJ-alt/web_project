<template>
  <div class="appHeader bg-secondary">
    <div class="left">
      <button @click.prevent="goBack" class="headerButton btn btn-link">
        <ion-icon name="chevron-back-outline" class="text-white"></ion-icon>
      </button>
    </div>
    <div class="pageTitle">{{ topicHeader }}</div>
    <div class="right">
      <router-link :to="{ name: 'auth' }" class="headerButton text-white">
        ورود/ ثبت نام
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['topicHeader']),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   this.$store.statetopicHeader = 'پروفایل';
  //   next();
  // },
};
</script>
