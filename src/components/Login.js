import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { Cookies } from 'react-cookie'

import { signIn } from '../actions'

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
      cookies: new Cookies()
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
    const user = (await axios.get(`http://localhost:1337/api/employeeByEmail/${this.state.user.email}`)).data  
    const passwordDoesMatch = await checkPass(this.state.user.password, user.password);



    switch (passwordDoesMatch) {
      case true:
        console.log('success')
        this.props.signIn(user)
        this.state.cookies.set('setterLoggedIn', true, { path: '/' })
        window.location.href = "/dashboard"
        break
      case false:
        console.log('faiulre')
        break
      default:
        console.log('faiulre')
        break
    }

    // this.props.signIn(user)
  }

  
  render() {
    if (this.props.isSignedIn) { window.location.href = "/dashboard" }
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


export default connect(null, { signIn })(Login)