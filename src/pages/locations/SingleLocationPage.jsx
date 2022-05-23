import React from 'react'
import { connect } from 'react-redux'
import SingleGym from '../../components/locations/SingleGym'
import Dashboard from '../../components/dashboard/Dashboard'

const SingleLocationPage = (props) => {
  return (
    <Dashboard>
      {props.gyms ? <SingleGym /> : null}
    </Dashboard>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms,
  }
}

export default connect(mapStateToProps, {})(SingleLocationPage)