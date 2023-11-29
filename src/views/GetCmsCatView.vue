<template>
  <ul class="nav nav-tabs lined" role="tablist">
    <li class="nav-item">
      <a @keypress="TypeValue = 'Articles' " @click.prevent="TypeValue = 'Articles' " class="nav-link fs-6"
      :class="{ 'active': TypeValue === 'Articles' }">
        <ion-icon name="bulb-outline"></ion-icon>
        مطالب
      </a>
    </li>
    <li class="nav-item">
      <a @keypress="TypeValue = 'news' " @click.prevent="TypeValue = 'news' " class="nav-link fs-6"
      :class="{ 'active': TypeValue === 'news' }">
        <ion-icon name="newspaper-outline"></ion-icon>
        اخبار
      </a>
    </li>
  </ul>

  <ul class="listview image-listview">
    <li v-for="CmsCat in AdvCmsCatResult" :key="CmsCat.GUID">
      <a href="#" class="item">
        <img :src="CmsCat.ImageUrl" alt="image" class="image">
        <div class="in">
          <div>
            <!-- <header>نام</header> -->
            {{ CmsCat.Title }}
            <footer>{{ CmsCat.CreateDateStr }}</footer>
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'GetCmsCatList',
  data() {
    return {
      TypeValue: 'Articles',
    };
  },
  computed: {
    ...mapState(['AdvCmsCatResult']),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch('Ws_GetCmsCatList', `[{"ColName":"Type","Value":"${vm.TypeValue}"}]`);

      vm.$store.dispatch('headerTitle', {
        center: 'دسته بندی',
        left: '<ion-icon name="grid-outline"></ion-icon>',
      }).then(() => {
      });
    });
  },
  watch: {
    TypeValue(newVal) {
      this.$store.dispatch('Ws_GetCmsCatList', `[{"ColName":"Type","Value":"${newVal}"}]`);
    },
  },
};
</script>
