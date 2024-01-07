<template>
  <AppLogin v-if="authTabLogin === true"/>
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
      // vm.$store.commit('toggleAuthTab');

      // const { authTabQuery } = vm.$route.query;
      // // eslint-disable-next-line
      // vm.authTabLogin = authTabQuery;

      vm.$store.dispatch('headerTitle', {
        center: 'احراز هویت',
        left: 'فراموشی رمزعبور',
        to: 'forget',
      }).then(() => {
      });
    });
  },
  // watch: {
  //   savedIdUrl(newVal) {
  //     if (newVal === this.$route.query.TicketId) {
  //       this.selectedTicketId = newVal;
  //       return;
  //     }

  //     this.$router.push({
  //       query: {
  //         TicketId: newVal,
  //       },
  //     });
  //   },
  // },
  // beforeRouteUpdate(to, from, next) {
  //   if ((to.query && to.query.authTabQuery)) {
  //     const { authTabQuery } = this.$route.query;
  //     console.log(authTabQuery);
  //     this.$store.commit('toggleAuthTab', authTabQuery);
  //   }
  //   next();
  // },
  watch: {
    authTabLogin(newVal) {
      if (newVal === this.$route.query.authTabQuery) {
        return;
      }
      this.$router.push({
        query: {
          authTabQuery: newVal,
        },
      });
    },
  },
};
</script>
