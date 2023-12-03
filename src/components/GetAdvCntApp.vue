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
            <label for="Status" class="ms-1 mb-1">دسته</label>
            <AppSelect :id="'sCategoryId'" :name="'CategoryId'" :label="'انتخاب دسته'" :options="catOp" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="Status" class="ms-1 mb-1">ترتیب</label>
            <AppSelect :id="'sSort'" :name="'Sort'" :label="'انتخاب ترتیب'" :options="[
              { value: 'CategoryId', label: 'براساس دسته' },
              { value: 'Status', label: 'براساس وضعیت' },
              { value: 'VisitCount', label: 'براساس بازدید' },
            ]" />
          </div>
        </div>
        <vee-field name="CurrPage" type="text" v-model="pageVal"/>

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
  <br>

  <nav>
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">قبل</a></li>

      <li
      v-for="(page, index) in pagination"
      :key="page" class="page-item">
      <option class="page-link" @click="selectOption(index+1)"
        :value="index+1">
        {{ index+1 }}
      </option>
    </li>

      <li class="page-item"><a class="page-link" href="#">بعد</a></li>
    </ul>
  </nav>
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

      pageVal: 1,
      pagination: 0,

      filterSchema: {
        Type: 'required',
        Status: '',
        CategoryId: '',
      },
    };
  },
  computed: {
    ...mapState(['AdvCntResult', 'AdvCmsCatResult', 'AdvCntMeta']),
  },
  methods: {
    async selectOption(val) {
      this.pageVal = val;
      console.log(this.pageVal);
      await this.callWS();
    },
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
      }, (2000));
    },
    async callWS() {
      await this.$store.dispatch('WS_GetAdvCntList', tikaUtils.serializeForm('AdvCntSearchForm'));
      this.pagination = Math.ceil(this.AdvCntMeta.total / this.AdvCntMeta.perpage);
    },
  },

};
</script>
