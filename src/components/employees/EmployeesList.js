import React from 'react'

class EmployeeList extends React.Component {
  state = {
    employees: [{
      id: 1,
      firstName: 'Rob',
      lastName: 'Perron',
    }, {
      id: 2,
      firstName: 'Kyle',
      lastName: 'Birnbaum',
    }] 
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