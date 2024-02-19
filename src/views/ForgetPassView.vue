<template>
  <div id="appCapsule">
    <div class="login-form">
      <div class="section">
        <h1>بازیابی رمز</h1>
        <h4>برای بازنشانی شماره تلفن خود را تایپ کنید</h4>
      </div>
      <div class="section mt-2 mb-5">
        <vee-form @submit="UserForgetPassword" :validation-schema="forgetPassSchema" id="ForgetPasswordForm">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="mobile" class="d-none">type...</label>
              <vee-field type="text" name="mobile" class="form-control" id="name1" placeholder="شماره تلفن" />
              <ErrorMessage class="text-danger fs-6" name="mobile" />
            </div>
          </div>

          <div class="form-button-group">
            <button type="submit" class="btn btn-primary btn-block btn-lg">بازیابی</button>
          </div>

        </vee-form>
      </div>
    </div>
  </div>
</template>

<script>
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'ForgetPassView',
  data() {
    return {
      forgetPassSchema: {
        usname: 'mobile:^09[0-9]{9}$',
      },
    };
  },
  methods: {
    async UserForgetPassword() {
      await this.$store.dispatch('WS_UserForgetPassword', tikaUtils.serializeForm('ForgetPasswordForm'));
    },
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      await vm.$store.dispatch('headerTitle', {
        vis: false,
        right: 'goBack',
        // left: 'فراموشی رمزعبور',
        // to: 'forget',
      }).then(() => {
      });
      await vm.$store.dispatch('bottomMenu', {
        vis: false,
      }).then(() => {
      });
    });
  },
};
</script>
