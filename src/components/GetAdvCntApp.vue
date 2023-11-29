<template>
  <div class="container">
    <div class="section mt-1 mb-5">
      <vee-form id="AdvCntSearchForm" @submit="callWS" :validation-schema="filterSchema">

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="Type" class="ms-1 mb-1">نوع</label>
            <AppSelect @input="handleTypeInput" :id="'sType'" :name="'Type'" :label="'انتخاب نوع'" :options="[
              { value: 'Articles', label: 'مقاله' },
              { value: 'news', label: 'خبر' },
            ]
              " />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="Status" class="ms-1 mb-1">وضعیت</label>
            <AppSelect :id="'sStatus'" :name="'Status'" :label="'انتخاب وضعیت'" :options="[
              { value: '0', label: 'پیش نویس' },
              { value: '3', label: 'انتشار یافته' },
              { value: '5', label: 'سطل آشغال' },
            ]
              " />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="Status" class="ms-1 mb-1">مجموعه</label>
            <AppSelect :id="'sCategoryId'" :name="'CategoryId'" :label="'انتخاب مجموعه'" :options="catOp" />
          </div>
        </div>

        <br>
        <div>
          <button :disabled="login_in_submittion" type="submit" class="btn btn-primary btn-block btn-lg">
            جستجو
          </button>
        </div>
      </vee-form>
    </div>
  </div>

  <ul class="listview image-listview media">
    <AppCustomeList v-for="  item   in   AdvCntResult  " :key="item.Id" :item="item" />
  </ul>
</template>
<script>
import { mapState } from 'vuex';
import AppCustomeList from './AppCustomeList.vue';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'GetAdvCntApp',
  components: {
    AppCustomeList,
  },
  data() {
    return {
      catOp: [],
      filterSchema: {
        Type: 'required',
        Status: '',
        CategoryId: '',
      },
    };
  },
  computed: {
    ...mapState(['AdvCntResult', 'AdvCmsCatResult']),
  },
  methods: {
    async handleTypeInput(newValue) {
      await this.$store.dispatch('Ws_GetCmsCatList', `[{"ColName":"Type","Value":"${newValue}"}]`);
      setTimeout(() => {
        const catJsonArr = [];
        this.AdvCmsCatResult.forEach((x) => {
          const catJson = {};
          catJson.value = x.Id;
          catJson.label = x.Title;
          catJsonArr.push(catJson);
        });
        this.catOp = catJsonArr;
      }, (1000));
    },
    async callWS() {
      await this.$store.dispatch('WS_GetAdvCntList', tikaUtils.serializeForm('AdvCntSearchForm'));
    },
  },

};
</script>
