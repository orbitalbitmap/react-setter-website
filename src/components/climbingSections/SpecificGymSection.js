import React from 'react'

const gym = {
  id: 1,
  name: 'Worcester',
  climbType: 'Boulder',
  sections: [
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
}

class SpecificGymSection extends React.Component {
  render() {
    return (
      <>
        <h1 className="centered-text">{gym.name}</h1>
        <div className="location-grid">
          <div className="boulder-locations">
            <h3 className="centered-text">{`${gym.climbType} sections`}</h3>
            <ul>
              {
                gym.sections.map(section => {
                  return (
                    <li key={section.id} className="centered-text inside-bullet">{section.name}</li>
                  )
                })
              }
            </ul>
          </div>

          <div>
            <h3 className="centered-text">
              <a href={`/gymSections/edit/${gym.id}`}>Edit All Section Names</a>
            </h3>
          </div>
        </div>
      </>
    )
  }
}

export default SpecificGymSection