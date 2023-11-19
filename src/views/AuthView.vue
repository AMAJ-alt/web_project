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
  computed: {
    ...mapState(['authTabLogin']),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch('headerTitle', {
        center: 'احراز هویت',
        left: 'فراموشی رمزعبور',
      }).then(() => {
      });
    });
  },
};
</script>
