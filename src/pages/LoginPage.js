import axios from 'axios'
import React from 'react'

import '../components/styles.css'
import Login from '../components/Login'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      gyms: [], 
      test: 'page'
    }
  }

  async componentDidMount() {
    const userData = await axios.get('http://localhost:1337/api/employees/1')
    const gymsData = await axios.get('http://localhost:1337/api/gyms')
    this.setState({
      gyms: gymsData.data,
      user: userData.data
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