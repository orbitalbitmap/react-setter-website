import axios from 'axios'
import React from 'react'

const { checkPass } = require('../helpers/bcrypt');


class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        email: '',
        password: '',
      },
      options: this.props.options,
      buttonProperties: [
        {
          key: "login",
          text: "Login",
          type: "submit",
        },
      ],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { data } = await axios.get(`http://localhost:1337/api/employeeByEmail/${this.state.user.email}`)

    if (!data.password) {
      console.log('none found')
      return;
    }
    
    const passwordDoesMatch = await checkPass(this.state.user.password, data.password);
  
    console.log(passwordDoesMatch)
    
    if (!passwordDoesMatch) {
      console.log('none found')
      return;
    }

    console.log(data)
  }

  
  render() {
    return (
      <form id="employee-form" action="/login" method="GET">
        <div className="employee-form-grid">
          <label htmlFor="email" form="employee-form" >Email:</label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Email"
            required
            value={this.state.user.email}
          />
          
          <label htmlFor="password" form="employee-form" >Password:</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            required
            value={this.state.user.password}
          />
        </div>

        <button onClick={this.handleSubmit} type="submit">Login</button>
      </form>
    )
  }
}

export default Login