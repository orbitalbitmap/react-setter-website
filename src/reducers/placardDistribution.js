import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boulderDistribution: null,
  routeDistribution: null,
};

export const placardDistributionSlice = createSlice({
  name: 'placard distribution',
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

export const { setBoulderDistribution, setRouteDistribution, removeDistributions } = placardDistributionSlice.actions;

export default placardDistributionSlice.reducer;