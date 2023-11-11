import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    login_in_submittion: false,
    login_bg_varient: 'bg-primary',
    login_show_message: 'لطفا صبر کنید! در حال چک کردن مشخصات شما.',

    authTabLogin: true,
    userLoggedIn: false,
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/xml; charset=UTF-8',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    },
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
  },
  actions: {
    async login({ commit, state }, payload) {
      state.login_in_submittion = true;
      state.login_bg_varient = 'bg-primary text-white';
      state.login_show_message = 'لطفا صبر کنید! در حال چک کردن مشخصات شما.';

      const loginSoapReq = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Login xmlns="http://tempuri.org/">
            <UserName>${payload.number}</UserName>
            <Password>${payload.password}</Password>
            <ShowImageType>${payload.remember}</ShowImageType>
          </Login>
        </soap:Body>
      </soap:Envelope>`;

      let headers = {};
      headers = state.headers;

      await axios
        .post('http://10.10.10.3/tika11/wservice.asmx?op=Login', loginSoapReq, { headers })
        .then((res) => {
          console.log(res.data);
          this.login_bg_varient = 'bg-success text-white';
          this.login_show_message = 'عملیات باموفقیت انجام شد';
        })
        .catch((error) => {
          console.log(error);
          state.login_in_submittion = false;
          state.login_bg_varient = 'bg-danger text-white';
          state.login_show_message = 'عملیات با شکست مواجه شد.';
        });

      commit('toggleAuth');
    },
  },
  modules: {
  },
});
