// import { configureStore } from '@reduxjs/toolkit'
// // Or from '@reduxjs/toolkit/query/react'
// import { setupListeners } from '@reduxjs/toolkit/query'
// import { gymApi } from './services/gym'

// export const store = configureStore({
//   reducer: {
//     // Add the generated reducer as a specific top-level slice
//     [gymApi.reducerPath]: gymApi.reducer,
//   },
//   // Adding the api middleware enables caching, invalidation, polling,
//   // and other useful features of `rtk-query`.
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(gymApi.middleware),
// })

// // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducers';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
