<template>
  <div class="container">
    <div class="section mt-1 mb-5">
      <vee-form @submit="filter" :initial-values="filterData" :validation-schema="filterSchema">

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field as="select" class="form-control" name="Value">
              <option value="Articles">مقاله ها</option>
              <option value="news">خبر ها</option>
            </vee-field>
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="Value" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="text" class="form-control" name="ColName" placeholder="شناسه" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="ColName" />
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
    <AppCustomeList v-for="item in filterResult" :key="item.Id" :item="item"/>
  </ul>
</template>
<script>
import { mapState } from 'vuex';
import AppCustomeList from './AppCustomeList.vue';

export default {
  name: 'AppFilter',
  components: {
    AppCustomeList,
  },
  data() {
    return {
      filterSchema: {
        Value: 'required',
        ColName: 'required',
      },
      filterData: {
        Value: 'Articles',
      },
    };
  },
  computed: {
    ...mapState(['filterResult']),
  },
  methods: {
    async filter(values) {
      const JValues = JSON.stringify(values);
      await this.$store.dispatch('filter', JValues);
    },
  },
};
</script>
