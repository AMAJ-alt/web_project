<template>
  <!-- App Capsule -->
  <div id="appCapsule">
    <div id="register_toast" class="toast-box toast-top" :class="register_bg_varient">
      <div class="in">
        <div class="text">
          {{ register_show_message }}
        </div>
      </div>
      <button type="button" class="btn btn-sm close-button text-white">تایید</button>
    </div>

    <br><br>
    <div class="login-form">
      <div class="section">
        <h1>ثبت نام</h1>
        <h4>برای پیوستن به ما فرم را پر کنید</h4>
      </div>
      <div class="section mt-2">
        <vee-form @submit="register" :validation-schema="registerSchema">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field type="text" class="form-control" name="username" placeholder="نام کامل" />
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
              <ErrorMessage class="text-danger fs-6" name="username" />
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field name="email" type="email" class="form-control" id="email1" placeholder="ایمیل" />
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
              <ErrorMessage class="text-danger fs-6" name="email" />
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field name="password" type="password" class="form-control" autocomplete="off" placeholder="رمز" />
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
              <ErrorMessage class="text-danger fs-6" name="password" />
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field name="confirm_password" type="password" class="form-control" autocomplete="off"
                placeholder="ورود مجدد رمز" />
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
              <ErrorMessage class="text-danger fs-6" name="confirm_password" />
            </div>
          </div>
          <div class="form-group boxed">
            <div class="input-wrapper text-start">
              <AppSelect :id="'sgender'" :name="'gender'" :label="'انتخاب جنسیت'" :options="[
                { value: 'female', label: 'زن' },
                { value: 'male', label: 'مرد' },
                { value: 'none', label: 'تمایلی به بازگو کردن ندارم' },
              ]
                " />
            </div>
          </div>

          <div class=" mt-1 text-start">
            <div class="form-check">
              <vee-field value="1" name="tos" type="checkbox" class="form-check-input" id="customCheckb1" />
              <label class="form-check-label" for="customCheckb1">من <a href="#">قوانین و مقررات</a> را قبول دارم</label>
              <br>
              <ErrorMessage class="text-danger fs-6" name="tos" />
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

export default {
  name: 'AppRegister',
  data() {
    return {
      registerSchema: {
        username: 'required|min:6|max:100',
        email: 'required|email',
        password: 'required|min:6|max:100',
        confirm_password: 'required|confirmed:@password',
        tos: 'required',
        gender: 'required',
      },
    };
  },
  methods: {
    ...mapMutations(['toggleAuthTab']),
    async register(values) {
      console.log(values);
    },
  },
};
</script>
