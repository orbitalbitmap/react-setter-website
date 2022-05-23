import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Cookies } from 'react-cookie'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Copyright from './copyright/Copyright';
import { getLocations, signIn } from '../../actions'

const { checkPass } = require('../../utils/bcrypt');

const SignIn = (props) => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (enteredPassword.length <= 0 || enteredEmail.length <= 0) {
      window.alert("password and email are required")
      return
    }

    const {password, ...user} = (await axios.get(`${process.env.REACT_APP_API_PATH}/employeeByEmail/${enteredEmail}`)).data
    const passwordDoesMatch = await checkPass(enteredPassword, password);

    switch (passwordDoesMatch) {
      case true:
        props.signIn(user)
        props.getLocations()
        cookies.set('setter', user, { path: '/' })
        navigate('/dashboard', {replace: true})
        break
      case false:
        console.log('failure')
        break
      default:
        console.log('failure')
        break
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

export default connect(null, { getLocations, signIn })(SignIn)