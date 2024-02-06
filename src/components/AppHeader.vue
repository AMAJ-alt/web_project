<template>
  <div class="appHeader bg-primary scrolled is-active" :class="{ 'is-active': scroll > 20 }">
    <div class="left">
      <button v-if="rightTopicHeader == 'goBack'" @click.prevent="goBack" class="headerButton btn btn-link">
        <ion-icon name="chevron-back-outline" class="text-white"></ion-icon>
      </button>

      <button v-else class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <ion-icon name="menu-outline" class="text-white navbar-toggler-icon"></ion-icon>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-for="right in rightTopicHeader" :key="right.GUID" class="nav-item">
            <a class="nav-link text-white" href="#">{{ right.Title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="pageTitle">{{ centerTopicHeader }}</div>
    <div class="right">
      <router-link :to="{ name: LinkTopicHeader }" class="headerButton text-white" v-html="leftTopicHeader">
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'AppHeader',
  data() {
    return {
      scroll: window.scrollY,
    };
  },
  computed: {
    ...mapState(['leftTopicHeader', 'centerTopicHeader', 'LinkTopicHeader', 'rightTopicHeader']),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* #navbarNav {
  position: relative;
  top: 293px;
  right: -75px;
  background-color: #6C7C94;
}

.navbar-nav li {
  width: 300px;
} */
</style>
