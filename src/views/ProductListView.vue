<template>
  <div class="container">
    <div class="section mt-1 mb-5">
      <vee-form id="AdvProductSearchForm" @submit="getProductList" :validation-schema="filterSchema">

        <div class="form-group boxed">
          <div class="input-wrapper">
            <label for="Type" class="ms-1 mb-1">نوع</label>
            <AppSelect @input="handleTypeInput" :id="'sType'" :name="'Type'" :label="'انتخاب نوع'" :options="[
              { value: 'Products', label: 'محصولات' },
            ]
              " />
          </div>
        </div>

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
          <a href="#" class="btn btn-sm btn-primary btn-block">افزودن به سبد</a>
        </div>
      </div>
    </swiper-slide>
  </swiper>
  <ul>
    <li v-for="item in treeData" :key="item.id">
      {{ item.label }}
      <tree-list :treeData="item.children" v-if="item.children && item.children.length > 0" />
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { FreeMode, Autoplay } from 'swiper/modules';
import TreeList from '@/components/TreeList.vue';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  data() {
    return {
      catOp: [],
      treeData: [
        {
          id: 1,
          label: 'Node 1',
          children: [
            {
              id: 2,
              label: 'Node 1.1',
              children: [
                {
                  id: 3,
                  label: 'Node 1.1.1',
                },
                {
                  id: 4,
                  label: 'Node 1.1.2',
                },
              ],
            },
            {
              id: 5,
              label: 'Node 1.2',
            },
          ],
        },
        {
          id: 6,
          label: 'Node 2',
          children: [
            {
              id: 7,
              label: 'Node 2.1',
            },
            {
              id: 8,
              label: 'Node 2.2',
            },
          ],
        },
      ],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    TreeList,
  },
  computed: {
    ...mapState(['GetProdListResult', 'AdvCmsCatResult']),
  },
  methods: {
    async getProductList() {
      await this.$store.dispatch('WS_GetProdList', tikaUtils.serializeForm('AdvProductSearchForm'));
    },
    async handleTypeInput(newValue) {
      const cmsTaskObj = {
        Type: newValue,
      };

      await this.$store.dispatch('Ws_GetCmsCatList', tikaUtils.manualSerialize(cmsTaskObj));

      setTimeout(() => {
        const catJsonArr = [];
        this.AdvCmsCatResult.forEach((x) => {
          const catJson = {};
          catJson.value = x.Id;
          catJson.label = x.Title;
          catJsonArr.push(catJson);
        });
        this.catOp = catJsonArr;
      }, (2000));
    },
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
