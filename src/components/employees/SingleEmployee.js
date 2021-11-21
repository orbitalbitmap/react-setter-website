import axios from 'axios'
import React from 'react'


class SingleEmployee extends React.Component {
  constructor(props) {
    super(props)

    this.state = { employee: {} }
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/employees/1')

    await this.setState({
      employee: data
    })
  }

  renderList() {
    if (!this.state.employee.id) {
      return (
        <h2>Loading....</h2>
      )
    }
        return (
          <div>
            <h1 className="centered-text">{`${this.state.employee.firstName} ${this.state.employee.lastName}`}</h1>
            <h3 className="centered-text">{this.state.employee.email}</h3>
            <h3 className="centered-text">{this.state.employee.phoneNumber}</h3>

            <h2 className="centered-text"> Gyms:</h2>
            <ul className="centered-text inside-bullet">
              {this.state.employee.gyms.map(gym => {
                return (
                  <li key={gym.name}>
                    <a href={`/gyms/${gym.name}`}>{gym.name}</a>
                  </li>
                )
              }
              )}
            </ul>

            { 
              this.props.user.roleId <= 3
                ? <a href={`/employees/edit/${this.state.employee.id}`}>Edit Employee</a>
                : null
            }
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