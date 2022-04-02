import axios from 'axios'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FormControl, Grid, TextField } from '@mui/material'
import { Paper, Select, MenuItem, InputLabel, OutlinedInput, Checkbox, ListItemText, Typography } from '@mui/material'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

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

    console.log(employee)
    // await axios.post(`${process.env.REACT_APP_API_PATH}/updateEmployee`, employee)
  }
  
  if (!employee.id) {
    return (<h2>Loading...</h2>)
  }

  console.log({employeeGymNameList})

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
      <Container maxWidth="50rem" sx={{ mt: 18 }} >
        <Grid container spacing={4} sx={{justifyContent: 'center'}}>
          <Grid item xs={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              color: 'primary.contrastText',
              bgcolor: 'primary.main',
            }}
          >
          <h1 className="centered-text">{`${employee.firstName}'s Info`}</h1>
          <Paper elevation={12} component="div" sx={{ pb: '0.5rem', pt: '1rem' }}>
            <Grid container columnSpacing="4rem" rowSpacing="1rem" sx={{ pl: '1.5rem'}}>
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

              <Grid item xs={12}>
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
                  label="Phone Number employee.#"
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
                    value={roleId}
                    onChange={handleChange}
                  >
                    <MenuItem value="0" sx={{ color: '#fff' }}>Please select a role...</MenuItem>
                    <MenuItem value="1" sx={{ color: '#fff' }}>Director of Routesetting</MenuItem>
                    <MenuItem value="2" sx={{ color: '#fff' }}>Regional Head Setter</MenuItem>
                    <MenuItem value="3" sx={{ color: '#fff' }}>Head Setter</MenuItem>
                    <MenuItem value="4" sx={{ color: '#fff' }}>Full Time Setter</MenuItem>
                    <MenuItem value="5" sx={{ color: '#fff' }}>Part Time Setter</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <h3 className="centered-text">Locations:</h3>
            <Grid item>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Employee's gyms</InputLabel>
                <Select
                  name="gyms"
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
            <button onClick={handleSubmit} type="button">Save Employee</button>
            </Paper>
          </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>


    // <form id="employee-form">
      // <div className="employee-form-grid" name="update-employee-form">
        /* <input className="hidden" name="id" defaultValue="employee.id" />

        <label htmlFor="placardName">Name on placard:</label> 
        <input 
          value={employee.placardName}
            onChange={handleChange}
          name="placardName"
          type="text"
        />
        
        <label htmlFor="email">Email address:</label> 
        <input 
          value={employee.email}
          name="email"
          onChange={handleChange}
          type="text"
        />

        <label htmlFor="password">Password:</label> 
        <input 
          value={employee.password}
          name="password"
          onChange={handleChange}
          type="password"
        />

        <label htmlFor="phone-number">Phone #:</label> 
        <input 
          value={employee.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
          type="phoneNumber"
        />

        <label htmlFor="roleId">
          Role:
        </label>
        
        <select 
          name="roleId"
          value={roleId || 5}
          onChange={handleChange}
          required
        >
          <option value={1}>Director of Routsetting</option>
          <option value={2}>Regional Head Setter</option>
          <option value={3}>Head Setter</option>
          <option value={4}>Full Time Setter</option>
          <option value={5}>Part Time Setter</option>
        </select>
      </div>

      <h3 className="centered-text">Locations:</h3>
      <div className="checkbox-grid">
        {
          props.gyms?.map(gym => {
            return (
            <div key={gym.id}>
              <label htmlFor="gyms" form="update-employee-form">{`${gym.name}:`}</label> 
              <input
                checked={employee.gyms?.filter(employeeGym => employeeGym.id === gym.id).length > 0}
                className="checkbox"
                form="update-employee-form"
                value={gym.id}
                name="gyms"
                onChange={handleCheckbox}
                type="checkbox"

              />
            </div>
            )
          })
        }
      </div> */
      // <button onClick={handleSubmit} type="submit">Update Employee</button>
    /* </form> */
  )
}

const mapStateToProps = (state) => {
  return {
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(UpdateEmployee)