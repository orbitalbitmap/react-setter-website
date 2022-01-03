import axios from 'axios'
import React from 'react'

import Navbar from '../../components/navbar/Navbar'
import DistributionEditForm from '../../components/distributions/DistributionEditForm'

class IdealRopeDistributionPage extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  async componentDidMount() {
    const user = (await axios.get('http://localhost:1337/api/employees/1')).data
    const gyms = (await axios.get('http://localhost:1337/api/gyms')).data
    this.setState({
      gyms,
      user
    })
  }

  render() {
    return (
      <>
        <Navbar user={this.state.user} gyms={this.state.gyms} />
        <DistributionEditForm />
      </>
    )
  }
}

export default IdealRopeDistributionPage