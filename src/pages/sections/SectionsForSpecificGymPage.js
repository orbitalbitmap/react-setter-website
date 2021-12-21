import axios from 'axios'
import React from 'react'

import Navbar from '../../components/navbar/Navbar'

class SectionsForSpecificGymPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }

    this.renderSections = this.renderSections.bind(this)
    this.checkForSections = this.checkForSections.bind(this)
  }

  async componentDidMount() {
    const user = (await axios.get('http://localhost:1337/api/employees/1')).data
    const gyms = (await axios.get('http://localhost:1337/api/allGymSections')).data
    const specificGym = (await axios.get('http://localhost:1337/api/gymWithSections/1')).data

    this.setState({
      gyms,
      specificGym,
      user
    })
  }

  checkForSections(gymName, sectionList, type) {
    if (sectionList.length <= 0) {
      return <li style= {{fontWeight: "normal"}}>{`No ${type} sections found.`}</li>
    }

    return sectionList.map(section => {
      return (
        <li key={`${gymName}-${type}-${section.id}`} style= {{fontWeight: "normal"}}>{section.name}</li>
      )
    })
  }

  renderSections() {
    return (
      <React.Fragment>
        <h1>{this.state.specificGym.name}</h1>
        
        <span style={{ fontSize: "1.25rem", marginBottom: "4px", textDecoration: "underline" }}>Boulder Sections:</span>
        <ul style={{ listStyleType: "none", fontSize:"1rem", marginBottom: "12px", padding: "0", }}>
          { 
            this.checkForSections(this.state.specificGym.name, this.state.specificGym.boulderSections, "boulder")
          }
        </ul>

        <span style={{ fontSize: "1.25rem", marginBottom: "4px", textDecoration: "underline" }}>Rope Sections:</span>
        <ul style={{ listStyleType: "none", fontSize:"1rem", marginBottom: "48px", padding: "0", }}>
          {
            this.checkForSections(this.state.specificGym.name, this.state.specificGym.routeSections, "rope")
          }
        </ul>
      </React.Fragment>
    )
  }

  render() {
    return (
      <>
        <Navbar user={this.state.user} gyms={this.state.gyms} />
        <div className="centered-text">
          {this.state.gyms ? this.renderSections() : null}
        </div>
      </>
    )
  }
}

export default SectionsForSpecificGymPage