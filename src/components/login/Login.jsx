import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { setSnackAlert } from '../../reducers/snackbarReducers';

import Copyright from './copyright/Copyright';
import { setUser, } from '../../reducers/userReducer';
import { setGymPanel } from '../../reducers/gymTabPanelReducers';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (enteredPassword.length <= 0 || enteredEmail.length <= 0) {
      dispatch(setSnackAlert({
        alertType: 'Error',
        messageBody: 'Please enter both an email and password'
      }));
      return
    }
    // handle login from the server side better (currently not handled at all and any valid email will work)
    const {data} = await axios({ 
          url: `${process.env.REACT_APP_API_PATH}/employeeByEmail`,
          method: 'POST',
          data: {
            email: enteredEmail,
            password: enteredPassword,
        },
      })

      if (data.id) {
        dispatch(setUser(data));
        dispatch(setGymPanel())
        navigate("/dashboard");
      } else {
        dispatch(setSnackAlert({
          alertType: 'Error',
          messageBody: 'There was an error while logging in. Please make sure all information is correct and try again.'
        }));
      }
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 8,
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              autoComplete="email"
              autoFocus
              fullWidth
              id="email"
              label="Email Address"
              margin="normal"
              name="email"
              onChange={(event) => setEnteredEmail(event.target.value)}
              required
              type="email"
            />

            <TextField
              autoComplete="current-password"
              fullWidth
              id="password"
              label="Password"
              margin="normal"
              name="password"
              onChange={(event) => setEnteredPassword(event.target.value)}
              required
              type="password"
            />

            <Button
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

export default SignIn