<template>
  <div id="appCapsule">
    <div class="login-form mt-1 mt-5">
      <div class="section">
        <img src="../assets/vector4.png" alt="image" class="form-image">
      </div>
      <div class="section mt-1">
        <h1>شروع کنید</h1>
        <h4>برای ورود فیلدهای فرم را پر کنید</h4>
      </div>
      <div class="section mt-1 mb-5">
        <vee-form @submit="login" :validation-schema="loginSchema" id="AdvLoginForm">
          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="usname" class="d-none"></label>
              <vee-field name="usname" type="text" class="form-control form-control-user" placeholder="ایمیل..." />
              <ErrorMessage class="text-danger fs-6" name="usname" />
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="pwd" class="d-none"></label>
              <vee-field name="pwd" type="password" class="form-control form-control-user" placeholder="رمز عبور" />
              <ErrorMessage class="text-danger fs-6" name="pwd" />
            </div>
          </div>
          <div class="form-group boxed">
            <div class="input-wrapper">
              <vee-field type="checkbox" name="remember" value="1" />
              <label class="px-2" for="remember">مرا به یاد داشته باش</label><br>
              <ErrorMessage class="text-danger fs-6" name="remember" />
            </div>
          </div>

          <div class="form-links mt-2">
            <div>
              <button type="button" @click.prevent="toggleAuthTab" class="btn btn-link">ثبت نام در سایت</button>
            </div>
            <div><a href="page-forgot-password.html" class="text-muted">رمز خود را فراموش کردید؟</a></div>
          </div>

          <div class="form-button-group">
            <button type="submit" class="btn btn-primary btn-block btn-lg">
              ورود
            </button>
          </div>
        </vee-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'AppLogin',
  data() {
    return {
      loginSchema: {
        usname: 'required|min:3|max:100',
        pwd: '',
      },
    };
  },
  computed: {
    ...mapState(['task']),
  },
  methods: {
    ...mapMutations(['toggleAuthTab']),
    async login() {
      await this.$store.dispatch('WS_Login', tikaUtils.serializeForm('AdvLoginForm'));
    },
  },
};
</script>
