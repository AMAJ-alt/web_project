<template>
  <div id="appCapsule">
    <div class="section mt-2" v-show="GetBasketListResult == !null">
      <h4 class="text-danger fs-6">داده ای وجود ندارد</h4>
    </div>
    <div class="section mt-2">
      <div v-for="basketItem in GetBasketListResult.OrderItems" :key="basketItem.Id" class="card cart-item mb-2">
        <div class="card-body">
          <div class="in">
            <img :src="basketItem.ExtraFields.ProdImage" alt="product" class="imaged">
            <div class="text">
              <h3 class="title">{{ basketItem.ExtraFields.ProdTitle }}</h3>
              <p class="detail">1 kg</p>
              <strong class="price">{{ basketItem.ItemCost }} ریال</strong>
            </div>
          </div>
          <div class="cart-item-footer">
            <div class="stepper stepper-sm stepper-secondary"
              @change="refreshCountItem($event.target.value, basketItem.GUID)"
              v-html="basketItem.ExtraFields.CountOptions">
            </div>
            <a href="#" class="btn btn-outline-secondary btn-sm" @click.prevent="deleteItem(basketItem.GUID)">حذف</a>
            <a href="#" class="btn btn-outline-secondary btn-sm">ذخیره برای بعد</a>
          </div>
        </div>
      </div>

      <div class="section-title">انتخاب آدرس *</div>
      <div class="wide-block p-0">
        <div class="input-list">
          <div class="form-check" v-for="addressItem in GetAddressListResult" :key="addressItem.GUID">
            <input class="form-check-input" type="radio" :value="addressItem.GUID" name="radioList" :id="addressItem.GUID"
              v-model="selectedAddressVal">
            <label class="form-check-label" :for="addressItem.GUID">{{ addressItem.ExtraFields.Address }}</label>
          </div>
        </div>
        <div class="wide-block pt-2 pb-2">
          <button type="button" class="btn bg-primary" data-bs-toggle="modal" data-bs-target="#DialogForm">افزودن
            آدرس</button>
        </div>
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
                    <vee-field type="text" class="form-control" id="fld_Address" name="fld_Address" />
                    <ErrorMessage class="text-danger fs-6" name="fld_Address" />
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="form-group basic">
                      <div class="input-wrapper">
                        <label class="form-label" for="Tel">تلفن</label>
                        <vee-field type="text" class="form-control" id="fld_Tel" autocomplete="off" name="fld_Tel" />
                        <ErrorMessage class="text-danger fs-6" name="fld_Tel" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group basic">
                      <div class="input-wrapper">
                        <label class="form-label" for="fld_PostalCode">کد پستی</label>
                        <vee-field type="text" class="form-control" id="fld_PostalCode" autocomplete="off"
                          name="fld_PostalCode" />
                        <ErrorMessage class="text-danger fs-6" name="fld_PostalCode" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="form-group basic">
                      <div class="input-wrapper not-empty">
                        <label class="form-label" for="fld_ProvinceId">استان</label>
                        <vee-field v-model="getProvVal" @change="handleInput" as="select" class="form-control form-select"
                          name="fld_ProvinceId" id="fld_ProvinceId">
                          <option v-for="provItem in GetProvincesResult" :key="provItem.Id" :value="provItem.Id">{{
                            provItem.Title }}</option>
                        </vee-field>
                        <ErrorMessage class="text-danger fs-6" name="fld_ProvinceId" />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group basic">
                      <div class="input-wrapper not-empty">
                        <label class="form-label" for="fld_CityId">شهر</label>
                        <vee-field as="select" :disabled="!getProvVal" class="form-control form-select" name="fld_CityId"
                          id="fld_CityId">
                          <option v-for="provCityItem in GetProvinceCitiesResult" :key="provCityItem.Id"
                            :value="provCityItem.Id">{{
                              provCityItem.Title }}</option>
                        </vee-field>
                        <ErrorMessage class="text-danger fs-6" name="fld_CityId" />
                      </div>
                    </div>
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

    <div class="form-group basic">
      <div class="input-wrapper p-4">
        <label class="form-label" for="TxtComment">توضیحات *</label>
        <vee-field type="text" class="form-control" id="TxtComment" name="TxtComment" v-model="textCommentVal" />
        <ErrorMessage class="text-danger fs-6" name="TxtComment" />
      </div>
    </div>

    <div class="section mt-2 mb-2">
      <div class="card">
        <ul class="listview flush transparent simple-listview">
          <li>آیتم ها <span class="text-muted">{{ Order.TotalAmountOfItems }} ریال</span></li>
          <li>حمل و نقل <span class="text-muted">3000 تومان</span></li>
          <li>مالیات<span class="text-muted">2000 تومان</span></li>
          <li>جمع<span class="text-primary font-weight-bold">{{ Order.TotalToPay }} ریال</span></li>
        </ul>
      </div>
    </div>

    <div class="section mb-2">
      <a href="#" class="btn btn-primary btn-block " @click.prevent="SubmitBasket">اکنون سفارش دهید</a>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'BasketView',
  data() {
    return {
      addAddressSchema: {
        fld_Tel: 'mobile:^09[0-9]{9}$',
        fld_Address: 'required|min:3|max:100',
        fld_PostalCode: '',
        fld_ProvinceId: '',
        fld_CityId: '',
      },
      getProvVal: '',

      Order: '',

      selectedAddressVal: '',
      textCommentVal: '',
    };
  },
  computed: {
    ...mapState(['GetProvincesResult',
      'GetProvinceCitiesResult',
      'GetBasketListResult',
      'GetAddressListResult',
      'GetBasketListMeta']),
  },
  methods: {
    async SubmitBasket() {
      const submitBasketTaskObj = {
        UserAddress: this.selectedAddressVal,
        PayType: 'onsite',
        PostType: '37030',
        TxtComment: this.textCommentVal,
      };

      await this.$store.dispatch('WS_SubmitBasket', tikaUtils.serializeObject(submitBasketTaskObj));

      await this.$store.dispatch('WS_GetBasketList', '[{}]');
      this.Order = this.GetBasketListResult.Order;
    },
    async refreshCountItem(itemCount, itemGuid) {
      const changeItemCountTaskObj = {
        Guid: itemGuid,
        OrderCount: itemCount,
      };

      await this.$store.dispatch('WS_ChangeBasketItemCount', tikaUtils.serializeObject(changeItemCountTaskObj));

      await this.$store.dispatch('WS_GetBasketList', '[{}]');

      this.Order = this.GetBasketListResult.Order;
    },
    async deleteItem(itemGuid) {
      const deleteItemTaskObj = {
        Guid: itemGuid,
      };

      await this.$store.dispatch('WS_DeleteFromBasket', tikaUtils.serializeObject(deleteItemTaskObj));
      console.log('sdas');
      await this.$store.dispatch('WS_GetBasketList', '[{}]');

      this.Order = this.GetBasketListResult.Order;
    },
    async AddAddress() {
      await this.$store.dispatch('WS_AddAddress', tikaUtils.serializeForm('AddAddressForm'));

      await this.$store.dispatch('WS_GetAddressList', '[{}]');
    },
    async handleInput() {
      const provCityTaskObj = {
        ProvinceId: this.getProvVal,
      };

      await this.$store.dispatch('WS_GetProvinceCities', tikaUtils.serializeObject(provCityTaskObj));
    },
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      // fetch basket info
      await vm.$store.dispatch('WS_GetBasketList', '[{}]');

      vm.Order = vm.GetBasketListResult.Order;
      // fetch basket info end

      // fetch address info
      await vm.$store.dispatch('WS_GetAddressList', '[{}]');
      // fetch address info end

      // fetch Provinces
      await vm.$store.dispatch('WS_GetProvinces', '');
      // fetch Provinces end

      vm.$store.dispatch('headerTitle', {
        vis: true,
        center: `سبد خرید(${vm.GetBasketListMeta.total})`,
        left: '<ion-icon name="trash-outline" role="img" class="md hydrated" aria-label="trash outline"></ion-icon>',
        to: '',
        right: 'goBack',
      }).then(() => {
      });
    });
  },
};
</script>
