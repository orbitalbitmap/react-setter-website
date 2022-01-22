import React from 'react'
import { connect } from 'react-redux'

import SingleGym from '../../components/locations/SingleGym'
import Navbar from '../../components/navbar/Navbar'


class SingleLocationPage extends React.Component {
  render() {
    return (
      <>
        <Navbar user={this.props.user} gyms={this.props.gyms} />
        <div className="centered-text">
          {this.props.gyms ? <SingleGym /> : null}
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

export default connect(mapStateToProps, {})(SingleLocationPage)