import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'

import Gyms from '../../components/locations/Gyms'
import Navbar from '../../components/navbar/Navbar'


class AllLocationsPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  async componentDidMount() {
    const user = (await axios.get('http://localhost:1337/api/employees/1')).data
    const gyms = (await axios.get('http://localhost:1337/api/allGymSections')).data
    this.setState({
      gyms,
      user
    })
  }


  render() {
    return (
      <>
        <Navbar />
        <div className="centered-text">
          {this.props.gyms ? <Gyms /> : null}
        </div>
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

export default connect(mapStateToProps, {})(AllLocationsPage)