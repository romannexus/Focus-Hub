"use strict";

import * as model from "./models/model.js";
import LoginView from "./views/LoginView.js";

const controlLogin = async function (userData) {
  try {
    await model.loginUser(userData);
    window.location.href = "./app.html";
  } catch (err) {
    LoginView.renderError(err.message);
  }
};

const init = function () {
  // console.log("RADOANDOIANDIUONAD");
  LoginView.addHandlerSubmit(controlLogin);
};

init();

// //for mobiles to scroll up
// const input = document.querySelector(".input");
// input.addEventListener("blur", function () {
//   setTimeout(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, 50);
// });
