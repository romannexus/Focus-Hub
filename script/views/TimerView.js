"use strict";

import View from "./View.js";

class TimerView extends View {
  constructor() {
    super();
    this._timerSection = document.getElementById("timer--section");
    this._timerName = document.getElementById("timer--name");
    this._timeValue = document.getElementById("timer--time-value");
    this._btnStart = document.getElementById("timer--btn-start");
    this._btnPause = document.getElementById("timer--btn-pause");
    this._btnReset = document.getElementById("timer--btn-reset");
    this._btnSettings = document.getElementById("timer--btn-settings");
    // modal
    this._modal = document.getElementById("modal");
    this._backdrop = document.getElementById("modal-backdrop");

    this._btnCancel = document.getElementById("modal--btn-cancel");
    this._btnSave = document.getElementById("modal--btn-save");

    this._inptFocusTime = document.getElementById("modal--input-focus-time");
    this._inptBreakTime = document.getElementById("modal--input-break-time");

    this._btnSettings.addEventListener("click", this._toggleModal.bind(this));
    this._btnCancel.addEventListener("click", this._toggleModal.bind(this));
    this._backdrop.addEventListener("click", this._toggleModal.bind(this));
  }
  _toggleModal() {
    this._modal.classList.toggle("hidden");
  }
  updateTimerText(value) {
    this._timeValue.textContent = value;
  }
  _switchBtnsStyle() {
    this._btnStart.classList.toggle("timer-btn-inactive");
    this._btnStart.classList.toggle("timer-btn-active");

    this._btnPause.classList.toggle("timer-btn-inactive");
    this._btnPause.classList.toggle("timer-btn-active");
  }
  switchModeUI(isFocused) {
    this._timerSection.classList.toggle("bg-white", isFocused);
    this._timerSection.classList.toggle("bg-gray-200", !isFocused);
    this._timerName.textContent = isFocused ? "Focus Session" : "Break Session";
  }
  formatTime(totalSeconds) {
    const minutes = String(Math.trunc(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${minutes}:${seconds}`;
  }
  addHandlerStart(handler) {
    this._btnStart.addEventListener("click", () => {
      if (handler()) this._switchBtnsStyle();
    });
  }
  addHandlerPause(handler) {
    this._btnPause.addEventListener("click", () => {
      if (handler()) this._switchBtnsStyle();
    });
  }
  addHandlerReset(handler) {
    this._btnReset.addEventListener("click", () => {
      handler();
      this._btnStart.classList.remove("timer-btn-inactive");
      this._btnStart.classList.add("timer-btn-active");

      this._btnPause.classList.add("timer-btn-inactive");
      this._btnPause.classList.remove("timer-btn-active");
    });
  }
  // modal window
  addHandlerSaveSettings(handler) {
    this._btnSave.addEventListener("click", () => {
      const focusTime = +this._inptFocusTime.value;
      const breakTime = +this._inptBreakTime.value;
      const isSuccess = handler(focusTime, breakTime);

      if (isSuccess) this._toggleModal();
    });
  }
}

export default new TimerView();
