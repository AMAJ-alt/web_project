<template>
  <div class="container">
    <div class="section mt-1 mb-5">
      <vee-form id="AdvCntSearchForm" @submit="callWS" :initial-values="filterData" :validation-schema="filterSchema">

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field as="select" class="form-control" name="Type">
              <option value="Articles">مقاله ها</option>
              <option value="news">خبر ها</option>
            </vee-field>
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="Type" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="hidden" class="form-control" name="Status" placeholder="وضعیت" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="Status" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="hidden" class="form-control" name="Keyword" placeholder="کلمات کلیدی" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="Keyword" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="hidden" class="form-control" name="CategoryId" placeholder="دسته بندی" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="CategoryId" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="hidden" class="form-control" name="SubCategoryId" placeholder="زیرمجموعه" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="SubCategoryId" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="hidden" class="form-control" name="IsImportant" placeholder="ضروری" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="IsImportant" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="hidden" class="form-control" name="Sort" placeholder="ترتیب" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="Sort" />
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
    <AppCustomeList v-for="item in AdvCntResult" :key="item.Id" :item="item" />
  </ul>
</template>
<script>
import { mapState } from 'vuex';
import AppCustomeList from './AppCustomeList.vue';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'AppFilter',
  components: {
    AppCustomeList,
  },
  data() {
    return {
      filterSchema: {
        Type: 'required',
        Id: 'min:4',
      },
      filterData: {
        Type: 'Articles',
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
};
</script>
