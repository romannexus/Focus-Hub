"use strict";

import * as model from "./models/model.js";
import ToDoView from "./views/ToDoView.js";
import TimerView from "./views/TimerView.js";
import QuotesView from "./views/QuotesView.js";
import MusicPlayerView from "./views/MusicPlayerView.js";

const controlSignOut = async function () {
  try {
    await model.logoutUser();

    //change the page
    window.location.replace("./index.html");
  } catch (err) {
    console.error("Falied to logout", err);
  }
};
///////////////////////////////////////////////////////////////////////
const controlLoadQoute = async function () {
  try {
    const quote = await model.loadRandomQuote();
    QuotesView.renderQuote(quote);
  } catch (err) {
    console.error("Failed to load a quote", err);
  }
};
// ////////////////////////////////////////////////////////////////////
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
//player
const controlTogglePlayer = function () {
  model.togglePlayer();
};

const controlChangeVolume = function (volume) {
  model.changeVolume(volume);
};

const controlChangeSourceMusic = function (musicName) {
  model.changeMusicSrc(musicName);
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

    //loading random quote
    controlLoadQoute();
  } catch (err) {
    window.location.replace("./index.html");
    console.error(err);
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

MusicPlayerView.addHandlerTogglePlayer(controlTogglePlayer);
MusicPlayerView.addHandlerChangeVolume(controlChangeVolume);
MusicPlayerView.AddHandlerSwitch(controlChangeSourceMusic);
initApp();
