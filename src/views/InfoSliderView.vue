<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="HLink in HLinkListResult" :key="HLink.GUID">
      <img :src="HLink.ImageUrl" alt="Slide Image">
      <h2>{{ HLink.Title }}</h2>
    </swiper-slide>
    <swiper-pagination />
  </swiper>
</template>
<script>
import { mapState } from 'vuex';
import {
  Swiper,
  SwiperSlide,
  SwiperPagination,
} from 'vue-awesome-swiper';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'InfoSliderView',
  components: {
    Swiper,
    SwiperSlide,
    SwiperPagination,
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
      },

    };
  },
  computed: {
    ...mapState(['HLinkListResult']),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const hLinkTaskObj = {
        Type: 'certificate',
      };
      vm.$store.dispatch('WS_GetHLinkList', tikaUtils.serializeManually(hLinkTaskObj));

      vm.$store.dispatch('headerTitle', {
        center: 'LOGO',
        left: 'رد کردن',
        to: 'forget',
      }).then(() => {
      });
    });
  },
};
</script>
