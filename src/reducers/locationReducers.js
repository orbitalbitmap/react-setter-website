import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setGymList: (state, action) => action.payload.gyms,
  },
})

// Action creators are generated for each case reducer function
export const { setGymList } = locationSlice.actions

export default locationSlice.reducer