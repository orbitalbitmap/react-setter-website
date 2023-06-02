import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import useCurrentLocationNameList from '../../../../hooks/useCurrentLocationNameList';
import useEmployeeInfo from '../../../../hooks/useEmployeeInfo';
import useDisableButton from '../../../../hooks/useDisableButton';
import { setNotificationAlert } from '../../../../reducers/notificationsReducers';
import { setUser } from '../../../../reducers/userReducer';
import GymSelector from './GymSelector';

import { useUpdateEmployeeMutation } from '../../../../services/gym';
import { LoadingButton } from '@mui/lab';
import { useMemo } from 'react';

const LocationSelector = ({ urlId }) => {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const { currentLocationNameList } = useCurrentLocationNameList();
  const { employee, employeeLocationNameList, handleCheckbox, } = useEmployeeInfo(urlId);
  const {disableSaveButton} = useDisableButton(employee.id, urlId);

  const [
    updateEmployee,
    { isLoading, isUpdating},
  ] = useUpdateEmployeeMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateEmployee(employee);
      dispatch(setNotificationAlert({
        alertType: 'success',
        messageBody: 'Employee info updated!',
      }));
      if (user.id === employee.id) {
        dispatch(setUser(employee));
      }
    } catch {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'Employee info could not be updated.  Please, try again.',
      }));
    }
  }

  const loading = useMemo(() => {
    return isLoading || isUpdating;
  }, [isLoading, isUpdating]);

  return (
    <>
      <Typography className="centered-text" variant="h4">Locations:</Typography>
      <GymSelector 
        currentLocationNameList={currentLocationNameList} 
        employeeLocationNameList={employeeLocationNameList} 
        handleCheckbox={handleCheckbox}
      />
      {
        disableSaveButton
          ? null 
          : (
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  borderTop: '1px solid white',
                  borderBottom: '1px solid white',
                }}
              >
                  Save Distribution
              </LoadingButton>
          )
        }
    </>
  );
};

export default LocationSelector;