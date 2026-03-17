"use strict";

class StatsView {
  constructor() {
    this._completedTasksNum = document.getElementById("stat--completed-tasks");
    this._totalTasksNum = document.getElementById("stat--total-tasks");

    this._timeInFocus = document.getElementById("stat--time-in-focus");
  }
  renderTasksNum(totalNum, completedNum) {
    this._completedTasksNum.textContent = completedNum;
    this._totalTasksNum.textContent = totalNum;
  }
  renderTimeInFocus(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    let timeString = "";
    if (hours > 0) timeString += `${hours} hr `;
    timeString += `${minutes} min`;

    this._timeInFocus.textContent = timeString.trim();
  }
}

export default new StatsView();
