import { renderHook } from '@testing-library/react-hooks';

import useButtonDisplay from '../../../components/employees/hooks/useButtonDisplayType';

describe('useButtonDisplay', () => {
  const employee = { id: 1, name: 'test', };
  const user = { id: 1, name: 'test', };
  const nonMatchingUser = { id: 2, name: 'test', };

  it('should return the string `block` when an employee matches the current user', () => {
    const { result } = renderHook(() => useButtonDisplay(employee, user));

    // checks the returned object contains keys from the hook that are 
    // equal to specific values, specific lengths, or are defined
    expect(result.current).toBe('block');
  });

  it('should return the string `none` when an employee does not match the current user', () => {
    const { result } = renderHook(() => useButtonDisplay(employee, nonMatchingUser));

    // checks the returned object contains keys from the hook that are 
    // equal to specific values, specific lengths, or are defined
    expect(result.current).toBe('none');
  });
});
