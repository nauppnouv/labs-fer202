import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.profile;
      state.token = action.payload.token;
      localStorage.setItem("google_token", action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("google_token");
    },
    restoreSession: (state) => {
      const token = localStorage.getItem("google_token");
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      }
    },
  },
});

export const { loginSuccess, logout, restoreSession } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
