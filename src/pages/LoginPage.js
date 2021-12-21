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
    const user = (await axios.get('http://localhost:1337/api/employees/1')).data
    const gyms = (await axios.get('http://localhost:1337/api/gyms')).data
    
    this.setState({
      gyms: gyms,
      user: user,
    })
  }
  
  render() {
    console.log(this.state)
    return (
      <div>
        <Login />
      </div>
    )
  }
}

export default LoginPage