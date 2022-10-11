import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

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