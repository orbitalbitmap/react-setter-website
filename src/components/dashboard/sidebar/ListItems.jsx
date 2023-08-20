import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip, 
} from '@mui/material';
import { Layers, } from '@mui/icons-material';
import sideNavList from './sideNavList';
import Logout from '../logout/Logout';
import AdminLink from '../navAdmin/NavAdmin';
import useListItems from './hooks/useListItems';

const ItemList = ({ drawerOpen, drawerSetter }) => {
  const {
    expandUserLocations,
    user,
    renderCollapsableList,
    renderList,
    setExpandUserLocations,
  } = useListItems(drawerOpen, drawerSetter);

  return (

    <Fragment>
      <AdminLink />
      {
        renderList(sideNavList)
      }
      <Link key={6} to={`/employees/edit/${user.id}`} style={{textDecoration: 'none'}}>
        <Tooltip title="Profile" disableInteractive >
          <ListItemButton>
            <ListItemIcon>
              <Layers />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Logout />
      <Divider sx={{ my: 1 }} />
      {
        renderCollapsableList(
          { id: 8, title: 'Your Locations'},
          '/locations/',
          user?.gyms,
          expandUserLocations,
          setExpandUserLocations
        )
      }
    </Fragment>
  )
}

export default ItemList;