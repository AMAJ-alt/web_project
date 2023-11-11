<template>
  <div id="appCapsule" class="pt-0">
    <div id="login_toast" class="toast-box" :class="login_bg_varient">
      <div class="in">
        <div class="text">
          {{ login_show_message }}
        </div>
      </div>
      <button type="button" class="btn btn-sm close-button">تایید</button>
    </div>
    <div class="login-form mt-1">
      <div class="section">
        <img src="../assets/vector4.png" alt="image" class="form-image">
      </div>
      <div class="section mt-1">
        <h1>شروع کنید</h1>
        <h4>برای ورود فیلدهای فرم را پر کنید</h4>
      </div>
      <div class="section mt-1 mb-5">
        <vee-form @submit="login" :validation-schema="loginSchema">
          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field name="number" type="text" class="form-control form-control-user" id="exampleInputEmail"
                aria-describedby="emailHelp" placeholder="ایمیل..." />
              <ErrorMessage class="text-danger fs-6" name="number" />
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="password" class="d-none"></label>
              <vee-field name="password" type="password" class="form-control form-control-user" id="exampleInputPassword"
                placeholder="رمز عبور" />
              <ErrorMessage class="text-danger fs-6" name="password" />
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
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
              <a href="page-register.html">ثبت نام</a>
            </div>
            <div><a href="page-forgot-password.html" class="text-muted">رمز خود را فراموش کردید؟</a></div>
          </div>

          <div class="form-button-group">
            <button :disabled="login_in_submittion" type="submit" class="btn btn-primary btn-block btn-lg">
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

export default {
  name: 'AppLogin',
  data() {
    return {
      loginSchema: {
        number: 'required|min:3|max:100',
        password: 'required|min:3|max:100',
        remember: 'required',
      },
    };
  },
  computed: {
    ...mapState(['login_in_submittion', 'login_bg_varient', 'login_show_message']),
  },
  methods: {
    ...mapMutations(['toggleAuthTab']),
    async login(values) {
      await this.$store.dispatch('login', values);
    },
  },
};
</script>
