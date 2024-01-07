import { createStore } from 'vuex';
// import router from '@/router';
import { useToast } from 'vue-toast-notification';
import tikaUtils from '@/assets/js/tikaUtils';

export default createStore({
  state: {
    $toast: useToast(),

    host: 'http://10.10.10.3/tika11/wservice.asmx',

    utility: {
      disableButton: false,
    },

    leftTopicHeader: '',
    centerTopicHeader: '',
    LinkTopicHeader: '',
    rightTopicHeader: '',

    authTabLogin: true,

    userLoggedIn: false,

    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/xml; charset=UTF-8',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',

      // eslint-disable-next-line
      'lang': 'FA',
      // eslint-disable-next-line
      'src': 'APP',
      // eslint-disable-next-line
      'siteid': (localStorage.getItem('siteid') || '1'),
      // eslint-disable-next-line
      'uid': localStorage.getItem('login_token'),
      // 'uid': '7d37dfa724f64f94a99fe15620b6136d',
    },
    vis: true,
    countdown: 'در حال محاسبه...',

    GetAppMenuListResult: null,
    GetAppMenuListMeta: null,

    LoginInfoResult: null,

    SignUpInfoResult: null,
    SignUpInfoFlag: null,

    SignupCheckCodeResult: null,
    SignupCheckCodeFlag: null,

    AdvCntResult: null,
    AdvCntMeta: null,

    GetSupportTicketingListResult: null,
    GetSupportTicketingListMeta: null,

    GetSupportTicketingDetailsResult: null,
    GetSupportTicketingDetailsMeta: null,

    AddSupportTicketingResult: null,
    AddSupportTicketingMeta: null,

    ReplySupportTicketingResult: null,
    ReplySupportTicketingMeta: null,

    GetProdListMeta: {},
    GetProdListResult: {},

    GetProdMeta: {},
    GetProdResult: {},

    GetAssignedImgMeta: {},
    GetAssignedImgResult: {},

    AdvCommentResult: {},
    AdvCommentMeta: {},

    HLinkListMeta: {},
    HLinkListResult: {},

    AdvCntSmp: {}, // SmpCnt

    AdvCmsCatResult: {}, // CmsCat
  },
  getters: {
  },
  mutations: {
    toggleAuthTab(state) {
      state.authTabLogin = !state.authTabLogin;

      console.log('authTab value ? ', state.userLoggedIn);
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
      console.log('userLoggedIn value ? ', state.userLoggedIn);
    },
    timer(state) {
      if (state.SignUpInfoResult) {
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
      }
    },
    endTimer(state) {
      state.countdown = 'کد را دریافت نکردید؟';
      state.vis = true;
    },
    updateProperty(state, newConfig) {
      state.utility[newConfig.key] = newConfig.value;
    },
  },
  actions: {
    async WS_GetAppMenuList({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('GetAppMenuList', state, jsonParams)
        .then((res) => {
          console.log(res);
          if (res.flag < 0) {
            state.$toast.open({
              message: res.description,
              type: 'error',
            });
            return;
          }
          state.GetAppMenuListMeta = res.meta;
          state.GetAppMenuListResult = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_Login({ commit, state, dispatch }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('Login', state, jsonParams)
        .then((res) => {
          console.log(res);
          console.log(state.AdvCntResult);
          if (res.flag < 0) {
            state.$toast.open({
              message: res.description,
              type: 'error',
            });
          } else {
            state.$toast.open({
              message: res.message,
              type: 'info',
            });
            state.LoginInfoResult = res.data;
            commit('toggleAuth');
            dispatch('setGUID', state.LoginInfoResult.GUID);
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_SignupFirstInfo({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('SignupFirstInfo', state, jsonParams)
        .then((res) => {
          console.log(res);
          if (res.flag < 0) {
            state.SignUpInfoFlag = res.flag;

            state.$toast.open({
              message: res.description,
              type: 'info',
            });
            return;
          }

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
          if (res.flag < 0) {
            state.SignupCheckCodeFlag = res.flag;
            state.$toast.open({
              message: res.description,
              type: 'info',
            });
          } else {
            state.$toast.open({
              message: res.description,
              type: 'success',
            });
          }
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
    async WS_UserForgetPassword({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('UserForgetPassword', state, jsonParams)
        .then((res) => {
          console.log(res);
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
          if (res.flag < 0) {
            state.$toast.open({
              message: res.message,
              type: 'error',
            });
            return;
          }
          state.AdvCntMeta = res.meta;
          state.AdvCntResult = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_GetProdList({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('GetProdList', state, jsonParams)
        .then((res) => {
          console.log(res);
          if (res.flag < 0) {
            state.$toast.open({
              message: res.description,
              type: 'error',
            });
            return;
          }
          state.GetProdListMeta = res.meta;
          state.GetProdListResult = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_GetProd({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('GetProdList', state, jsonParams)
        .then((res) => {
          console.log(res);
          if (res.flag < 0) {
            state.$toast.open({
              message: res.description,
              type: 'error',
            });
            return;
          }
          state.GetProdMeta = res.meta;
          state.GetProdResult = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_GetAssignedImages({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('GetAssignedImages', state, jsonParams)
        .then((res) => {
          console.log(res);
          if (res.flag < 0) {
            state.$toast.open({
              message: res.description,
              type: 'error',
            });
            // return;
          }
          state.GetAssignedImgMeta = res.meta;
          state.GetAssignedImgResult = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_GetCommensList({ state }, jsonParams) {
      console.log(jsonParams);

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
    async WS_GetSupportTicketingList({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('GetSupportTicketingList', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.GetSupportTicketingListResult = res.data;
          state.GetSupportTicketingListMeta = res.meta;
          console.log(state.GetSupportTicketingListResult);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async WS_GetSupportTicketingDetails({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('GetSupportTicketingDetails', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.GetSupportTicketingDetailsResult = res.data;
          state.GetSupportTicketingDetailsMeta = res.meta;
          console.log(state.GetSupportTicketingDetailsResult);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async WS_AddSupportTicketing({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('AddSupportTicketing', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.AddSupportTicketingResult = res.data;
          state.AddSupportTicketingMeta = res.meta;
          console.log(state.AddSupportTicketingResult);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async WS_ReplySupportTicketing({ state }, jsonParams) {
      console.log(jsonParams);

      await tikaUtils.callWS('ReplySupportTicketing', state, jsonParams)
        .then((res) => {
          console.log(res);
          state.ReplySupportTicketingResult = res.data;
          state.ReplySupportTicketingMeta = res.meta;
          console.log(state.ReplySupportTicketingResult);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    headerTitle({ state }, payload) {
      state.centerTopicHeader = payload.center;
      state.leftTopicHeader = payload.left;
      state.LinkTopicHeader = payload.to;
      state.rightTopicHeader = payload.right;
    },
    changeValue({ state }, payload) {
      state[payload.property] = payload.data;
    },
    setGUID({ state }, payload) {
      console.log(state);
      localStorage.setItem('login_token', payload);
    },
  },

});
