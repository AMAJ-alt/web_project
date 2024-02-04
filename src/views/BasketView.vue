<template>
  <div>

    <div class="section mt-2">
      <div class="card cart-item mb-2">
        <div class="card-body">
          <div class="in">
            <img src="assets/img/sample/photo/product1.jpg" alt="product" class="imaged">
            <div class="text">
              <h3 class="title">سیب اوگانیک</h3>
              <p class="detail">1 kg</p>
              <strong class="price">5000 تومان</strong>
            </div>
          </div>
          <div class="cart-item-footer">
            <div class="stepper stepper-sm stepper-secondary">
              <a href="#" class="stepper-button stepper-down">-</a>
              <label for="" class="d-none"></label>
              <input type="text" class="form-control" value="4" disabled />
              <a href="#" class="stepper-button stepper-up">+</a>
            </div>
            <a href="#" class="btn btn-outline-secondary btn-sm">حذف</a>
            <a href="#" class="btn btn-outline-secondary btn-sm">ذخیره برای بعد</a>
          </div>
        </div>
      </div>

      <div class="wide-block pt-2 pb-2">
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#DialogForm">افزودن
          آدرس</button>
      </div>
      <div class="modal fade dialogbox" id="DialogForm" data-bs-backdrop="static" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">لطفا آدرس خود را وارد کنید</h5>
            </div>
            <vee-form @submit="AddAddress" :validation-schema="addAddressSchema" id="AddAddressForm">
              <div class="modal-body text-start mb-2">
                <div class="form-group basic">
                  <div class="input-wrapper">
                    <label class="form-label" for="fld_Address">آدرس *</label>
                    <vee-field type="text" class="form-control" id="fld_Address" name="fld_Address"/>
                    <ErrorMessage class="text-danger fs-6" name="fld_Address" />
                  </div>
                </div>

                <div class="form-group basic">
                  <div class="input-wrapper">
                    <label class="form-label" for="Tel">تلفن</label>
                    <vee-field type="text" class="form-control" id="fld_Tel" autocomplete="off" name="fld_Tel"/>
                    <ErrorMessage class="text-danger fs-6" name="fld_Tel" />
                  </div>
                </div>

                <div class="form-group basic">
                  <div class="input-wrapper">
                    <label class="form-label" for="fld_PostalCode">کد پستی</label>
                    <vee-field type="text" class="form-control" id="fld_PostalCode" autocomplete="off" name="fld_PostalCode"/>
                    <ErrorMessage class="text-danger fs-6" name="fld_PostalCode" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="btn-inline">
                  <button type="button" class="btn btn-text-secondary" data-bs-dismiss="modal">بستن</button>
                  <button type="submit" class="btn btn-text-primary" data-bs-dismiss="modal">ثبت</button>
                </div>
              </div>
            </vee-form>
          </div>
        </div>
      </div>

    </div>

    <div class="section">
      <a href="#" class="btn btn-sm btn-text-secondary btn-block" data-bs-toggle="offcanvas"
        data-bs-target="#actionSheetDiscount">
        <ion-icon name="qr-code-outline"></ion-icon>
        کد تخفیف دارید؟
      </a>
    </div>

    <!-- Discount Action Sheet -->
    <div class="offcanvas offcanvas-bottom action-sheet" tabindex="-1" id="actionSheetDiscount">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">کد تخفیف را وارد کنید</h5>
      </div>
      <div class="offcanvas-body">
        <div class="action-sheet-content">
          <form>
            <div class="form-group basic">
              <div class="input-wrapper">
                <label class="form-label" for="discount1">کد تخفیف</label>
                <input type="text" class="form-control" id="discount1" placeholder="کد تخفیف خود را وارد کنید">
                <i class="clear-input">
                  <ion-icon name="close-circle"></ion-icon>
                </i>
              </div>
            </div>

            <div class="form-group basic">
              <button type="button" class="btn btn-primary btn-block" data-bs-dismiss="offcanvas">اعمال کد تخفیف</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- * Discount Action Sheet -->

    <div class="section mt-2 mb-2">
      <div class="card">
        <ul class="listview flush transparent simple-listview">
          <li>آیتم ها <span class="text-muted">20000 تومان</span></li>
          <li>حمل و نقل <span class="text-muted">3000 تومان</span></li>
          <li>مالیات<span class="text-muted">2000 تومان</span></li>
          <li>جمع<span class="text-primary font-weight-bold">25000 تومان</span></li>
        </ul>
      </div>
    </div>

    <div class="section mb-2">
      <a href="#" class="btn btn-primary btn-block ">اکنون سفارش دهید</a>

    </div>

  </div>
</template>

<script>
// import { mapMutations, mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'BasketView',
  data() {
    return {
      addAddressSchema: {
        fld_Tel: 'mobile:^09[0-9]{9}$',
        fld_Address: 'required|min:3|max:100',
        fld_PostalCode: '',
      },
    };
  },
  methods: {
    async AddAddress() {
      await this.$store.dispatch('WS_AddAddress', tikaUtils.serializeForm('AddAddressForm'));
    },
  },
};
</script>
