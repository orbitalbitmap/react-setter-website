import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Cookies } from 'react-cookie'

import { signOut } from '../../../actions'


const NavLogout = (props) => {
  const cookies = new Cookies()

  const handleLogout = () => {
    props.signOut()
    cookies.remove('setter')
  }

  return (
    <li className="parent" onClick={handleLogout}>
      <Link to="/">Logout</Link>
    </li>
  )
}

export default connect(null, { signOut })(NavLogout)