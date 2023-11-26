import axios from 'axios';

const tikaUtils = {
  clog(arg) {
    console.log(arg);
  },
  gel(id) {
    return document.getElementById(id);
  },
  sel(s) {
    return document.querySelector(s);
  },
  selAll(s) {
    return document.querySelectorAll(s);
  },
  serializeEntry(type, id) {
    const fdJsonArr = [
      { ColName: 'Type', Value: type },
      { ColName: 'Id', Value: id },
    ];
    console.log(JSON.stringify(fdJsonArr));
    return JSON.stringify(fdJsonArr);
  },
  serializeForm(formId) {
    const fd = new FormData(tikaUtils.gel(formId));
    const fdJsonArr = [];
    fd.forEach((value, key) => {
      const fdJson = {};
      fdJson.ColName = key;
      fdJson.Value = value;
      fdJsonArr.push(fdJson);
    });
    return JSON.stringify(fdJsonArr);
  },
  async callWS(action, state, jsonParams) {
    return new Promise((resolve, reject) => {
      const filterSoapReq = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <${action} xmlns="http://tempuri.org/">
          <JsonNameVale>${jsonParams}</JsonNameVale>
        </${action}>
      </soap:Body>
    </soap:Envelope>`;

      let headers = {};
      headers = state.headers;

      axios
        .post(`${state.host}?op=${action}`, filterSoapReq, { headers })
        .then((res) => {
          console.log(res);
          // state.AdvCntResult = res.data.data;
          resolve(res.data);
        })
        .catch((error) => {
          tikaUtils.clog(error);
          reject(error); // new Error('Error: Value is not provided'));
        });
    });
  },
};

export default tikaUtils;
