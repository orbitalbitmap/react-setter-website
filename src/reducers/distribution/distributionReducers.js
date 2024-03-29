import { createSlice, } from "@reduxjs/toolkit";
import updateDistributionDates from "./utils/updateDistributionDates";

const initialState = {
  boulderDistribution: [],
  routeDistribution: [],
};

export const distributionSlice = createSlice({
  name: 'distribution',
  initialState,
  reducers: {
    removeDistributions: (state, action) => initialState,
    setBoulderDistribution: (state, action) => { state.boulderDistribution = action.payload; },
    setRouteDistribution: (state, action) => { state.routeDistribution = action.payload; },
    updateBoulderDistribution: (state, action) => {
      let [...distribution] = state.boulderDistribution;
      const newClimb = action.payload;
      const indexToChange = distribution.findIndex((climb) => climb.id === newClimb.id)

      distribution[indexToChange] = newClimb;

        state.boulderDistribution = distribution
    },
    updateRouteDistribution: (state, action) => {
      let [...distribution] = state.routeDistribution;
      const newClimb = action.payload;
      const indexToChange = distribution.findIndex((climb) => climb.id === newClimb.id)

      distribution[indexToChange] = newClimb;

      state.routeDistribution = distribution;
    },
    updateDates: updateDistributionDates,
  }

});

export const { removeDistributions, setBoulderDistribution, setRouteDistribution, updateClimbColor, updateDates, updateBoulderDistribution, updateRouteDistribution } = distributionSlice.actions;

export default distributionSlice.reducer;