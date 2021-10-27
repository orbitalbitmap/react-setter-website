import React from 'react'


class SingleEmployee extends React.Component {
  employee = this.props.emplyee

  renderList() {
    const { employee } = this.props
        return (
          <div>
            <h1 className="centered-text">{`${employee.firstName} ${employee.lastName}`}</h1>
            <h3 className="centered-text">{employee.email}</h3>
            <h3 className="centered-text">{employee.phoneNumber}</h3>

            <h2 className="centered-text"> Gyms:</h2>
            <ul className="centered-text inside-bullet">
              {employee.gyms.map(gym => {
                return (
                  <li key={gym.name}>
                    <a href={`/gyms/${gym.name}`}>{gym.name}</a>
                  </li>
                )
              }
              )}
            </ul>

            {/* if user.id <= 3
              a(href=`/employees/edit/${employee.id}`) Edit Employee */}
          </div>
        )
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    )
  }
}

export default SingleEmployee