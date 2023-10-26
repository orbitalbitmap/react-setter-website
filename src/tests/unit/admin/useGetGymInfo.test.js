import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { setupStore } from '../../../store';

import locationReducer, { setGymList } from '../../../reducers/locationReducers';
import useGetGymInfo from '../../../components/admin/hooks/useGetGymInfo';
import { gymApi } from '../../../services/gym';

const mockStore = configureStore({
  reducer: {
    [gymApi.reducerPath]: gymApi.reducer,
    locations: locationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gymApi.middleware),
});


describe('useGetGymInfo', () => {
  const store = mockStore({});
  // const store = setupStore({});
  it('should update currentLocationNameList when locations change', () => {
    const { result, rerender } = renderHook(() => useGetGymInfo('1'), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    console.log(result.current)
  });
});
