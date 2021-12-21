import axios from 'axios'
import React from 'react'

import Navbar from '../components/navbar/Navbar'

class AdminPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: { roleId: 1 }
    }
  }

  async componentDidMount() {
    const user = (await axios.get('http://localhost:1337/api/employees/1')).data
    const gyms = (await axios.get('http://localhost:1337/api/gyms')).data
    this.setState({
      gyms,
      user
    })
  }

  render() {
    return (
      <>
        <Navbar user={this.state.user} gyms={this.state.gyms} />
        <div>
          <ul>
            <li>
              <a href="/admin/employee/new">New Employee</a>
            </li>
            <li>
              <a href="/admin/location/new">New Location</a>
            </li>
          </ul>
        </div>
      </>
    )
  }
}

export default AdminPage