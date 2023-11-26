<template>
  <div class="container">
    <div class="section mt-1 mb-5">
      <vee-form id="AdvCntSearchForm" @submit="callWS" :initial-values="filterData" :validation-schema="filterSchema">

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="Type" class="ms-1 mb-1">نوع</label>
            <AppSelect :id="'sType'" :name="'Type'" :label="'انتخاب نوع'" :options="
              [
                { value: 'Articles', label: 'مقاله' },
                { value: 'news', label: 'خبر' },
              ]
            " />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="Status" class="ms-1 mb-1">وضعیت</label>
            <AppSelect :id="'sStatus'" :name="'Status'" :label="'انتخاب وضعیت'" :options="
              [
                { value: '0', label: 'پیش نویس' },
                { value: '3', label: 'انتشار یافته' },
                { value: '5', label: 'سطل آشغال' },
              ]
            " />
          </div>
        </div>

        <br>
        <div>
          <button :disabled=" login_in_submittion " type="submit" class="btn btn-primary btn-block btn-lg">
            جستجو
          </button>
        </div>
      </vee-form>
    </div>
  </div>

  <ul class="listview image-listview media">
    <AppCustomeList v-for="  item   in   AdvCntResult  " :key=" item.Id " :item=" item " />
  </ul>
</template>
<script>
import { mapState } from 'vuex';
import AppCustomeList from './AppCustomeList.vue';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'AppGetAdvCntList',
  components: {
    AppCustomeList,
  },
  data() {
    return {
      filterSchema: {
        Type: 'required',
        Status: '',
      },
    };
  },
  computed: {
    ...mapState(['AdvCntResult']),
  },
  methods: {
    async callWS(values) {
      console.log(values);
      await this.$store.dispatch('WS_GetAdvCntList', tikaUtils.serializeForm('AdvCntSearchForm'));
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch('Ws_GetCmsCatList', );
    });
  },
};
</script>
