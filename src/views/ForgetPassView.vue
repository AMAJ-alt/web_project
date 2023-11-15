<template>
  <div id="appCapsule">
    <div class="login-form">
      <div class="section">
        <h1>بازیابی رمز</h1>
        <h4>برای بازنشانی رمز عبور ایمیل خود را تایپ کنید</h4>
      </div>
      <div class="section mt-2 mb-5">
        <form action="app-pages.html">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="email" class="d-none">type...</label>
              <input type="email" class="form-control" id="name1" placeholder="ایمیل">
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
            </div>
          </div>

          <div class="form-button-group">
            <button type="submit" class="btn btn-primary btn-block btn-lg">بازیابی</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPassView',
};
</script>
