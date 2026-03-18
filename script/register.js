"use strict";

import * as model from "./models/model.js";
import RegisterView from "./views/RegisterView.js";

const controlRegistration = async function (newUserData) {
  try {
    await model.registerUser(newUserData);
    window.location.href = "./index.html";
  } catch (err) {
    console.error(err.message);
    RegisterView.renderError(err.message);
  }
};

const init = function () {
  RegisterView.addHandlerSubmit(controlRegistration);
};

init();
