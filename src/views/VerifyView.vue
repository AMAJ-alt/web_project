<template>
  <div id="appCapsule">

    <div class="login-form">
      <div class="section">
        <h1>الان تایید کن</h1>
        <h4>ما یک کد تأیید بر روی تلفن شما ارسال کردیم</h4>
      </div>
      <div class="section mt-2 mb-5">
        <form action="app-pages.html">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <input type="text" class="form-control verify-input" id="smscode" placeholder="••••••" maxlength="6">
            </div>
          </div>

          <div class="form-button-group">
            <button type="submit" class="btn btn-primary btn-block btn-lg">تایید</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VerifyView',
};
</script>
