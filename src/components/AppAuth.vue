<template>
  <AppLogin class="hey" v-show="authTabLogin == true"/>
  <AppRegister v-show="authTabLogin == false"/>
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
};
</script>
