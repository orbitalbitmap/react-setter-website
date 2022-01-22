import React from 'react'
import { connect } from 'react-redux'

import SingleGym from '../../components/locations/SingleGym'
import Navbar from '../../components/navbar/Navbar'

const SingleLocationPage = (props) => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        {props.gyms ? <SingleGym /> : null}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms,
  }
}

export default connect(mapStateToProps, {})(SingleLocationPage)