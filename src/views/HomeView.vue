<template>
  <div id="appCapsule">
    <form id="ProdSetting" class="listview flush transparent simple-listview">
      <li class="details-filter-row">
        <label>وضعیت: </label>
        <a class="size-guide">موجود</a>
      </li>
      <li class="details-filter-row">
        <label>پوست :</label>
        <div class="parent-radio">
          <label>
            <input type="radio" onclick="refreshPrice()" id="SetRadio_36965_36968" name="SetRadio_36965" value="36968">با
            پوست</label>
          <label>
            <input type="radio" onclick="refreshPrice()" id="SetRadio_36965_36969" name="SetRadio_36965"
              value="36969">بدون
            پوست</label>
        </div>
      </li>
      <li class="details-filter-row">
        <label>ضایعات:</label>

        <div class="select-custom">
          <select onchange="refreshPrice()" name="SetSelect_36966" class="form-control">
            <option value="36970">ضایعات سفارش خود را میخواهم</option>
          </select>
        </div>
      </li>
      <li class="details-filter-row">
        <label>سایز مرغ:</label>

        <div class="select-custom">
          <select onchange="refreshPrice()" name="SetSelect_37014" class="form-control">
            <option value="37017">سایز ( مجلسی)</option>
          </select>
        </div>
      </li>
      <li class="details-filter-row">
        <label>نحوه قطعه کاری:</label>

        <div class="select-custom">
          <select onchange="refreshPrice()" name="SetSelect_36967" class="form-control">
            <option value="36976">آبگوشتی تکه شود</option>
            <option value="36986">تکه نشود</option>
            <option value="36991">چلوگوشتی</option>
          </select>
        </div>
      </li>
      <li class="details-filter-row">
        <label>وزن:</label>

        <div class="select-custom">
          <select onchange="refreshPrice()" name="SetSelect_36921" class="form-control">
            <option value="36999">1.6 کیلوگرم</option>
          </select>
        </div>
      </li>
      <li class="product-price text-primary"><span id="spLastPrice">4,520,000</span> ریال
      </li>
      <li class="details-filter-row">
        <label>تعداد: </label>
        <div class="product-details-quantity">
          <input type="number" id="OrderCount" name="OrderCount" data_id="sel_32490" class="form-control" value="1"
            min="1" max="100" required="">
        </div>
      </li>
      <li class="product-details-action justify-content-between mb-0">
        <span>قابل پرداخت: <b id="spTotalToPay" class="text-primary">4,520,000</b> ریال</span>
        <div>
          <button type="button" id="btnAddToBasket" onclick="addToBasket(32490)" class="btn btn-primary me-1 mb-1">
            <span>افزودن به سبد</span>
          </button>
        </div>
      </li><input type="hidden" id="prodStock" name="prodStock" value="100"><input type="hidden" id="ProdId" name="ProdId"
        value="32490">
    </form>
    <div class="login-form pe-2 ps-2">
      <div class="section mt-3 mb-5">
        <form action="app-pages.html">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="password" class="d-none">type...</label>
              <input type="password" class="form-control" id="password1" placeholder="رمز" autocomplete="off">
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
            </div>
          </div>

          <br>
          <router-link :to="{ name: 'GetAdvCnt' }">GetAdvCnt</router-link><br>
          <router-link :to="{ name: 'catagory' }">catagory</router-link><br>
          <router-link :to="{ name: 'auth' }">auth</router-link><br>
          <router-link :to="{ name: 'FAQ' }">FAQ</router-link><br>
          <router-link :to="{ name: 'hchat' }">hchat</router-link><br>
          <router-link :to="{ name: 'info-slide' }">info-slide</router-link><br>
          <router-link :to="{ name: 'product-list' }">product-list</router-link><br>
          <router-link :to="{ name: 'Basket' }">Basket</router-link><br>
          <router-link :to="{ name: 'alltickets' }">alltickets</router-link><br>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  // computed: {
  //   ...mapState(['GetAppMenuListResult']),
  // },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      // await vm.$store.dispatch('WS_GetAppMenuList', '[{}]');

      // const menuJsonArr = [];
      // vm.GetAppMenuListResult.forEach((x) => {
      //   let menuJson = {};
      //   menuJson = x;
      //   menuJsonArr.push(menuJson);
      // });

      vm.$store.dispatch('headerTitle', {
        center: 'خانه',
        left: ' ثبت نام / ورود',
        to: 'auth',
      }).then(() => {
      });
      await vm.$store.dispatch('bottomMenu', {
        vis: true,
      }).then(() => {
      });
    });
  },
};
</script>

<style>
.details-filter-row>label {
  width: 14rem;
}
.parent-radio>label {
    width: auto;
    margin-left: 3rem;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.product-price {
    display: flex;
    align-items: center;
    direction: rtl;
    flex-flow: wrap;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.25;
    color: rgb(65, 65, 220);
    margin-bottom: 1.3rem;
}
</style>
