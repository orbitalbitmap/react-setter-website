import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
// import  from '@mui/material/ListItemIcon';
// import  from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import  from '@mui/material/Tooltip'

const AdminLink = () => {
  const user = useSelector(state => state.user)
  if (user?.roleId <= 3) {
    return (
      <Link to="/admin" style={{textDecoration: 'none'}}>
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

export default AdminLink