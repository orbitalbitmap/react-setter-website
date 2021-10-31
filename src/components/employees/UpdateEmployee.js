import React from 'react'

class UpdateEmployee extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        firstName: 'Rob',
        lastName: 'Perron',
        roleId: 1,
        email: "robp@centralrockgym.com",
        password: "NotYourRealPassword",
        phoneNumber: "555-666-7777",
        placardName: 'Roboat',
        employeeGymList: [1],
        oldEmployeeGymList: []
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      user: {
        ...this.state.user,
        oldEmployeeGymList: [...this.state.user.employeeGymList]
      }
    })
  }


  handleChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  handleCheckbox(event) {
    switch (event.target.checked) {
      case false: 
        this.setState({
          user: {
            ...this.state.user,
            employeeGymList: this.state.user.employeeGymList.filter(gymId => {
              return gymId !== parseInt(event.target.dataset.gymid)
            })
          }
        })
        break
      default:
        this.setState({
          user: {
            ...this.state.user,
            employeeGymList: [
              ...this.state.user.employeeGymList,
              parseInt(event.target.dataset.gymid),
            ].sort()
          }
        })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state)
  }
  
  render() {
    return (
      <form id="employee-form">
        <div className="employee-form-grid" name="update-employee-form">
          <input className="hidden" name="id" defaultValue="employee.id" />

          <label htmlFor="placardName">Name on placard:</label> 
          <input 
            value={this.state.user.placardName}
              onChange={this.handleChange}
            name="placardName"
            type="text"
          />
          
          <label htmlFor="email">Email address:</label> 
          <input 
            value={this.state.user.email}
            name="email"
            onChange={this.handleChange}
            type="text"
          />

          <label htmlFor="password">Password:</label> 
          <input 
            value={this.state.user.password}
            name="password"
            onChange={this.handleChange}
            type="password"
          />

          <label htmlFor="password">Phone #:</label> 
          <input 
            value={this.state.user.phoneNumber}
            name="phoneNumber"
            onChange={this.handleChange}
            type="phoneNumber"
          />

          <label htmlFor="roleId">
            Role:
          </label>
          
          <select 
            name="roleId"
            defaultValue={
              this.state.user.roleId
                ? this.state.user.roleId
                : 5
            }
            onChange={this.handleChange}
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
            this.state.gyms.map(gym => {
              return (
              <div key={gym.gymId}>
                <label htmlFor="gyms" form="update-employee-form">{`${gym.name}:`}</label> 
                <input
                  checked={this.state.user.employeeGymList.includes(gym.gymId) ? true : false}
                  className="checkbox"
                  form="update-employee-form"
                  data-gymid={gym.gymId}
                  name="gyms"
                  onChange={this.handleCheckbox}
                  type="checkbox"

                />
              </div>
              )
            })
          }
        </div>
        <button onClick={this.handleSubmit} type="submit">Update Employee</button>
      </form>
    )
  }
}

export default UpdateEmployee