import axios from 'axios'
import React from 'react'

class UpdateEmployee extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      employee: {},
      gyms: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      employee: {
        ...this.state.employee,
        [event.target.name]: event.target.value
      }
    })
  }

  handleCheckbox(event) {
    const gymId = parseInt(event.target.value)

    switch (event.target.checked) {
      case false: 
        this.setState({
          employee: {
            ...this.state.employee,
            gyms: this.state.employee.gyms.filter(employeeGym => {
              return employeeGym.id !== gymId
            })
          }
        })
        break
      default:
        const gymToAdd = this.state.gyms.find(gym => gymId === gym.id)
        this.setState({
          employee: {
            ...this.state.employee,
            gyms: [
              ...this.state.employee.gyms,
              gymToAdd,
            ].sort((gymA, gymB) => gymA.id - gymB.id)
          }
        })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  async componentDidMount() {
    const employeesData = await axios.get('http://localhost:1337/api/employees/1')
    const gymsData = await axios.get('http://localhost:1337/api/gyms')

    await this.setState({
      employee: {
        ...employeesData.data,
        oldEmployeeGymList: employeesData.data.gyms
      },
      gyms: gymsData.data
    })
  }
  
  render() {
    if (!this.state.employee.id) {
      return (<h2>Loading...</h2>)
    }

    return (
      <form id="employee-form">
        <div className="employee-form-grid" name="update-employee-form">
          <input className="hidden" name="id" defaultValue="employee.id" />

          <label htmlFor="placardName">Name on placard:</label> 
          <input 
            value={this.state.employee.placardName}
              onChange={this.handleChange}
            name="placardName"
            type="text"
          />
          
          <label htmlFor="email">Email address:</label> 
          <input 
            value={this.state.employee.email}
            name="email"
            onChange={this.handleChange}
            type="text"
          />

          <label htmlFor="password">Password:</label> 
          <input 
            value={this.state.employee.password}
            name="password"
            onChange={this.handleChange}
            type="password"
          />

          <label htmlFor="password">Phone #:</label> 
          <input 
            value={this.state.employee.phoneNumber}
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
              this.state.employee.roleId
                ? this.state.employee.roleId
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
              <div key={gym.id}>
                <label htmlFor="gyms" form="update-employee-form">{`${gym.name}:`}</label> 
                <input
                  checked={this.state.employee.gyms.filter(employeeGym => employeeGym.id === gym.id).length > 0}
                  className="checkbox"
                  form="update-employee-form"
                  value={gym.id}
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