import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setGymList: (state, action) => action.payload.gyms,
    removeLocationList: (state, action) => null,
  },
});

// Action creators are generated for each case reducer function
export const { setGymList, removeLocationList } = locationSlice.actions;

export default locationSlice.reducer;