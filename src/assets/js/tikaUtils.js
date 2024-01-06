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

  // jsonTree(jsonArray) {
  //   let topParents = jsonArray.filter(x => x.ParentId === 0);
  //   let child = jsonArray.filter(x => x.parent !== 0)
  //   return ;
  // },

  /**
 * @obj آبجکت.
 * @Guide این متد آبجکت دریافتی را تبدیل به ارایه و سپس به جیسون تبدیل میکند
 */
  serializeObject(obj) {
    try {
      const fdJsonArr = [];
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        fdJsonArr.push({ ColName: key, Value: obj[key] });
      }

      const jsonString = JSON.stringify(fdJsonArr);
      return jsonString;
    } catch (error) {
      console.error('خطا در سریالایز: ', error);
      return null;
    }
  },

  /**
   * آروم بگیر امیرمحمد
   * @obj آبجکت.
   * @arr آرایه
   * @Guide این متد آبجکت دریافتی را به آرایه دریافتی درج میکند و سپس به جیسون تبدیل میکند
   */
  serializeObjectToArray(obj, arr) {
    const jsonParse = JSON.parse(arr);
    jsonParse.push(obj);
    const jsonString = JSON.stringify(jsonParse);

    return jsonString;
  },

  /**
 * @formId اطلاعات فرم
 * @Guide  این متداطلاعات فرم دریافتی به ارایه تبدیل و سپس به جیسون تبدیل میکند
 */
  serializeForm(formId) {
    const fd = new FormData(tikaUtils.gel(formId));
    const fdJsonArr = [];
    fd.forEach((value, key) => {
      const fdJson = {};
      fdJson.ColName = key;
      fdJson.Value = value;
      fdJsonArr.push(fdJson);
    });

    // const maxPage = { ColName: 'MaxNo', Value: '4' };
    // fdJsonArr.push(maxPage);

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
      console.log(filterSoapReq);
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
