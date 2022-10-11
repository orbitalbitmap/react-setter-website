import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  placardName: "",
  email: "",
  phoneNumber: "",
  roleId: 999,
  deletedAt: null,
  role: {},
  gyms: [],
  loggedIn: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
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
      state.loggedIn = true
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer