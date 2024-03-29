import { useMemo, useState } from 'react';
import { Box, FormControl, Grid, TextField, } from '@mui/material';
import { Paper, Select, MenuItem, InputLabel } from '@mui/material';

import { useAddNewGymMutation } from '../../../services/gym';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationAlert } from '../../../reducers/notificationsReducers';
import { LoadingButton } from '@mui/lab';

const NewGymForm = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [headSetterId, setHeadSetterId] = useState(0);
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const employees = useSelector(state => state.employees);

  const [
    saveNewGym,
    { isLoading, isUpdating }
  ] = useAddNewGymMutation();
  
  const loading = useMemo(() => {
    return isLoading || isUpdating;
  }, [isLoading, isUpdating])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.length) {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'Missing information, please enter all of the required fields.',
      }));
      
      return;
    }

    try {
      await saveNewGym({
        name,
        address,
        phoneNumber,
        headSetterId,
        facebook,
        instagram,
        twitter,
      });

      dispatch(setNotificationAlert({
        alertType: 'success',
        messageBody: 'A new gym has been saved!',
      }));
    } catch {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'Oops! Looks like something went wrong. Please Try again.',
      }));
    }
  }


  return ( 
    <Box data-testid="new-gym-form">
      <h1 className='centered-text'>New's Gym Information</h1>
      <Paper elevation={12} component='div' sx={{ pb: '0.5rem', pt: '1rem' }}>
        <Grid container columnSpacing='2rem' rowSpacing='1rem'  sx={{ ml: '-1rem' }}>
          <Grid item>
            <TextField
              label='Gym Name'
              value={name}
              required
              onChange = {(event) => setName(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Address'
              value={address}
              onChange = {(event) => setAddress(event.target.value)}
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
            <TextField
              label='Facebook'
              value={facebook}
              onChange = {(event) => setFacebook(event.target.value)}
              inputProps={{
                autoComplete: 'off'
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Instagram'
              value={instagram}
              onChange = {(event) => setInstagram(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Twitter'
              value={twitter}
              onChange = {(event) => setTwitter(event.target.value)}
            />
          </Grid>
          

            <Grid item>
              <FormControl fullWidth>
                <InputLabel id='head-setter-label'>Head Setter</InputLabel>
                <Select
                  labelId='head-setter-label'
                  label='Head Setter'
                  value={headSetterId}
                  onChange={(event) => setHeadSetterId(event.target.value)}
                >
                  <MenuItem value='0' sx={{ color: '#fff' }}>Please select a head setter...</MenuItem>
                  {
                    employees.map(employee => (
                      <MenuItem 
                        key={employee.id}
                        value={employee.id}
                        sx={{ color: '#fff' }}
                      >
                        {`${employee.firstName} ${employee.lastName}`}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
        </Grid>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save Gym
        </LoadingButton>
      </Paper>
    </Box>
  );
}

export default NewGymForm;