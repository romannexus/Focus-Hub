"use strict";

import * as model from "./models/model.js";
import ForgotPswdView from "./views/ForgotPswdView.js";

const controlForgotPasswd = async function (email) {
  try {
    await model.forgotPassword(email);
    ForgotPswdView.renderSuccess();
  } catch (err) {
    ForgotPswdView.renderError(err.message);
  }
};
const init = function () {
  ForgotPswdView.submitAddHandler(controlForgotPasswd);
};
init();
