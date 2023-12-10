<template>
  <div class="section full mt-2">
    <div class="section-title">سوالات متداول</div>

    <div class="accordion" id="accordionExample1">
      <div class="accordion-item" v-for="sample in AdvCntSmp" :key="sample.Id">
        <h2 class="accordion-header">
          <button v-html="sample.Brief" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="`#samp${sample.Id}`">
          </button>
        </h2>
        <div :id="`samp${sample.Id}`" class="accordion-collapse collapse" data-bs-parent="#accordionExample1">
          <div class="accordion-body" v-html="sample.Content">
          </div>
        </div>
      </div>
    </div><br><br><br><br><br>

    <ul class="listview image-listview">
      <li v-for="HLink in HLinkListResult" :key="HLink.GUID">
        <a href="#" class="d-flex justify-content-between">
          <div class="col-auto">
            <img :src="HLink.ImageUrl" alt="Your Image" class="custom-img">
          </div>
          <div class="col-auto">
            <button class="btn btn-primary custom-button">{{ HLink.Title }}</button>
          </div>
        </a>
      </li>
    </ul>
    <!-- <div class="section full  mb-2">
    <div class="accordion" id="contact-acor">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button @click.prevent="contactsmp" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#accordionContact">
            چگونه می توانم با شما تماس بگیرم؟
          </button>
        </h2>
        <div id="accordionContact" class="accordion-collapse collapse" data-bs-parent="#contact-acor">
          <div class="accordion-body">
            {{ AdvCntSmp.Content }}
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'FAQView',
  data() {
    return {
      Type: 'FAQ',
      Param_SimpleMode: 'false',
      Param_ContentWithHTML: 'true',
    };
  },
  computed: {
    ...mapState(['AdvCntSmp', 'HLinkListResult']),
  },
  methods: {
    contactsmp() {
      // this.Type = 'ContactUsText';
      // this.$store.dispatch('WS_GetSmpCntList', tikaUtils.serializeSmpCnt(this.Type, this.Param_SimpleMode, this.Param_ContentWithHTML));
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (navigator.onLine) {
        const smpTaskObj = {
          Type: 'FAQ',
          Param_SimpleMode: 'false',
          Param_ContentWithHTML: 'true',
        };
        vm.$store.dispatch('WS_GetSmpCntList', tikaUtils.manualSerialize(smpTaskObj));

        const hLinkTaskObj = {
          Type: 'certificate',
        };
        vm.$store.dispatch('WS_GetHLinkList', tikaUtils.manualSerialize(hLinkTaskObj));
      } else {
        const data = JSON.parse(localStorage.getItem('smp'));
        vm.$store.dispatch('changeValue', {
          data,
          property: 'AdvCntSmp',
        });
      }

      vm.$store.dispatch('headerTitle', {
        center: 'احراز هویت',
        left: 'فراموشی رمزعبور',
        to: 'forget',
      }).then(() => {
      });
    });
  },
};
</script>

<style>
.custom-img {
  width: 55px;
}

.custom-button {
  width: 170px;
}
</style>
