import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  placardName: null,
  email: null,
  phoneNumber: null,
  roleId: null,
  deletedAt: null,
  role: null,
  gyms: null,
  loggedIn: null,
};

const setUserInfo = (state, action) => {
  state.id = action.payload.id;
  state.firstName = action.payload.firstName;
  state.lastName = action.payload.lastName;
  state.placardName = action.payload.placardName;
  state.email = action.payload.email;
  state.phoneNumber = action.payload.phoneNumber;
  state.roleId = action.payload.roleId;
  state.deletedAt = action.payload.deletedAt;
  state.role = action.payload.role;
  state.gyms = action.payload.gyms;
  state.loggedIn = true;
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: setUserInfo,
    removeUserInfo: (state, action) => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUserInfo } = userSlice.actions;

export default userSlice.reducer;