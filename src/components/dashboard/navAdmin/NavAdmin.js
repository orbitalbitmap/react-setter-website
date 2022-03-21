import { connect } from "react-redux"
import { Link } from "react-router-dom"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Tooltip from '@mui/material/Tooltip'

const AdminLink = (props) => {
  if (props?.user?.roleId <= 3) {
    return (
      <Link to="/admin" style={{textDecoration: 'none', color: '#202020'}}>
        <Tooltip title="Admin Dashboard" disableInteractive>
          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItemButton>
        </Tooltip>
      </Link>
    )
  }

  return null
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(AdminLink)