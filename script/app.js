"use strict";

import * as model from "./models/model.js";
import AppView from "./views/AppView.js";

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
    AppView.renderTask(newTask);
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

const initApp = async function () {
  try {
    //checks if there is user and he is logged in
    await model.checkUserAuth();
    //spinner before tasks
    AppView.renderSpinner();
    //loading all tasks this user has
    const data = await model.loadTasks();
    //delete spinner
    AppView.clear();
    //rendering all tasks
    data.forEach((t) => AppView.renderTask(t));
  } catch (err) {
    window.location.replace("./index.html");
  }
};

AppView.addHandlerAddTask(controlAddTask);
AppView.addHandlerToggleTask(controlToggleTask);
AppView.addHandlerDeleteTask(controlDeleteTask);
AppView.addHandlerSignOut(controlSignOut);
initApp();
