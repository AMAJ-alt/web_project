<template>
  <div id="appCapsule" class="pb-2">

    <div class="section full mt-3">
      <div class="invoice">
        <div class="invoiceBackgroundLogo">
          <img src="assets/img/logo.png" alt="background-logo">
        </div>
        <div class="invoice-page-header">
          <div class="invoice-logo">
            <img src="assets/img/logo.png" alt="logo">
          </div>
          <div class="invoice-id">#{{ orderInfo.Id }}</div>
        </div>
        <div class="invoice-person mt-4">
          <div class="invoice-to">
            <h4>جان دوو</h4>
            <p>johndoe@domain.com</p>
            <p>تهران<br> خیابان ولی عصر</p>
          </div>
          <div class="invoice-from">
            <h4>شرکت موبایل کیت.</h4>
            <p>mobilekit@domain.com</p>
            <p>تهران<br>خیابان شریعتی</p>
          </div>
        </div>
        <div class="invoice-detail mt-4">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <td>تصویر</td>
                  <td>توضیحات</td>
                  <td>فی</td>
                  <td>تعداد</td>
                  <td>جمع</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="orderItem in orderInfo.ExtraFields" :key="orderItem.ProdId">
                  <td>{{ orderItem.ProdImage }}</td>
                  <td>{{ orderItem.ProdTitle }}</td>
                  <td>{{ orderItem.ProdTitle }}</td>
                  <td>{{ orderItem.ProdTitle }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="invoice-signature mt-4">
          <div class="signature-block">
            امضا
          </div>
        </div>

        <div class="invoice-total mt-4">
          <ul class="listview transparent simple-listview">
            <li>جمع جز <span class="hightext">{{ orderInfo.ItemCost }} ریال</span></li>
            <!-- <li>مالیات (10%)<span class="hightext">{{ orderInfo.ItemCost }} ریال</span></li> -->
            <li>جمع<span class="totaltext text-primary">{{ orderInfo.RowCost }} ریال</span></li>
          </ul>
        </div>

        <div class="invoice-bottom">
          این فاکتور فقط برای اهداف پیش نمایش است.
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OrderView',
  data() {
    return {
      orderInfo: '',
    };
  },
  computed: {
    ...mapState(['GetOrderDetailsResult']),
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      const orderDetailesTaskObj = {
        Guid: vm.$route.params.id,
      };
      await vm.$store.dispatch('WS_GetOrderDetails', tikaUtils.serializeObject(orderDetailesTaskObj));

      // eslint-disable-next-line
      vm.orderInfo = vm.GetOrderDetailsResult[0];


      await vm.$store.dispatch('headerTitle', {
        vis: true,
        center: vm.productInfo.Title,
        // left: '<ion-icon name="share-outline"></ion-icon>',
        right: 'goBack',
      }).then(() => {
      });
    });
  },
};
</script>
