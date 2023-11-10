import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';
import './assets/sb-admin-2.min.css';

const vm = createApp(App);
vm.use(VeeValidatePlugin);
vm.use(store);
vm.use(router);
vm.mount('#app');
