import axios from 'axios'
import React from 'react'
import { Cookies } from 'react-cookie'

import '../components/styles.css'
import Login from '../components/Login'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      gyms: [], 
      cookies: new Cookies()
    }
  }

  async componentDidMount() {
    if (this.state.cookies.get('setterLoggedIn')) {
      window.location.href = "/dashboard"
    }

    const gyms = (await axios.get('http://localhost:1337/api/gyms')).data
    
    this.setState({
      gyms: gyms,
    })
  }
  
  render() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}

export default LoginPage