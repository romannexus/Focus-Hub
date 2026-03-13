"use strict";

import * as model from "./models/model.js";
import ToDoView from "./views/ToDoView.js";
import TimerView from "./views/TimerView.js";

const controlSignOut = async function () {
  try {
    await model.logoutUser();

    //change the page
    window.location.replace("./index.html");
  } catch (err) {
    console.error("Falied to logout", err);
  }
};

const controlAddTask = async function (taskText) {
  try {
    //get task from supa table with id
    const newTask = await model.uploadTask(taskText);

    //draw task with id
    ToDoView.renderTask(newTask);
  } catch (err) {
    console.error("Error when adding task", err);
  }
};

const controlToggleTask = async function (id, isCompleted) {
  try {
    await model.updateTaskStatus(id, isCompleted);
  } catch (err) {
    console.error("Failed to update task");
  }
};

const controlDeleteTask = async function (id) {
  try {
    await model.deleteTask(id);
  } catch (err) {
    console.error(err);
  }
};
///////////////////////////////////////////////////////////////////////////////////
const controlStartTimer = function () {
  model.startTimer(
    (timeLeft) => {
      TimerView.updateTimerText(TimerView.formatTime(timeLeft));
    },
    (timeLeft, isFocused) => {
      setTimeout(() => {
        TimerView.updateTimerText(TimerView.formatTime(timeLeft));
        TimerView.switchModeUI(isFocused);
      }, 1000);
    },
  );
};
const controlPauseTimer = function () {
  model.pauseTimer();
};
const controlResetTimer = function () {
  const { time, isFocused } = model.resetTimer();
  TimerView.updateTimerText(TimerView.formatTime(time));
  TimerView.switchModeUI(isFocused);
};
const controlSaveSettings = function (focusTime, breakTime) {
  try {
    const { time, isFocused } = model.updateSettings(focusTime, breakTime);
    TimerView.updateTimerText(TimerView.formatTime(time));
    TimerView.switchModeUI(isFocused);

    TimerView.removeErrTxt();
    return true;
  } catch (err) {
    TimerView.renderErrTxt(err);
    return false;
  }
};
///////////////////////////////////////////////////////////////////////////////////
const initApp = async function () {
  try {
    //checks if there is user and he is logged in
    await model.checkUserAuth();
    //spinner before tasks
    ToDoView.renderSpinner();
    //loading all tasks this user has
    const data = await model.loadTasks();
    //delete spinner
    ToDoView.clear();
    //rendering all tasks
    data.forEach((t) => ToDoView.renderTask(t));
  } catch (err) {
    window.location.replace("./index.html");
  }
};
TimerView.addHandlerStart(controlStartTimer);
TimerView.addHandlerPause(controlPauseTimer);
TimerView.addHandlerReset(controlResetTimer);
TimerView.addHandlerSaveSettings(controlSaveSettings);

ToDoView.addHandlerAddTask(controlAddTask);
ToDoView.addHandlerToggleTask(controlToggleTask);
ToDoView.addHandlerDeleteTask(controlDeleteTask);
ToDoView.addHandlerSignOut(controlSignOut);
initApp();
