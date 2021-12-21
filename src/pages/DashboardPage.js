import axios from 'axios'
import React from 'react'
// import { Navigate } from 'react-router-dom'

import '../components/styles.css'
import Navbar from '../components/navbar/Navbar'
import Dashboard from '../components/Dashboard'

class DashboardPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      gyms: [], 
    }
  }

  async componentDidMount() {
    const userData = await axios.get('http://localhost:1337/api/employees/1')
    const gymsData = await axios.get('http://localhost:1337/api/gyms')
    this.setState({
      gyms: gymsData.data,
      user: userData.data
    })
  }
  
  render() {
    return (
      <>
        <Navbar user={this.state.user} gyms={this.state.gyms} />
        {
          this.state.user.id
            ? <Dashboard user={this.state.user} />
            : null // <Navigate replace to="/" />
        }
      </>
    )
  }
}

export default DashboardPage
