<template>
  <div class="container">
    <div class="section mt-1 mb-5">
      <vee-form @submit="filter" :validation-schema="filterSchema">

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="text" class="form-control" name="type" placeholder="نوع ماژوال" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="type" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="text" class="form-control" name="id" placeholder="شناسه" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="id" />
          </div>
        </div>

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="number" class="d-none"></label>
            <vee-field type="text" class="form-control" name="sort" placeholder="ترتیب" />
            <i class="clear-input">
              <ion-icon name="close-circle"></ion-icon>
            </i>
            <ErrorMessage class="text-danger fs-6" name="sort" />
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

  <ul class="listview image-listview">
    <AppCostume v-for="item in filterResult.Items" :key="item.Id" :item="item"/>
  </ul>
</template>
<script>
import { mapState } from 'vuex';
import AppCostume from './AppCostume.vue';

export default {
  name: 'AppFilter',
  components: {
    AppCostume,
  },
  data() {
    return {
      filterSchema: {
        type: 'required',
        id: 'required',
        sort: 'required',
      },
    };
  },
  computed: {
    ...mapState(['filterResult']),
  },
  methods: {
    async filter(values) {
      await this.$store.dispatch('filter', values);
    },
  },
};
</script>
