import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import LayersIcon from '@mui/icons-material/Layers'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Collapse from '@mui/material/Collapse'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import { Link } from 'react-router-dom'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'

import { connect } from 'react-redux'

import Logout from '../logout/Logout'
import AdminLink from '../navAdmin/NavAdmin'

// import {Link as MuiLink} from '@mui/material/Link'


const ItemList = (props) => {
  const [open, setOpen] = React.useState(false)

  const toggleOpen = () => {

    !props.drawerOpen ? setOpen(false) : setOpen(!open)
  }

  return (

    <React.Fragment>
      <AdminLink />

      <Link to="/dashboard" style={{textDecoration: 'none', color: '#202020'}}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      
        <ListItemButton onClick={toggleOpen}>
          <ListItemIcon>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary="Locations" />
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider sx={{ my: 1 }} />
                <Link to="/locations" style={{textDecoration: 'none', color: '#202020'}}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="All" sx={{textAlign: 'center'}} />
                  </ListItemButton>
                </Link>
                {props?.gyms?.map(gym => {
                return (
                  <Link to={`/locations/${gym.id}`} style={{textDecoration: 'none', color: '#202020'}}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={gym.name} sx={{textAlign: 'center'}} />
                    </ListItemButton>
                  </Link>
                )
              })
            }
            <Divider sx={{ my: 1 }} />
            </List>
          </Collapse>

      <Link to="/employees" style={{textDecoration: 'none', color: '#202020'}}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItemButton>
      </Link>

      {/* change to collapsable list to contain links to that gym's metric page */}
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Metrics" />
      </ListItemButton>

      <Link to="/employees/edit" style={{textDecoration: 'none', color: '#202020'}}>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </Link>

      <Logout />

      <Divider sx={{ my: 1 }} />

      <ListSubheader component="div" inset>
        Your locations
      </ListSubheader>

      <List component="div" disablePadding>
        {
          props?.user?.gyms?.map(gym => {
            return (
              <Link to={`/locations/${gym.id}`} style={{textDecoration: 'none', color: '#202020'}}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={gym.name} sx={{textAlign: 'center'}} />
                </ListItemButton>
              </Link>
            )
          })
        }
        <Divider sx={{ my: 1 }} />
      </List>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, {})(ItemList)