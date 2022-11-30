import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
  boulderDistribution: null,
  routeDistribution: null,
};

export const distributionSlice = createSlice({
  name: 'distribution',
  initialState,
  reducers: {
    removeDistributions: (state, action) => initialState,
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
    updateRouteDistribution: (state, action) => {
      let [...distribution] = state.routeDistribution;
      const newClimb = action.payload;
      const indexToChange = distribution.findIndex((climb) => climb.id === newClimb.id)

      distribution[indexToChange] = newClimb;

      return {
        ...state,
        routeDistribution: distribution
      }
    }
  }
});

export const { removeDistributions, setBoulderDistribution, setRouteDistribution, updateRouteDistribution } = distributionSlice.actions;

export default distributionSlice.reducer;