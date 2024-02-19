<template>
  <div id="appCapsule">
    <div class="listview-title mt-2">لیست ویو رسانه</div>
    <ul class="listview image-listview media">
      <li v-for="orderItem in GetOrdersListResult" :key="orderItem.GUID">
        <router-link :to="{ name: 'Order', params: { id: item.GUID } }">
          <div class="item">
            <div class="imageWrapper">
              <img src="assets/img/sample/photo/1.jpg" alt="image" class="imaged w64">
            </div>
            <div class="in">
              <div>
                {{ orderItem.JSetting_ShippingInfo.Address }}
                <div class="text-muted">{{ orderItem.StatusName }}</div>
                <div class="text-muted">{{ orderItem.TotalAmountOfItems }}</div>
                <div class="text-muted">{{ orderItem.OrderDateStr }}</div>
                <div class="text-muted">{{ orderItem.StatusName }}</div>
                <div class="text-muted">{{ orderItem.PayTypeStr }}</div>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OrderListView',
  computed: {
    ...mapState(['GetOrdersListResult']),
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      // vm.handleTypeInput();

      await vm.$store.dispatch('headerTitle', {
        vis: true,
        // center: 'محصولات',
        // left: 'خروج',
        right: 'goBack',
      }).then(() => {
      });

      // const orderListTaskObj = {
      //   Guid: vm.$route.params.id,
      // };
      await vm.$store.dispatch('WS_GetOrdersList', '[{}]');
    });
  },
};
</script>
