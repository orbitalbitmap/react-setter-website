import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Cookies } from 'react-cookie'
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from "@mui/material/Tooltip";

import { removeLocations, signOut } from '../../../actions'

const NavLogout = (props) => {
  const cookies = new Cookies()

  const handleLogout = () => {
    props.removeLocations()
    props.signOut()
    cookies.remove('setter')
  }

  return (
    <Link to="/" onClick={handleLogout} style={{textDecoration: 'none'}}>
      <Tooltip title="Logout" disableInteractive>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Tooltip>
    </Link>
  )
}

export default connect(null, { removeLocations, signOut })(NavLogout)