"use strict";

class MusicPlayerView {
  constructor() {
    this._btnPlay = document.getElementById("player--btn-play");
    this._btnVolume = document.getElementById("player--btn-volume");

    this._containerBtns = document.getElementById("player--btns");
    this._btnsMusic = document.querySelectorAll(".js-sound-btn");
  }
  addHandlerTogglePlayer(handler) {
    this._btnPlay.addEventListener("click", () => {
      this._btnPlay.classList.toggle("is-playing");

      handler();
    });
  }
  addHandlerChangeVolume(handler) {
    this._btnVolume.addEventListener("input", () => {
      const volume = +this._btnVolume.value;
      handler(volume);
    });
  }
  AddHandlerSwitch(handler) {
    this._containerBtns.addEventListener("click", (e) => {
      const el = e.target.closest(".js-sound-btn");

      if (!el || el.classList.contains("sound-btn-active")) return;

      if (this._btnPlay.classList.contains("is-playing"))
        this._btnPlay.classList.toggle("is-playing");
      for (const btn of this._btnsMusic) {
        btn.classList.remove("sound-btn-active");
        btn.classList.add("sound-btn-inactive");
      }
      el.classList.add("sound-btn-active");
      handler(el.dataset.sound);
    });
  }
}

export default new MusicPlayerView();
