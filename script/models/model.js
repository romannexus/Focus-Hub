import { createClient } from "@supabase/supabase-js";

const supaURL = "https://jotxonvlmolsvzwdktuy.supabase.co";
const supaPublic =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvdHhvbnZsbW9sc3Z6d2RrdHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDg3NDgsImV4cCI6MjA4NzUyNDc0OH0.D9n42ywZNoz-JOFv-gm8xFSYevML0xRsixoIOIxDJQI";
const supabase = createClient(supaURL, supaPublic, {
  auth: {
    multiTab: false,
  },
});

export const state = {
  user: null,
};

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
