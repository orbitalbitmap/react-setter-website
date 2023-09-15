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
      console.log({payload: action.payload})
      state.gymName = action.payload.gymName; 
      state.gymMetrics = {...action.payload.gymMetrics};
    },
  },
});

export const { setGymMetrics } = metricsSlice.actions;

export default metricsSlice.reducer;