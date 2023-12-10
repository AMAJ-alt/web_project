<template>
  <div id="appCapsule">
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
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'VerifyView',
  data() {
    return {
      checkSignUpSchema: {
        Code: 'required',
      },
      usename: this.$route.params.key,
    };
  },
  computed: {
    ...mapState(['SignUpInfoResult', 'vis', 'countdown']),
  },
  methods: {
    async checkSignUp(Value) {
      const checkCodeTaskObj = {
        usname: this.$route.params.key,
        code: Value.Code,
      };
      await this.$store.dispatch('WS_SignupCheckCode', tikaUtils.manualSerialize(checkCodeTaskObj));

      this.$router.push({ name: 'finalregister', params: { key: this.usename } });
    },
    async SignupResendCode() {
      const resendCodeTaskObj = {
        usname: this.$route.params.key,
      };
      await this.$store.dispatch('WS_SignupResendCode', tikaUtils.manualSerialize(resendCodeTaskObj));
    },
    timer() {
      const resTime = this.SignUpInfoResult.RemainTime * 1000;
      const self = this;
      // const targetTime = new Date().getTime() + resTime; // زمان هدف به میلی‌ثانیه
      const targetTime = new Date().getTime() + resTime; // زمان هدف به میلی‌ثانیه
      // تنظیم یک تایمر با استفاده از setInterval
      const timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = targetTime - currentTime;

        if (timeDifference <= 0) {
          // زمان به پایان رسیده است
          clearInterval(timerInterval);
          self.countdown = 'زمان به پایان رسید!';
          self.endTimer();
        } else {
          // محاسبه دقیقه و ثانیه باقی‌مانده
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          self.countdown = `زمان باقی‌مانده: ${minutes} دقیقه و ${seconds} ثانیه`;
        }
      }, 1000); // هر ثانیه تابع فراخوانی می‌شود
    },
    endTimer() {
      this.countdown = 'کد را دریافت نکردید؟';
      this.vis = true;
    },
  },
  mounted() {
    this.$store.commit('timer');
  },
};
</script>
