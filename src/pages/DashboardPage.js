import React from 'react'
import { connect } from 'react-redux'


import '../components/styles.css'
import Navbar from '../components/navbar/Navbar'
import Dashboard from '../components/Dashboard'
import { getLocations } from '../actions'


class DashboardPage extends React.Component {
  async componentDidMount() {
    if (this.props.user === undefined) {
      window.location.href = "/"
    }
    this.props.getLocations()
  }
  
  render() {
    return (
      <>
        <Navbar user={this.props?.user} gyms={this.props?.gyms} />
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
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, { getLocations })(DashboardPage)
