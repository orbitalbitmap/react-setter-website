import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Cookies } from 'react-cookie'
import DashboardIcon from '@mui/icons-material/Dashboard';
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
    <Link to="/" onClick={handleLogout} style={{textDecoration: 'none', color: '#202020'}}>
      <Tooltip title="Logout" disableInteractive>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Tooltip>
    </Link>
  )
}

export default connect(null, { removeLocations, signOut })(NavLogout)