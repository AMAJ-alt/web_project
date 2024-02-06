<template>
  <div id="appCapsule">

    <div class="row">
      <div class="col-6">
        <swiper :style="{
          '--swiper-navigation-color': '#000000',
          '--swiper-pagination-color': '#000000',
        }" :spaceBetween="10" :navigation="true" :modules="modules" class="mySwiper2">
          <swiper-slide v-for="AssignedImg in GetAssignedImgResult" :key="AssignedImg.Id">
            <img :src="AssignedImg.ImageUrl" alt="img" />
          </swiper-slide>
        </swiper>
        <!-- Swiper for thumbnail gallery -->
        <swiper @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="4" :freeMode="true"
          :watchSlidesProgress="true" :modules="modules" class="mySwiper">
          <swiper-slide v-for="(AssignedImg, index) in GetAssignedImgResult" :key="index">
            <img :src="AssignedImg.ImageThumb" alt="img" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="col-6" v-html="GetProductAttribsResult"  v-on:change="refreshPrice"></div>
      <!-- <div class="col-6">
        <div class="section full" v-for="Product in GetProdResult" :key="Product.Id">
          <div class="wide-block pt-2 pb-2 product-detail-header">
            <div class="rate-block mb-1">
              <ion-icon name="star" class="active"></ion-icon>
              <ion-icon name="star" class="active"></ion-icon>
              <ion-icon name="star" class="active"></ion-icon>
              <ion-icon name="star" class="active"></ion-icon>
              <ion-icon name="star"></ion-icon>

            </div>
            <h1 class="title">{{ Product.Title }}</h1>
            <div class="text">{{ Product.CategoryName }}</div>
            <div class="text">کد کالا:{{ Product.Code }}</div>
            <div class="detail-footer">

              <div class="price">
                <div class="old-price">{{ Product.Price }} تومان</div>
                <div class="badge bg-primary text-wrap">{{ Product.FinalPrice }} تومان</div>
                <br><br>
                <div class="current-price">قابل پرداخت: {{ product_FinalPrice }} تومان</div>
              </div>

              <div class="amount">
                <div class="stepper stepper-secondary">
                  <button :disabled="OrderNum == 1" @click.prevent="OrderNum -= 1"
                    class="stepper-button stepper-down">-</button>
                  <label for="" class="d-none"></label>
                  <input type="text" class="form-control" v-model="OrderNum" disabled />
                  <button @click.prevent="OrderNum += 1" class="stepper-button stepper-up">+</button>
                </div>
              </div>

            </div>
            <button class="btn btn-primary btn-lg btn-block">
              <ion-icon name="cart-outline"></ion-icon>
              افزودن به سبد خرید
            </button>
          </div>
          <div class="section full mt-2">
            <div class="section-title">توضیحات محصول</div>
            <div class="wide-block pt-2 pb-2" v-html="Product.Content">
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <!-- carousel full -->
    <!-- * carousel full -->
    <!-- Review -->
    <div class="section full mt-2">
      <div class="section-title">بازخوردها ({{ AdvCommentMeta.total }})</div>
      <div class="wide-block pt-2 pb-2">
        <!-- comment block -->
        <div class="comment-block">
          <!--item -->
          <div v-for="comment in AdvCommentResult" :key="comment.Id" class="item">
            <div class="avatar">
              <img src="../assets/guest_img.jpg" alt="avatar" class="imaged w32 rounded">
            </div>
            <div class="in">
              <div class="comment-header">
                <h4 class="title">{{ comment.SenderStr }}</h4>
                <span class="time">{{ comment.SendDateStr }}</span>
              </div>
              <div class="text">
                {{ comment.Content }}
              </div>
            </div>
          </div>
          <!-- * item -->
        </div>
        <!-- * comment block -->
        <div class="divider mt-3 mb-2"></div>

        <div class="section mt-2">
          <h3 class="mb-0">یک دیدگاه بنویسید</h3>
          <div class="pt-2 pb-2">
            <vee-form @submit="AddComment" :validation-schema="commentSchema">

              <div class="form-group boxed">
                <div class="input-wrapper">
                  <label for="number" class="d-none"></label>
                  <vee-field as="textarea" name="comment" rows="4" class="form-control" placeholder="دیدگاه"></vee-field>
                  <ErrorMessage class="text-danger fs-6" name="comment" />
                </div>
              </div>

              <div class="mt-1">
                <button type="submit" class="btn btn-primary btn-lg btn-block">
                  ارسال
                </button>
              </div>
            </vee-form>
          </div>
        </div>
      </div>
    </div>
    <!-- * Review -->

  </div>
</template>

<script>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'ProductView',
  data() {
    return {
      OrderNum: 1,
      product_FinalPrice: null,
      commentSchema: {
        comment: 'required',
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapState(['GetProdResult', 'GetProductAttribsResult', 'AdvCommentResult', 'AdvCommentMeta', 'GetProdMeta', 'GetAssignedImgResult']),
  },
  methods: {
    async refreshPrice() {
      await this.$store.dispatch('WS_GetProductAttribs', tikaUtils.serializeForm('ProdSetting'));
    },
    async addToBasket() {
      await this.$store.dispatch('WS_AddToBasket', tikaUtils.serializeForm('ProdSetting'));
    },
    updateFinalPrice() {
      if (this.GetProdResult.length > 0) {
        const product = this.GetProdResult[0]; // اینجا فرض شده که تنها یک محصول وجود دارد
        this.product_FinalPrice = product.FinalPrice * this.OrderNum;
      }
    },
    async AddComment(value) {
      console.log(value);
      const adCmmtaskObj = {
        Type: this.$route.params.type,
        RelId: this.$route.params.id,
        Comment: value.comment,
      };
      await this.$store.dispatch('WS_AddComment', tikaUtils.serializeObject(adCmmtaskObj));

      const cmmTaskObj = {
        Type: this.$route.params.type,
        RelId: this.$route.params.id,
        CurrPage: '1',
        MaxNo: '3',
      };
      await this.$store.dispatch('WS_GetCommensList', tikaUtils.serializeObject(cmmTaskObj));
    },
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      const prodTaskObj = {
        Type: vm.$route.params.type,
        Id: vm.$route.params.id,
      };
      await vm.$store.dispatch('WS_GetProd', tikaUtils.serializeObject(prodTaskObj));

      const prodAttTaskObj = {
        ProdId: vm.$route.params.id,
      };
      await vm.$store.dispatch('WS_GetProductAttribs', tikaUtils.serializeObject(prodAttTaskObj));

      // window.refreshPrice = vm.refreshPrice;
      window.addToBasket = vm.addToBasket;

      const prodImgTaskObj = {
        Type: vm.$route.params.type,
        RelId: vm.$route.params.id,
      };
      await vm.$store.dispatch('WS_GetAssignedImages', tikaUtils.serializeObject(prodImgTaskObj));

      const cmmTaskObj = {
        Type: vm.$route.params.type,
        RelId: vm.$route.params.id,
      };
      await vm.$store.dispatch('WS_GetCommensList', tikaUtils.serializeObject(cmmTaskObj));

      vm.updateFinalPrice();

      await vm.$store.dispatch('headerTitle', {
        center: 'بلاگ',
        left: '<ion-icon name="share-outline"></ion-icon>',
      }).then(() => {
      });
    });
  },

  setup() {
    const thumbsSwiper = ref(null);

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs],
    };
  },

  watch: {
    OrderNum() {
      this.updateFinalPrice();
    },
    $route: {
      immediate: true,
      // eslint-disable-next-line
      handler(to, from) {
        document.title = to.meta.title || 'Dummy Title';
      },
    },
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.mySwiper2 .swiper-slide img {
  display: block;
  width: 36%;
  height: 60%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  height: 80%;
  width: 100%;
}

.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 70%;
  height: 230%;
  object-fit: cover;
}</style>
