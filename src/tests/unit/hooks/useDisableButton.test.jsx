import React from 'react';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import useDisableButton from '../../../hooks/useDisableButton';
import userReducer from '../../../reducers/userReducer';

describe('useDisableButton', () => {
  const mockStore = configureStore({
    reducer: {
      user: userReducer
    }
  });

  it('should return a value of `false` when useDisableButton is passed matching values', () => {
    const user = {
      id: 7357,
      firstName: 'Test',
      lastName: 'McTester',
      placardName: 'Test',
      email: 'test',
      phoneNumber: 'test',
      roleId: 1,
      deletedAt: null,
      role: 'test',
      gyms: [],
      loggedIn: true,
    };

    const store = mockStore({
      user,
    });

    const { result } = renderHook(() => useDisableButton(1, 1), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    // checks that the returned value is what is expected
    expect(result.current.disableSaveButton).toBe(false);
  });

  it('should return a value of `true` when useDisableButton is passed mismatching values', () => {
    const user = {
      id: 7357,
      firstName: 'Test',
      lastName: 'McTester',
      placardName: 'Test',
      email: 'test',
      phoneNumber: 'test',
      roleId: 5,
      deletedAt: null,
      role: 'test',
      gyms: [],
      loggedIn: true,
    };

    const store = mockStore({
      user,
    });

    const { result } = renderHook(() => useDisableButton(1, 2), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    // checks that the returned value is what is expected
    expect(result.current.disableSaveButton).toBe(true);
  });
});
