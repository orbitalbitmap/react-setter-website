import React from 'react'

const gym = {
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

class ClimbingSectionsForAGym extends React.Component {
  render(){
    return (
      <>
        <h1 className="centered-text">{gym.name}</h1>
        <div className="location-grid">
          <div className="boulder-locations">
            <h3 className="centered-text">Boulder sections</h3>
            <ul>
              {
                gym.boulders.map(section => {
                    return (
                      <li key={`boulder-${section.id}`} className="centered-text inside-bullet">{section.name}</li>
                    )
                })
              }
              </ul>
          </div>

          <div className="rope-locations">
            <h3 className="centered-text">Rope sections</h3>
            <ul>
              {
                gym.ropes.map(section => {
                    return (
                      <li key={`rope-${section.id}`} className="centered-text inside-bullet">{section.name}</li>
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


export default ClimbingSectionsForAGym