"use strict";

import * as model from "./models/model.js";
import UpdatePswdView from "./views/ResetPswdView.js";

const controlUpdatePassword = async function (newPassword) {
  try {
    await model.updateNewPassword(newPassword);

    window.location.href = "./index.html";
  } catch (err) {
    UpdatePswdView.renderError(err.message);
  }
};

const init = async function () {
  try {
    await model.checkUserAuth();
    UpdatePswdView.submitAddHandler(controlUpdatePassword);
  } catch (err) {
    window.location.href = "./index.html";
    UpdatePswdView.renderError(err);
  }
};
init();
