import axios from 'axios';
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import useCurrentLocationNameList from '../../../../hooks/useCurrentLocationNameList';
import useEmployeeInfo from '../../../../hooks/useEmployeeInfo';
import useDisableButton from '../../../../hooks/useDisableButton';
import { setSnackAlert } from '../../../../reducers/snackbarReducers';
import { setUser } from '../../../../reducers/userReducer';
import GymSelector from './GymSelector';

const LocationSelector = ({ urlId }) => {
  const dispatch = useDispatch();
  const { currentLocationNameList } = useCurrentLocationNameList();
  const { employee, employeeLocationNameList, handleCheckbox, } = useEmployeeInfo(urlId);
  const {disableSaveButton} = useDisableButton(employee.id, urlId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_PATH}/updateEmployee`, employee);
      dispatch(setSnackAlert({
        alertType: 'success',
        messageBody: 'Employee info updated!',
      }));
      dispatch(setUser(employee));
    } catch {
      dispatch(setSnackAlert({
        alertType: 'error',
        messageBody: 'Employee info could not be updated.  Please, try again.',
      }));
    }
  }

  return (
    <>
      <Typography className="centered-text" variant="h4">Locations:</Typography>
      <GymSelector 
        currentLocationNameList={currentLocationNameList} 
        employeeLocationNameList={employeeLocationNameList} 
        handleCheckbox={handleCheckbox}
      />
      <Button variant="contained" onClick={handleSubmit} disabled={disableSaveButton}>Save Employee</Button>
    </>
  );
};

export default LocationSelector;