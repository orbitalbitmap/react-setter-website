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

class UpdateClimbingSections extends React.Component {
  render() {
    return (
      <>
        <h1 className="centered-text">{gym.name}</h1>
        <form action="/api/updateRouteSectionNames" method="post" className="editable-section-form">
          <input className="hidden" name="gymId" value={gym.id} />
          <h1 className="centered-text">Ropes</h1>
          <div className="section-details" id="route-sections">
            {
              gym.ropes.map(section => {
                return (    
                  <div key={`rope-section-${section.id}`} className="gym-section-grid">
                    <input className="hidden" name="id" value={section.id} />
                    <label htmlFor="name">Name:</label>
                    <input name="name" value={section.name !== null ? section.name : ''} />
                  </div>
                )
              })
            }
          </div>
          
          <div className="section-button-container">
            <button className="section-button" type="button" /* onClick={addNewSection('route-sections')} */>Add New Section</button>
            <button className="section-button" type="submit">Save Info</button>
          </div>
        </form>

        <form action="/api/updateBoulderSectionNames" method="post" className="editable-section-form">
          <input className="hidden" name="gymId" value={gym.id} />
          <h1 className="centered-text">Boulders</h1>
          <div className="section-details" id="boulder-sections">
            {
              gym.boulders.map( section =>{
                return (
                  <div className="gym-section-grid">
                    <input className="hidden" name="id" value={section.id} />
                    <label htmlFor="name">Name:</label>
                    <input  name="name" value={section.name !== null ? section.name : ''} />
                  </div>
                )
              })
            }
          </div>
          <div className="section-button-container">
            <button className="section-button" type="button" onclick="addNewSection('boulder-sections')">Add New Section</button>
            <button className="section-button" type="submit">Save Info</button>
          </div>
        </form>
      </>
    )
  }
}

export default UpdateClimbingSections