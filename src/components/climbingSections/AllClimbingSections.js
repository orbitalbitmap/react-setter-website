import axios from 'axios'
import React from 'react'

  class AllClimbingSections extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        gyms: [],
      }

      this.renderSections = this.renderSections.bind(this)
    }

    async componentDidMount() {
      const { data } = await axios.get('http://localhost:1337/api/allGymSections')

      this.setState({
        gyms: data
      })
    }

    renderSections(name, sections) {
      return sections.map(section => {
        return (
          <li key={`${name}-${section.name}`} className="centered-text inside-bullet">{section.name}</li>
        )
      })
    }

    render() {
      return this.state.gyms.map( gym => {
        return (
          <React.Fragment key={`${gym.name}-sections`} >
            <h1 className="centered-text">{gym.name}</h1>

            <div className="location-grid">
              <div className="boulder-locations">
                <h3 className="centered-text">Boulder sections</h3>
                <ul>
                  {
                    gym.boulderSections.length > 0
                      ? this.renderSections(gym.name, gym.boulderSections)
                      : (<p className="centered-text">No boulder sections found</p>)
                  }
                </ul>
              </div>

              <div className="rope-locations">
                <h3 className="centered-text">Rope sections</h3>
                <ul>
                  {
                    gym.routeSections.length > 0
                    ? this.renderSections(gym.name, gym.boulderSections)
                    : (<p className="centered-text">No route sections found</p>)
                  }
                </ul>
              </div>

              <div>
                <h4 className="centered-text">
                  <a href={`/gymSections/edit/${gym.gymId}`}>Edit All Section Names</a>
                </h4>
              </div>
            </div>
          </React.Fragment>
        )
      })
    }
  }

  export default AllClimbingSections
