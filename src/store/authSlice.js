import { createSlice } from "@reduxjs/toolkit";

// Load saved auth state from localStorage
function loadAuthState() {
  try {
    const token = localStorage.getItem("google_token");
    const savedUser = localStorage.getItem("google_user");
    if (token && savedUser) {
      return {
        isLoggedIn: true,
        user: JSON.parse(savedUser),
        token,
      };
    }
  } catch (e) {
    // ignore parse errors
  }
  return {
    isLoggedIn: false,
    user: null,
    token: null,
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.profile;
      state.token = action.payload.token;
      localStorage.setItem("google_token", action.payload.token);
      localStorage.setItem("google_user", JSON.stringify(action.payload.profile));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("google_token");
      localStorage.removeItem("google_user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
