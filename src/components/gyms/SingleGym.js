import React from 'react'

const gym = {
  id: 1,
  name:'Worcester',
  address: '299 Barber Avenue Worcester, Massachusetts',
  phoneNumber: '555-666-7777',
  headSetterId: 1,
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

class SingleGym extends React.Component {
  render() {
    return (
      <>
        <h1 className="centered-text">gym.name</h1>
        <h3 className="centered-text">gym.address</h3>
        <h3 className="centered-text">gym.phoneNumber</h3>
        <h3 className="centered-text">{`Facebook: ${gym.facebook !== null ? gym.facebook : 'None available'}`}</h3>
        <h3 className="centered-text">{`Instagram: ${gym.instagram !== null ? gym.instagram : 'None available'}`}</h3>
        <h3 className="centered-text">{`Twitter: ${gym.twitter !== null ? gym.twitter : 'None available'}`}</h3>

        <h2 className="centered-text">All Setters:</h2>
        <h3 className="centered-text">Head Setter</h3>
        <ul className="centered-text">
          {
            
            gym.employees.map(employee => {
              return ( 
                <li key={employee.id} className="centered-text inside-bullet">
                  <a href={`/employees/${employee.id}`}>{`${employee.firstName} ${employee.lastName}`}</a>
                </li>
              )
            })
          }
        </ul>
        {/* <h3 className="centered-text">Full Time Setters</h3>
        <ul>
          <li className="centered-text inside-bullet">
            <a href={`/employees/${setter.id}`}>{`${setter.firstName} ${setter.lastName}`}</a>
          </li>
        </ul>

        <h3 className="centered-text">Part Time Setters</h3>
        <ul>
          <li className="centered-text inside-bullet">
            <a href={`/employees/${setter.id}`}>{`${setter.firstName} ${setter.lastName}`}</a>
          </li>
        </ul> */}

        <a href={`/gyms/edit/${gym.name}`}>Edit Gym info</a>
      </>
    )
  }
}

export default SingleGym