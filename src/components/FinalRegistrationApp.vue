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
        <vee-form @submit="completeRegister" :validation-schema="completeRegisterSchema" id="completeRegisterForm">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field type="text" class="form-control" name="FirstName" placeholder="نام" />
              <ErrorMessage class="text-danger fs-6" name="FirstName" />
            </div>
          </div>
          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field type="text" class="form-control" name="LastName" placeholder="نام خانوادگی" />
              <ErrorMessage class="text-danger fs-6" name="LastName" />
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field name="Email" type="email" class="form-control" id="Email" placeholder="ایمیل" />
              <ErrorMessage class="text-danger fs-6" name="Email" />
            </div>
          </div>
          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field name="BirthDate" type="date" class="form-control" id="BirthDate" placeholder="تاریخ تولد" />
              <ErrorMessage class="text-danger fs-6" name="BirthDate" />
            </div>
          </div>
          <div class="form-group boxed">
            <div class="input-wrapper text-start">
              <AppSelect :id="'sGender'" :name="'Gender'" :label="'انتخاب جنسیت'" :options="[
                { value: 'f', label: 'زن' },
                { value: 'm', label: 'مرد' },
                { value: 'none', label: 'تمایلی به بازگو کردن ندارم' },
              ]
                " />
            </div>
          </div>

          <!-- <div class=" mt-1 text-start">
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
          </div> -->
        <br>

        <div class="form-button-group">
          <button type="submit" class="btn btn-primary btn-block btn-lg">عضویت در سایت</button>
        </div>

      </vee-form>
    </div>
  </div>
</div></template>

<script>
// import { mapMutations, mapState } from 'vuex';
// import VerifyApp from './VerifyApp.vue';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'FinalRegistrationApp',
  data() {
    return {
      completeRegisterSchema: {
        FirstName: 'required|min:3|max:100',
        LastName: 'required|min:3|max:100',
        Email: 'required|min:3|max:100',
        BirthDate: 'required',
        Gender: 'required',
      },
    };
  },
  methods: {
    async completeRegister() {
      await this.$store.dispatch('WS_UserCompleteRegisteration', tikaUtils.serializeForm('completeRegisterForm'));
    },
  },
};
</script>
