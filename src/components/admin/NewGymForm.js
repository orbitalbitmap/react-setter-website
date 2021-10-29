import React from 'react'

class NewGymForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gym: {
        name: '',
        address: '',
        phoneNumber: '',
        headSetterId: 0,
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
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      gym: {
        ...this.state.gym,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.state.gym.headSetterId !== 0
      ? console.log(this.state.gym)
      : window.alert('Please select a head setter.')
  }

  render() {
    return ( 
      <>
        <h1 className="centered-text">New's Gym Information</h1>

        <form action="/api/updateGymInfo" method="post" id="editable-gym-form">
          <div className="employee-form-grid">
            <label htmlFor="name">Name:</label>
            <input onChange={this.handleChange} name="name" value={this.state.gym.name} />
            <label htmlFor="address">Address:</label>
            <input onChange={this.handleChange} name="address" value={this.state.gym.address} />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input onChange={this.handleChange} name="phoneNumber" value={this.state.gym.phoneNumber} />
            
            <label htmlFor="headSetterId">Head Setter:</label>
            <select onChange={this.handleChange} name="headSetterId" defaultValue={0}>
            <option value={0}>Please select a setter...</option>
              
              {
                this.state.gym.employees.map(employee => {
                  return (    
                    <option key={employee.id} value={employee.id}>{`${employee.firstName} ${employee.lastName}`}</option>
                  )
                })
              }
            </select>
            <label htmlFor="facebook">Facebook Page:</label>
            <input onChange={this.handleChange} name="facebook" value={this.state.gym.facebook} />
            <label htmlFor="instagram">Instagram Account:</label>
            <input onChange={this.handleChange} name="instagram" value={this.state.gym.instagram} />
            <label htmlFor="twitter">Twitter Account:</label>
            <input onChange={this.handleChange} name="twitter" value={this.state.gym.twitter} />
          </div>
          <button onClick={this.handleSubmit} type="submit">Update Info</button>
        </form>
      </>
    )
  }
}

export default NewGymForm