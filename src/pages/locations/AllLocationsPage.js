import React from 'react'
import { connect } from 'react-redux'
import Gyms from '../../components/locations/Gyms'
import Dashboard from '../../components/dashboard/Dashboard'

const AllLocationsPage = (props) => {
  return (
    <Dashboard>
      {props.gyms ? <Gyms /> : null}
    </Dashboard>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(AllLocationsPage)