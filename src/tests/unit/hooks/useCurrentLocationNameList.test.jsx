import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import useCurrentLocationNameList from '../../../hooks/useCurrentLocationNameList';
import locationReducer, { setGymList } from '../../../reducers/locationReducers';

const mockStore = configureStore({
  reducer: {
    locations: locationReducer
  }
});

describe('useCurrentLocationNameList', () => {
  it('should update currentLocationNameList when locations change', () => {
    const initialLocations = [
      { id: 1, name: 'Gym 1' },
      { id: 2, name: 'Gym 2' },
    ];
    const updatedLocations = [
      { id: 3, name: 'New Gym 3' },
      { id: 4, name: 'Gym 4' },
    ];

    const store = mockStore({
      locations: initialLocations,
    });

    const { result, rerender } = renderHook(() => useCurrentLocationNameList(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    // checks the state to make sure it the initial values are loaded
    expect(result.current.currentLocationNameList).toEqual(['Gym 1', 'Gym 2']);

    // updates the state with the new state
    store.clearActions();
    store.getState().locations = updatedLocations;
    store.dispatch(setGymList(updatedLocations))
    rerender();

    // after the Redux state update, currentLocationNameList should reflect the changes.
    expect(result.current.currentLocationNameList).toEqual(['New Gym 3', 'Gym 4']);
  });
});
