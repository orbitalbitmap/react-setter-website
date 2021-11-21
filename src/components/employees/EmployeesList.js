import axios from 'axios'
import React from 'react'

class EmployeeList extends React.Component {
  state = {
    employees: [] 
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/employees')

    this.setState({
      employees: data
    })
  }

  renderList() {
      return this.state.employees.map(employee => {
        return (
          <h3 key={employee.id} className="centered-text">
            <a href={`/employees/${employee.id}`}>
              {`${employee.firstName} ${employee.lastName}`}
            </a>
          </h3>
        )
      })
  }

  render() {
    return (
      <div>
        <h1 className="centered-text">Employees</h1>
        {this.renderList()}
      </div>
    )
  }
}

export default EmployeeList