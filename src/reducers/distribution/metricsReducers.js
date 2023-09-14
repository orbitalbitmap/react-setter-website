import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gymName: '',
  gymMetrics: {
    bouldersPerSetter: null,
  },
};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setGymMetrics: (state, action) => { 
      state.gymName = action.payload.gym; 
      state.gymMetrics = {...action.payload.gymMetrics};
    },
  },
});

export const { setGymMetrics } = metricsSlice.actions;

export default metricsSlice.reducer;