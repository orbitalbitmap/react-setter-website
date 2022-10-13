import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployeeList: (state, action) => action.payload.employees
  }
})

export const { setEmployeeList } = employeeSlice.actions 

export default employeeSlice.reducer