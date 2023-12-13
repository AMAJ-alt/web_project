<template>
  <!-- App Capsule -->
  <div id="appCapsule">
    <div class="login-form">
      <div class="section">
        <h1>ثبت نام</h1>
        <h4>برای پیوستن به ما فرم را پر کنید</h4>
      </div>
      <div class="section mt-2">
        <vee-form @submit="register" :validation-schema="registerSchema" id="AdvRegisterForm">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field type="text" class="form-control" name="usname" placeholder="شماره موبایل..." />
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
              <ErrorMessage class="text-danger fs-6" name="usname" />
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field name="pwd" type="password" class="form-control" autocomplete="off" placeholder="رمز عبور..." />
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
              <ErrorMessage class="text-danger fs-6" name="pwd" />
            </div>
          </div>
          <br>

          <div class="form-button-group">
            <button type="submit" class="btn btn-primary btn-block btn-lg">عضویت در سایت</button>
          </div>

        </vee-form>
        <div class="text-start">
          <button type="button" @click.prevent="toggleAuthTab" class="btn btn-link">ورود به پنل کاربری </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'AppRegister',
  data() {
    return {
      registerSchema: {
        usname: 'mobile:^09[0-9]{9}$',
        pwd: 'required|min:3|max:100',
      },
    };
  },
  methods: {
    ...mapMutations(['toggleAuthTab']),
    async register(value) {
      await this.$store.dispatch('WS_SignupFirstInfo', tikaUtils.serializeForm('AdvRegisterForm'));

      console.log(value.usname);
      if (this.$store.state.SignUpInfoFlag >= 0) {
        this.$router.push({ name: 'verify', params: { key: value.usname } });
      }
    },
  },
};
</script>
