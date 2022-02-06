import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Gyms = (props) => (
  <>
    <h1 className="centered-text">Locations:</h1>
    {
      props.gyms?.map(gym => {
        return (
          <h3 key={gym.name} className="centered-text">
            <Link to={`/locations/${gym.id}`}>{gym.name}</Link>
          </h3>
        )
      })
    }
  </>
)

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(Gyms)