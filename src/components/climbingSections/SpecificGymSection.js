import axios from 'axios'
import React from 'react'

class SpecificGymSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedClimbType: 'Boulder',
      gym: {}, 
      sections: []
    }

    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(event) {
    const { gym } = this.state
    
    const selectedSectionList = event.target.value === 'Boulder'
    ? gym.boulderSections
    : gym.routeSections
    

    this.setState({
      selectedClimbType: event.target.value,
      sections: selectedSectionList,
    })
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/gymWithSections/1')

    this.setState({
      gym: data,
      sections: data.boulderSections
    })
  }

  render() {
    return (
      <>
        <h1 className="centered-text">{this.state.gym.name }</h1>
        <div className="centered-text">
          <select onChange={this.handleChange} value={this.state.selectedClimbType}>
            <option value="Boulder">Boulder Sections</option>
            <option value="Route">Route Sections</option>
          </select>
        </div>
        <div className="location-grid">
          <div className={`${this.state.climbType}-locations`}>
            <h3 className="centered-text">{`${this.state.selectedClimbType} sections`}</h3>
            <ul>
              {
                this.state.sections.map(section => {
                  return (
                    <li key={section.id} className="centered-text inside-bullet">{section.name}</li>
                  )
                })
              }
            </ul>
          </div>

          <div>
            <h3 className="centered-text">
              <a href={`/gymSections/edit/${this.state.gym.id}`}>Edit All Section Names</a>
            </h3>
          </div>
        </div>
      </>
    )
  }
}

export default SpecificGymSection