import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import ForgetPassView from '../views/ForgetPassView.vue';
import ProfileView from '../views/ProfileView.vue';
import GetAdvCntView from '../views/GetAdvCntView.vue';
import AdvCntView from '../views/AdvCntView.vue';
import CmsCatView from '../views/CmsCatView.vue';
import VerifyView from '../views/VerifyView.vue';

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
    path: '/verify',
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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
