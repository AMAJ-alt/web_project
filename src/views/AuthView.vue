<template>
  <AppLogin v-if="authTabLogin == true"/>
  <AppRegister v-else/>
</template>

<script>
import AppLogin from '@/components/AppLogin.vue';
import AppRegister from '@/components/AppRegister.vue';
import { mapState } from 'vuex';

export default {
  name: 'AppAuth',
  components: {
    AppLogin,
    AppRegister,
  },
  data() {
    return {
      authTabQuery: null,
    };
  },
  computed: {
    ...mapState(['authTabLogin']),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit('toggleAuthTab');

      vm.$store.dispatch('headerTitle', {
        center: 'احراز هویت',
        left: 'فراموشی رمزعبور',
        to: 'forget',
      }).then(() => {
      });
    });
  },
  // watch: {
  //   authTabNewVal(newVal) {
  //     if (newVal === this.$route.query.loginTab) {
  //       console.log('sdf');
  //       return;
  //     }
  //     console.log('sdfdsdssad');
  //     this.$router.push({
  //       query: {
  //         loginTab: newVal,
  //       },
  //     });
  //   },
  // },
};
</script>
