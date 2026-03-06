"use strict";

import View from "./View.js";

class RegisterView extends View {
  constructor() {
    super();
    this._registerForm = document.querySelector("form");
    this._dateInput = document.getElementById("bday");
    this._password = document.getElementById("password");
    this._password_repeat = document.getElementById("password-repeat");
    this._allInputs = document.querySelectorAll("input");
    this._errDiv = document.getElementById("error-div");

    this._setMinMaxDates();
    this._addHandlerErrorClear(this._registerForm);
  }
  _setMinMaxDates() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDateMax = `${year}-${month}-${day}`;
    const formattedDateMin = `${year - 100}-${month}-${day}`;

    this._dateInput.max = formattedDateMax;
    this._dateInput.min = formattedDateMin;
  }
  addHandlerSubmit(handler) {
    this._registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let hasErr = false;

      this._allInputs.forEach((inp) => {
        if (!inp.validity.valid) {
          inp.classList.add("border-red-400");
          hasErr = true;
          //   inp.value = "";
          inp.placeholder = inp.validationMessage;
        }
      });

      if (hasErr) return;

      if (
        this._password.value !== this._password_repeat.value &&
        this._password.value.trim() !== ""
      ) {
        console.error("Password dont match !");
        this._password.classList.add("border-red-400");
        this._password_repeat.classList.add("border-red-400");
        this.renderError("Password dont match !");
        return;
      }

      const formData = new FormData(this._registerForm);
      const newUser = Object.fromEntries(formData);

      console.log("Data is validated, wait a sec", newUser);
      this._registerForm.reset();

      handler(newUser);
    });
  }
}
export default new RegisterView();
