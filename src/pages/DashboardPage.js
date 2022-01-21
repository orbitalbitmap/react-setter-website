import axios from 'axios'
import React from 'react'

import { connect } from 'react-redux'

import '../components/styles.css'
import Navbar from '../components/navbar/Navbar'
import Dashboard from '../components/Dashboard'


class DashboardPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gyms: [], 
    }
  }

  async componentDidMount() {
    if (this.props.user === undefined) {
      window.location.href = "/"
    }

    const gymsData = await axios.get('http://localhost:1337/api/gyms')
    this.setState({
      gyms: gymsData.data,
    })
  }
  
  render() {
    return (
      <>
        <Navbar user={this.props?.user} gyms={this.state.gyms} />
        {
          this.props.user?.id
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
