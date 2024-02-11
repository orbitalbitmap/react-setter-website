import { Link } from "react-router-dom";
import { 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useGetUserInfo from "../../../hooks/useGetUserInfo";

const AdminLink = () => {
  const { userRoleId } = useGetUserInfo();

  if (userRoleId <= 3) {
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

  return null;
}

export default AdminLink;