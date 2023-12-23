<template>
  <!-- App Capsule -->
  <div id="appCapsule">

    <br><br>
    <div class="login-form">
      <div class="section">
        <h1>ثبت نام نهایی</h1>
        <h4>برای پیوستن به ما فرم را پر کنید</h4>
      </div>
      <div class="section mt-2">
        <vee-form @submit="register" :validation-schema="registerSchema" id="FinalRegisterForm">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field type="text" class="form-control" name="fullname" placeholder="نام کامل..." />
              <ErrorMessage class="text-danger fs-6" name="fullname" />
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field name="email" type="email" class="form-control" id="email1" placeholder="ایمیل" />
              <ErrorMessage class="text-danger fs-6" name="email" />
            </div>
          </div>
          <!-- <div class="form-group boxed">
              <div class="input-wrapper">
                <label for="number" class="d-none"></label>
                <vee-field name="confirm_password" type="password" class="form-control" autocomplete="off"
                  placeholder="ورود مجدد رمز" />
                <i class="clear-input">
                  <ion-icon name="close-circle"></ion-icon>
                </i>
                <ErrorMessage class="text-danger fs-6" name="confirm_password" />
              </div>
            </div> -->
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
              <label class="form-check-label" for="customCheckb1">من <a href="#"
                  data-bs-toggle="modal" data-bs-target="#ModalRules">قوانین و مقررات</a> را قبول دارم</label>
              <br>
              <ErrorMessage class="text-danger fs-6" name="tos" />
            </div>
            <div class="modal fade modalbox" id="ModalRules" data-bs-backdrop="static" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">عنوان مودال</h5>
                    <a href="#" data-bs-dismiss="modal">بستن</a>
                  </div>
                  <div class="modal-body">
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                      و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                      کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                      آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                      ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که
                      تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی
                      دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </p>
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                      و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                      کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                      آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                      ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که
                      تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی
                      دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </p>
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                      و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                      کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                      آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                      ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که
                      تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی
                      دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <br>

        <div class="form-button-group">
          <button type="submit" class="btn btn-primary btn-block btn-lg">عضویت در سایت</button>
        </div>

      </vee-form>
    </div>
  </div>
</div></template>

<script>
export default {
  name: 'FinalRegistrationApp',
};
</script>
