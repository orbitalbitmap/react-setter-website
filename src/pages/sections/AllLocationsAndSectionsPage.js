import axios from 'axios'
import React from 'react'

import Navbar from '../../components/navbar/Navbar'

class AllLocationsAndSections extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }

    this.renderGymSections = this.renderGymSections.bind(this)
  }

  async componentDidMount() {
    const user = (await axios.get('http://localhost:1337/api/employees/1')).data
    const gyms = (await axios.get('http://localhost:1337/api/allGymSections')).data
    this.setState({
      gyms,
      user
    })
  }

  renderGymSections() {
    return (
      <ul>
        { 
          this.state.gyms.map(gym => {
            return (
              <li key={gym.id}>{gym.name}</li>
            )
          })
        }
      </ul> 
    )
  }


  render() {
    return (
      <>
        <Navbar user={this.state.user} gyms={this.state.gyms} />
        <div>
          {this.state.gyms ? this.renderGymSections() : null}
        </div>
      </>
    )
  }
}

export default AllLocationsAndSections