import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { gymApi } from './services/gym';
import distributionReducers from './reducers/distribution/distributionReducers';
import employeeReducers from './reducers/employeeReducers';
import gymTabPanelReducers from './reducers/gymTabPanelReducers';
import locationReducers from './reducers/locationReducers';
import metricsReducers from './reducers/distribution/metricsReducers';
import snackbarReducers from './reducers/snackbarReducers';
import userReducers from './reducers/userReducer';


export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
  [gymApi.reducerPath]: gymApi.reducer,
  distribution: distributionReducers,
  employees: employeeReducers,
  gymTabPanel: gymTabPanelReducers,
  locations: locationReducers,
  metrics: metricsReducers,
  snackbarDetails: snackbarReducers,
  user: userReducers,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gymApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);