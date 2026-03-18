"use strict";

import View from "./View.js";

class ForgotPswd extends View {
  constructor() {
    super();
    this._resetForm = document.getElementById("reset_form");
    this._emailInpt = document.getElementById("email_input");
    this._successDiv = document.getElementById("success-div");
  }

  submitAddHandler(handler) {
    this._resetForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!this._emailInpt.validity.valid) {
        this._emailInpt.classList.add("border-red-400");
        this.renderError(this._emailInpt.validationMessage);
        return;
      }

      this._emailInpt.classList.remove("border-red-400");
      const email = this._emailInpt.value;
      handler(email);
    });
  }

  renderSuccess() {
    this._resetForm.classList.add("hidden");
    this._successDiv.classList.remove("hidden");
  }
}

export default new ForgotPswd();
