import React from 'react'

const gyms = [
  {
    gymId: 1,
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
  }, {
    gymId: 2,
    name: 'Hadley',
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
    }]
  }
]

  class AllClimbingSections extends React.Component {
    render() {
      return gyms.map( gym => {
        return (
          <React.Fragment key={`${gym.name}-sections`} >
            <h1 className="centered-text">{gym.name}</h1>

            <div className="location-grid">
              <div className="boulder-locations">
                <h3 className="centered-text">Boulder sections</h3>
                <ul>
                  {
                    gym.boulders.map(section => {
                      return (
                        <li key={`${gym.name}-${section.name}`}  className="centered-text inside-bullet">{section.name}</li>
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
                        <li key={`${gym.name}-${section.name}`} className="centered-text inside-bullet" >{section.name}</li>
                      )
                    })
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
