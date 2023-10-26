import { configureStore } from '@reduxjs/toolkit';
import { gymApi } from './services/gym';
import distributionReducers from './reducers/distribution/distributionReducers';
import employeeReducers from './reducers/employeeReducers';
import gymTabPanelReducers from './reducers/gymTabPanelReducers';
import locationReducers from './reducers/locationReducers';
import metricsReducers from './reducers/distribution/metricsReducers';
import notificationsReducers from './reducers/notificationsReducers';
import userReducers from './reducers/userReducer';


export const setupStore = preloadedState => configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
  [gymApi.reducerPath]: gymApi.reducer,
  distribution: distributionReducers,
  employees: employeeReducers,
  gymTabPanel: gymTabPanelReducers,
  locations: locationReducers,
  metrics: metricsReducers,
  notificationsDetails: notificationsReducers,
  user: userReducers,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gymApi.middleware),
});
