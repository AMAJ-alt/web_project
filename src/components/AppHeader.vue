<template>
  <div class="appHeader bg-secondary">
    <div class="left">
      <button @click.prevent="goBack" class="headerButton btn btn-link">
        <ion-icon name="chevron-back-outline" class="text-white"></ion-icon>
      </button>
    </div>
    <div class="pageTitle">{{ centerTopicHeader }}</div>
    <div class="right">
      <router-link :to="{ name: 'auth' }" class="headerButton text-white">
        {{ leftTopicHeader }}
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['leftTopicHeader', 'centerTopicHeader']),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
