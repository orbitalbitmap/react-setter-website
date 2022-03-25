import axios from 'axios'
import { useEffect, useState } from 'react'
import { FormControl, Grid, TextField } from '@mui/material'
import { Paper, Select, MenuItem, InputLabel } from '@mui/material'

const NewGymForm = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [headSetterId, setHeadSetterId] = useState(0)
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const getInfo = async () =>{
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/employees`)

      setEmployees(data)
    }

    getInfo()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log({
      name,
      address,
      phoneNumber,
      headSetterId,
      facebook,
      instagram,
      twitter,
    })

    // await axios.post(`${process.env.REACT_APP_API_PATH}/saveNewGym`, {
    //   name,
    //   address,
    //   phoneNumber,
    //   headSetterId,
    //   facebook,
    //   instagram,
    //   twitter,
    // })
  }


  return ( 
    <>
      <h1 className="centered-text">New's Gym Information</h1>
      <Paper elevation={12} component="div" sx={{ pb: '0.5rem', pt: '1rem' }}>
          <Grid container xs={12} columnSpacing="4rem" rowSpacing="1rem"  sx={{ m: '0 auto'}}>
            <Grid item>
              <TextField
                label="Gym Name"
                value={name}
                required
                onChange = {(event) => setName(event.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Address"
                value={address}
                required
                onChange = {(event) => setAddress(event.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Phone Number #"
                value={phoneNumber}
                onChange = {(event) => setPhoneNumber(event.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Facebook"
                value={facebook}
                required
                onChange = {(event) => setFacebook(event.target.value)}
                inputProps={{
                  autoComplete: 'off'
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Instagram"
                value={instagram}
                required
                onChange = {(event) => setInstagram(event.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Twitter"
                value={twitter}
                onChange = {(event) => setTwitter(event.target.value)}
              />
            </Grid>
            

              {/* <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    label="Role"
                    value={roleId}
                    onChange={(event) => setRoleId(event.target.value)}
                  >
                  { map over employees }
                    <MenuItem value="0" sx={{ color: '#fff' }}>Please select a role...</MenuItem>
                    <MenuItem value="1" sx={{ color: '#fff' }}>Director of Routesetting</MenuItem>
                    <MenuItem value="2" sx={{ color: '#fff' }}>Regional Head Setter</MenuItem>
                    <MenuItem value="3" sx={{ color: '#fff' }}>Head Setter</MenuItem>
                    <MenuItem value="4" sx={{ color: '#fff' }}>Full Time Setter</MenuItem>
                    <MenuItem value="5" sx={{ color: '#fff' }}>Part Time Setter</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
            
            
          </Grid>
        </Paper>

        <button onClick={handleSubmit} type="submit">Update Info</button>
    </>
  )
}

export default NewGymForm