import { createStore } from 'vuex';
import router from '@/router';
import tikaUtils from '@/assets/js/tikaUtils';

export default createStore({
  state: {
    host: 'http://10.10.10.3/tika11/wservice.asmx',

    leftTopicHeader: '',
    centerTopicHeader: '',
    LinkTopicHeader: '',

    task: {
      in_submittion: false,
      bg_varient: 'bg-info',
      show_message: 'لطفا صبر کنید! در حال چک کردن مشخصات شما.',
    },

    authTabLogin: true,

    userLoggedIn: false,

    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/xml; charset=UTF-8',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      // 'lang': 'fa',
      // 'src': 'app',
      // 'siteid': '1',
      // 'uid': '',
    },
    AdvCntResult: {},
    AdvCntMeta: {},

    AdvCntSmp: {},

    AdvCmsCatResult: {},
  },
  getters: {
  },
  mutations: {
    toggleAuthTab(state) {
      state.authTabLogin = !state.authTabLogin;
      router.push({
        query: {
          loginTab: state.authTabLogin,
        },
      });
      console.log('authTab value ? ', state.userLoggedIn);
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
      console.log('userLoggedIn value ? ', state.userLoggedIn);
    },
  },
  actions: {
    async WS_Login({ commit, state }, jsonParams) {
      console.log(jsonParams);
      

      state.task.in_submittion = true;
      state.task.bg_varient = 'bg-info text-white';
      state.task.show_message = 'لطفا صبر کنید! در حال چک کردن مشخصات شما.';

      await tikaUtils.callWS('Login', state, jsonParams)
      .then((res) => {
        console.log(res);
        console.log(state.AdvCntResult);
        if (res.flag < 0) {
          console.log('hell');
          state.task.in_submittion = false;
          state.task.bg_varient = 'bg-danger text-white';
          state.task.show_message = res.message;
        } else{
          state.task.in_submittion = true;
          state.task.bg_varient = 'bg-success text-white';
          state.task.show_message = res.message;
        }
      })
      .catch((error) => {
        console.log(error);
      });
      commit('toggleAuth');
    },
    async WS_GetAdvCntList({ state }, jsonParams) {
      tikaUtils.clog(jsonParams);

      await tikaUtils.callWS('GetAdvCntList', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.AdvCntMeta = res.meta;
          state.AdvCntResult = res.data;
          console.log(state.AdvCntResult);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_GetSmpCntList({ state }, jsonParams) {
      tikaUtils.clog(jsonParams);

      await tikaUtils.callWS('GetSmpCntList', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.AdvCntSmp = res.data;
          console.log(state.AdvCntResult);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async Ws_GetCmsCatList({ state }, jsonParams) {
      tikaUtils.callWS('GetCmsCatList', state, jsonParams)
        .then((res) => {
          state.AdvCmsCatResult = res.data;
          console.log(state.AdvCmsCatResult);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    headerTitle({ state }, payload) {
      state.centerTopicHeader = payload.center;
      state.leftTopicHeader = payload.left;
      state.LinkTopicHeader = payload.to;
    },
  },

});
