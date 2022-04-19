import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, Grid, TextField } from '@mui/material';
import { Paper, Select, MenuItem, InputLabel, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const EditSingleGym = () => {
  const urlParams = useParams();
  const [gym, setGym] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post(`${process.env.REACT_APP_API_PATH}/updateGymInfo`, gym)
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
            <Grid container xs={11} columnSpacing="4rem" rowSpacing="1rem" sx={{ pl: '1.5rem', m: '0 auto'}}>
              <Grid item>
                <TextField
                  name="address"
                  label="Address:"
                  value={gym.address}
                  required
                  onChange={(event) => { setGym({...gym, address: event.target.value})}}
                />
              </Grid>

              <Grid item>
                <TextField
                  name="phoneNumber"
                  label="Phone number:"
                  value={gym.phoneNumber}
                  onChange={(event) => { setGym({...gym, phoneNumber: event.target.value})}}
                />
              </Grid>

              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="headSetterId">Role</InputLabel>
                  <Select
                    name="headSetterId"
                    labelId="headSetterId"
                    label="headSetter: "
                    value={gym.headSetterId || 0}
                    onChange={(event) => { setGym({...gym, headSetterId: parseInt(event.target.value)})}}
                  >
                    {
                      gym.employees.map(employee => {
                        return (
                          <MenuItem
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

              <Grid item>
                <TextField
                  name="facebook"
                  label="Facebook:"
                  value={gym.facebook}
                  onChange={(event) => { setGym({...gym, facebook: event.target.value})}}
                />
              </Grid>

              <Grid item>
                <TextField
                  name="instagram"
                  label="Instagram Account:"
                  value={gym.instagram}
                  onChange={(event) => { setGym({...gym, instagram: event.target.value})}}
                />
              </Grid>

              <Grid item>
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
    </Box>
  );
}

  export default EditSingleGym;
