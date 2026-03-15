import { createClient } from "@supabase/supabase-js";

import calmMP3 from "url:../../music/calm1.ogg";
import rainMP3 from "url:../../music/rain.ogg";
import forestMP3 from "url:../../music/forest.ogg";

const supaURL = "https://jotxonvlmolsvzwdktuy.supabase.co";
const supaPublic =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvdHhvbnZsbW9sc3Z6d2RrdHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDg3NDgsImV4cCI6MjA4NzUyNDc0OH0.D9n42ywZNoz-JOFv-gm8xFSYevML0xRsixoIOIxDJQI";
const supabase = createClient(supaURL, supaPublic, {
  auth: {
    multiTab: false,
  },
});
const soundFiles = {
  calm: calmMP3,
  rain: rainMP3,
  forest: forestMP3,
};

export const state = {
  user: null,
  player: {
    audio: new Audio(),
    isPlaying: false,
    currentSound: "calm",
  },
  timer: {
    timeLeft: 1500,
    focusDuration: 1500,
    breakDuration: 300,
    isRunning: false,
    isFocused: true,
    intervalID: null,
  },
};
state.player.audio.volume = 0.5;

// Додаємо хитрий хак для безшовного лупу:
state.player.audio.addEventListener("timeupdate", function () {
  // buffer - це запас часу (0.2 або 0.3 секунди)
  const buffer = 0.35;
  if (this.currentTime > this.duration - buffer) {
    this.currentTime = 0; // Відмотуємо на початок ДО того, як настане тиша
    this.play();
  }
});
/////////////////////////////////////////////////////////////////////////
//user
export const loginUser = async function (userData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password,
  });

  if (error) throw error;

  return data;
};

export const registerUser = async function (userData) {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        birth_day: userData.bday,
      },
      // emailRedirectTo: "https://localhost",
    },
  });
  if (error) throw error;
  return data;
};

export const logoutUser = async function () {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  state.user = null;
};

export const checkUserAuth = async function () {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("User not logged in");

  state.user = data.user;
};
/////////////////////////////////////////////////////////////////////////////////////
//TO-DO list
export const loadTasks = async function () {
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) throw error;
  return data;
};

export const uploadTask = async function (taskText) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title: taskText, user_id: state.user.id }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateTaskStatus = async function (id, isCompleted) {
  const { error } = await supabase
    .from("tasks")
    .update({ is_completed: isCompleted })
    .eq("id", id);

  if (error) throw error;
};

export const deleteTask = async function (id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw error;
};
///////////////////////////////////////////////////////////////////////
//Pomodoro Timer
export const startTimer = function (tickCallBack, endCallBack) {
  if (state.timer.isRunning) return;
  state.timer.isRunning = true;

  state.timer.intervalID = setInterval(() => {
    state.timer.timeLeft--;
    tickCallBack(state.timer.timeLeft);

    if (state.timer.timeLeft === 0) {
      clearInterval(state.timer.intervalID);
      state.timer.isRunning = false;
      state.timer.isFocused = !state.timer.isFocused;
      state.timer.timeLeft = state.timer.isFocused
        ? state.timer.focusDuration
        : state.timer.breakDuration;
      endCallBack(state.timer.timeLeft, state.timer.isFocused);
    }
  }, 1000);
};
export const pauseTimer = function () {
  clearInterval(state.timer.intervalID);
  state.timer.isRunning = false;
};
export const resetTimer = function () {
  pauseTimer();
  state.timer.isFocused = true;
  state.timer.timeLeft = state.timer.focusDuration;
  return {
    time: state.timer.timeLeft,
    isFocused: state.timer.isFocused,
  };
};
///////////////
// modal
export const updateSettings = function (focusTime, breakTime) {
  if (focusTime < 1 || focusTime > 90)
    throw new Error("Focus time is out of range! (1-90 mins)");
  if (breakTime < 1 || breakTime > 30)
    throw new Error("Break time is out of range! (1-30 mins)");
  state.timer.focusDuration = focusTime * 60;
  state.timer.breakDuration = breakTime * 60;
  return resetTimer();
};

// //////////////////////////////////////////////////////
// quotes
export const loadRandomQuote = async function () {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    // author : "Abdul Kalam"
    // id: 104
    // quote: "For 2,500 years, India has never invaded anybody."
    return data.quote;
  } catch (err) {
    throw err;
  }
};
//////////////////////////////////////////////////////////
// player
export const togglePlayer = function () {
  if (state.player.isPlaying) {
    state.player.audio.pause();
    state.player.isPlaying = false;
  } else {
    if (!state.player.audio.src) {
      state.player.audio.src = soundFiles[state.player.currentSound];
      state.player.audio.loop = true;
    }
    state.player.audio.play();
    state.player.isPlaying = true;
  }
};

export const changeVolume = function (volume) {
  state.player.audio.volume = volume / 100;
};

export const changeMusicSrc = function (musicName) {
  state.player.currentSound = musicName;
  state.player.audio.src = soundFiles[state.player.currentSound];
  state.player.isPlaying = false;
};
