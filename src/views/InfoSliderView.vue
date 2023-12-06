<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="HLink in HLinkListResult" :key="HLink.GUID">
      <img :src="HLink.ImageUrl" alt="Slide Image">
    </swiper-slide>
    <swiper-pagination />
  </swiper>
  <!-- <div id="appCapsule">
    <div class="carousel-slider splide">
      <div class="splide__track">
        <ul class="splide__list">
          <li v-for="HLink in HLinkListResult" :key="HLink.GUID" class="splide__slide p-2">
            <img :src="HLink.ImageUrl" alt="alt" class="imaged w-100 square mb-4">
            <h2>{{ HLink.Title }}</h2>
          </li>
        </ul>
      </div>
    </div> -->

  <!-- <div class="carousel-button-footer">
      <div class="row">
        <div class="col-6">
          <a href="#" class="btn btn-secondary btn-lg btn-block goBack">بازگشت</a>
        </div>
        <div class="col-6">
          <a href="app-components.html" class="btn btn-primary btn-lg btn-block">شروع کنید</a>
        </div>
      </div>
    </div> -->
  <!-- </div> -->
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
      vm.$store.dispatch('WS_GetHLinkList', tikaUtils.manualSerialize('Type', 'certificate'));

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
