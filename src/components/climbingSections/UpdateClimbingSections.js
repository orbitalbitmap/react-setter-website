import React from 'react'

class UpdateClimbingSections extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gym: {
        id: 1,
        name: 'Worcester',
        boulders: [
          {
            id: 1,
            name: 'Main Front Flat',
          }, {
            id: 2,
            name: 'Main Cave',
          }, {
            id: 3,
            name: 'Main Bulge',
          }, {
            id: 4,
            name: 'Main Back Flat',
          }],
        ropes: [
          {
            id: 1,
            name: 'Front Alcove',
          }, {
            id: 2,
            name: 'Archway',
          }, {
            id: 3,
            name: 'Pillar',
          }, {
            id: 4,
            name: 'Lead Cave',
          }, {
            id: 5,
            name: 'Back Alcove'
        }],
      }
    }

    this.addNewSection = this.addNewSection.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    let sectionType = event.target.dataset.sectiontype
    let newSectionId = this.state.gym[sectionType].length + 1
    
    this.setState({
      gym: {
        ...this.state.gym,
        [sectionType]: [
          ...this.state.gym[sectionType],
          {
            id: newSectionId,
            name: ''
          }
        ]
      }
    })
  }

  render() {
    return (
      <>
        <h1 className="centered-text">{this.state.gym.name}</h1>
        <form action="/api/updateRouteSectionNames" method="post" className="editable-section-form">
          <input className="hidden" name="gymId" value={this.state.gym.id} disabled />
          <h1 className="centered-text">Ropes</h1>
          <div className="section-details" id="route-sections">
            {
              this.state.gym.ropes.map(section => {
                return (    
                  <div key={`rope-section-${section.id}`} className="gym-section-grid">
                    <input className="hidden" name="id" value={section.id} disabled />
                    <label htmlFor="name">Name:</label>
                    <input
                      onChange={this.handleChange}
                      name="name"
                      value={section.name !== null ? section.name : ''}
                      data-sectiontype="ropes"
                      data-gymid={section.id}
                      placeholder="Enter section name..."
                    />
                  </div>
                )
              })
            }
          </div>
          
          <div className="section-button-container">
            <button className="section-button" type="button" onClick={this.addNewSection} data-sectiontype="ropes">Add New Section</button>
            <button className="section-button" onClick={this.handleSubmit} type="submit">Save Info</button>
          </div>
        </form>

        <form action="/api/updateBoulderSectionNames" method="post" className="editable-section-form">
          <input className="hidden" name="gymId" value={this.state.gym.id} disabled />
          <h1 className="centered-text">Boulders</h1>
          <div className="section-details" id="boulder-sections">
            {
              this.state.gym.boulders.map( section =>{
                return (
                  <div key={`boulder-section-${section.id}`} className="gym-section-grid">
                    <input className="hidden" name="id" value={section.id} disabled />
                    <label htmlFor="name">Name:</label>
                    <input
                      onChange={this.handleChange}
                      name="name"
                      value={section.name !== null ? section.name : ''}
                      data-sectiontype="boulders"
                      data-gymid={section.id}
                      placeholder="Enter section name..."
                    />
                  </div>
                )
              })
            }
          </div>
          <div className="section-button-container">
            <button className="section-button" type="button" onClick={this.addNewSection} data-sectiontype="boulders">Add New Section</button>
            <button className="section-button" onClick={this.handleSubmit} type="submit">Save Info</button>
          </div>
        </form>
      </>
    )
  }
}

export default UpdateClimbingSections