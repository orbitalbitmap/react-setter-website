import axios from 'axios'
import React from 'react'
import { Cookies } from 'react-cookie'
import { connect } from 'react-redux'

import '../components/styles.css'
import Navbar from '../components/navbar/Navbar'
import Dashboard from '../components/Dashboard'

const cookies = new Cookies()

class DashboardPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      gyms: [], 
    }
  }

  async componentDidMount() {
    if (this.props.user === undefined) {
      window.location.href = "/"
    }

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
          this.props.user.id
            ? <Dashboard user={this.props.user} />
            : null // create loading component />
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    // gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(DashboardPage)
