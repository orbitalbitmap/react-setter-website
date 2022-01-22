import React from 'react'
import { connect } from 'react-redux'

import AllClimbingSections from '../../components/sections/AllClimbingSections'
import Navbar from '../../components/navbar/Navbar'


class AllLocationsAndSections extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="centered-text">
          {this.props.gyms ? <AllClimbingSections /> : null}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms,
  }
}

export default connect(mapStateToProps, {})(AllLocationsAndSections)