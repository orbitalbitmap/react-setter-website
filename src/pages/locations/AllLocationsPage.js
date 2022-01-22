import React from 'react'
import { connect } from 'react-redux'

import Gyms from '../../components/locations/Gyms'
import Navbar from '../../components/navbar/Navbar'

const AllLocationsPage = (props) => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        {props.gyms ? <Gyms /> : null}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(AllLocationsPage)