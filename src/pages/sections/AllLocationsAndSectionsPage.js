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
    this.checkForSections = this.checkForSections.bind(this)
  }

  async componentDidMount() {
    const user = (await axios.get('http://localhost:1337/api/employees/1')).data
    const gyms = (await axios.get('http://localhost:1337/api/allGymSections')).data
    this.setState({
      gyms,
      user
    })
  }

  checkForSections(gymName, sectionList, type) {
    if (sectionList.length <= 0) {
      return <li>{`No ${type} sections found.`}</li>
    }

    return sectionList.map(section => {
      return (
        <li key={`${gymName}-${type}-${section.id}`} style= {{fontWeight: "normal"}}>{section.name}</li>
      )
    })
  }

  renderGymSections() {
    return (
      <ul style={{ listStyleType: "none", fontSize:"1.75rem", fontWeight: "bold" }}>
        { 
          this.state.gyms.map(gym => {
            return (
              <React.Fragment key={gym.name}>
                <li style={{ marginBottom: "4px", textDecoration: "underline"  }}>{gym.name}</li>
                <span style={{ fontSize: "1.25rem", marginBottom: "4px", textDecoration: "underline" }}>Boulder Sections:</span>
                <ul style={{ listStyleType: "none", fontSize:"1rem", marginBottom: "12px", padding: "0", }}>
                  {
                    this.checkForSections(gym.name, gym.boulderSections, "boulder")
                  }
                </ul>

                <span style={{ fontSize: "1.25rem", marginBottom: "4px", textDecoration: "underline" }}>Rope Sections:</span>

                <ul style={{ listStyleType: "none", fontSize:"1rem", marginBottom: "48px", padding: "0", }}>
                  {
                    this.checkForSections(gym.name, gym.routeSections, "rope")
                  }
                </ul>
              </React.Fragment>
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
        <div className="centered-text">
          {this.state.gyms ? this.renderGymSections() : null}
        </div>
      </>
    )
  }
}

export default AllLocationsAndSections