import axios from 'axios'
import React from 'react'

import UpdateEmployee from '../../components/employees/UpdateEmployee'
import Navbar from '../../components/navbar/Navbar'


class AdminUpdateEmployeePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  async componentDidMount() {
    const user = (await axios.get('http://localhost:1337/api/employees/1')).data
    const gyms = (await axios.get('http://localhost:1337/api/allGymSections')).data
    this.setState({
      gyms,
      user
    })
  }


  render() {
    return (
      <>
        <Navbar user={this.state.user} gyms={this.state.gyms} />
        <div className="centered-text">
          {this.state.gyms ? <UpdateEmployee /> : null}
        </div>
      </>
    )
  }
}

export default AdminUpdateEmployeePage