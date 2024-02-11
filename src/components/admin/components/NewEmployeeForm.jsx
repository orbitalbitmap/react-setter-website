import {
  Box,
  FormControl,
  Grid,
  TextField ,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import useCurrentGymNameList from '../hooks/useNewEmployeeFormInfo';

const NewEmployeeForm = () => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    roleId,
    currentGymNameList,
    employeeGymNameList,
    loading,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setPhoneNumber,
    setRoleId,
    handleCheckbox,
    handleSubmit,
  } = useCurrentGymNameList()

  return (
    <Box data-testid="new-setter-form">
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
                defaultValue={'0'}
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
              {currentGymNameList?.map((gym, index) => {
                return (
                <MenuItem key={`${index}-${gym}`} value={gym}>
                  <Checkbox sx={{ '&.Mui-checked': { color: '#fff'} }}
                  checked={employeeGymNameList.includes(gym)} />
                  <ListItemText primary={gym} />
                </MenuItem>
                )}
              )}
            </Select>
          </FormControl>
        </Grid>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save Employee
        </LoadingButton>
      </Paper>
    </Box>
  );
}

export default NewEmployeeForm;
