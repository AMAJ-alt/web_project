import { createStore } from 'vuex';
import router from '@/router';
import axios from 'axios';

export default createStore({
  state: {
    host: 'http://10.10.10.3/tika11/wservice.asmx',

    leftTopicHeader: '',
    centerTopicHeader: '',

    login_in_submittion: false,
    login_bg_varient: 'bg-info',
    login_show_message: 'لطفا صبر کنید! در حال چک کردن مشخصات شما.',

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
    filterResult: {},
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
    async login({ commit, state }, payload) {
      state.login_in_submittion = true;
      state.login_bg_varient = 'bg-info text-white';
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
        .post(`${state.host}?op=Login`, loginSoapReq, { headers })
        .then((res) => {
          console.log(res.data);
          state.login_bg_varient = 'bg-success text-white';
          state.login_show_message = `${res.data.Message}`;
        })
        .catch((error) => {
          console.log(error);
          state.login_in_submittion = false;
          state.login_bg_varient = 'bg-danger text-white';
          // if (error.data.Message) {
          //   state.login_show_message = `${error.data.Message}`;
          // }
          state.login_show_message = 'لطفا اینترنت خود را چک کنید.';
        });

      commit('toggleAuth');
    },
    async filter({ state }, payload) {
      const filterSoapReq = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetAdvCntList xmlns="http://tempuri.org/">
            <Type>${payload.type}</Type>
            <Keyword></Keyword>
            <Status>3</Status>
            <Id>${payload.id}</Id>
            <FromRec>0</FromRec>
            <MaxNo>3</MaxNo>
            <Sort>${payload.sort}</Sort>
            <CategoryId>-1</CategoryId>
            <SubCategoryId>-1</SubCategoryId>
          </GetAdvCntList>
        </soap:Body>
      </soap:Envelope>`;

      let headers = {};
      headers = state.headers;

      await axios
        .post(`${state.host}?op=GetAdvCntList`, filterSoapReq, { headers })
        .then((res) => {
          console.log(res);
          // state.filterResult = res.data;
          // console.log(state.filterResult);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    headerTitle({ state }, payload) {
      state.centerTopicHeader = payload.center;
      state.leftTopicHeader = payload.left;
    },
  },

});
