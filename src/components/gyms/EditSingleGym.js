import axios from 'axios'
import React from 'react'
import InputAndLabel from './InputAndLabel'

class EditSingleGym extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      link: "/api/updateGymInfo",
      gym: {},
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange(event) {
    const value = event.target.name === 'headSetterId'
      ? parseInt(event.target.value)
      : event.target.value

    this.setState({
      gym: {
        ...this.state.gym,
        [event.target.name]: value
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/gyms/worcester')
    const gym = data

    this.setState({
      gym: gym,
    })
  }

  render() {
    if (!this.state.gym.name) {
      return (<h2>We cannot find the gym you wish to edit.</h2>)
    }

    return (
      <>
        <h1 className="centered-text">Edit {this.state.gym.name}'s Gym Information</h1>

        <form action={this.state.link} method="post" id="editable-gym-form">
          <div className="employee-form-grid">
            <InputAndLabel
              handleChange={this.handleChange}
              name="address"
              text="Address"
              value={this.state.gym.address}
            />
            
            <InputAndLabel
              handleChange={this.handleChange}
              name="phoneNumber"
              text="Phone number"
              value={this.state.gym.phoneNumber}
            />

            <label htmlFor="headSetterId">Head Setter:</label>
            <select name="headSetterId"  onChange={this.handleChange} value={this.state.gym.headSetterId}>
              {
                this.state.gym.employees.map(employee => {
                  return (
                    <option key={employee.id} value={employee.id}>{`${employee.firstName} ${employee.lastName}`}</option>
                  )
                })
              }
            </select>

            <InputAndLabel
              handleChange={this.handleChange}
              name="facebook"
              text="Facebook page"
              value={this.state.gym.facebook}
            />

            <InputAndLabel
              handleChange={this.handleChange}
              name="instagram"
              text="Instagram Account"
              value={this.state.gym.instagram}
            />

            <InputAndLabel
              handleChange={this.handleChange}
              name="twitter"
              text="Twitter Account"
              value={this.state.gym.twitter}
            />
          </div>
          <button onClick={this.handleSubmit} type="submit">Update Info</button>
        </form>
      </>
    )
  }
}

  export default EditSingleGym
