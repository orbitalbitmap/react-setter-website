import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertType: 'info',
  messageBody: '',
}

const notifications = createSlice({
  name: 'notification alerts',
  initialState,
  reducers: {
    setNotificationAlert: (state, action) => action.payload,
    resetNotificationAlert: (state, action) => initialState,
  },
});

export const { setNotificationAlert, resetNotificationAlert } = notifications.actions;

export default notifications.reducer;