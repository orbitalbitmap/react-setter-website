import React from 'react'


class NewEmployeeForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newUser: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        roleId: 0,
        employeeGymList: []
      },
      gyms: [{
        gymId: 1,
        name: 'Worcester',
      }, {
        gymId: 2,
        name: 'Hadley',
      }],
    }
  
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.hanldeSubmit = this.hanldeSubmit.bind(this)
  }

  handleChange(event) {

    this.setState({
      newUser: {
        ...this.state.newUser,
        [event.target.name]: event.target.value
      }
    })
  }

  handleCheckbox(event) {
    const gymId = parseInt(event.target.value)
    switch (event.target.checked) {
      case false:
        this.setState({
          newUser: {
            ...this.state.newUser,
            employeeGymList: this.state.newUser.employeeGymList.filter(employeeListId => {
              return employeeListId !== gymId
            })
          }
        })
        break
      default:
        this.setState({
          newUser: {
            ...this.state.newUser,
            employeeGymList: [
              ...this.state.newUser.employeeGymList,
              gymId
            ].sort()
          }
        })
    }
  }

  hanldeSubmit(event) {
    event.preventDefault()
    console.log(this.state)
  }

  render(){
    return (
      <>
        <h1 className="centered-text">New Employee Information</h1>

        <form action="/api/saveEmployee" method="post" id="employee-form">
          <div className="employee-form-grid">
            <label htmlFor="firstName">First Name:</label>
            <input
              onChange={this.handleChange}
              name="firstName"
              placeholder="First name"
              value={this.state.newUser.firstName}
              required
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              onChange={this.handleChange}
              name="lastName"
              placeholder="Last name"
              required
              value={this.state.newUser.lastName}
            />

            <label htmlFor="email">Email:</label>
            <input
              onChange={this.handleChange}
              name="email"
              placeholder="Email"
              required
              value={this.state.newUser.email}
            />

            <label htmlFor="password">Password:</label>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              placeholder="Password"
              required
              value={this.state.newUser.password}
            />

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              onChange={this.handleChange}
              name="phoneNumber"
              placeholder="555-555-5555"
              value={this.state.newUser.phoneNumber}
            />

            <label htmlFor="roleId">Role:</label>
            <select onChange={this.handleChange} name="roleId" defaultValue="0" required>
              <option value="1">Please select a role...</option>
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
              this.state.gyms.map(gym => {
                return (
                  <div key={gym.gymId}>
                    <label htmlFor="gyms" form="employee-form">{gym.name}:</label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      form="employee-form" 
                      name="gyms"
                      value={gym.gymId}
                      checked={this.state.newUser.employeeGymList.includes(gym.gymId)}
                      onChange={this.handleCheckbox}
                    />
                  </div>
                )
              })
            }
            </div>
          <button onClick={this.hanldeSubmit} type="submit">Save Employee</button>
        </form>
      </>
    )
  }
}

export default NewEmployeeForm
