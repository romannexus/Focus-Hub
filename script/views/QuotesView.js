"use strict";

import View from "./View.js";

class QuotesView extends View {
  constructor() {
    super();
    this._quoteText = document.getElementById("quote-text");
  }
  renderQuote(text) {
    this._quoteText.textContent = text;
  }
}

export default new QuotesView();
