"use strict";

import * as model from "./models/model.js";
import View from "./views/View.js";
import ToDoView from "./views/ToDoView.js";
import TimerView from "./views/TimerView.js";
import QuotesView from "./views/QuotesView.js";
import MusicPlayerView from "./views/MusicPlayerView.js";
import StatsView from "./views/StatsView.js";

const mainView = new View();

const controlSignOut = async function () {
  try {
    await model.logoutUser();

    //change the page
    window.location.replace("./index.html");
  } catch (err) {
    mainView.renderError("Falied to logout", err);
  }
};
///////////////////////////////////////////////////////////////////////
const controlLoadQoute = async function () {
  try {
    const quote = await model.loadRandomQuote();
    QuotesView.renderQuote(quote);
  } catch (err) {
    QuotesView.renderError("Failed to load a quote", err);
  }
};
// ////////////////////////////////////////////////////////////////////
const controlAddTask = async function (taskText) {
  try {
    //get task from supa table with id
    const newTask = await model.uploadTask(taskText);

    //draw task with id
    ToDoView.renderTask(newTask);
    //upd stats
    updCompletedTasksStats();
  } catch (err) {
    ToDoView.renderError("Error when adding task", err);
  }
};

const controlToggleTask = async function (id, isCompleted) {
  try {
    await model.updateTaskStatus(id, isCompleted);
    //upd stats
    updCompletedTasksStats();
  } catch (err) {
    ToDoView.renderError("Failed to update task");
  }
};

const controlDeleteTask = async function (id) {
  try {
    const remainingTasks = await model.deleteTask(id);
    // if there are no tasks
    if (remainingTasks === 0) {
      ToDoView.renderEmptyState();
    }
    //upd stats
    updCompletedTasksStats();
  } catch (err) {
    ToDoView.renderError(err);
  }
};
///////////////////////////////////////////////////////////////////////////////////
const controlStartTimer = function () {
  return model.startTimer(
    (timeLeft) => {
      TimerView.updateTimerText(TimerView.formatTime(timeLeft));
    },
    (timeLeft, isFocused) => {
      if (!isFocused) StatsView.renderTimeInFocus(model.addTimeInFocus());
      setTimeout(() => {
        TimerView.updateTimerText(TimerView.formatTime(timeLeft));
        TimerView.switchModeUI(isFocused);
      }, 1000);
    },
  );
};
const controlPauseTimer = function () {
  return model.pauseTimer();
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

    return true;
  } catch (err) {
    TimerView.renderError(err);
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
//statistics
const updCompletedTasksStats = function () {
  const [all, completed] = model.calcTasksNum();
  StatsView.renderTasksNum(all, completed);
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
    //rendering all tasks. if no tasks than empty space;
    if (data.length === 0) {
      ToDoView.renderEmptyState();
    } else {
      data.forEach((t) => ToDoView.renderTask(t));
    }
    //upd stats
    updCompletedTasksStats();

    //loading random quote
    controlLoadQoute();
  } catch (err) {
    window.location.replace("./index.html");
    mainView.renderError(err);
  }
};
mainView.addHandlerSignOut(controlSignOut);

TimerView.addHandlerStart(controlStartTimer);
TimerView.addHandlerPause(controlPauseTimer);
TimerView.addHandlerReset(controlResetTimer);
TimerView.addHandlerSaveSettings(controlSaveSettings);

ToDoView.addHandlerAddTask(controlAddTask);
ToDoView.addHandlerToggleTask(controlToggleTask);
ToDoView.addHandlerDeleteTask(controlDeleteTask);

MusicPlayerView.addHandlerTogglePlayer(controlTogglePlayer);
MusicPlayerView.addHandlerChangeVolume(controlChangeVolume);
MusicPlayerView.AddHandlerSwitch(controlChangeSourceMusic);
initApp();
