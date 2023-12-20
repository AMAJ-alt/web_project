<template>
  <div class="container">
    <div class="section mt-1 mb-5">
      <vee-form id="AdvProductSearchForm" @submit="getProductList" :validation-schema="filterSchema">

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="Status" class="ms-1 mb-1">دسته</label>
            <AppSelect :id="'sCategoryId'" :name="'CategoryId'" :label="'انتخاب دسته'" :options="catOp" />
          </div>
        </div>

        <!-- <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="Status" class="ms-1 mb-1">ترتیب</label>
            <AppSelect :id="'sSort'" :name="'Sort'" :label="'انتخاب ترتیب'" :options="[
              { value: 'CategoryId', label: 'براساس دسته' },
              { value: 'Status', label: 'براساس وضعیت' },
              { value: 'VisitCount', label: 'براساس بازدید' },
            ]" />
          </div>
        </div> -->

        <br>
        <div>
          <button type="submit" class="btn btn-primary btn-block btn-lg">
            جستجو
          </button>
        </div>
      </vee-form>
    </div>
  </div>
  <swiper :slidesPerView="3" :autoplay="{
    delay: 2500,
    disableOnInteraction: false,
  }" :spaceBetween="30" :freeMode="true" :pagination="{
  clickable: true,
}" :modules="modules" class="mySwiper">
    <swiper-slide v-for="product in GetProdListResult" :key="product.GUID">
      <div class="card product-card">
        <div class="card-body">
          <img :src="product.ImageUrl" class="image" alt="product image">
          <h2 class="title">{{ product.Title }}</h2>
          <p class="text p-0">{{ product.CategoryName }}</p>
          <p class="text">تاریخ تولید {{ product.ProducedDateStr }}</p>
          <div class="price">{{ product.Price }} تومان</div>
          <router-link :to="{ name: 'Product', params: { type: 'Products', id: product.Id } }"
            class="btn btn-sm btn-primary btn-block">مشاهده محصول</router-link>
        </div>
      </div>
    </swiper-slide>
  </swiper>
  <!-- <ul>
    <li v-for="item in treeData" :key="item.id">
      {{ item.label }}
      <tree-list :treeData="item.children" v-if="item.children && item.children.length > 0" />
    </li>
  </ul> -->
</template>
<script>
import { mapState } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { FreeMode, Autoplay } from 'swiper/modules';
// import TreeList from '@/components/TreeList.vue';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  data() {
    return {
      catOp: [],
      // treeData: [
      //   {
      //     id: 1,
      //     label: 'Node 1',
      //     children: [
      //       {
      //         id: 2,
      //         label: 'Node 1.1',
      //         children: [
      //           {
      //             id: 3,
      //             label: 'Node 1.1.1',
      //           },
      //           {
      //             id: 4,
      //             label: 'Node 1.1.2',
      //           },
      //         ],
      //       },
      //       {
      //         id: 5,
      //         label: 'Node 1.2',
      //       },
      //     ],
      //   },
      //   {
      //     id: 6,
      //     label: 'Node 2',
      //     children: [
      //       {
      //         id: 7,
      //         label: 'Node 2.1',
      //       },
      //       {
      //         id: 8,
      //         label: 'Node 2.2',
      //       },
      //     ],
      //   },
      // ],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    // TreeList,
  },
  computed: {
    ...mapState(['GetProdListResult', 'AdvCmsCatResult']),
  },
  methods: {
    async getProductList() {
      const addObj = {
        Type: 'Products',
      };
      await this.$store.dispatch('WS_GetProdList', tikaUtils.serializeObj_Arr(addObj, tikaUtils.serializeForm('AdvProductSearchForm')));
    },
    async handleTypeInput() {
      const cmsTaskObj = {
        Type: 'Products',
      };

      await this.$store.dispatch('Ws_GetCmsCatList', tikaUtils.serializeManually(cmsTaskObj));

      setTimeout(() => {
        const catJsonArr = [];
        this.AdvCmsCatResult.forEach((x) => {
          const catJson = {};
          catJson.value = x.Id;
          catJson.label = x.Title;
          catJson.ParentId = x.ParentId;
          catJsonArr.push(catJson);
        });
        this.catOp = catJsonArr;
      }, (2000));
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.handleTypeInput();

      vm.$store.dispatch('headerTitle', {
        center: 'محصولات',
        left: 'خروج',
      }).then(() => {
      });
    });
  },
  setup() {
    return {
      modules: [FreeMode, Autoplay],
    };
  },
};
</script>

<style>
.swiper-container {
  max-width: 600px;
  margin: auto;
}

.swiper-slide {
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
