import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boulderDistribution: null,
  routeDistribution: null,
};

export const distributionSlice = createSlice({
  name: 'distribution',
  initialState,
  reducers: {
    setBoulderDistribution: (state, action) => {
      return {
        ...state,
        boulderDistribution: action.payload,
      }
    },
    setRouteDistribution: (state, action) => {
      return {
        ...state,
        routeDistribution: action.payload,
      }
    },
    removeDistributions: (state, action) => initialState,
  }
});

export const { setBoulderDistribution, setRouteDistribution, removeDistributions } = distributionSlice.actions;

export default distributionSlice.reducer;