<template>
  <div class="section full mt-2">
    <div class="section-title">سوالات متداول</div>

    <div class="accordion" id="accordionExample1">
      <div class="accordion-item" v-for="sample in AdvCntSmp" :key="sample.Id">
        <h2 class="accordion-header">
          <button v-html="sample.Brief" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#samp${sample.Id}`">
          </button>
        </h2>
        <div :id="`samp${sample.Id}`" class="accordion-collapse collapse" data-bs-parent="#accordionExample1">
          <div class="accordion-body" v-html="sample.Content">
          </div>
        </div>
      </div>
    </div>
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
    }
  },
  computed: {
    ...mapState(['AdvCntSmp']),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch('WS_GetSmpCntList', tikaUtils.serializeSmpCnt(vm.Type, vm.Param_SimpleMode, vm.Param_ContentWithHTML));

      vm.$store.dispatch('headerTitle', {
        center: 'احراز هویت',
        left: 'فراموشی رمزعبور',
        to: 'forget',
      }).then(() => {
      });
    });
  },
}
</script>
