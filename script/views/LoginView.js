"use strict";

import View from "./View.js";

class LoginView extends View {
  constructor() {
    super();
    this._loginForm = document.getElementById("login_form");
    this._allInp = document.querySelectorAll("input");
    this._errDiv = document.getElementById("error-div");

    this._addHandlerErrorClear(this._loginForm);
  }
  addHandlerSubmit(handler) {
    this._loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let hasErr = false;

      let errorMessage = "Check data validation!";

      this._allInp.forEach((inp) => {
        if (!inp.validity.valid) {
          inp.classList.add("border-red-400");
          hasErr = true;
          errorMessage = inp.validationMessage;
        } else {
          inp.classList.remove("border-red-400");
        }
      });

      if (hasErr) {
        this.renderError(errorMessage);
        return;
      }

      const formData = new FormData(this._loginForm);
      const user = Object.fromEntries(formData);

      console.log("Data is validated, wait a sec", user);
      this._loginForm.reset();

      handler(user);
    });
  }
}
export default new LoginView();
