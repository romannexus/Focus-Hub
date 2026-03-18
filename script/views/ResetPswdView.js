"use strict";

import View from "./View.js";

class UpdatePswdView extends View {
  constructor() {
    super();
    this._updateForm = document.getElementById("update_password_form");
    this._newPswdInpt = document.getElementById("new_password");
    this._confirmPswdInpt = document.getElementById("confirm_password");
  }

  submitAddHandler(handler) {
    this._updateForm.addEventListener("submit", (e) => {
      e.preventDefault();

      this._newPswdInpt.classList.remove("border-red-400");
      this._confirmPswdInpt.classList.remove("border-red-400");

      if (!this._newPswdInpt.validity.valid) {
        this._newPswdInpt.classList.add("border-red-400");
        this.renderError(this._newPswdInpt.validationMessage);
        return;
      }
      if (!this._confirmPswdInpt.validity.valid) {
        this._confirmPswdInpt.classList.add("border-red-400");
        this.renderError(this._confirmPswdInpt.validationMessage);
        return;
      }

      const newPassword = this._newPswdInpt.value;
      const confirmPassword = this._confirmPswdInpt.value;

      if (newPassword !== confirmPassword) {
        this._newPswdInpt.classList.add("border-red-400");
        this._confirmPswdInpt.classList.add("border-red-400");
        this.renderError("Passwords do not match! Please try again.");
        return;
      }

      handler(newPassword);
    });
  }
}

export default new UpdatePswdView();
