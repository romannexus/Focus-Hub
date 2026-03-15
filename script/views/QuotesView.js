"use strict";

class QuotesView {
  constructor() {
    this._quoteText = document.getElementById("quote-text");
  }
  renderQuote(text) {
    this._quoteText.textContent = text;
  }
}

export default new QuotesView();
