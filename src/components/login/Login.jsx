import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux'
import {
  Avatar,
  Box,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { setNotificationAlert } from '../../reducers/notificationsReducers';

import Copyright from './copyright/Copyright';

import { useLoginMutation } from '../../services/gym';
import { useCookies } from 'react-cookie';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [,setCookie] = useCookies(['userId', 'userRoleId', 'userLocations']);
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  const [
    login, 
    {isLoading, isUpdating}
  ] = useLoginMutation();

  const loading = useMemo(() => {
    return isLoading || isUpdating;
  }, [isLoading, isUpdating]);

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (enteredPassword.length <= 0 || enteredEmail.length <= 0) {
        dispatch(setNotificationAlert({
          alertType: 'error',
          messageBody: 'Please enter a valid email and valid password.'
        }));
        return;
      }


      const {data} = await login({
        email: enteredEmail,
        password: enteredPassword,
      });

      setCookie('userId', data.id);
      setCookie('userRoleId', data.roleId);
      setCookie('userLocations', data.gyms);
      

      navigate("/dashboard");
    } catch(err) {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'There was an error while logging in. Please make sure all information is correct and try again.'
      }));
    }
  }

  return (
      <Container component="main" maxWidth="xs">
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

            <LoadingButton
              loading={loading}
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              variant="contained"
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>

        <Copyright />
      </Container>
  );
}

export default SignIn