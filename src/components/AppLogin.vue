<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div v-if="login_show_alert" :class="login_bg_varient" class="alert m-0" role="alert">
              {{ login_show_message }}
            </div>
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <vee-form class="user" :validation-schema="loginSchema" @submit="login">
                    <div class="form-group">
                      <label for="number" class="d-none"></label>
                      <vee-field name="number" type="text" class="form-control form-control-user" id="exampleInputEmail"
                        aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                      <ErrorMessage class="text-danger fs-6" name="number" />
                    </div>
                    <div class="form-group">
                      <label for="password" class="d-none"></label>
                      <vee-field name="password" type="password" class="form-control form-control-user"
                        id="exampleInputPassword" placeholder="Password" />
                      <ErrorMessage class="text-danger fs-6" name="password" />
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <vee-field type="checkbox" name="remember" value="1" />
                        <label class="px-2" for="remember">Remember
                          Me</label><br>
                        <ErrorMessage class="text-danger fs-6" name="remember" />
                      </div>
                    </div>
                    <button :disabled="login_in_submittion" type="submit" class="btn btn-primary btn-user btn-block">
                      Login
                    </button>
                    <hr>
                    <button class="btn btn-google btn-user btn-block">
                      <i class="fab fa-google fa-fw"></i> Login with Google
                    </button>
                    <a href="index.html" class="btn btn-facebook btn-user btn-block">
                      <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a>
                  </vee-form>
                  <hr>
                  <div class="text-center">
                    <a class="small" href="forgot-password.html">Forgot Password?</a>
                  </div>
                  <div class="text-center">
                    <button @click.prevent="toggleAuthTab" type="button" class="btn btn-link btn-sm">Create an
                      Account!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'AppLogin',
  data() {
    return {
      login_in_submittion: false,
      login_show_alert: false,
      login_bg_varient: 'bg-primary',
      login_show_message: 'please wait! you are being logged in.',
      loginSchema: {
        number: 'required|min:3|max:100',
        password: 'required|min:3|max:100',
        remember: 'required',
      },
    };
  },
  methods: {
    ...mapMutations(['toggleAuthTab']),
    async login(values) {
      this.login_in_submittion = true;
      this.login_show_alert = true;
      this.login_bg_varient = 'bg-primary text-white';
      this.login_show_message = 'please wait! you are being logged in.';
      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.login_in_submittion = false;
        this.login_show_alert = true;
        this.login_bg_varient = 'bg-danger text-white';
        this.login_show_message = 'we failed to log you in.';
      }

      this.login_bg_varient = 'bg-success text-white';
      this.login_show_message = 'success! logging you in.';
    },
  },
};
</script>
