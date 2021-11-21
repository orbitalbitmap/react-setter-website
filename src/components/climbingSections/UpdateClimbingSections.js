import axios from 'axios'
import React from 'react'

class UpdateClimbingSections extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gym: {}
    }

    this.addNewSection = this.addNewSection.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderSectionFrom = this.renderSectionFrom.bind(this)
  }

  handleChange(event) {
    let sectionType = event.target.dataset.sectiontype
    let updatedSectionList = [...this.state.gym[sectionType]]
    const updatedSectionId = parseInt(event.target.dataset.gymid)-1

    updatedSectionList[updatedSectionId] = {
      ...updatedSectionList[updatedSectionId],
      name: event.target.value
    }

    this.setState({
      gym: {
        ...this.state.gym,
        [sectionType]: updatedSectionList
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    console.log(this.state)
  }

  addNewSection(event) {
    const sectionType = event.target.dataset.sectiontype
    const newSectionId = this.state.gym[sectionType].length + 1
    
    this.setState({
      gym: {
        ...this.state.gym,
        [sectionType]: [
          ...this.state.gym[sectionType],
          {
            id: newSectionId,
            gymId: this.state.gym.id,
            name: ''
          }
        ]
      }
    })
  }

  renderSectionFrom(sections, type) {
    return sections.map(section => {
      return (    
        <div key={`${type}-section-${section.id}`} className="gym-section-grid">
          <input className="hidden" name="id" value={section.id} disabled />
          <label htmlFor="name">Name:</label>
          <input
            onChange={this.handleChange}
            name="name"
            value={section.name !== null ? section.name : ''}
            data-sectiontype={`${type}Sections`}
            data-gymid={section.id}
            placeholder="Enter section name..."
          />
        </div>
      )
    })
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/gymWithSections/1')

    this.setState({
      gym: data
    })
  }

  render() {
    if (!this.state.gym.name) {
      return (<h2>Loading...</h2>)
    }

    return (
      <>
        <h1 className="centered-text">{this.state.gym.name}</h1>
        <form action="/api/updateRouteSectionNames" method="post" className="editable-section-form">
          <input className="hidden" name="gymId" value={this.state.gym.id} disabled />
          <h1 className="centered-text">Ropes</h1>
          <div className="section-details" id="route-sections">
            {
              this.state.gym.routeSections
                ? this.renderSectionFrom(this.state.gym.routeSections, 'route')
                : (<h2>No Route Sections Found.</h2>)
            }
          </div>
          
          <div className="section-button-container">
            <button className="section-button" type="button" onClick={this.addNewSection} data-sectiontype="routeSections">Add New Section</button>
            <button className="section-button" onClick={this.handleSubmit} type="submit">Save Info</button>
          </div>
        </form>

        <form action="/api/updateBoulderSectionNames" method="post" className="editable-section-form">
          <input className="hidden" name="gymId" value={this.state.gym.id} disabled />
          <h1 className="centered-text">Boulders</h1>
          <div className="section-details" id="boulder-sections">
          {
              this.state.gym.boulderSections
                ? this.renderSectionFrom(this.state.gym.boulderSections, 'boulder')
                : (<h2>No Boulder Sections Found.</h2>)
            }
          </div>
          <div className="section-button-container">
            <button className="section-button" type="button" onClick={this.addNewSection} data-sectiontype="boulderSections">Add New Section</button>
            <button className="section-button" onClick={this.handleSubmit} type="submit">Save Info</button>
          </div>
        </form>
      </>
    )
  }
}

export default UpdateClimbingSections