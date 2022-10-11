import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers';
import locationReducer from './reducers/locationReducers';

export const store = configureStore({
  reducer: {
    user: userReducer,
    locations: locationReducer,
  },
})