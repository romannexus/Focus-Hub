export default class View {
  _data;
  constructor() {
    this._signOutBtn = document.getElementById("btn-sign-out");
  }
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
  addHandlerSignOut(handler) {
    this._signOutBtn.addEventListener("click", () => {
      handler();
    });
  }
  renderError(message = "Something went wrong!") {
    const markup = `
      <div id="error-toast" class="fixed bottom-5 right-5 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-xl z-50 flex items-center gap-3">
        <span class="text-xl">⚠️</span>
        <span class="font-bold text-[14px]">${message}</span>
      </div>
    `;

    const oldToast = document.getElementById("error-toast");
    if (oldToast) oldToast.remove();

    document.body.insertAdjacentHTML("beforeend", markup);

    setTimeout(() => {
      const currentToast = document.getElementById("error-toast");
      if (currentToast) {
        currentToast.style.opacity = "0";
        currentToast.style.transition = "opacity 0.5s ease";
        setTimeout(() => currentToast.remove(), 500);
      }
    }, 3000);
  }
}
