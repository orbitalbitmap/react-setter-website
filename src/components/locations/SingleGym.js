import axios from 'axios'
import React from 'react'

class SingleGym extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      employeeList: [],
      fullTimeEmployeeList: [],
      gymInfo: [],
      headSetter: {},
      partTimeEmployeeList: [],
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/gyms/worcester')

    const employeeList = data.employees
    const headSetter = employeeList.find(employee => employee.id === data.headSetterId)
    const fullTimeEmployeeList = employeeList.filter(employee => employee.roleId <= 4 && employee.id !== data.headSetterId && employee.id !== 1)
    const partTimeEmployeeList = employeeList.filter(employee => employee.roleId === 5)

    this.setState({
      employeeList,
      fullTimeEmployeeList,
      gymInfo: data,
      headSetter,
      partTimeEmployeeList,
    })
  }

  render() {
    return (
      <>
        <h1 className="centered-text">{this.state.gymInfo.name}</h1>
        <h3 className="centered-text">{this.state.gymInfo.address}</h3>
        <h3 className="centered-text">{this.state.gymInfo.phoneNumber}</h3>
        <h3 className="centered-text">{`Facebook: ${this.state.gymInfo.facebook !== null ? this.state.gymInfo.facebook : 'None available'}`}</h3>
        <h3 className="centered-text">{`Instagram: ${this.state.gymInfo.instagram !== null ? this.state.gymInfo.instagram : 'None available'}`}</h3>
        <h3 className="centered-text">{`Twitter: ${this.state.gymInfo.twitter !== null ? this.state.gymInfo.twitter : 'None available'}`}</h3>

        <h2 className="centered-text">The Setters:</h2>
        <h3 className="centered-text">Head Setter:</h3>
        <ul className="centered-text">
          <li key={this.state.headSetter.id} className="centered-text inside-bullet">
            <a href={`/employees/${this.state.headSetter.id}`}>{`${this.state.headSetter.firstName} ${this.state.headSetter.lastName}`}</a>
          </li>
        </ul>
        <h3 className="centered-text">Full Time Setters</h3>
        <ul>
          {
            this.state.fullTimeEmployeeList.map(setter => {
              return (
                <li key={`full-time-${setter.id}`} className="centered-text inside-bullet">
                  <a href={`/employees/${setter.id}`}>{`${setter.firstName} ${setter.lastName}`}</a>
                </li>
              )
            })
          }
        </ul>

        <h3 className="centered-text">Part Time Setters</h3>
        <ul>
        {
            this.state.partTimeEmployeeList.map(setter => {
              return (
                <li key={`part-time-${setter.id}`} className="centered-text inside-bullet">
                  <a href={`/employees/${setter.id}`}>{`${setter.firstName} ${setter.lastName}`}</a>
                </li>
              )
            })
          }
        </ul>

        <a href={`/gyms/edit/${this.state.gymInfo.name}`}>Edit Gym info</a>
      </>
    )
  }
}

export default SingleGym