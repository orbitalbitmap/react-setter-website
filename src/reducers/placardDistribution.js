import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const placardDistributionSlice = createSlice({
  name: 'placard distribution',
  initialState,
  reducers: {
    setPlacardDistribution: (state, action) => action.payload.distribution,
    removePlacardDistribution: (state, action) => null,
  }
});

export const { setPlacardDistribution, removePlacardDistribution } = placardDistributionSlice.actions;

export default placardDistributionSlice.reducer;