// src/slices/notificationsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverSocket } from "../backendSocket";
// Async Thunks
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await fetch(
      `${serverSocket}/notifications/readallnotifications`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

export const markNotificationSeen = createAsyncThunk(
  "notifications/markNotificationSeen",
  async (id) => {
    const response = await fetch(
      `${serverSocket}/notifications/${id}/mark-seen`,
      {
        method: "PUT",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return id; // Return the id to update the state
  }
);

export const fetchLatest10Notifications = createAsyncThunk(
  "notifications/fetchLatest10Notifications",
  async () => {
    const response = await fetch(`${serverSocket}/notifications/latest`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchNotificationsLast30Days = createAsyncThunk(
  "notifications/fetchNotificationsLast30Days",
  async () => {
    const response = await fetch(
      `${serverSocket}/notifications/latest-30-days`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("hjkvnjnvjnvnkv", data);
    return data;
  }
);

// Slice
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    latestNotifications: [],
    recentNotifications: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Mark notification as seen
      .addCase(markNotificationSeen.fulfilled, (state, action) => {
        const id = action.payload;
        const notification = state.notifications.find((n) => n.id === id);
        if (notification) {
          notification.seen = true;
        }
      })

      // Fetch latest 10 notifications
      .addCase(fetchLatest10Notifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLatest10Notifications.fulfilled, (state, action) => {
        state.latestNotifications = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchLatest10Notifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch notifications from the last 30 days
      .addCase(fetchNotificationsLast30Days.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotificationsLast30Days.fulfilled, (state, action) => {
        state.recentNotifications = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchNotificationsLast30Days.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default notificationsSlice.reducer;
