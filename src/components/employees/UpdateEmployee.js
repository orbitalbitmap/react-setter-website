import axios from 'axios'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { signIn } from '../../actions'

const UpdateEmployee = (props) => {
  const [employee, setEmployee] = useState({})

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/employees/${props.user.id}`)

      setEmployee({
          ...data,
          oldEmployeeGymList: data.gyms,
          password: 'NotYourRealPassword'
        })
    }

    getInfo()
  }, [props.user])

  const handleChange = (event) => {
    setEmployee({
        ...employee,
        [event.target.name]: event.target.value
      })
  }

  const handleCheckbox = (event) => {
    const gymId = parseInt(event.target.value)

    switch (event.target.checked) {
      case false: 
        setEmployee({
            ...employee,
            gyms: employee.gyms?.filter(employeeGym => {
              return employeeGym.id !== gymId
            })
          })
        break
      default:
        const gymToAdd = props.gyms?.find(gym => gymId === gym.id)
        setEmployee({
            ...employee,
            gyms: [
              ...employee.gyms,
              gymToAdd,
            ].sort((gymA, gymB) => gymA.id - gymB.id)
          })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post(`${process.env.REACT_APP_API_PATH}/updateEmployee`, employee)
    props.signIn(await employee)
  }
  
  if (!employee.id) {
    return (<h2>Loading...</h2>)
  }

  return (
    <form id="employee-form">
      <div className="employee-form-grid" name="update-employee-form">
        <input className="hidden" name="id" defaultValue="employee.id" />

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

        <label htmlFor="password">Phone #:</label> 
        <input 
          value={employee.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
          type="phoneNumber"
        />
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
      </div>
      <button onClick={handleSubmit} type="submit">Update Employee</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, { signIn })(UpdateEmployee)