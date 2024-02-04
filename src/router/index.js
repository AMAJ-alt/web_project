import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import FinalRegistrationView from '../views/FinalRegistrationView.vue';
import ForgetPassView from '../views/ForgetPassView.vue';
import ProfileView from '../views/ProfileView.vue';
import GetAdvCntView from '../views/GetAdvCntView.vue';
import AdvCntView from '../views/AdvCntView.vue';
import CmsCatView from '../views/CmsCatView.vue';
import VerifyView from '../views/VerifyView.vue';
import FAQView from '../views/FAQView.vue';
import HChatView from '../views/HChatView.vue';
import InfoSliderView from '../views/InfoSliderView.vue';
import ProductListView from '../views/ProductListView.vue';
import ProductView from '../views/ProductView.vue';
import BasketView from '../views/BasketView.vue';
import TicketAllView from '../views/TicketAllView.vue';
// import TicketView from '../views/TicketView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/authentication',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/authentication/final_registration/:key',
    name: 'finalregister',
    component: FinalRegistrationView,
  },
  {
    path: '/authentication/forget_pass',
    name: 'forget',
    component: ForgetPassView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/verify/:key',
    name: 'verify',
    component: VerifyView,
  },
  {
    path: '/GetAdvCnt',
    name: 'GetAdvCnt',
    component: GetAdvCntView,
  },
  {
    path: '/AdvCnt/:type/:id',
    name: 'AdvCnt',
    component: AdvCntView,
  },
  {
    path: '/catagory',
    name: 'catagory',
    component: CmsCatView,
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQView,
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQView,
  },
  {
    path: '/Help-chat',
    name: 'hchat',
    component: HChatView,
  },
  {
    path: '/start',
    name: 'info-slide',
    component: InfoSliderView,
  },
  {
    path: '/product-list',
    name: 'product-list',
    component: ProductListView,
  },
  {
    path: '/Prod/:type/:id',
    name: 'Product',
    component: ProductView,
  },
  {
    path: '/Basket',
    name: 'Basket',
    component: BasketView,
  },
  {
    path: '/all-tickets',
    name: 'alltickets',
    component: TicketAllView,
  },
  // {
  //   path: '/tickets/:id',
  //   name: 'ticket',
  //   component: TicketView,
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  routes,
});

export default router;
