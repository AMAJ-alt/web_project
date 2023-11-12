/* eslint-disable */

//-----------------------------------------------------------------------
// Version:        2.9
// Template name:  Mobilekit
// Item URL :      https://themeforest.net/item/mobilekit-bootstrap-4-based-mobile-ui-kit-template/25384264
// Author:         Bragher
// Author URL :    https://themeforest.net/user/bragher
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Mobilekit Settings
//-----------------------------------------------------------------------
const Mobilekit = {
  version: "2.9", // Mobilekit version
  //-------------------------------------------------------------------
  // PWA Settings
  PWA: {
    enable: true, // Enable or disable PWA
  },
  //-------------------------------------------------------------------
  // Dark Mode Settings
  Dark_Mode: {
    default: false, // Set dark mode as main theme
    night_mode: { // Activate dark mode between certain times of the day
      enable: false, // Enable or disable night mode
      start_time: 20, // Start at 20:00
      end_time: 7, // End at 07:00
    },
    auto_detect: { // Auto detect user's preferences and activate dark mode
      enable: false,
    }
  },
  //-------------------------------------------------------------------
  // Right to Left (RTL) Settings
  RTL: {
    enable: false, // Enable or disable RTL Mode
  },
  //-------------------------------------------------------------------
  // Test Mode
  Test: {
    enable: true, // Enable or disable test mode
    word: "testmode", // The word that needs to be typed to activate test mode
    alert: true, // Enable or disable alert when test mode is activated
    alertMessage: "Test mode has been activated. Look at the developer console!" // Alert message
  }
  //-------------------------------------------------------------------
}
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Elements
//-----------------------------------------------------------------------
var pageBody = document.querySelector("body");
var appSidebar = document.getElementById("sidebarPanel")
var loader = document.getElementById('loader');
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Service Workers
//-----------------------------------------------------------------------
// if (Mobilekit.PWA.enable) {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('service-worker.js')
//       .then(reg => console.log('service worker registered'))
//       .catch(err => console.log('service worker not registered - there is an error.', err));
//   }
// }
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Page Loader
//----------------------------------------------------------------------
// setTimeout(() => {
//   loader.setAttribute("style", "pointer-events: none; opacity: 0; transition: 0.2s ease-in-out;");
//   setTimeout(() => {
//     loader.setAttribute("style", "display: none;")
//   }, 1000);
// }, 450);
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// RTL (Right to Left)
//-----------------------------------------------------------------------
if (Mobilekit.RTL.enable) {
  var pageHTML = document.querySelector("html")
  pageHTML.dir = "rtl"
  document.querySelector("body").classList.add("rtl-mode")
  if (appSidebar != null) {
    appSidebar.classList.remove("offcanvas-start")
    appSidebar.classList.add("offcanvas-end")
  }
  document.querySelectorAll(".carousel-full, .carousel-single, .carousel-multiple, .carousel-small, .carousel-slider, .story-block").forEach(function (el) {
    el.setAttribute('data-splide', '{"direction":"rtl"}')
  })
}
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Fix for # href
//-----------------------------------------------------------------------
var aWithHref = document.querySelectorAll('a[href*="#"]');
aWithHref.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
  })
});
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Go Top Button
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Input
// Clear input
var clearInput;
var formControl;

window.onload = function() {
  
  clearInput = document.querySelectorAll(".clear-input");
  formControl = document.querySelectorAll(".form-group .form-control");

  clearInput.forEach(function (el) {
    el.addEventListener("click", function () {
      var parent = this.parentElement
      var input = parent.querySelector(".form-control")
      input.focus();
      input.value = "";
      parent.classList.remove("not-empty");
    })
  })

  formControl.forEach(function (el) {
    // active
    el.addEventListener("focus", () => {
      var parent = el.parentElement
      parent.classList.add("active")
    });
    el.addEventListener("blur", () => {
      var parent = el.parentElement
      parent.classList.remove("active")
    });
    // empty check
    el.addEventListener("keyup", log);
    function log(e) {
      var inputCheck = this.value.length;
      if (inputCheck > 0) {
        this.parentElement.classList.add("not-empty")
      }
      else {
        this.parentElement.classList.remove("not-empty")
      }
    }
  })
}
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

 
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Notification
// trigger notification
var notificationCloseButton = document.querySelectorAll(".notification-box .close-button");
var notificationTaptoClose = document.querySelectorAll(".tap-to-close .notification-dialog");
var notificationBox = document.querySelectorAll(".notification-box");
var autoCloseNotification;

function closeNotificationBox() {
  notificationBox.forEach(function (el) {
    el.classList.remove("show")
    clearTimeout(autoCloseNotification)
  })
}
function notification(target, time) {
  var a = document.getElementById(target);
  closeNotificationBox()
  setTimeout(() => {
    a.classList.add("show")
  }, 250);
  if (time) {
    time = time + 250;
    autoCloseNotification = setTimeout(() => {
      closeNotificationBox()
    }, time);
  }
}
// close notification
notificationCloseButton.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    closeNotificationBox();
  })
});

// tap to close notification
notificationTaptoClose.forEach(function (el) {
  el.addEventListener("click", function (e) {
    closeNotificationBox();
  })
});
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Toast
var toastCloseButton;
var toastTaptoClose;
var toastBoxes;
var autoCloseToast;

export function closeToastBox() {
  toastBoxes.forEach(function (el) {
      el.classList.remove("show");
      clearTimeout(autoCloseToast);
  })
}
export function toastbox(target, time) {
  var a = document.getElementById(target);
  closeToastBox(target)
  setTimeout(() => {
      a.classList.add("show")
  }, 100);
  if (time) {
      time = time + 100;
      autoCloseToast = setTimeout(() => {
          closeToastBox()
      }, time);
  }
}

export function initializeToasts() {
  toastCloseButton = document.querySelectorAll(".toast-box .close-button");
  toastTaptoClose = document.querySelectorAll(".toast-box.tap-to-close");
  toastBoxes = document.querySelectorAll(".toast-box");

  // close button toast
  toastCloseButton.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      closeToastBox();
    });
  });

  // tap to close toast
  toastTaptoClose.forEach((el) => {
    el.addEventListener("click", (e) => {
      closeToastBox();
    });
  });
}

// Initialize on window load
if (typeof window !== "undefined") {
  window.onload = function () {
    initializeToasts();
  };
}

//-----------------------------------------------------------------------


//-----------------------------------------------------------------------

//-----------------------------------------------------------------------