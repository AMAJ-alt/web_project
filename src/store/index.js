import { createStore } from 'vuex';
import router from '@/router';
import { useToast } from 'vue-toast-notification';
import tikaUtils from '@/assets/js/tikaUtils';

export default createStore({
  state: {
    $toast: useToast(),

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
    vis: true,
    countdown: 'در حال محاسبه...',

    SignUpInfoResult: {},

    AdvCntResult: {},
    AdvCntMeta: {},

    AdvCommentResult: {},
    AdvCommentMeta: {},

    HLinkListMeta: {},
    HLinkListResult: {},

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
    timer(state) {
      const resTime = state.SignUpInfoResult.RemainTime * 1000;
      const targetTime = new Date().getTime() + resTime;

      const timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = targetTime - currentTime;

        if (timeDifference <= 0) {
          clearInterval(timerInterval);
          state.countdown = 'زمان به پایان رسید!';
          this.commit('endTimer');
        } else {
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          state.countdown = `زمان باقی‌مانده: ${minutes} دقیقه و ${seconds} ثانیه`;
        }
      }, 1000);
    },
    endTimer(state) {
      state.countdown = 'کد را دریافت نکردید؟';
      state.vis = true;
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
            state.task.in_submittion = false;
            state.task.bg_varient = 'bg-danger text-white';
            state.task.show_message = res.message;
          } else {
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
    async WS_SignupFirstInfo({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('SignupFirstInfo', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.$toast.open({
            message: res.message,
            type: 'info',
          });
          state.SignUpInfoResult = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_SignupCheckCode({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('SignupCheckCode', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.$toast.open({
            message: res.description,
            type: 'info',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_SignupResendCode({ state, commit }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('SignupResendCode', state, jsonParams)
        .then((res) => {
          console.log(res);
          if (res.id > 0) {
            state.$toast.open({
              message: `${res.description} زمان لازم برای تلاش دوباره  ${res.id} ثانیه میباشد.`,
              type: 'info',
            });
          } else {
            state.SignUpInfoResult = res.data;
            commit('timer');
            state.$toast.open({
              message: 'کد پیامکی دوباره ارسال شد.',
              type: 'info',
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_GetHLinkList({ state }, jsonParams) {
      tikaUtils.clog(jsonParams);

      await tikaUtils.callWS('GetHLinkList', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.HLinkListMeta = res.meta;
          state.HLinkListResult = res.data;
          console.log(state.AdvCntResult);
        })
        .catch((error) => {
          console.log(error);
        });
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
    async WS_GetCommensList({ state }, jsonParams) {
      tikaUtils.clog(jsonParams);

      await tikaUtils.callWS('GetCommensList', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.AdvCommentResult = res.data;
          state.AdvCommentMeta = res.meta;
          console.log(state.AdvCommentResult);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_AddComment({ state }, jsonParams) {
      tikaUtils.clog(jsonParams);

      await tikaUtils.callWS('AddComment', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.$toast.open({
            message: res.message,
            type: 'info',
          });
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

          const jsonString = JSON.stringify(state.AdvCntSmp);
          localStorage.setItem('smp', jsonString);

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
    changeValue({ state }, payload) {
      state[payload.property] = payload.data;
    },
  },

});
