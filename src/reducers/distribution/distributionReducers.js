import { createSlice, current } from "@reduxjs/toolkit";
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
    setBoulderDistribution: (state, action) => {
      return {
        ...state,
        boulderDistribution: action.payload,
      }
    },
    setRouteDistribution: (state, action) => {
        state.routeDistribution = action.payload;
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
    },
    updateDates: updateDistributionDates,
    
    updateClimbColor: (state, action) => {
      const { color, climbId, distributionType } = action.payload
      const indexToUpdate =  state.routeDistribution.findIndex((climb) => climb.id === climbId);

      state[distributionType][indexToUpdate].color = color;
    }
    
  }

});

export const { removeDistributions, setBoulderDistribution, setRouteDistribution, updateClimbColor, updateDates, updateRouteDistribution } = distributionSlice.actions;

export default distributionSlice.reducer;