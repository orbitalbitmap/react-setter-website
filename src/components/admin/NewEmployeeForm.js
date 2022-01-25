import { useState} from 'react'
import { connect } from 'react-redux'

const NewEmployeeForm = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [roleId, setRoleId] = useState(0)
  const [employeeGymList, setEmployeeGymList] = useState([])

  const handleCheckbox = (event) => {
    const id = parseInt(event.target.value)
    switch (event.target.checked) {
      case false:
        const updatedGymList = employeeGymList.filter(gym => {
            return gym.id !== id
        })

        setEmployeeGymList(updatedGymList)
        break
      default:
        const gymToAdd = props.gyms.find(gym => gym.id === id)
        const newSortedGymList = [...employeeGymList, gymToAdd].sort((gymA, gymB) => gymA.id - gymB.id)
        
        setEmployeeGymList(newSortedGymList)

    }
  }

  const hanldeSubmit = (event) => {
    event.preventDefault()

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      roleId,
      employeeGymList,
    }

    console.log(newUser)
  }

  return (
    <>
      <h1 className="centered-text">New Employee Information</h1>

      <form id="employee-form">
        <div className="employee-form-grid">
          <label htmlFor="firstName">First Name:</label>
          <input
            onChange={(event) => setFirstName(event.target.value)}
            name="firstName"
            placeholder="First name"
            value={firstName}
            required
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            onChange={(event) => setLastName(event.target.value)}
            name="lastName"
            placeholder="Last name"
            required
            value={lastName}
          />

          <label htmlFor="email">Email:</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            placeholder="Email"
            required
            value={email}
          />

          <label htmlFor="password">Password:</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            onChange={(event) => setPhoneNumber(event.target.value)}
            name="phoneNumber"
            placeholder="555-555-5555"
            value={phoneNumber}
          />

          <label htmlFor="roleId">Role:</label>
          <select onChange={(event) => setRoleId(event.target.value)} name="roleId" defaultValue="0" required>
            <option value="0">Please select a role...</option>
            <option value="1">Director of Routesetting</option>
            <option value="2">Regional Head Setter</option>
            <option value="3">Head Setter</option>
            <option value="4">Full Time Setter</option>
            <option value="5">Part Time Setter</option>
          </select>
        </div>

        <h3 className="centered-text">Locations:</h3>
        <div className="checkbox-grid">
          {
            props.gyms.map(gym => {
              return (
                <div key={gym.id}>
                  <label htmlFor="gyms" form="employee-form">{gym.name}:</label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    form="employee-form" 
                    name="gyms"
                    value={gym.id}
                    checked={employeeGymList.some(employeeGym => employeeGym.id === gym.id)}
                    onChange={handleCheckbox}
                  />
                </div>
              )
            })
          }
          </div>
        <button onClick={hanldeSubmit} type="button">Save Employee</button>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms,
  }
}

export default connect(mapStateToProps, {})(NewEmployeeForm)
