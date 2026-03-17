"use strict";

import View from "./View.js";

class ToDoView extends View {
  constructor() {
    super();
    this._addBtn = document.getElementById("todo--btn-add");
    this._addText = document.getElementById("todo--task-text");
    this._taskList = document.getElementById("todo--list");
    this._dateFormatter = new Intl.DateTimeFormat(
      new Intl.Locale(navigator.language),
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  }
  clear() {
    this._taskList.innerHTML = " ";
  }
  addHandlerAddTask(handler) {
    this._addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const text = this._addText.value.trim();
      //guard
      if (text === "") return;

      handler(text);
      this._addText.value = "";
    });
  }
  addHandlerToggleTask(handler) {
    this._taskList.addEventListener("change", (e) => {
      const checkbox = e.target.closest('input[type="checkbox"]');
      //guard
      if (!checkbox) return;
      const isCompleted = checkbox.checked;
      const liID = e.target.closest("li").dataset.id;

      handler(liID, isCompleted);
    });
  }
  addHandlerDeleteTask(handler) {
    this._taskList.addEventListener("click", (e) => {
      const btn_delete = e.target.closest(".btn-delete");

      //guard
      if (!btn_delete) return;

      const li = e.target.closest("li");
      //delete animation
      li.classList.add("translate-x-full", "opacity-0");

      //delete timeout to see animation
      setTimeout(() => {
        li.remove();
        handler(li.dataset.id);
      }, 300);
    });
  }
  renderTask(newTask) {
    const emptyState = document.getElementById("empty-state");
    if (emptyState) emptyState.remove();

    const html = `
            <li
              data-id="${newTask.id}"
              class="group flex flex-col px-4 pt-4 pb-1.5 bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm rounded-[10px] transition-all duration-200"
            >
              <div class="flex items-center justify-between w-full">
                <label
                  class="task-label flex items-center gap-3 cursor-pointer flex-1"
                >
                  <input type="checkbox" ${newTask.is_completed ? "checked" : ""} class="peer sr-only" />

                  <div
                    class="flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded-[5px] bg-white text-transparent peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white transition-all shrink-0"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>

                  <span
                    class="text-[16px] text-gray-800 group-hover:text-blue-900 peer-checked:text-gray-400 peer-checked:line-through transition-all select-none"
                  >
                    ${newTask.title}
                  </span>
                </label>

                <button
                  class="btn-delete text-gray-400 hover:text-red-500 bg-transparent border-none p-2 rounded-lg hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200 m-0"
                  aria-label="Delete"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>

              <div class="w-full pl-8">
                  <span class="text-[10px] text-gray-400 font-medium tracking-wide">
                    ${this._dateFormatter.format(new Date(newTask.created_at))}
                  </span>
              </div>
            </li>`;
    this._taskList.insertAdjacentHTML("afterbegin", html);
  }
  renderSpinner() {
    const html = `
      <div class="flex justify-center items-center p-8 w-full">
        <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>`;
    this.clear();
    this._taskList.insertAdjacentHTML("afterbegin", html);
  }
  renderEmptyState() {
    const html = `
      <li id="empty-state" class="flex flex-col items-center justify-center py-10 text-gray-400 text-center border-2 border-dashed border-gray-200 rounded-[10px] bg-gray-50">
        <span class="text-4xl mb-3">📭</span>
        <p class="text-[16px] font-bold text-gray-500">List is empty</p>
        <p class="text-xs mt-1">Time to focus on your goals!</p>
      </li>
    `;
    this.clear();
    this._taskList.insertAdjacentHTML("afterbegin", html);
  }
}

export default new ToDoView();
