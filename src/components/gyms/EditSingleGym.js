import React from 'react'

class EditSingleGym extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gym: {
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
  }

  render() {
    return (
      <>
        <h1 className="centered-text">{`Edit ${this.state.gym.name}'s Gym Information`}</h1>

        <form action="/api/updateGymInfo" method="post" id="editable-gym-form">
          <div className="employee-form-grid">
            <input className="hidden" name="id" value={this.state.gym.id} disabled />
            <input className="hidden" name="name" value={this.state.gym.name} disabled />
            <label htmlFor="address">Address:</label>
            <input name="address" onChange={this.handleChange} value={this.state.gym.address} />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input name="phoneNumber" onChange={this.handleChange} value={this.state.gym.phoneNumber} />
            <label htmlFor="headSetterId">Head Setter:</label>
            <select name="headSetterId"  onChange={this.handleChange} defaultValue={this.state.gym.headSetterId}>
              {
                this.state.gym.employees.map(employee => {
                  return (
                    <option key={employee.id} value={employee.id }>{`${employee.firstName} ${employee.lastName}`}</option>
                  )
                })
              }
            </select>
            <label htmlFor="facebook">Facebook Page:</label>
            <input name="facebook"  onChange={this.handleChange} value={this.state.gym.facebook === null ? '' : this.state.gym.facebook} />
            <label htmlFor="instagram">Instagram Account:</label>
            <input name="instagram"  onChange={this.handleChange} value={this.state.gym.instagram === null ? '' : this.state.gym.instagram} />
            <label htmlFor="twitter">Twitter Account:</label>
            <input name="twitter"  onChange={this.handleChange} value={this.state.gym.twitter === null ? '' : this.state.gym.twitter} />
          </div>
          <button onClick={this.handleSubmit} type="submit">Update Info</button>
        </form>
      </>
    )
  }
}

  export default EditSingleGym
