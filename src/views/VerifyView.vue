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
                maxlength="10" />
            </div>
          </div>

          <p class="m-0">{{ countdown }}</p>
          <button v-if="vis" @click.prevent="SignupResendCode" type="button" class="btn btn-link p-0">ارسال دوباره</button>

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

export default {
  name: 'VerifyView',
  data() {
    return {
      checkSignUpSchema: {
        Code: 'required',
      },
      usename: this.$route.params.key,

      vis: true,
      countdown: 'در حال محاسبه...',
    };
  },
  computed: {
    ...mapState(['SignUpInfoResult']),
  },
  methods: {
    async checkSignUp(Value) {
      this.$toast.open({
        message: 'لطفا صبر کنید',
        type: 'info',
      });

      await this.$store.dispatch('WS_SignupCheckCode', `[{"ColName":"usname","Value":"${this.usename}"},{"ColName":"code","Value":"${Value.Code}"}]`);

      this.$toast.open({
        message: 'درحال انتقال به صفحه بعدی',
        type: 'One of success',
      });

      this.$router.push({ name: 'finalregister', params: { key: this.usename } });
    },
    async SignupResendCode() {
      await this.$store.dispatch('WS_SignupResendCode', `[{"ColName":"usname","Value":"${this.usename}"}]`);
    },
    endTimer() {
      this.countdown = 'کد را دریافت نکردید؟';
      this.vis = true;
    },
  },
  mounted() {
    const resTime = this.SignUpInfoResult.RemainTime * 1000;
    const self = this;
    // const targetTime = new Date().getTime() + resTime; // زمان هدف به میلی‌ثانیه
    const targetTime = new Date().getTime() + 10000; // زمان هدف به میلی‌ثانیه
    console.log(resTime);
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
};
</script>
