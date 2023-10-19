import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import useEmployeeInfo from '../../../hooks/useEmployeeInfo';
import employeeReducers from '../../../reducers/employeeReducers';
import locationReducers from '../../../reducers/locationReducers';

describe('useEmployeeInfo', () => {
  const mockStore = configureStore({
    reducer: {
      employees: employeeReducers,
      locations: locationReducers,
    }
  });

  const mockLocations = [
    { id: 1, name: 'Gym 1' },
    { id: 2, name: 'Gym 2' },
  ];

  const mockEmployees = [
    { id: 1, firstName: 'Employee1', lastName: 'One', gyms: [{id: 1, name: 'Test Gym 1'}]},
    { id: 2, firstName: 'Employee2', lastName: 'Two', gyms: [{id: 1, name: 'Test Gym 1'}]},
  ];

  it('should return an object containing info matching passed in id with an employee that has a matching id from state', () => {

    const store = mockStore({
      employees: mockEmployees,
      locations: mockLocations,
    });

    const { result } = renderHook(() => useEmployeeInfo(1), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    // checks the returned object contains keys from the hook that are 
    // equal to specific values, specific lengths, or are defined
    expect(result.current.employee.firstName).toBe('Employee1');
    expect(result.current.employee.lastName).not.toBe('Two');
    expect(result.current.employeeLocationNameList).toHaveLength(1);
    expect(result.current.handleChange).toBeDefined();
    expect(result.current.handleCheckbox).toBeDefined();
  });
});
