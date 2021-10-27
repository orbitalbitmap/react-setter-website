import React from 'react'

const gym = {
  id: 1,
  name:'Worcester',
  address: '299 Barber Avenue Worcester, Massachusetts',
  phoneNumber: '555-666-7777',
  headSetterId: 2,
  facebook: '',
  instagram: '',
  twitter: '',
  employees: [
    {
      id: 1,
      firstName: 'Robert',
      lastName: 'Perron',
    }, {
      id: 2,
      firstName: 'Kyle',
      lastName: 'Birnbaum',
    },
  ]
}


  class EditSingleGym extends React.Component {
    render() {
      return (
        <>
          <h1 className="centered-text">{`Edit ${gym.name}'s Gym Information`}</h1>

          <form action="/api/updateGymInfo" method="post" id="editable-gym-form">
            <div className="employee-form-grid">
              <input className="hidden" name="id" value={gym.id} />
              <input className="hidden" name="name" value={gym.name} />
              <label htmlFor="address">Address:</label>
              <input name="address" value={gym.address} />
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input name="phoneNumber" value={gym.phoneNumber} />
              <label htmlFor="headSetterId">Head Setter:</label>
              <select name="headSetterId" defaultValue={gym.headSetterId}>
                {
                  gym.employees.map(employee => {
                    return (
                      <option key={employee.id} value={employee.id }>{`${employee.firstName} ${employee.lastName}`}</option>
                    )
                  })
                }
              </select>
              <label htmlFor="facebook">Facebook Page:</label>
              <input name="facebook" value={gym.facebook === null ? '' : gym.facebook} />
              <label htmlFor="instagram">Instagram Account:</label>
              <input name="instagram" value={gym.instagram === null ? '' : gym.instagram} />
              <label htmlFor="twitter">Twitter Account:</label>
              <input name="twitter" value={gym.twitter === null ? '' : gym.twitter} />
            </div>
            <button type="submit">Update Info</button>
          </form>
        </>
      )
    }
  }

  export default EditSingleGym
