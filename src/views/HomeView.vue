<template>
  <div id="appCapsule">
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
          <router-link :to="{ name: 'Orders' }">Orders</router-link><br>

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
        vis: true,
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
