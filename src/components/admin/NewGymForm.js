import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormControl, Grid, TextField, Button } from '@mui/material';
import { Paper, Select, MenuItem, InputLabel } from '@mui/material';

const NewGymForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [headSetterId, setHeadSetterId] = useState(0);
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getInfo = async () =>{
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/employees`)

      setEmployees(data)
    }

    getInfo()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post(`${process.env.REACT_APP_API_PATH}/saveNewGym`, {
      name,
      address,
      phoneNumber,
      headSetterId,
      facebook,
      instagram,
      twitter,
    });
  }


  return ( 
    <>
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
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Save Gym</Button>
      </Paper>
    </>
  );
}

export default NewGymForm;