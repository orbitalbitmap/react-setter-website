import React from 'react'

const gyms = [{
    id: 1,
    name:'Worcester'
  }, {
    id: 2,
    name:'Hadley'
  }, {
    id: 3,
    name:'Watertown'
  } , {
    id: 4,
    name:'Glastonbury'
  }]

class Gyms extends React.Component {
  render() {
    return (
      <>
        <h1 className="centered-text">Locations:</h1>
        {
          gyms.map(gym => {
            return (
              <h3 key={gym.name} className="centered-text">
                <a href={`/gyms/${gym.id}`}>{gym.name}</a>
              </h3>
            )
          })
        }
      </>
    )
  }
}

export default Gyms