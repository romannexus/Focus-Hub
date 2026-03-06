export default class View {
  _data;

  _addHandlerErrorClear(formElement) {
    //guard : child must have form
    if (!formElement) return;

    formElement.addEventListener("input", (e) => {
      if (
        e.target.tagName === "INPUT" &&
        e.target.classList.contains("border-red-400")
      ) {
        e.target.classList.remove("border-red-400");
        e.target.placeholder = "";
      }
      if (this._errDiv) this._errDiv.classList.add("hidden");
    });
  }
  renderError(message) {
    this._errDiv.classList.remove("hidden");
    this._errDiv.firstElementChild.textContent = message;
  }
}
