// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import Notificationreducer from "./NotificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: Notificationreducer,
    // Add other reducers here if needed
  },
});

export default store;
