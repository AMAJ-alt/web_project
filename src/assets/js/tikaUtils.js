/* eslint-disable */
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

  toMoney: (nStr) => {
    //if (isEmpty(nStr)) return '';
    // nStr = nStr.toString().removeNotInChars("\\d");
    // if (isEmpty(nStr)) return '';

    nStr += ''.replaceAll(',', '');
    var comma = /,/g;
    var isNeg = nStr.startsWith('-');
    nStr = nStr
      .replace(comma, '')
      .replace(/[^0-9,.]+/g, "");
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return (isNeg ? '-' : '') + x1 + x2;
  },

  toInt: (s) => {
    if (!s) {
      return 0;
    }
    let objVal = typeof (s) === 'object' ?
      (s.innerHTML ? s.innerHTML : s.value) :
      s;
    objVal = parseInt(tikaUtils.getDigit(objVal, 'en').replace(/,/g, ''), 10);
    return Number.isNaN(objVal) ? 0 : objVal;
  },

  toFloat: (s) => {
    if (!s) {
      return 0;
    }
    let objVal = typeof (s) === 'object' ?
      (s.innerHTML ? s.innerHTML : s.value) :
      s;
    objVal = parseFloat(tikaUtils.getDigit(objVal, 'en').replace(/,/g, ''));
    return Number.isNaN(objVal) ? 0 : objVal;
  },

  getDigit: (number, lang) => {
    number = (number || '').toString();
    if (lang.toUpperCase().trim() === 'FA') {
      number = number.replace(/0/g, '۰')
        .replace(/1/g, '۱')
        .replace(/2/g, '۲')
        .replace(/3/g, '۳')
        .replace(/4/g, '۴')
        .replace(/5/g, '۵')
        .replace(/6/g, '۶')
        .replace(/7/g, '۷')
        .replace(/8/g, '۸')
        .replace(/9/g, '۹');
    } else {
      number = number.replace(/۰/g, '0')
        .replace(/۱/g, '1')
        .replace(/۲/g, '2')
        .replace(/۳/g, '3')
        .replace(/۴/g, '4')
        .replace(/۵/g, '5')
        .replace(/۶/g, '6')
        .replace(/۷/g, '7')
        .replace(/۸/g, '8')
        .replace(/۹/g, '9');
    }
    return number;
  },
  // darkMode() {

  //   //-----------------------------------------------------------------------
  //   // Dark Mode Detection
  //   var checkDarkModeStatus = localStorage.getItem("MobilekitDarkMode");
  //   var switchDarkMode = document.querySelectorAll(".dark-mode-switch");
  //   var pageBodyActive = pageBody.classList.contains("dark-mode-active");

  //   // Check if enable as default
  //   if (Mobilekit.Dark_Mode.default) {
  //     pageBody.classList.add("dark-mode-active");
  //   }

  //   // Night Mode
  //   if (Mobilekit.Dark_Mode.night_mode.enable) {
  //     var nightStart = Mobilekit.Dark_Mode.night_mode.start_time;
  //     var nightEnd = Mobilekit.Dark_Mode.night_mode.end_time;
  //     var currentDate = new Date();
  //     var currentHour = currentDate.getHours();
  //     if (currentHour >= nightStart || currentHour < nightEnd) {
  //       // It is night time
  //       pageBody.classList.add("dark-mode-active");
  //     }
  //   }

  //   // Auto Detect Dark Mode
  //   if (Mobilekit.Dark_Mode.auto_detect.enable)
  //     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //       pageBody.classList.add("dark-mode-active");
  //     }

  //   function switchDarkModeCheck(value) {
  //     switchDarkMode.forEach(function (el) {
  //       el.checked = value
  //     })
  //   }
  //   // if dark mode on
  //   if (checkDarkModeStatus === 1 || checkDarkModeStatus === "1" || pageBody.classList.contains('dark-mode-active')) {
  //     switchDarkModeCheck(true);
  //     if (pageBodyActive) {
  //       // dark mode already activated
  //     }
  //     else {
  //       pageBody.classList.add("dark-mode-active")
  //     }
  //   }
  //   else {
  //     switchDarkModeCheck(false);
  //   }
  //   switchDarkMode.forEach(function (el) {
  //     el.addEventListener("click", function () {
  //       var darkmodeCheck = localStorage.getItem("MobilekitDarkMode");
  //       var bodyCheck = pageBody.classList.contains('dark-mode-active');
  //       if (darkmodeCheck === 1 || darkmodeCheck === "1" || bodyCheck) {
  //         pageBody.classList.remove("dark-mode-active");
  //         localStorage.setItem("MobilekitDarkMode", "0");
  //         switchDarkModeCheck(false);
  //       }
  //       else {
  //         pageBody.classList.add("dark-mode-active")
  //         switchDarkModeCheck(true);
  //         localStorage.setItem("MobilekitDarkMode", "1");
  //       }
  //     })
  //   })
  //   //-----------------------------------------------------------------------

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
