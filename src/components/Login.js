import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Cookies } from 'react-cookie'

import { getLocations, signIn } from '../actions'

const { checkPass } = require('../helpers/bcrypt');

const Login = (props) => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const {password, ...user} = (await axios.get(`${process.env.REACT_APP_API_PATH}/employeeByEmail/${enteredEmail}`)).data
    const passwordDoesMatch = await checkPass(enteredPassword, password);

    switch (passwordDoesMatch) {
      case true:
        props.signIn(user)
        props.getLocations()
        cookies.set('setter', user, { path: '/' })
        navigate('/dashboard', {replace: true})
        break
      case false:
        console.log('faiulre')
        break
      default:
        console.log('faiulre')
        break
    }
  }

  return (
    <form id="employee-form" action="/login" method="GET">
      <div className="employee-form-grid">
        <label htmlFor="email" form="employee-form" >Email:</label>
        <input
          type="email"
          name="email"
          onChange={(event) => setEnteredEmail(event.target.value)}
          placeholder="Email"
          required
          value={enteredEmail}
        />
        
        <label htmlFor="password" form="employee-form" >Password:</label>
        <input
          type="password"
          name="password"
          onChange={(event) => setEnteredPassword(event.target.value)}
          placeholder="Password"
          required
          value={enteredPassword}
        />
      </div>

        <button onClick={handleSubmit} type="submit" >Login</button> {/* Restyle this to be a button */}
    </form>
  )
}

export default connect(null, { getLocations, signIn })(Login)