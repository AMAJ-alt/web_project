<template>
  <FinalRegistrationApp v-if="verifySuccess"  />
  <div v-else id="appCapsule">
    <div class="login-form">
      <div class="section">
        <h1>الان تایید کن</h1>
        <h4>ما یک کد تأیید بر روی تلفن شما ارسال کردیم</h4>
      </div>
      <div class="section mt-2 mb-5">
        <vee-form @submit="checkSignUp" :validation-schema="checkSignUpSchema">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field name="Code" type="text" class="form-control verify-input" id="smscode" placeholder="•••••"
                maxlength="5" />
            </div>
          </div>

          <p class="m-0">{{ countdown }}</p>
          <button v-if="vis" @click.prevent="SignupResendCode" type="button" class="btn btn-link p-0">ارسال
            دوباره</button>

          <div class="form-button-group">
            <button type="submit" class="btn btn-primary btn-block btn-lg">تایید</button>
          </div>

        </vee-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import FinalRegistrationApp from './FinalRegistrationApp.vue';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'VerifyApp',
  data() {
    return {
      checkSignUpSchema: {
        Code: 'required',
      },

      verifySuccess: false,
    };
  },
  components: {
    FinalRegistrationApp,
  },
  props: ['usname', 'SignUpSuccess', 'pwd'],
  computed: {
    ...mapState(['SignupCheckCodeFlag', 'vis', 'countdown']),
  },
  methods: {
    async checkSignUp(Value) {
      const checkCodeTaskObj = {
        usname: this.usname,
        code: Value.Code,
      };

      await this.$store.dispatch('WS_SignupCheckCode', tikaUtils.serializeObject(checkCodeTaskObj));

      if (this.SignupCheckCodeFlag > 0 && navigator.onLine) {
        this.verifySuccess = true;
      }
    },
    async SignupResendCode() {
      const resendCodeTaskObj = {
        usname: this.usname,
      };
      await this.$store.dispatch('WS_SignupResendCode', tikaUtils.serializeObject(resendCodeTaskObj));
    },
  },
  watch: {
    SignUpSuccess(newVal) {
      if (newVal) {
        this.$store.commit('timer');
      }
    },
  },
};
</script>
