import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Cookies } from 'react-cookie'

import { signIn } from '../actions'

const { checkPass } = require('../helpers/bcrypt');
const cookies = new Cookies()


class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loginInfo: {
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
      loginInfo: {
        ...this.state.loginInfo,
        [event.target.name]: event.target.value
      }
    })
  }
  async handleSubmit(event) {
    // event.preventDefault()

    const {password, ...user} = (await axios.get(`http://localhost:1337/api/employeeByEmail/${this.state.loginInfo.email}`)).data
    const passwordDoesMatch = await checkPass(this.state.loginInfo.password, password);

    switch (passwordDoesMatch) {
      case true:
        this.props.signIn(user)
        cookies.set('setter', user, { path: '/' })
        break
      case false:
        console.log('faiulre')
        break
      default:
        console.log('faiulre')
        break
    }
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
            value={this.state.loginInfo.email}
          />
          
          <label htmlFor="password" form="employee-form" >Password:</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            required
            value={this.state.loginInfo.password}
          />
        </div>

          <Link to="/dashboard" onClick={this.handleSubmit} role="button">
            Login
          </Link> {/* Restyle this to be a button */}
      </form>
    )
  }
}


export default connect(null, { signIn })(Login)