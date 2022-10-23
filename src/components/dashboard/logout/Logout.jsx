import { Link } from "react-router-dom"
import { useDispatch, } from "react-redux"
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from "@mui/material/Tooltip";
import { removeEmployeeList } from "../../../reducers/employeeReducers";
import { removeLocationList } from "../../../reducers/locationReducers";
import { removePanel } from "../../../reducers/gymTabPanelReducers";
import { removeUserInfo } from "../../../reducers/userReducer";

const NavLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeEmployeeList());
    dispatch(removeLocationList());
    dispatch(removePanel());
    dispatch(removeUserInfo())
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

export default NavLogout;