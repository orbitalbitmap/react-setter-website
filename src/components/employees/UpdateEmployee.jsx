import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { signIn } from '../../actions';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const UpdateEmployee = (props) => {
  const [employee, setEmployee] = useState({});
  const [currentGymNameList, setCurrentGymNameList] = useState([]);
  const [employeeGymNameList, setEmployeeGymNameList] = useState([]);
  const [open, setOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const snackBarAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/employees/${props.user.id}`);

      setEmployee({
          ...data,
          oldEmployeeGymList: data.gyms,
          password: 'NotYourRealPassword'
        });
      setEmployeeGymNameList(data.gyms.map(gym => gym.name));
    }

    getInfo();
  }, [props.user])

  useEffect(() => {
    setCurrentGymNameList(props.gyms.map((gym) => gym.name));
  }, [props.gyms])

  const handleChange = (event) => {
    setEmployee({
        ...employee,
        [event.target.name]: event.target.value
      });
  }

  const handleCheckbox = (event) => {
    const {
      target: { value },
    } = event;
    let newGymList;

    // the if executes adding info the else removes info form the employee's gym list
    if (value.length > employeeGymNameList.length) {
      // find the gym name in the updated multi-select value that is not in the employeeGymList
      const [gymNameToAdd] = value.filter(
        (gym) => !employeeGymNameList.includes(gym),
      );
      // get the missing gym to add to the employee's gyms list
      const [gymInfo] = props.gyms.filter((gym) => gym.name === gymNameToAdd);
      // set a new gymList
      newGymList = employee.gyms.concat(gymInfo);
    } else {
      // find the gym name in the employeeGymList that is not in the updated multi-select value
      const [gymNameToRemove] = employeeGymNameList.filter(
        (gym) => !value.includes(gym),
      );
      // remove gym from the employee's gyms list and set newGymList to the new list
      newGymList = employee.gyms.filter((gym) => gym.name !== gymNameToRemove);
    }

    setEmployee({ ...employee, gyms: newGymList });
    setEmployeeGymNameList(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`${process.env.REACT_APP_API_PATH}/updateEmployee`, employee);
    props.signIn(await employee);
    try {
      await axios.post(`${process.env.REACT_APP_API_PATH}/updateEmployee`, employee);
      props.signIn(await employee);
      setOpen(true)
      setSnackbarMessage('Your info has been saved!')
    } catch {
      setOpen(true)
      setSnackbarMessage('Oops! Looks like something went wrong. Please Try again.')
    }
  }
  
  if (!employee.id) {
    return (<h2>Loading...</h2>);
  }

  return (
    <>
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        height: '100vh',
        width: '100%',
      }}
    >
      <Container maxWidth="xl" sx={{ mt: '7rem', }} >
        <Grid container spacing={4}>
          <Grid item xs={8} sx={{ mx: 'auto' }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              color: 'primary.contrastText',
              bgcolor: 'primary.main',
            }}
          >
          <Typography className="centered-text" variant="h2" sx={{mb: '0.5rem'}} >{`${employee.firstName}'s Info`}</Typography>
          <Paper className="centered-text" elevation={12} component="div" sx={{ pb: '0.5rem', pt: '1rem' }}>
            <Grid container columnSpacing="4rem" rowSpacing="1rem" sx={{ pl: '1.5rem' }}>
              <Grid item>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={employee.firstName}
                  required
                  onChange = {handleChange}
                />
              </Grid>

              <Grid item>
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={employee.lastName}
                  required
                  onChange = {handleChange}
                />
              </Grid>

              <Grid item>
                <TextField
                  name="placardName"
                  label="Name on placard"
                  value={employee.placardName}
                  onChange = {handleChange}
                />
              </Grid>

              <Grid item>
                <TextField
                  name="email"
                  label="Email"
                  value={employee.email}
                  required
                  onChange = {handleChange}
                  inputProps={{
                    autoComplete: 'off'
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  name="password"
                  label="Password"
                  value={employee.password}
                  required
                  onChange = {handleChange}
                />
              </Grid>

              <Grid item>
                <TextField
                  name="phoneNumber"
                  label="Phone Number #"
                  value={employee.phoneNumber}
                  onChange = {handleChange}
                />
              </Grid>
              </Grid>

              <Typography className="centered-text" variant="h4">Locations:</Typography>
              <Grid sx={{m: 1}} >
                <FormControl>
                  <InputLabel id="demo-multiple-checkbox-label">Employee's gyms</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
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
                          checked={employeeGymNameList?.includes(gym)}
                        />
                        <ListItemText primary={gym} />
                      </MenuItem>
                      )}
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Button variant="contained" onClick={handleSubmit}>Save Employee</Button>
            </Paper>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={handleClose}
        action={snackBarAction}
        sx={{ bottom: {xs: 16 } }}
      />
    </Box>
  </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, { signIn })(UpdateEmployee);