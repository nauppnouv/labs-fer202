import { configureStore } from "@reduxjs/toolkit";
import orchidReducer from "./orchidSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    orchids: orchidReducer,
    auth: authReducer,
  },
});

export default store;
