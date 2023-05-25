import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployeeList: (state, action) => action.payload.employees,
    removeEmployeeList: (state, action) => null,
  },
});

export const { setEmployeeList, removeEmployeeList } = employeeSlice.actions;

export default employeeSlice.reducer;