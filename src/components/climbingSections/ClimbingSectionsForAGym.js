import axios from 'axios'
import React from 'react'

class ClimbingSectionsForAGym extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gym: []
    }

    this.renderSections = this.renderSections.bind(this)
  }

  renderSections(sections, type) {
    return sections.map(section => {
      return (
        <li key={`${type}-sections-${section.id}`} className="centered-text inside-bullet">{section.name}</li>
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
    return (
      <>
        <h1 className="centered-text">{this.state.gym.name}</h1>
        <div className="location-grid">
          <div className="boulder-locations">
            <h3 className="centered-text">Boulder sections</h3>
            <ul>
              {
                this.state.gym.boulderSections
                  ? this.renderSections(this.state.gym.boulderSections, 'boulder')
                  : <p>No boulder sections found.</p>
              }
              </ul>
          </div>

          <div className="rope-locations">
            <h3 className="centered-text">Rope sections</h3>
            <ul>
              {
                this.state.gym.routeSections
                ? this.renderSections(this.state.gym.routeSections, 'route')
                : <p>No route sections found.</p>
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


export default ClimbingSectionsForAGym