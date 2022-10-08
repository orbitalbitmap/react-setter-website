import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, Grid, TextField } from '@mui/material';
import { Paper, Select, MenuItem, InputLabel, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const EditSingleGym = () => {
  const urlParams = useParams();
  const [gym, setGym] = useState({});
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post(`${process.env.REACT_APP_API_PATH}/updateGymInfo`, gym)
      setOpen(true)
      setSnackbarMessage('The gym\'s information has been saved!')
    } catch {
      setOpen(true)
      setSnackbarMessage('Oops! Looks like something went wrong. Please Try again.')
    }
  }

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/gymById/${urlParams.id}`)

      setGym(data)
    }

    getInfo()
  }, [urlParams])

  if (!gym.name) {
    return (<h2>We cannot find the gym you wish to edit.</h2>);
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        mt: 8
      }}
    >
      <Container sx={{ mt: '7rem', width: "80rem"}} >
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            color: 'primary.contrastText',
            bgcolor: 'primary.main',
          }}
        >
          <Typography className="centered-text" variant="h3">Edit {gym.name}'s Gym Information</Typography>
          <Paper className="centered-text" elevation={12} component="div" sx={{ pb: '0.5rem', pt: '1rem' }}>
            <Grid container rowSpacing="1rem" sx={{ m: '0 auto'}}>
              <Grid item xs={6}>
                <TextField
                  name="address"
                  label="Address:"
                  value={gym.address}
                  required
                  onChange={(event) => { setGym({...gym, address: event.target.value})}}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="phoneNumber"
                  label="Phone number:"
                  value={gym.phoneNumber}
                  onChange={(event) => { setGym({...gym, phoneNumber: event.target.value})}}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="headSetterId">Head Setter:</InputLabel>
                  <Select
                    name="headSetterId"
                    labelId="headSetterId"
                    label="Head Setter:"
                    value={gym.headSetterId || 0}
                    onChange={(event) => { setGym({...gym, headSetterId: parseInt(event.target.value)})}}
                  >
                    {
                      gym.employees.map(employee => {
                        return (
                          <MenuItem xs={6}
                            key={employee.id}
                            value={employee.id}
                            sx={{
                              color: (theme) => theme.palette.primary.contrastText
                            }}
                          >
                            {`${employee.firstName} ${employee.lastName}`}
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="facebook"
                  label="Facebook:"
                  value={gym.facebook}
                  onChange={(event) => { setGym({...gym, facebook: event.target.value})}}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="instagram"
                  label="Instagram Account:"
                  value={gym.instagram}
                  onChange={(event) => { setGym({...gym, instagram: event.target.value})}}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="twitter"
                  label="Twitter Account:"
                  value={gym.twitter}
                  onChange={(event) => { setGym({...gym, twitter: event.target.value})}}
                />
              </Grid>
            </Grid>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Update Info</Button>
          </Paper>
        </Paper>
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
  );
}

  export default EditSingleGym;
