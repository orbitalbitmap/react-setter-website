import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  Grid,
  TextField ,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';

import { useAddNewEmployeeMutation } from '../../services/gym';
import { setNotificationAlert } from '../../reducers/notificationsReducers';

const NewEmployeeForm = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [employeeGymList, setEmployeeGymList] = useState([]);
  const [currentGymNameList, setCurrentGymNameList] = useState([]);
  const [employeeGymNameList, setEmployeeGymNameList] = useState([]);

  const[
    saveNewEmployee,
    { isLoading, isUpdating, }
  ] = useAddNewEmployeeMutation();

  const handleCheckbox = (event) => {
    const {
      target: { value },
    } = event;
    
    const [gymName] = value.filter(gym => !employeeGymNameList.includes(gym)) 
    const [gymInfo] = gymName !== undefined ? locations.filter(gym => gym.name === gymName) : [null]

    gymInfo !== null && setEmployeeGymList(employeeGymList.concat(gymInfo))
    setEmployeeGymNameList(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      roleId,
      gyms: employeeGymList,
    }

    try {
      await saveNewEmployee(newUser);
      dispatch(setNotificationAlert({
        alertType: 'success',
        messageBody: 'A new employee has been saved!',
      }));
    } catch {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'Oops! Looks like something went wrong. Please Try again.',
      }));
    }
  }

  useEffect(() => {
    setCurrentGymNameList(locations.map((gym) => gym.name))
  }, [locations])

  return (
    <>
      <h1 className='centered-text'>New Employee Information</h1>
      <Paper elevation={12} component='div' sx={{ pb: '0.5rem', pt: '1rem' }}>
        <Grid container columnSpacing='2rem' rowSpacing='1rem'  sx={{ pl: '1.5rem' }}>
          <Grid item>
            <TextField
              label='First Name'
              value={firstName}
              required
              onChange = {(event) => setFirstName(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Last Name'
              value={lastName}
              required
              onChange = {(event) => setLastName(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Email'
              value={email}
              required
              onChange = {(event) => setEmail(event.target.value)}
              inputProps={{
                autoComplete: 'off'
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Password'
              value={password}
              required
              onChange = {(event) => setPassword(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Phone Number #'
              value={phoneNumber}
              onChange = {(event) => setPhoneNumber(event.target.value)}
            />
          </Grid>
          
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id='role-label'>Role</InputLabel>
              <Select
                labelId='role-label'
                label='Role'
                value={roleId}
                onChange={(event) => setRoleId(event.target.value)}
              >
                <MenuItem value='0' sx={{ color: '#fff' }}>Please select a role...</MenuItem>
                <MenuItem value='1' sx={{ color: '#fff' }}>Director of Routesetting</MenuItem>
                <MenuItem value='2' sx={{ color: '#fff' }}>Regional Head Setter</MenuItem>
                <MenuItem value='3' sx={{ color: '#fff' }}>Head Setter</MenuItem>
                <MenuItem value='4' sx={{ color: '#fff' }}>Full Time Setter</MenuItem>
                <MenuItem value='5' sx={{ color: '#fff' }}>Part Time Setter</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <h3 className='centered-text'>Locations:</h3>
        <Grid item>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id='demo-multiple-checkbox-label'>Employee's gyms</InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={employeeGymNameList}
              onChange={handleCheckbox}
              input={<OutlinedInput label="Employee's gyms" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {currentGymNameList.map((gym) => {
                return (
                <MenuItem key={gym} value={gym}>
                  <Checkbox sx={{ '&.Mui-checked': { color: '#fff'} }}
                  checked={employeeGymNameList.includes(gym)} />
                  <ListItemText primary={gym} />
                </MenuItem>
                )}
              )}
            </Select>
          </FormControl>
        </Grid>
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Save Employee</Button>
      </Paper>
    </>
  );
}

export default NewEmployeeForm;
