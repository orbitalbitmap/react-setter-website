import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Cookies } from 'react-cookie'

import { signOut } from '../../../actions'

const cookies = new Cookies()

class NavLogout extends React.Component {
constructor(props) {
  super(props)

  this.handleLogout = this.handleLogout.bind(this)
}

handleLogout() {
  this.props.signOut()
  cookies.remove('setter')
}

  render() {
    return (
      <li className="parent" onClick={this.handleLogout}>
        <Link to="/">Logout</Link>
      </li>
    )
  }
}


export default connect(null, { signOut })(NavLogout)