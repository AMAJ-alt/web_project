<template>
  <div id="appCapsule" class="pb-2 container">
    <div class="row">
      <div class="col-6">
        <div class="section mt-2">
          <div class="card">
            <img :src="orderExtraFields.ProdImage" class="card-img-top" alt="Product Image">
            <div class="card-body">
              <!-- <h6 class="card-subtitle">عنوان فرعی کارت</h6> -->
              <h5 class="card-title">{{ orderExtraFields.ProdTitle }}</h5>
              <p class="card-text">تعداد: {{ orderInfo.ItemCount }}</p>
              <p class="card-text">وزن: {{ orderInfo.ItemWeight }}</p>
              <p class="card-text">وزن کل: {{ orderInfo.RowWeight }}</p>
              <p class="card-text">قیمت: {{ orderInfo.ItemCost }}</p>
              <p class="card-text">جمع: {{ orderInfo.RowCost }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="section mt-2">
          <div class="1" v-html="orderExtraFields.ProdAttribs"></div>
          <div class="2" v-html="orderExtraFields.CountOptions"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'OrderView',
  data() {
    return {
      orderInfo: '',
      orderExtraFields: '',
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
      vm.orderExtraFields = vm.GetOrderDetailsResult[0].ExtraFields;

      await vm.$store.dispatch('headerTitle', {
        vis: true,
        // center: vm.productInfo.Title,
        // left: '<ion-icon name="share-outline"></ion-icon>',
        right: 'goBack',
      }).then(() => {
      });
    });
  },
};
</script>
