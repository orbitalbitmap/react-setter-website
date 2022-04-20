import axios from 'axios'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
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
} from '@mui/material'


const UpdateEmployee = (props) => {
  const urlParams = useParams()
  const [employee, setEmployee] = useState({})
  const [roleId, setRoleId] = useState(0)
  const [currentGymNameList, setCurrentGymNameList] = useState([])
  const [employeeGymNameList, setEmployeeGymNameList] = useState([])

  const handleCheckbox = (event) => {
    const {
      target: { value },
    } = event;
    
    const [gymName] = value.filter(gym => !employeeGymNameList.includes(gym)) 
    const [gymInfo] = gymName !== undefined ? props.gyms.filter(gym => gym.name === gymName) : [null]

    gymInfo !== null && setEmployee({...employee, gyms: employee.gyms.concat(gymInfo)})
    setEmployeeGymNameList(value)
  }

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/employees/${urlParams.id}`)

      setEmployee({
          ...data,
          oldEmployeeGymList: data.gyms,
          password: 'NotYourRealPassword',
        })
      setEmployeeGymNameList(data.gyms.map(gym => gym.name))
      setRoleId(data.roleId)
    }

    getInfo()
  }, [urlParams])

  useEffect(() => {
    const aRoleId = employee.roleId
    setRoleId(aRoleId)
  }, [employee])

  useEffect(() => {
    setCurrentGymNameList(props.gyms.map((gym) => gym.name))
  }, [props.gyms])

  const handleChange = (event) => {
    setEmployee({
        ...employee,
        [event.target.name]: event.target.value
      })
  }

  const handleSubmit = async(event)  =>{
    event.preventDefault()

    await axios.post(`${process.env.REACT_APP_API_PATH}/updateEmployee`, employee)
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
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="50rem" sx={{ mt: '7rem'}} >
        <Grid container spacing={4} sx={{ margin: '0 auto' }} xs={8}>
          <Grid item>
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
              
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                    name="roleId"
                      labelId="role-label"
                      label="employee.Role"
                      value={roleId || 0}
                      onChange={handleChange}
                    >
                      <MenuItem value={0} sx={{ color: '#fff' }}>Please select a role...</MenuItem>
                      <MenuItem value={1} sx={{ color: '#fff' }}>Director of Routesetting</MenuItem>
                      <MenuItem value={2} sx={{ color: '#fff' }}>Regional Head Setter</MenuItem>
                      <MenuItem value={3} sx={{ color: '#fff' }}>Head Setter</MenuItem>
                      <MenuItem value={4} sx={{ color: '#fff' }}>Full Time Setter</MenuItem>
                      <MenuItem value={5} sx={{ color: '#fff' }}>Part Time Setter</MenuItem>
                    </Select>
                  </FormControl>
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
    </Box>
  </>
  );
}

const mapStateToProps = (state) => {
  return {
    gyms: state.gyms
  };
}

export default connect(mapStateToProps, {})(UpdateEmployee);