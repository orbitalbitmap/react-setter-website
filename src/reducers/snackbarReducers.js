import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertType: '',
  messageBody: '',
}

const snackbarSlice = createSlice({
  name: 'snackbar alerts',
  initialState,
  reducers: {
    setSnackAlert: (state, action) => action.payload,
    resetSnackAlert: (state, action) => initialState,
  },
});

export const { setSnackAlert, resetSnackAlert } = snackbarSlice.actions;

export default snackbarSlice.reducer;